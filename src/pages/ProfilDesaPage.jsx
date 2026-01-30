const ProfilDesaPage = () => {
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
            <span className="text-[#1E3A5F] font-medium">Profil Desa</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F]">Profil Pekon Balak</h1>
          <p className="text-gray-600 mt-2 text-base md:text-lg">Informasi lengkap tentang visi, misi, sejarah, dan kondisi geografis desa</p>
        </div>
      </div>

      <main className="grow">
        {/* ====== VISI & MISI ====== */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1E3A5F]">Visi</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Terwujudnya Desa Data Adil, Makmur, Aman, dan Sehat, melalui Peningkatan Sumber Daya Manusia Pertanian yang Maju serta Berkualitas.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1E3A5F]">Misi</h2>
                </div>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#2E5C8A] rounded-full mt-2 shrink-0"></span>
                    <span>Menyelenggarakan pemerintahan yang transparan, akuntabel, dan responsif.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#2E5C8A] rounded-full mt-2 shrink-0"></span>
                    <span>Meningkatkan sarana dan prasarana berbasis ekonomi produktif.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#2E5C8A] rounded-full mt-2 shrink-0"></span>
                    <span>Meningkatkan pembangunan infrastruktur yang mendukung perekonomian desa.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-[#2E5C8A] rounded-full mt-2 shrink-0"></span>
                    <span>Meningkatkan pelayanan kesehatan desa.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== STRUKTUR ORGANISASI ====== */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">Struktur Organisasi</h2>
              <p className="text-gray-600 text-base md:text-lg">Bagan organisasi pemerintahan Pekon Balak</p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <div className="flex justify-center">
                <img 
                  src="/images/Bagan Desa_1.jpg" 
                  alt="Struktur Organisasi Pemerintahan Desa" 
                  className="rounded-lg w-full max-w-4xl object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-center text-gray-500 py-12 hidden">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">Struktur organisasi tidak tersedia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SEJARAH DAN KONDISI GEOGRAFIS ====== */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">Sejarah & Kondisi Geografis</h2>
              <p className="text-gray-600 text-base md:text-lg">Latar belakang pembentukan dan karakteristik wilayah desa</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="bg-gray-100 p-6 md:p-12 flex items-center justify-center">
                  <img 
                    src="/images/profildesa.png" 
                    alt="Sejarah Pekon Balak"
                    className="rounded-lg w-full h-auto object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="p-8 md:p-10">
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      Pekon Balak terletak di wilayah Kecamatan Wonosobo, Kabupaten Tanggamus, Lampung. Pekon memiliki luas wilayah yang dikelola dengan baik dan terbagi dalam beberapa dusun. Pekon Balak menjadi salah satu desa yang berkembang di kawasan Tanggamus dengan mayoritas penduduk bekerja di sektor pertanian dan UMKM.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                    Jumlah penduduk tahun 2025 sebanyak 2175 jiwa, dengan penduduk laki-laki sebanyak 1068 jiwa dan perempuan sebanyak 1107 jiwa. Mayoritas penduduk bekerja sebagai lainnya yaitu sebanyak 256 orang.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== PETA LOKASI & BATAS DESA ====== */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">Peta Lokasi & Batas Wilayah</h2>
              <p className="text-gray-600 text-base md:text-lg">Informasi geografis dan batas administratif desa</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informasi Batas Desa */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-4">Batas Wilayah</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Utara</p>
                      <p className="text-sm text-gray-600">Hutan Lindung</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Selatan</p>
                      <p className="text-sm text-gray-600">Pekon Kejadian</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Timur</p>
                      <p className="text-sm text-gray-600">Desa Padang Manis</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Barat</p>
                      <p className="text-sm text-gray-600">Desa Kunyayan</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Luas Wilayah</span>
                    <span className="text-sm font-semibold text-[#1E3A5F]">346 Ha</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Jumlah Penduduk</span>
                    <span className="text-sm font-semibold text-[#1E3A5F]">2.175 Jiwa</span>
                  </div>
                </div>
              </div>

              {/* Peta Lokasi */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18632.84172575725!2d104.5193592345737!3d-5.454470156052765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e471b77e6b63fb7%3A0x49efef1afbd43ca6!2sPekon%20Balak%2C%20Wonosobo%2C%20Kabupaten%20Tanggamus%2C%20Lampung!5e0!3m2!1sid!2sid!4v1769713069768!5m2!1sid!2sid" 
                  width="100%" 
                  height="100%"
                  className="min-h-100" 
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Pekon Balak"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilDesaPage;

