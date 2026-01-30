import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

const BelanjaPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  const categories = ['Semua', 'Hasil Pertanian', 'UMKM', 'Kerajinan', 'Makanan & Minuman'];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsAPI.getAll();
        setProducts(response.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Gagal memuat produk. Pastikan backend sudah berjalan.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productsBackup = [
    { 
      id: 1, 
      name: 'Beras Organik Premium', 
      category: 'Hasil Pertanian', 
      price: 85000, 
      unit: 'kg',
      seller: 'Kelompok Tani Makmur',
      image: '/images/produk-1.jpg',
      stock: 50,
      whatsapp: '6282380127549'
    },
    { 
      id: 2, 
      name: 'Sayur Hidroponik Segar', 
      category: 'Hasil Pertanian', 
      price: 25000, 
      unit: 'paket',
      seller: 'Hidroponik Desa',
      image: '/images/produk-2.jpg',
      stock: 30,
      whatsapp: '6282380127549'
    },
    { 
      id: 3, 
      name: 'Keripik Singkong', 
      category: 'Makanan & Minuman', 
      price: 15000, 
      unit: 'pack',
      seller: 'UMKM Sumber Rezeki',
      image: '/images/produk-3.jpg',
      stock: 100,
      whatsapp: '6282380127549'
    },
    { 
      id: 4, 
      name: 'Tas Anyaman Pandan', 
      category: 'Kerajinan', 
      price: 75000, 
      unit: 'pcs',
      seller: 'Kerajinan Ibu-Ibu PKK',
      image: '/images/produk-4.jpg',
      stock: 20,
      whatsapp: '6282380127549'
    },
    { 
      id: 5, 
      name: 'Madu Murni', 
      category: 'Hasil Pertanian', 
      price: 95000, 
      unit: 'botol',
      seller: 'Kelompok Ternak Lebah',
      image: '/images/produk-5.jpg',
      stock: 25,
      whatsapp: '6282380127549'
    },
    { 
      id: 6, 
      name: 'Kopi Bubuk Robusta', 
      category: 'Makanan & Minuman', 
      price: 45000, 
      unit: 'pack',
      seller: 'UMKM Kopi Nusantara',
      image: '/images/produk-6.jpg',
      stock: 40,
      whatsapp: '6282380127549'
    },
    { 
      id: 7, 
      name: 'Batik Tulis Motif Lokal', 
      category: 'Kerajinan', 
      price: 250000, 
      unit: 'pcs',
      seller: 'Sanggar Batik Desa',
      image: '/images/produk-7.jpg',
      stock: 15,
      whatsapp: '6282380127549'
    },
    { 
      id: 8, 
      name: 'Sambal Teri Khas Desa', 
      category: 'Makanan & Minuman', 
      price: 35000, 
      unit: 'jar',
      seller: 'UMKM Rasa Nusantara',
      image: '/images/produk-8.jpg',
      stock: 60,
      whatsapp: '6282380127549'
    },
    { 
      id: 9, 
      name: 'Jagung Manis Organik', 
      category: 'Hasil Pertanian', 
      price: 12000, 
      unit: 'kg',
      seller: 'Kelompok Tani Sejahtera',
      image: '/images/produk-9.jpg',
      stock: 80,
      whatsapp: '6282380127549'
    },
  ];

  // Hanya gunakan data dari backend, tidak pakai fallback dummy
  const displayProducts = products;

  const filteredProducts = selectedCategory === 'Semua' 
    ? displayProducts 
    : displayProducts.filter(product => product.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleContactSeller = (product) => {
    const message = `Halo, saya tertarik dengan produk *${product.name}* seharga ${formatPrice(product.price)} per ${product.unit}. Apakah masih tersedia?`;
    const whatsappUrl = `https://wa.me/${product.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-[#1E3A5F]">Home</a>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E3A5F] font-medium">UMKM</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-2">UMKM Produk Desa</h1>
        </div>
      </div>

      {/* Gallery UMKM */}
      <section className="bg-white py-16 md:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">Galeri UMKM</h2>
            <p className="text-gray-600 text-sm md:text-base">Produk unggulan dari UMKM dan hasil pertanian Pekon Balak</p>
          </div>

          {/* 6 Picture Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="group bg-gray-100 rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                  <img
                    src={`/images/umkm${item}.jpeg`}
                    alt={`Foto UMKM ${item}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = '/images/umkm-dummy.jpg'; }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#1E3A5F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat produk...</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      {!loading && (
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gray-100">
                          <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                          </svg>
                        </div>
                      `;
                    }}
                  />
                  {/* Stock Badge */}
                  <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-lg text-xs font-medium text-gray-700">
                    Stok: {product.stock}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-1 bg-[#EFF6FF] text-[#1E3A5F] rounded-md text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-[#1E3A5F] line-clamp-2 mb-2 group-hover:text-[#2E5C8A] transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {product.seller}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-2xl font-bold text-[#1E3A5F]">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-xs text-gray-500">per {product.unit}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleContactSeller(product)}
                    className="w-full px-4 py-2.5 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Hubungi Penjual
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-[#1E3A5F] border-gray-200 hover:border-[#1E3A5F]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                      currentPage === pageNumber
                        ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#1E3A5F] hover:text-[#1E3A5F]'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-[#1E3A5F] border-gray-200 hover:border-[#1E3A5F]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
              </>
            )}
        </div>
      </section>
      )}

      {/* Kontak Pelaku UMKM Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">Kontak Pelaku UMKM</h2>
            <p className="text-gray-600 text-base md:text-lg">Pindai barcode di bawah untuk mendapatkan kontak semua pelaku UMKM melalui linktree</p>
          </div>

          {/* Single Barcode */}
          <div className="flex justify-center">
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-lg">
              <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto flex items-center justify-center border-2 border-gray-200">
                <img
                  src="/images/qrdanang.png"
                  alt="QR Code Kontak UMKM"
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.src = '/images/qr-dummy.png'; }}
                />
              </div>
              <p className="mt-6 text-gray-600 text-sm">Pindai dengan smartphone Anda</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-4">
            Ingin Menjual Produk Anda?
          </h2>
          <p className="text-gray-600 text-base mb-8">
            Daftarkan produk UMKM atau hasil pertanian Anda untuk dijual melalui platform desa
          </p>
          <button className="px-8 py-3 border border-[#1E3A5F] text-[#1E3A5F] rounded-lg font-medium hover:bg-[#1E3A5F] hover:text-white transition-colors">
            Daftarkan Produk
          </button>
        </div>
      </section>
    </div>
  );
};

export default BelanjaPage;
