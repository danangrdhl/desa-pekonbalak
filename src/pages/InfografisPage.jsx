import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart } from 'chart.js/auto';

const InfografisPage = () => {
  const location = useLocation();
  const chartInstances = useRef({});
  const [activeTab, setActiveTab] = useState('Penduduk');
  const [sdgsData, setSdgsData] = useState([]);
  const [loadingSDGs, setLoadingSDGs] = useState(false);
  
  const [pendudukData, setPendudukData] = useState(null);
  const [loadingPenduduk, setLoadingPenduduk] = useState(true);
  
  const [apbdesData, setApbdesData] = useState(null);
  const [loadingAPBDes, setLoadingAPBDes] = useState(false);
  
  const [stuntingData, setStuntingData] = useState(null);
  const [loadingStunting, setLoadingStunting] = useState(false);
  
  const [bansosData, setBansosData] = useState(null);
  const [loadingBansos, setLoadingBansos] = useState(false);
  
  const [idmData, setIdmData] = useState(null);
  const [loadingIDM, setLoadingIDM] = useState(false);

  const API_URL = 'http://localhost:3000/api';

  // Daftar semua kategori SDGs (18 kategori)
  const allSDGs = [
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

  const tabs = [
    { name: 'Penduduk' },
    { name: 'APBDes' },
    { name: 'Stunting' },
    { name: 'Bansos' },
    { name: 'IDM' },
    { name: 'SDGs' },
  ];

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'idm') {
      setActiveTab('IDM');
    } else if (hash === 'sdgs') {
      setActiveTab('SDGs');
    }
  }, [location]);

  useEffect(() => {
    const fetchPendudukData = async () => {
      try {
        setLoadingPenduduk(true);
        const response = await fetch(`${API_URL}/infografis/type/penduduk`);
        if (!response.ok) throw new Error('Gagal memuat data penduduk');
        
        const result = await response.json();
        if (result.data && result.data.length > 0) {
          const latestData = result.data[0];
          const parsedData = typeof latestData.data === 'string' 
            ? JSON.parse(latestData.data) 
            : latestData.data;
          setPendudukData(parsedData);
        }
      } catch (err) {
        console.error('Error fetching penduduk:', err);
        setPendudukData(null);
      } finally {
        setLoadingPenduduk(false);
      }
    };

    if (activeTab === 'Penduduk') {
      fetchPendudukData();
    }
  }, [activeTab]);

  const fetchAPBDesData = async () => {
    try {
      setLoadingAPBDes(true);
      const response = await fetch(`${API_URL}/infografis/type/apbdes`);
      if (!response.ok) {
        setApbdesData(null);
        return;
      }
      const result = await response.json();
      if (result.data && result.data.length > 0) {
        const latestData = result.data[0];
        const data = typeof latestData.data === 'string' 
          ? JSON.parse(latestData.data) 
          : latestData.data;
        setApbdesData(data);
      }
    } catch (error) {
      console.error('Error fetching APBDes:', error);
      setApbdesData(null);
    } finally {
      setLoadingAPBDes(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'APBDes') {
      fetchAPBDesData();
    }
  }, [activeTab]);

  const fetchStuntingData = async () => {
    try {
      setLoadingStunting(true);
      const response = await fetch(`${API_URL}/infografis/type/stunting`);
      if (!response.ok) {
        setStuntingData(null);
        return;
      }
      const result = await response.json();
      if (result.data && result.data.length > 0) {
        const latestData = result.data[0];
        const data = typeof latestData.data === 'string' 
          ? JSON.parse(latestData.data) 
          : latestData.data;
        setStuntingData(data);
      }
    } catch (error) {
      console.error('Error fetching Stunting:', error);
      setStuntingData(null);
    } finally {
      setLoadingStunting(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'Stunting') {
      fetchStuntingData();
    }
  }, [activeTab]);

  const fetchBansosData = async () => {
    try {
      setLoadingBansos(true);
      const response = await fetch(`${API_URL}/infografis/type/bansos`);
      if (!response.ok) {
        setBansosData(null);
        return;
      }
      const result = await response.json();
      if (result.data && result.data.length > 0) {
        const latestData = result.data[0];
        const data = typeof latestData.data === 'string' 
          ? JSON.parse(latestData.data) 
          : latestData.data;
        setBansosData(data);
      }
    } catch (error) {
      console.error('Error fetching Bansos:', error);
      setBansosData(null);
    } finally {
      setLoadingBansos(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'Bansos') {
      fetchBansosData();
    }
  }, [activeTab]);

  const fetchIDMData = async () => {
    try {
      setLoadingIDM(true);
      const response = await fetch(`${API_URL}/infografis/type/idm`);
      if (!response.ok) {
        setIdmData(null);
        return;
      }
      const result = await response.json();
      if (result.data && result.data.length > 0) {
        const latestData = result.data[0];
        const data = typeof latestData.data === 'string' 
          ? JSON.parse(latestData.data) 
          : latestData.data;
        setIdmData(data);
      }
    } catch (error) {
      console.error('Error fetching IDM:', error);
      setIdmData(null);
    } finally {
      setLoadingIDM(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'IDM') {
      fetchIDMData();
    }
  }, [activeTab]);

  const fetchSDGsData = async () => {
    try {
      setLoadingSDGs(true);
      const response = await fetch(`${API_URL}/infografis/type/sdgs`);
      
      if (!response.ok) {
        console.warn('❌ SDGs API Response Not OK:', response.status);
        setSdgsData([]);
        return;
      }
      
      const result = await response.json();
      console.log('📊 RAW API Response:', result);
      
      if (result.data && result.data.length > 0) {
        const latestData = result.data[0];
        const data = typeof latestData.data === 'string' 
          ? JSON.parse(latestData.data) 
          : latestData.data;
        
        console.log('✅ Parsed SDGs Data:', data);
        console.log('📋 Goals Array:', data.goals);
        
        setSdgsData(data.goals || []);
      } else {
        console.warn('⚠️ No SDGs data found');
        setSdgsData([]);
      }
    } catch (error) {
      console.error('❌ Error fetching SDGs:', error);
      setSdgsData([]);
    } finally {
      setLoadingSDGs(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'SDGs') {
      fetchSDGsData();
    }
  }, [activeTab]);

  useEffect(() => {
    if (!pendudukData) return;

    const destroyChart = (chartId) => {
      if (chartInstances.current[chartId]) {
        chartInstances.current[chartId].destroy();
        delete chartInstances.current[chartId];
      }
    };

    const ageCtx = document.getElementById('ageGroupChart');
    if (ageCtx && pendudukData) {
      destroyChart('ageGroupChart');
      const ageRanges = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65+'];
      const lakiData = ageRanges.map(range => pendudukData[`umur_${range}_l`] || 0);
      const perempuanData = ageRanges.map(range => pendudukData[`umur_${range}_p`] || 0);

      const ageChart = new Chart(ageCtx, {
        type: 'bar',
        data: {
          labels: ageRanges,
          datasets: [
            {
              label: 'Laki-laki',
              data: lakiData,
              backgroundColor: 'rgba(44, 121, 97, 0.8)',
            },
            {
              label: 'Perempuan',
              data: perempuanData,
              backgroundColor: 'rgba(251, 146, 60, 0.8)',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
      chartInstances.current.ageGroupChart = ageChart;
    }

    const dusunCtx = document.getElementById('dusunChart');
    if (dusunCtx && pendudukData) {
      destroyChart('dusunChart');
      const dusunData = [1, 2, 3, 4, 5, 6, 7].map(i => pendudukData[`dusun_${i}`] || 0);
      
      const dusunChart = new Chart(dusunCtx, {
        type: 'doughnut',
        data: {
          labels: ['Dusun 1', 'Dusun 2', 'Dusun 3', 'Dusun 4', 'Dusun 5', 'Dusun 6', 'Dusun 7'],
          datasets: [{
            data: dusunData,
            backgroundColor: [
              'rgba(44, 121, 97, 0.8)',
              'rgba(251, 146, 60, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)',
              'rgba(234, 179, 8, 0.8)',
              'rgba(239, 68, 68, 0.8)',
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
            }
          }
        }
      });
      chartInstances.current.dusunChart = dusunChart;
    }

    return () => {
      Object.values(chartInstances.current).forEach(chart => {
        if (chart) chart.destroy();
      });
      chartInstances.current = {};
    };
  }, [pendudukData, activeTab]);

  const renderLoadingSpinner = (text) => (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="w-12 h-12 border-4 border-[#1E3A5F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">{text}</p>
      </div>
    </section>
  );

  const renderNoData = (text) => (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-500">{text}</p>
      </div>
    </section>
  );

  // ✅ SUDAH DIPERBAIKI: Helper untuk menghitung skor rata-rata SDGs
  const calculateAverageScore = () => {
    // Hitung hanya dari data yang memiliki nilai (bukan semua 18 kategori)
    const validGoals = sdgsData.filter(g => g.progress > 0);
    
    if (validGoals.length === 0) return '0.00';
    
    const total = validGoals.reduce((sum, goal) => sum + (goal.progress || 0), 0);
    const average = total / validGoals.length; // ✅ Sudah diperbaiki - Hapus pembagian /100
    
    console.log('📈 Average Calculation:', {
      validGoals: validGoals.length,
      total,
      average: average.toFixed(2)
    });
    
    return average.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-[#1E3A5F]">Home</a>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E3A5F] font-medium">Infografis</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-2">Infografis Pekon Balak</h1>
          <p className="text-gray-600 text-base md:text-lg">Visualisasi data dan informasi desa dalam bentuk infografis interaktif</p>
        </div>
      </div>

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-6 py-2.5 rounded-lg border font-medium transition-all ${
                  activeTab === tab.name
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#1E3A5F] hover:text-[#1E3A5F]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeTab === 'Penduduk' && (
        <>
          {loadingPenduduk ? (
            renderLoadingSpinner('Memuat data penduduk...')
          ) : !pendudukData ? (
            renderNoData('Belum ada data penduduk. Silakan input di admin dashboard terlebih dahulu.')
          ) : (
            <>
              <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Jumlah Penduduk dan Kepala Keluarga</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                      <img src="/images/aset_infografis/Total Penduduk.png" alt="Population" className="w-20 h-20 object-contain" />
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Total Penduduk</p>
                        <p className="text-3xl font-bold"><span className="text-[#1E3A5F]">{(pendudukData.totalPenduduk || 0).toLocaleString('id-ID')}</span><span className="text-gray-700 text-lg"> Jiwa</span></p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                      <img src="/images/aset_infografis/kepala_keluarga.png" alt="Family" className="w-20 h-20 object-contain" />
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Kepala Keluarga</p>
                        <p className="text-3xl font-bold"><span className="text-[#1E3A5F]">{(pendudukData.kepalaKeluarga || 0).toLocaleString('id-ID')}</span><span className="text-gray-700 text-lg"> KK</span></p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                      <img src="/images/aset_infografis/Perempuan.png" alt="Female" className="w-20 h-20 object-contain" />
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Perempuan</p>
                        <p className="text-3xl font-bold"><span className="text-[#1E3A5F]">{(pendudukData.perempuan || 0).toLocaleString('id-ID')}</span><span className="text-gray-700 text-lg"> Jiwa</span></p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 flex items-center gap-6 border border-gray-200 hover:shadow-lg transition-shadow">
                      <img src="/images/aset_infografis/laki-laki.png" alt="Male" className="w-20 h-20 object-contain" />
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Laki-Laki</p>
                        <p className="text-3xl font-bold"><span className="text-[#1E3A5F]">{(pendudukData.lakiLaki || 0).toLocaleString('id-ID')}</span><span className="text-gray-700 text-lg"> Jiwa</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Kelompok Umur</h4>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div style={{ height: '420px' }}>
                      <canvas id="ageGroupChart"></canvas>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Dusun</h4>
                  <div className="grid md:grid-cols-5 gap-8 items-start">
                    <div className="md:col-span-3 flex justify-center">
                      <div style={{ width: '100%', maxWidth: '550px', position: 'relative' }}>
                        <canvas id="dusunChart"></canvas>
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <p className="text-xl font-bold text-gray-800 mb-4">Keterangan:</p>
                      {[1, 2, 3, 4, 5, 6, 7].map(dusun => (
                        <p key={dusun} className="text-base text-gray-700">
                          <span className="font-semibold">Dusun {dusun}:</span> {(pendudukData?.[`dusun_${dusun}`] || 0).toLocaleString('id-ID')} Jiwa
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Pekerjaan</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {['Petani', 'Buruh Tani', 'PNS', 'Buruh Pabrik', 'Pedagang', 'Pegawai Swasta', 'Tukang', 'Lainnya'].map(job => (
                      <div key={job} className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                        <p className="text-sm font-medium text-gray-600 mb-2">{job}</p>
                        <p className="text-2xl font-bold text-[#1E3A5F]">{(pendudukData?.[`pekerjaan_${job}`] || 0).toLocaleString('id-ID')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Pendidikan</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {['Tidak Sekolah', 'SD', 'SLTP', 'SLTA', 'Diploma', 'S1', 'S2', 'S3'].map(edu => (
                      <div key={edu} className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                        <p className="text-sm font-medium text-gray-600 mb-2">{edu}</p>
                        <p className="text-2xl font-bold text-[#1E3A5F]">{(pendudukData?.[`pendidikan_${edu.replace(/\s/g, '_')}`] || 0).toLocaleString('id-ID')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Perkawinan</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'].map(status => (
                      <div key={status} className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                        <p className="text-sm font-medium text-gray-600 mb-2">{status}</p>
                        <p className="text-2xl font-bold text-[#1E3A5F]">{(pendudukData?.[`perkawinan_${status.replace(/\s/g, '_')}`] || 0).toLocaleString('id-ID')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Berdasarkan Agama</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha'].map(agama => (
                      <div key={agama} className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                        <p className="text-sm font-medium text-gray-600 mb-2">{agama}</p>
                        <p className="text-2xl font-bold text-[#1E3A5F]">{(pendudukData?.[`agama_${agama}`] || 0).toLocaleString('id-ID')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}

      {activeTab === 'APBDes' && (
        <>
          {loadingAPBDes ? (
            renderLoadingSpinner('Memuat data APBDes...')
          ) : !apbdesData ? (
            renderNoData('Belum ada data APBDes. Silakan input di admin dashboard terlebih dahulu.')
          ) : (
            <section className="py-16 md:py-20">
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="mb-12 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">APB Desa Banjar Rejo</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    Pekon Balak, Kecamatan Wonosobo, Kabupaten Tanggamus, Lampung
                  </p>
                </div>
                
                {/* Pendapatan & Belanja Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Pendapatan */}
                  <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                    <h5 className="text-xl font-bold text-[#1E3A5F] mb-4">Pendapatan</h5>
                    <p className="text-3xl font-bold text-[#1E3A5F]">
                      Rp {apbdesData.pendapatan ? parseInt(apbdesData.pendapatan).toLocaleString('id-ID') : '0'}
                    </p>
                  </div>

                  {/* Belanja */}
                  <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                    <h5 className="text-xl font-bold text-[#1E3A5F] mb-4">Belanja</h5>
                    <p className="text-3xl font-bold text-[#1E3A5F]">
                      Rp {apbdesData.belanja ? parseInt(apbdesData.belanja).toLocaleString('id-ID') : '0'}
                    </p>
                  </div>
                </div>

                {/* Pembiayaan Section */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold text-[#1E3A5F] mb-4">Pembiayaan</h5>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Penerimaan */}
                    <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                      <p className="text-sm font-medium text-gray-600 mb-2">Penerimaan</p>
                      <p className="text-3xl font-bold text-[#1E3A5F]">
                        Rp {apbdesData.penerimaan ? parseInt(apbdesData.penerimaan).toLocaleString('id-ID') : '0'}
                      </p>
                    </div>

                    {/* Pengeluaran */}
                    <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                      <p className="text-sm font-medium text-gray-600 mb-2">Pengeluaran</p>
                      <p className="text-3xl font-bold text-[#1E3A5F]">
                        Rp {apbdesData.pengeluaran ? parseInt(apbdesData.pengeluaran).toLocaleString('id-ID') : '0'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Surplus/Defisit Section */}
                <div>
                  <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-600 mb-2">Surplus/Defisit</p>
                    <p className={`text-3xl font-bold ${
                      apbdesData.surplus_defisit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      Rp {apbdesData.surplus_defisit ? parseInt(apbdesData.surplus_defisit).toLocaleString('id-ID') : '0'}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {activeTab === 'Stunting' && (
        <>
          {loadingStunting ? (
            renderLoadingSpinner('Memuat data Stunting...')
          ) : !stuntingData ? (
            renderNoData('Belum ada data Stunting. Silakan input di admin dashboard terlebih dahulu.')
          ) : (
            <section className="py-16 md:py-20">
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Data Stunting</h4>
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(stuntingData).map(([key, value]) => (
                      <div key={key} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                        <p className="text-sm font-medium text-gray-600 mb-2 capitalize">{key.replace(/_/g, ' ')}</p>
                        <p className="text-3xl font-bold text-[#1E3A5F]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {activeTab === 'Bansos' && (
        <>
          {loadingBansos ? (
            renderLoadingSpinner('Memuat data Bansos...')
          ) : !bansosData ? (
            renderNoData('Belum ada data Bansos. Silakan input di admin dashboard terlebih dahulu.')
          ) : (
            <section className="py-16 md:py-20">
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <h4 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6">Data Bansos</h4>
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(bansosData).map(([key, value]) => (
                      <div key={key} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                        <p className="text-sm font-medium text-gray-600 mb-2 capitalize">{key.replace(/_/g, ' ')}</p>
                        <p className="text-3xl font-bold text-[#1E3A5F]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {activeTab === 'IDM' && (
        <>
          {loadingIDM ? (
            renderLoadingSpinner('Memuat data IDM...')
          ) : !idmData ? (
            renderNoData('Belum ada data IDM. Silakan input di admin dashboard terlebih dahulu.')
          ) : (
            <section className="py-16 md:py-20">
              <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="mb-12 text-center">
                  <h3 className="text-4xl md:text-5xl font-bold text-[#1E3A5F] mb-4">IDM</h3>
                  <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                    Indeks Desa Membangun (IDM) merupakan indeks komposit yang dibentuk dari tiga indeks, yaitu Indeks Ketahanan Sosial, Indeks Ketahanan Ekonomi, dan Indeks Ketahanan Ekologi/Lingkungan.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 border border-gray-200">
                  <div className="grid md:grid-cols-3 gap-6">
                    {Object.entries(idmData).map(([key, value]) => (
                      <div key={key} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-center">
                        <p className="text-sm font-medium text-gray-600 mb-2 capitalize">{key.replace(/_/g, ' ')}</p>
                        <p className="text-4xl font-bold text-[#1E3A5F]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {activeTab === 'SDGs' && (
        <section id="sdgs" className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {/* Header Section */}
            <div className="mb-12 grid md:grid-cols-2 gap-8 items-start">
              {/* Left - Judul dan Deskripsi */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">SDGs Desa</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  SDGs Desa mengacu pada upaya yang dilakukan di tingkat Desa untuk mencapai Tujuan Pembangunan Berkelanjutan (Sustainable Development Goals/SDGs). SDGs merupakan agenda global yang ditetapkan oleh Perserikatan Bangsa-Bangsa (PBB) untuk mengatasi berbagai tantangan sosial, ekonomi, dan lingkungan di seluruh dunia.
                </p>
              </div>

              {/* Right - Tabel Skor */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-lg font-bold text-[#1E3A5F] mb-4">Skor SDGs Pekon Balak</h4>
                <div className="text-center">
                  {sdgsData.length > 0 ? (
                    <>
                      <p className="text-sm text-gray-600 mb-2">Skor Rata-rata</p>
                      <p className="text-5xl font-bold text-[#1E3A5F]">
                        {calculateAverageScore()}
                      </p>
                      <p className="text-xs text-gray-600 mt-2">
                        dari {sdgsData.filter(g => g.progress > 0).length} kategori dengan data
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-4">
                      {loadingSDGs ? 'Memuat data...' : 'Belum ada data'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Grid SDGs Penilaian */}
            <div className="mt-12">
              <h4 className="text-2xl font-bold text-[#1E3A5F] mb-8">Penilaian SDGs Desa</h4>
              {loadingSDGs ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#1E3A5F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat data SDGs...</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {allSDGs.map((goal) => {
                    const currentGoal = sdgsData.find(g => g.id === goal.id) || { progress: 0 };
                    const displayValue = currentGoal.progress > 0 
                      ? currentGoal.progress.toFixed(2) 
                      : '0.00';
                    
                    return (
                      <div 
                        key={goal.id} 
                        className="bg-white rounded-lg border border-gray-300 p-6 hover:shadow-md transition-shadow"
                      >
                        <h5 className="font-bold text-gray-900 text-lg mb-4">{goal.title}</h5>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img 
                              src={`https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${String(goal.id).padStart(2, '0')}.jpg`} 
                              alt={`SDG ${goal.id}`} 
                              className="w-10 h-10 object-contain" 
                              onError={(e) => { e.target.style.display = 'none'; }} 
                            />
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Nilai</p>
                            <p className="text-3xl font-bold text-[#1E3A5F]">
                              {displayValue}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default InfografisPage;