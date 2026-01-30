import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const InfografisPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Penduduk');
  const [infografis, setInfografis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://localhost:3000/api';

  // Mapping tab ke label dan deskripsi
  const tabConfig = {
    'Penduduk': {
      label: 'Infografis Penduduk',
      description: 'Kelola data statistik penduduk desa',
      color: 'bg-blue-100 text-blue-700'
    },
    'APBDes': {
      label: 'Infografis APBDes',
      description: 'Kelola data Anggaran Pendapatan dan Belanja Desa',
      color: 'bg-green-100 text-green-700'
    },
    'Stunting': {
      label: 'Infografis Stunting',
      description: 'Kelola data stunting berdasarkan dusun',
      color: 'bg-red-100 text-red-700'
    },
    'Bansos': {
      label: 'Infografis Bansos',
      description: 'Kelola data program bantuan sosial',
      color: 'bg-purple-100 text-purple-700'
    },
    'IDM': {
      label: 'Infografis IDM',
      description: 'Kelola data Indeks Desa Membangun',
      color: 'bg-orange-100 text-orange-700'
    },
    'SDGs': {
      label: 'Infografis SDGs',
      description: 'Kelola data Sustainable Development Goals',
      color: 'bg-yellow-100 text-yellow-700'
    }
  };

  useEffect(() => {
    fetchInfografis();
  }, [activeTab]);

  const fetchInfografis = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Ambil data berdasarkan kategori aktif
      const response = await fetch(`${API_URL}/infografis/type/${activeTab.toLowerCase()}`);
      if (!response.ok) throw new Error('Gagal memuat infografis');
      const data = await response.json();
      setInfografis(data.data || []);
      
      // Jika ada data, ambil data terbaru untuk edit
      if (data.data && data.data.length > 0) {
        const latestData = data.data[0];
        setFormData(typeof latestData.data === 'string' ? JSON.parse(latestData.data) : latestData.data);
        setEditingId(latestData.id);
        setIsEditing(true);
      } else {
        setFormData({});
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFormByType = () => {
    switch (activeTab) {
      case 'Penduduk':
        return <FormPenduduk formData={formData} setFormData={setFormData} />;
      case 'APBDes':
        return <FormAPBDes formData={formData} setFormData={setFormData} />;
      case 'Stunting':
        return <FormStunting formData={formData} setFormData={setFormData} />;
      case 'Bansos':
        return <FormBansos formData={formData} setFormData={setFormData} />;
      case 'IDM':
        return <FormIDM formData={formData} setFormData={setFormData} />;
      case 'SDGs':
        return <FormSDGs formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: `Data ${activeTab} - ${new Date().toLocaleDateString('id-ID')}`,
        type: activeTab,
        data: JSON.stringify(formData),
        description: `${tabConfig[activeTab]?.description || ''}`,
        year: new Date().getFullYear()
      };

      const method = isEditing ? 'PUT' : 'POST';
      const endpoint = isEditing 
        ? `${API_URL}/infografis/${editingId}`
        : `${API_URL}/infografis`;

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan infografis');
      }
      
      await fetchInfografis();
      alert(isEditing ? 'Data berhasil diupdate!' : 'Data berhasil ditambah!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (!user) return null;

  const currentConfig = tabConfig[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/Logo.png" alt="Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-bold text-[#1E3A5F]">Kelola Infografis</h1>
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigasi Tab */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {Object.keys(tabConfig).map(tab => {
            const config = tabConfig[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap text-sm transition-all ${
                  activeTab === tab
                    ? 'bg-[#1E3A5F] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-[#2E5C8A]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {currentConfig.label}
          </h2>
          <p className="text-gray-600">{currentConfig.description}</p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {isEditing ? 'Edit Data' : 'Tambah Data Baru'}
            </h3>
            <p className="text-gray-600 mb-4">
              Masukkan data statistik {activeTab.toLowerCase()} desa
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSave} className="space-y-8">
            {/* Kategori Label */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
              <div className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg font-medium text-gray-800">
                {activeTab}
              </div>
            </div>

            {/* Form Fields */}
            <div className="border-t border-gray-200 pt-6">
              {renderFormByType()}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => {
                  setFormData({});
                  setIsEditing(false);
                }}
                className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1E3A5F] hover:bg-[#2E5C8A] text-white rounded-lg font-medium transition-colors"
              >
                {isEditing ? 'Simpan Perubahan' : 'Simpan Data'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ============================================
// FORM COMPONENTS
// ============================================

const InputField = ({ label, value, onChange, type = 'number', placeholder = '0' }) => (
  <div className="flex items-center gap-3">
    <label className="w-32 text-sm font-medium text-gray-700">{label}</label>
    <input 
      type={type}
      value={value || ''} 
      onChange={onChange}
      placeholder={placeholder}
      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" 
    />
  </div>
);

const FormPenduduk = ({ formData, setFormData }) => {
  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
  };

  return (
    <div className="space-y-6">
      {/* 1. Jumlah Penduduk & Kepala Keluarga */}
      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">1. Jumlah Penduduk & Kepala Keluarga</h4>
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Total Penduduk" value={formData.totalPenduduk} onChange={(e) => updateField('totalPenduduk', e.target.value)} />
          <InputField label="Kepala Keluarga" value={formData.kepalaKeluarga} onChange={(e) => updateField('kepalaKeluarga', e.target.value)} />
          <InputField label="Laki-Laki" value={formData.lakiLaki} onChange={(e) => updateField('lakiLaki', e.target.value)} />
          <InputField label="Perempuan" value={formData.perempuan} onChange={(e) => updateField('perempuan', e.target.value)} />
        </div>
      </section>

      {/* 2. Kelompok Umur */}
      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">2. Kelompok Umur</h4>
        <div className="space-y-2">
          {['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65+'].map(range => (
            <div key={range} className="grid grid-cols-3 gap-2 items-center text-xs">
              <span className="font-medium text-gray-700">{range} tahun</span>
              <input type="number" placeholder="L" value={formData[`umur_${range}_l`] || ''} onChange={(e) => updateField(`umur_${range}_l`, e.target.value)} className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" />
              <input type="number" placeholder="P" value={formData[`umur_${range}_p`] || ''} onChange={(e) => updateField(`umur_${range}_p`, e.target.value)} className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Berdasarkan Dusun */}
      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">3. Berdasarkan Dusun</h4>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7].map(dusun => (
            <InputField key={dusun} label={`Dusun ${dusun}`} value={formData[`dusun_${dusun}`]} onChange={(e) => updateField(`dusun_${dusun}`, e.target.value)} />
          ))}
        </div>
      </section>

      {/* 4. Berdasarkan Pekerjaan */}
      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">4. Berdasarkan Pekerjaan</h4>
        <div className="space-y-2">
          {['Petani', 'Buruh Tani', 'PNS', 'Buruh Pabrik', 'Pedagang', 'Pegawai Swasta', 'Tukang', 'Lainnya'].map(job => (
            <InputField key={job} label={job} value={formData[`pekerjaan_${job}`]} onChange={(e) => updateField(`pekerjaan_${job}`, e.target.value)} />
          ))}
        </div>
      </section>

      {/* 5. Berdasarkan Pendidikan */}
      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">5. Berdasarkan Pendidikan</h4>
        <div className="space-y-2">
          {['Tidak Sekolah', 'SD', 'SLTP', 'SLTA', 'Diploma', 'S1', 'S2', 'S3'].map(edu => (
            <InputField key={edu} label={edu} value={formData[`pendidikan_${edu}`]} onChange={(e) => updateField(`pendidikan_${edu}`, e.target.value)} />
          ))}
        </div>
      </section>

      {/* 6. Berdasarkan Perkawinan */}
      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">6. Berdasarkan Perkawinan</h4>
        <div className="space-y-2">
          {['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'].map(status => (
            <InputField key={status} label={status} value={formData[`perkawinan_${status}`]} onChange={(e) => updateField(`perkawinan_${status}`, e.target.value)} />
          ))}
        </div>
      </section>

      {/* 7. Berdasarkan Agama */}
      <section>
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">7. Berdasarkan Agama</h4>
        <div className="space-y-2">
          {['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha'].map(agama => (
            <InputField key={agama} label={agama} value={formData[`agama_${agama}`]} onChange={(e) => updateField(`agama_${agama}`, e.target.value)} />
          ))}
        </div>
      </section>
    </div>
  );
};

const FormAPBDes = ({ formData, setFormData }) => {
  const updateField = (key, value) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => {
      const newData = { ...prev, [key]: numValue };
      
      // Hitung ulang surplus/defisit
      const pendapatan = newData.pendapatan || 0;
      const belanja = newData.belanja || 0;
      const penerimaan = newData.penerimaan || 0;
      const pengeluaran = newData.pengeluaran || 0;
      
      newData.surplus_defisit = (pendapatan + penerimaan) - (belanja + pengeluaran);
      return newData;
    });
  };

  const pendapatan = formData.pendapatan || 0;
  const belanja = formData.belanja || 0;
  const penerimaan = formData.penerimaan || 0;
  const pengeluaran = formData.pengeluaran || 0;
  const surplus_defisit = (pendapatan + penerimaan) - (belanja + pengeluaran);

  return (
    <div className="space-y-6">
      <section>
        <h4 className="font-semibold text-gray-900 mb-4 text-sm">Pendapatan & Belanja</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pendapatan</label>
            <input 
              type="number"
              value={pendapatan || ''} 
              onChange={(e) => updateField('pendapatan', e.target.value)}
              placeholder="Masukkan jumlah pendapatan"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Belanja</label>
            <input 
              type="number"
              value={belanja || ''} 
              onChange={(e) => updateField('belanja', e.target.value)}
              placeholder="Masukkan jumlah belanja"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" 
            />
          </div>
        </div>
      </section>

      <section>
        <h4 className="font-semibold text-gray-900 mb-4 text-sm">Pembiayaan</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Penerimaan</label>
            <input 
              type="number"
              value={penerimaan || ''} 
              onChange={(e) => updateField('penerimaan', e.target.value)}
              placeholder="Masukkan jumlah penerimaan"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pengeluaran</label>
            <input 
              type="number"
              value={pengeluaran || ''} 
              onChange={(e) => updateField('pengeluaran', e.target.value)}
              placeholder="Masukkan jumlah pengeluaran"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]" 
            />
          </div>
        </div>
      </section>

      <section className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Surplus/Defisit (Otomatis)</h4>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Perhitungan: (Pendapatan + Penerimaan) - (Belanja + Pengeluaran)
          </span>
          <div className={`text-2xl font-bold ${surplus_defisit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Rp {Math.abs(surplus_defisit).toLocaleString('id-ID')}
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-600 bg-white p-2 rounded">
          <p>= ({pendapatan.toLocaleString('id-ID')} + {penerimaan.toLocaleString('id-ID')}) - ({belanja.toLocaleString('id-ID')} + {pengeluaran.toLocaleString('id-ID')})</p>
          <p>= {(pendapatan + penerimaan).toLocaleString('id-ID')} - {(belanja + pengeluaran).toLocaleString('id-ID')}</p>
        </div>
      </section>
    </div>
  );
};

const FormStunting = ({ formData, setFormData }) => (
  <div className="space-y-2">
    {[1, 2, 3, 4, 5, 6, 7].map(dusun => (
      <InputField 
        key={dusun}
        label={`Dusun ${dusun}`} 
        value={formData[`dusun_${dusun}`]} 
        onChange={(e) => setFormData(prev => ({ ...prev, [`dusun_${dusun}`]: parseInt(e.target.value) || 0 }))} 
      />
    ))}
  </div>
);

const FormBansos = ({ formData, setFormData }) => (
  <div className="space-y-2">
    {['PKH', 'BPNT', 'PIP', 'KIS'].map(program => (
      <InputField 
        key={program}
        label={program} 
        value={formData[`program_${program}`]} 
        onChange={(e) => setFormData(prev => ({ ...prev, [`program_${program}`]: parseInt(e.target.value) || 0 }))} 
      />
    ))}
  </div>
);

const FormIDM = ({ formData, setFormData }) => (
  <div className="text-center text-gray-500 py-8">
    <p>Form IDM akan dikonfigurasi sesuai kebutuhan</p>
  </div>
);

// ✅ FORM SDGs DENGAN PERBAIKAN LENGKAP
const FormSDGs = ({ formData, setFormData }) => {
  const sdgsCategories = [
    { id: 1, title: 'Desa Tanpa Kemiskinan' },
    { id: 2, title: 'Desa Tanpa Kelaparan' },
    { id: 3, title: 'Desa Sehat dan Sejahtera' },
    { id: 4, title: 'Pendidikan Desa Berkualitas' },
    { id: 5, title: 'Keterlibatan Perempuan Desa' },
    { id: 6, title: 'Desa Layak Air Bersih dan Sanitasi' },
    { id: 7, title: 'Desa Berenergi Bersih dan Terbarukan' },
    { id: 8, title: 'Pertumbuhan Ekonomi Desa Merata' },
    { id: 9, title: 'Infrastruktur dan Inovasi Desa Sesuai Kebutuhan' },
    { id: 10, title: 'Desa Tanpa Kesenjangan' },
    { id: 11, title: 'Kawasan Pemukiman Desa Aman dan Nyaman' },
    { id: 12, title: 'Konsumsi dan Produksi Desa Sadar Lingkungan' },
    { id: 13, title: 'Desa Tanggap Perubahan Iklim' },
    { id: 14, title: 'Desa Peduli Lingkungan Laut' },
    { id: 15, title: 'Desa Peduli Lingkungan Darat' },
    { id: 16, title: 'Desa Damai Berkeadilan' },
    { id: 17, title: 'Kemitraan Untuk Pembangunan Desa' },
    { id: 18, title: 'Kelembagaan Desa Dinamis dan Budaya Desa Adaptif' },
  ];

  // Inisialisasi goals jika belum ada
  const goals = formData.goals || [];

  // ✅ PERBAIKAN: Helper function untuk update progress
  const updateGoalProgress = (id, progress) => {
    let newGoals = [...goals];
    const existingIndex = newGoals.findIndex(g => g.id === id);
    const category = sdgsCategories.find(c => c.id === id);
    
    if (existingIndex >= 0) {
      newGoals[existingIndex] = {
        ...newGoals[existingIndex],
        progress: progress
      };
    } else {
      newGoals.push({
        id: id,
        title: category.title,
        progress: progress
      });
    }
    
    // Hitung skor rata-rata
    const validGoals = newGoals.filter(g => g.progress > 0);
    const skorRataRata = validGoals.length > 0 
      ? parseFloat((validGoals.reduce((sum, g) => sum + g.progress, 0) / validGoals.length).toFixed(2))
      : 0;
    
    setFormData({
      goals: newGoals,
      skor_rata_rata: skorRataRata
    });
  };

  // ✅ PERBAIKAN: Update field dengan handling input kosong yang benar
  const updateField = (id, value) => {
    // Handle input kosong
    if (value === '' || value === null || value === undefined) {
      updateGoalProgress(id, 0);
      return;
    }
    
    const numValue = parseFloat(value);
    
    // Validasi: harus berupa angka valid
    if (isNaN(numValue)) {
      return; // Tidak update jika bukan angka
    }
    
    // Validasi rentang nilai
    if (numValue < 0 || numValue > 100) {
      alert('Skor harus antara 0 - 100');
      return;
    }
    
    updateGoalProgress(id, numValue);
  };

  // Hitung skor rata-rata untuk display
  const validGoals = goals.filter(g => g.progress > 0);
  const skorRataRata = validGoals.length > 0
    ? (validGoals.reduce((sum, g) => sum + g.progress, 0) / validGoals.length).toFixed(2)
    : '0.00';

  return (
    <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 sticky top-0">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-700">Skor Rata-rata SDGs Desa</p>
            <p className="text-xs text-gray-600 mt-1">Total skor dibagi jumlah kategori yang memiliki skor</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[#1E3A5F]">{skorRataRata}</p>
            <p className="text-xs text-gray-600">dari {validGoals.length} kategori</p>
          </div>
        </div>
      </div>

      <section>
        <h4 className="font-semibold text-gray-900 mb-4 text-sm">Masukkan Skor Setiap Kategori SDGs</h4>
        <div className="grid grid-cols-1 gap-3">
          {sdgsCategories.map((category) => {
            const goalData = goals.find(g => g.id === category.id);
            // ✅ PERBAIKAN: Tampilkan dengan format yang benar
            const currentValue = goalData && goalData.progress > 0 ? goalData.progress : '';
            
            return (
              <div key={category.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-[#1E3A5F] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{category.id}</span>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{category.title}</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={currentValue}
                    onChange={(e) => updateField(category.id, e.target.value)}
                    onBlur={(e) => {
                      // ✅ PERBAIKAN: Format saat blur (kehilangan fokus)
                      if (e.target.value === '') {
                        updateField(category.id, 0);
                      }
                    }}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5C8A]"
                  />
                </div>
                <div className="flex-shrink-0 text-sm font-semibold text-gray-600 w-12 text-right">
                  {/* ✅ PERBAIKAN: Display dengan format 2 desimal */}
                  {currentValue !== '' ? parseFloat(currentValue).toFixed(2) : '0.00'}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs font-medium text-gray-700 mb-2">Catatan Penting:</p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Masukkan skor untuk setiap kategori SDGs (rentang 0-100)</li>
          <li>• Skor rata-rata dihitung otomatis dari semua kategori yang memiliki nilai</li>
          <li>• Data disimpan dalam format: <code className="bg-gray-100 px-1 rounded">{'{ goals: [...], skor_rata_rata: X }'}</code></li>
          <li>• Format ini kompatibel dengan halaman publik website</li>
        </ul>
      </div>
    </div>
  );
};

export default InfografisPage;