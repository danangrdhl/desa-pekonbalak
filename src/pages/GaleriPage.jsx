import { useState } from 'react';

const GaleriPage = () => {
  const galeriItems = [
    { id: 1, title: 'Kegiatan 1', image: '/images/hero.jpg' },
    { id: 2, title: 'Kegiatan 2', image: '/images/sd.jpeg' },
    { id: 3, title: 'Kegiatan 3', image: '/images/gotongroyong.jpeg' },
    { id: 4, title: 'Kegiatan 4', image: '/images/sd2.jpeg' },
    { id: 5, title: 'Kegiatan 5', image: '/images/posyandu.jpeg' },
    { id: 6, title: 'Kegiatan 6', image: '/images/smp.jpeg' },
    { id: 7, title: 'Kegiatan 7', image: '/images/jaranan.jpeg' },
    { id: 8, title: 'Kegiatan 8', image: '/images/umkm3.jpeg' },
    { id: 9, title: 'Kegiatan 9', image: '/images/umkm1.jpeg' },
    { id: 10, title: 'Kegiatan 10', image: '/images/musrenbang.jpeg' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-[#1E3A5F]">Home</a>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E3A5F] font-medium">Galeri</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-2">Galeri Pekon Balak</h1>
          <p className="text-gray-600 text-base md:text-lg">Dokumentasi kegiatan dan momen-momen penting di Pekon Balak</p>
        </div>
      </div>

      {/* Loading State */}
      {/* Removed - using static data now */}

      {/* Error State */}
      {/* Removed - using static data now */}

      {/* Gallery Grid Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galeriItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                {/* Gambar */}
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/images/galeri-dummy.jpg';
                      e.target.onerror = null;
                    }}
                  />
                </div>

                {/* Konten */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-[#1E3A5F] group-hover:text-[#2E5C8A] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GaleriPage;
