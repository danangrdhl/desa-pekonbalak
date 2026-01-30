import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { galeriAPI } from '../services/api';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galeriData, setGaleriData] = useState([]);
  const [counters, setCounters] = useState({
    penduduk: 0,
    lakiLaki: 0,
    kepalaKeluarga: 0,
    perempuan: 0
  });

  const pejabat = [
    { nama: 'Mad Basir', jabatan: 'Kepala Desa', foto: '/images/kades.jpg' },
    { nama: 'Nanan Feryadi, S.Kom', jabatan: 'Sekretaris Desa', foto: '/images/sekdes.jpg' },
    { nama: 'Muharyati', jabatan: 'Kepala Urusan TU dan Umum', foto: '/images/kaur-tu.jpg' },
    { nama: 'Deni Endera', jabatan: 'Kepala Urusan Perencanaan', foto: '/images/kaur-perencanaan.jpg' },
    { nama: 'Maryoko', jabatan: 'Kepala Urusan Keuangan', foto: '/images/kaurkeuangan.jpg' },
    { nama: 'Agus Iqbal', jabatan: 'Kasi Pemerintahan', foto: '/images/kasipemerintahan.jpg' },
    { nama: 'Nindia Utari', jabatan: 'Kasi Pelayanan', foto: '/images/kasipelayanan.jpg' },
    { nama: 'Edi Septiawan', jabatan: 'Kasi Kesejahteraan', foto: '/images/kasikesra.jpg' },
    { nama: 'Tukino', jabatan: 'Kepala Dusun 1', foto: '/images/kadus 1.jpg' },
    { nama: 'Purwanto', jabatan: 'Kepala Dusun 2', foto: '/images/kadus 2.jpg' },
    { nama: 'Hariyanto', jabatan: 'Kepala Dusun 3', foto: '/images/kadus 3.jpg' },
    { nama: 'Kasno', jabatan: 'Kepala Dusun 4', foto: '/images/kadus 4.jpg' },
    { nama: 'Purwadi', jabatan: 'Kepala Dusun 5', foto: '/images/kadus 5.jpg' },
    { nama: 'Budiono', jabatan: 'Kepala Dusun 6', foto: '/images/kadus 6.jpg' },
    { nama: 'Sutriyanto', jabatan: 'Kepala Dusun 7', foto: '/images/kadus 7.jpg' },
  ];

  // Fetch galeri data
  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const response = await galeriAPI.getAll();
        // Handle response structure: { success: true, data: [...] }
        const dataArray = response.data || response || [];
        setGaleriData(dataArray.slice(0, 3)); // Only take first 3 items
      } catch (error) {
        console.error('Error fetching galeri:', error);
        // Use fallback data if API fails
        setGaleriData([
          { id: 1, judul: 'Gotong Royong Membersihkan Balai Desa', tanggal: '2026-01-23', gambar: '/images/gotongroyong.jpeg' },
          { id: 2, judul: 'Posyandu Pekon Balak', tanggal: '2026-01-19', gambar: '/images/posyandu.jpeg' },
          { id: 3, judul: 'Musrenbang', tanggal: '2026-01-15', gambar: '/images/musrenbang.jpeg' },
        ]);
      }
    };
    fetchGaleri();
  }, []);

  // Animated counter effect
  useEffect(() => {
    const targetValues = {
      penduduk: 2175,
      lakiLaki: 1068,
      kepalaKeluarga: 694,
      perempuan: 1107
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => {
        const newCounters = {};
        let allComplete = true;

        Object.keys(targetValues).forEach(key => {
          const target = targetValues[key];
          const current = prev[key];
          const increment = Math.ceil(target / steps);
          
          if (current < target) {
            newCounters[key] = Math.min(current + increment, target);
            allComplete = false;
          } else {
            newCounters[key] = target;
          }
        });

        if (allComplete) clearInterval(timer);
        return newCounters;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Auto carousel for SOTK
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, pejabat.length - 3));
    }, 4000);
    return () => clearInterval(timer);
  }, [pejabat.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, pejabat.length - 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, pejabat.length - 3)) % Math.max(1, pejabat.length - 3));
  };

  return (
    <div className="overflow-x-hidden bg-gray-50">
      {/* ================= HERO - Gov.sg Inspired ================= */}
      <div 
        className="relative w-full min-h-150 md:min-h-175 bg-cover bg-center flex items-center animate-fade-in"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        {/* Cleaner Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#1E3A5F]/95 via-[#1E3A5F]/85 to-[#1E3A5F]/70"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl animate-slide-up">
            {/* Breadcrumb Style Tag */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-white/90 text-sm font-medium">Pemerintah Desa</span>
              <span className="text-white/60">•</span>
              <span className="text-white text-sm font-semibold">Pekon Balak</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Selamat Datang di <br className="hidden md:block" />
              <span className="text-white">Pekon Balak</span>
            </h1>
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              Website Resmi Pemerintah Pekon Balak, Kecamatan Wonosobo, Kabupaten Tanggamus, Lampung.
              Informasi pelayanan publik, data desa, dan kegiatan masyarakat.
            </p>
            
            {/* CTA Buttons - Gov.sg Style */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/profil-desa"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1E3A5F] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                <span>Profil Desa</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                to="/infografis"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                <span>Infografis</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LAYANAN & INFORMASI - Gov.sg Inspired ================= */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">
              Layanan & Informasi
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl">
              Akses informasi pemerintahan desa, data demografi, layanan publik, dan kegiatan masyarakat.
            </p>
          </div>

          {/* Cards Grid - Clean Gov.sg Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              to="/profil-desa"
              className="group bg-white rounded-xl border border-gray-200 hover:border-[#2E5C8A] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#DBEAFE] transition-colors">
                  <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2 group-hover:text-[#2E5C8A] transition-colors">
                  Profil Desa
                </h3>
                <p className="text-sm text-gray-600 mb-3">Informasi lengkap profil dan sejarah desa</p>
                <div className="flex items-center text-[#2E5C8A] text-sm font-medium">
                  <span>Selengkapnya</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link 
              to="/infografis"
              className="group bg-white rounded-xl border border-gray-200 hover:border-[#2E5C8A] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#DBEAFE] transition-colors">
                  <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2 group-hover:text-[#2E5C8A] transition-colors">
                  Infografis
                </h3>
                <p className="text-sm text-gray-600 mb-3">Data visual dan statistik desa</p>
                <div className="flex items-center text-[#2E5C8A] text-sm font-medium">
                  <span>Selengkapnya</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link 
              to="/infografis#idm" 
              className="group bg-white rounded-xl border border-gray-200 hover:border-[#2E5C8A] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#DBEAFE] transition-colors">
                  <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2 group-hover:text-[#2E5C8A] transition-colors">
                  IDM
                </h3>
                <p className="text-sm text-gray-600 mb-3">Indeks Desa Membangun</p>
                <div className="flex items-center text-[#2E5C8A] text-sm font-medium">
                  <span>Selengkapnya</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link 
              to="/ppid" 
              className="group bg-white rounded-xl border border-gray-200 hover:border-[#2E5C8A] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#DBEAFE] transition-colors">
                  <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2 group-hover:text-[#2E5C8A] transition-colors">
                  PPID
                </h3>
                <p className="text-sm text-gray-600 mb-3">Pejabat Pengelola Informasi Publik</p>
                <div className="flex items-center text-[#2E5C8A] text-sm font-medium">
                  <span>Selengkapnya</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SAMBUTAN KEPALA DESA - Gov.sg Inspired ================= */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid gap-8 md:grid-cols-5 items-center">
                {/* Gambar dihapus — teks dipindah ke kiri dan diperluas */}
                <div className="md:col-span-5 p-8 md:pr-12">
                <div className="inline-block bg-[#EFF6FF] text-[#1E3A5F] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Sambutan
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-2">
                  Kepala Pekon Balak
                </h3>
                <p className="text-lg font-semibold text-[#2E5C8A] mb-6">
                  Mad Basir
                </p>
                
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Selamat datang di Website Resmi Pemerintah Pekon Balak. Website ini hadir sebagai sarana informasi yang bertujuan untuk memberikan pelayanan yang lebih baik dan lebih cepat kepada seluruh masyarakat.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Dengan kemajuan teknologi yang semakin pesat, kami berharap platform ini dapat menjadi jembatan yang menghubungkan antara pemerintah desa dengan warga.
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 italic">Salam hangat untuk kemajuan Pekon Balak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PETA DESA ================= */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">Peta Lokasi</h2>
            <p className="text-gray-600 text-base md:text-lg">
              Lokasi Pekon Balak, Kecamatan Tanggamus, Wonosobo
            </p>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="relative w-full h-100 md:h-125">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18632.84172575725!2d104.5193592345737!3d-5.454470156052765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e471b77e6b63fb7%3A0x49efef1afbd43ca6!2sPekon%20Balak%2C%20Wonosobo%2C%20Kabupaten%20Tanggamus%2C%20Lampung!5e0!3m2!1sid!2sid!4v1769713069768!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Pekon Balak"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi dihapus sesuai permintaan */}

      {/* ================= STATISTIK PENDUDUK - Gov.sg Style ================= */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">
              Data Kependudukan
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Statistik penduduk Pekon Balak terkini
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Penduduk', value: counters.penduduk, color: 'bg-blue-500' },
              { label: 'Laki-Laki', value: counters.lakiLaki, color: 'bg-[#2E5C8A]' },
              { label: 'Perempuan', value: counters.perempuan, color: 'bg-pink-500' },
              { label: 'Kepala Keluarga', value: counters.kepalaKeluarga, color: 'bg-amber-500' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="text-sm font-medium text-gray-600 mb-2">{item.label}</div>
                  <div className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
                    {item.value.toLocaleString('id-ID')}
                  </div>
                </div>
                <div className={`h-1.5 ${item.color}`}></div>
              </div>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            {[
              { label: 'Penduduk Sementara', value: 0 },
              { label: 'Mutasi Penduduk', value: 0 },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="bg-[#1E3A5F] flex items-center justify-center px-8 py-6 min-w-30">
                    <span className="text-3xl font-bold text-white">{item.value}</span>
                  </div>
                  <div className="flex-1 px-6">
                    <span className="text-base font-semibold text-gray-700">{item.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALERI KEGIATAN ================= */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">Galeri Kegiatan</h2>
            <p className="text-gray-600 text-base md:text-lg">
              Dokumentasi kegiatan dan acara di Pekon Balak
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galeriData.map((foto, index) => (
              <div key={index} className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#2E5C8A] hover:shadow-lg transition-all">
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={foto.image || foto.gambar}
                    alt={foto.title || foto.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { 
                      e.target.src = '/images/galeri-dummy.jpg';
                      e.target.onerror = null;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-[#1E3A5F] mb-1 line-clamp-2">{foto.title || foto.judul}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(foto.createdAt || foto.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link 
              to="/galeri"
              className="inline-flex items-center gap-2 bg-white border border-[#1E3A5F] text-[#1E3A5F] font-medium px-6 py-3 rounded-lg transition-all hover:bg-[#1E3A5F] hover:text-white"
            >
              <span>Lihat Semua Galeri</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HUBUNGI KAMI ================= */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">Hubungi Kami</h2>
            <p className="text-gray-600 text-base md:text-lg">
              Sampaikan kritik, saran, atau pertanyaan Anda untuk meningkatkan pelayanan kami
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Terima kasih atas masukan Anda! Pesan Anda akan segera kami proses.');
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5C8A] focus:border-transparent transition-all"
                  placeholder="Nama lengkap Anda"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5C8A] focus:border-transparent transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows="5"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5C8A] focus:border-transparent transition-all resize-none"
                  placeholder="Tulis pesan, kritik, atau saran Anda..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-[#1E3A5F] hover:bg-[#2E5C8A] text-white font-medium px-8 py-3 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  Kirim Pesan
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Privasi Anda dijaga. Informasi yang Anda berikan hanya digunakan untuk keperluan komunikasi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
