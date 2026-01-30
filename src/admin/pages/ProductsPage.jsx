import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Hasil Pertanian',
    price: '',
    unit: '',
    seller: '',
    stock: '',
    image: null,
    whatsapp: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');

  const API_URL = 'http://localhost:3000/api';
  const itemsPerPage = 10;
  const categories = ['Semua', 'Hasil Pertanian', 'UMKM', 'Kerajinan', 'Makanan & Minuman'];
  const MIN_FILE_SIZE = 200 * 1024; // 200 KB in bytes
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Gagal memuat produk');
      const data = await response.json();
      setProducts(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImageError('');

    if (!file) {
      setImagePreview(null);
      setFormData(prev => ({ ...prev, image: null }));
      return;
    }

    // Validasi ukuran file
    if (file.size < MIN_FILE_SIZE) {
      setImageError(`Ukuran file minimal 200 KB (file Anda: ${(file.size / 1024).toFixed(2)} KB)`);
      setImagePreview(null);
      setFormData(prev => ({ ...prev, image: null }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setImageError(`Ukuran file maksimal 5 MB (file Anda: ${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      setImagePreview(null);
      setFormData(prev => ({ ...prev, image: null }));
      return;
    }

    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      setImageError('File harus berupa gambar (JPG, PNG, GIF, WebP)');
      setImagePreview(null);
      setFormData(prev => ({ ...prev, image: null }));
      return;
    }

    // Set file dan preview
    setFormData(prev => ({ ...prev, image: file }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        unit: product.unit,
        seller: product.seller,
        stock: product.stock,
        image: null,
        whatsapp: product.whatsapp
      });
      setImagePreview(product.image || null);
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        category: 'Hasil Pertanian',
        price: '',
        unit: '',
        seller: '',
        stock: '',
        image: null,
        whatsapp: ''
      });
      setImagePreview(null);
    }
    setImageError('');
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Validasi wajib diisi
    if (!formData.name || !formData.price || !formData.unit || !formData.seller || formData.stock === '') {
      alert('Mohon isi semua field yang wajib');
      return;
    }

    // Jika tambah produk baru, gambar wajib
    if (!editingId && !formData.image) {
      alert('Gambar produk wajib diisi untuk produk baru');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('unit', formData.unit);
      formDataToSend.append('seller', formData.seller);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('whatsapp', formData.whatsapp);

      // Jika ada gambar baru, tambahkan
      if (formData.image instanceof File) {
        formDataToSend.append('image', formData.image);
      }

      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId 
        ? `${API_URL}/products/${editingId}`
        : `${API_URL}/products`;

      const response = await fetch(endpoint, {
        method,
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Gagal menyimpan produk');
      
      await fetchProducts();
      setShowModal(false);
      alert(editingId ? 'Produk berhasil diupdate!' : 'Produk berhasil ditambah!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Gagal menghapus produk');
      
      await fetchProducts();
      setDeleteId(null);
      alert('Produk berhasil dihapus!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/Logo.png" alt="Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-bold text-[#1E3A5F]">Kelola Produk</h1>
              <p className="text-xs text-gray-500">Pekon Balak</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Produk Belanja</h2>
          <p className="text-gray-600">Kelola produk UMKM dan hasil pertanian</p>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end justify-between mb-6">
            <div className="flex-1 space-y-4">
              <input
                type="text"
                placeholder="Cari produk atau penjual..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
              />
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#1E3A5F] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => openModal()}
              className="px-6 py-2.5 bg-[#1E3A5F] hover:bg-[#2E5C8A] text-white rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Produk
            </button>
          </div>

          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-gray-600">Total Produk: </span>
              <span className="font-bold text-[#1E3A5F]">{products.length}</span>
            </div>
            <div>
              <span className="text-gray-600">Hasil Filter: </span>
              <span className="font-bold text-[#1E3A5F]">{filteredProducts.length}</span>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-12 h-12 border-4 border-[#1E3A5F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat produk...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Produk</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Kategori</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Penjual</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700">Harga</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Stok</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                          Tidak ada produk
                        </td>
                      </tr>
                    ) : (
                      paginatedProducts.map(product => (
                        <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{product.unit}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 bg-[#EFF6FF] text-[#1E3A5F] rounded-full text-xs font-medium">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{product.seller}</td>
                          <td className="px-6 py-4 text-right font-semibold text-gray-900">
                            Rp {parseInt(product.price).toLocaleString('id-ID')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              product.stock > 0 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => openModal(product)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => setDeleteId(product.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ← Sebelumnya
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#1E3A5F] text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Selanjutnya →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1E3A5F]">
                {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Produk */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Produk *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                    placeholder="Contoh: Beras Organik Premium"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Harga */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                    placeholder="85000"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Satuan *</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                    placeholder="Contoh: kg, pcs, botol"
                  />
                </div>

                {/* Penjual */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Penjual *</label>
                  <input
                    type="text"
                    name="seller"
                    value={formData.seller}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                    placeholder="Kelompok Tani Makmur"
                  />
                </div>

                {/* Stok */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stok *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                    placeholder="50"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">No. WhatsApp *</label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                    placeholder="6282380127549"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {editingId ? 'Ubah Gambar (Opsional)' : 'Gambar Produk *'}
                </label>
                
                {/* File Input */}
                <div className="mb-4">
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#2E5C8A] hover:bg-[#EFF6FF] transition-all">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-sm font-medium text-gray-700">Pilih gambar atau drag & drop</p>
                      <p className="text-xs text-gray-500">Min. 200 KB, Maks. 5 MB (JPG, PNG, GIF, WebP)</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Error Message */}
                {imageError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {imageError}
                  </div>
                )}

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview Gambar:</p>
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-xs h-auto rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end border-t border-gray-200 pt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-[#1E3A5F] hover:bg-[#2E5C8A] text-white rounded-lg font-medium transition-colors"
                >
                  {editingId ? 'Simpan Perubahan' : 'Tambah Produk'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Hapus Produk?</h3>
            <p className="text-gray-600 text-center mb-6">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;