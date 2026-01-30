import { useState } from 'react';

const PPIDPage = () => {
  const [showDasarHukum, setShowDasarHukum] = useState(false);

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
            <span className="text-[#1E3A5F] font-medium">PPID</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">Pejabat Pengelola Informasi dan Dokumentasi</h1>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            PPID adalah pejabat yang bertanggung jawab di bidang penyimpanan, pendokumentasian, penyediaan, dan/atau pelayanan informasi di badan publik.
          </p>
          <button 
            onClick={() => setShowDasarHukum(!showDasarHukum)}
            className="px-6 py-2.5 border border-[#1E3A5F] text-[#1E3A5F] rounded-lg font-medium hover:bg-[#1E3A5F] hover:text-white transition-colors"
          >
            Lihat Dasar Hukum
          </button>

          {/* Modal Dasar Hukum */}
          {showDasarHukum && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDasarHukum(false)}>
              <div className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-[#1E3A5F]">Dasar Hukum PPID</h2>
                  <button onClick={() => setShowDasarHukum(false)} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="font-bold text-lg text-[#1E3A5F] mb-3">Undang Undang Republik Indonesia</h3>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full mt-2 shrink-0"></span>
                        <span>Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full mt-2 shrink-0"></span>
                        <span>Undang-Undang Nomor 25 Tahun 2009 tentang Pelayanan Publik</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full mt-2 shrink-0"></span>
                        <span>Undang-Undang Nomor 6 Tahun 2014 tentang Desa</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1E3A5F] mb-3">Peraturan Pemerintah</h3>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full mt-2 shrink-0"></span>
                        <span>Peraturan Pemerintah Nomor 61 Tahun 2010 Tentang Pelaksanaan Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1E3A5F] mb-3">Peraturan Komisi Informasi</h3>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full mt-2 shrink-0"></span>
                        <span>Peraturan Komisi Informasi Pusat Republik Indonesia Nomor 1 Tahun 2010 tentang Standar Layanan Informasi Publik</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full mt-2 shrink-0"></span>
                        <span>Peraturan Komisi Informasi Pusat Republik Indonesia Nomor 1 Tahun 2013 tentang Prosedur Penyelesaian Sengketa Informasi Publik</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full mt-2 shrink-0"></span>
                        <span>Peraturan Komisi Informasi Pusat Republik Indonesia Nomor 1 Tahun 2017 tentang Pengklasifikasian Informasi Publik</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full mt-2 shrink-0"></span>
                        <span>Peraturan Komisi Informasi Pusat Republik Indonesia Nomor 1 Tahun 2018 tentang Standar Layanan Informasi Publik Desa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full mt-2 shrink-0"></span>
                        <span>Peraturan Komisi Informasi Pusat Republik Indonesia Nomor 1 Tahun 2021 tentang Standar Layanan Informasi Publik</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1E3A5F] mb-3">Peraturan Menteri Dalam Negeri</h3>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1E3A5F] rounded-full mt-2 shrink-0"></span>
                        <span>Peraturan Pemerintah Nomor 61 Tahun 2010 Tentang Pelaksanaan Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Jenis Informasi Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-3">Jenis Informasi Publik</h2>
            <p className="text-gray-600 text-base">Informasi publik yang wajib disediakan dan diumumkan secara berkala</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#1E3A5F] text-lg mb-2">
                Informasi Berkala
              </h3>
              <p className="text-sm text-gray-600">
                Informasi yang wajib disediakan dan diumumkan secara berkala
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#1E3A5F] text-lg mb-2">
                Informasi Serta Merta
              </h3>
              <p className="text-sm text-gray-600">
                Informasi yang dapat mengancam hajat hidup orang banyak dan ketertiban umum
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#1E3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#1E3A5F] text-lg mb-2">
                Informasi Setiap Saat
              </h3>
              <p className="text-sm text-gray-600">
                Informasi yang wajib tersedia setiap saat dan dapat diakses publik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Informasi Publik Terbaru */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-3">Informasi Publik Terbaru</h2>
            <p className="text-gray-600 text-base">Dokumen dan informasi terbaru yang dipublikasikan</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-base">
              Belum ada informasi PPID yang dipublikasikan
            </p>
          </div>
        </div>
      </section>

      {/* Ajukan Permohonan */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-4">
            Ajukan Permohonan Informasi
          </h2>
          <p className="text-gray-600 text-base mb-8">
            Anda dapat mengajukan permohonan informasi publik sesuai dengan ketentuan yang berlaku
          </p>
          <button className="px-8 py-3 bg-[#1E3A5F] text-white rounded-lg font-medium hover:bg-[#2E5C8A] transition-colors">
            Ajukan Permohonan
          </button>
        </div>
      </section>
    </div>
  );
};

export default PPIDPage;

