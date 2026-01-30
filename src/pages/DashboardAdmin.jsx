import { useState } from 'react';
import { Link } from 'react-router-dom';

const today = new Date().toLocaleDateString('id-ID', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

const DashboardAdmin = () => {
  // Contoh data statis, ganti dengan data dinamis jika sudah ada API
  const [stats] = useState({
    produk: 5,
    galeri: 2,
    sdgs: 0,
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between py-8 px-6">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-8">Admin Panel<br /><span className="text-base font-normal text-gray-500">Pekon Balak</span></h2>
          <nav className="flex flex-col gap-3 text-gray-700 font-medium">
            <Link to="/dashboard" className="flex items-center gap-2 py-2 px-3 rounded-lg bg-accent text-primary">Dashboard</Link>
            <Link to="/dashboard/products" className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent hover:text-primary">Produk Belanja</Link>
            <Link to="/dashboard/galeri" className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent hover:text-primary">Galeri</Link>
            <Link to="/dashboard/infografis" className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent hover:text-primary">Infografis</Link>
            <Link to="/dashboard/sdgs" className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent hover:text-primary">SDGs</Link>
          </nav>
        </div>
        <div className="mt-8 border-t pt-6">
          <div className="text-sm text-gray-700 mb-2">Admin<br /><span className="text-gray-500">admin@webdesa.com</span></div>
          <Link to="/login" className="flex items-center gap-2 text-red-600 font-semibold hover:underline">Keluar</Link>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-10 py-6 border-b bg-white">
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
          <span className="text-gray-500 text-sm">{today}</span>
        </header>
        {/* Content */}
        <main className="flex-1 p-10">
          <p className="mb-8 text-lg text-gray-700">Selamat datang di Admin Panel Pekon Balak</p>
          {/* Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-2xl font-bold text-primary">{stats.produk}</div>
              <div className="text-gray-500">Total Produk</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-2xl font-bold text-primary">{stats.galeri}</div>
              <div className="text-gray-500">Total Galeri</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-2xl font-bold text-primary">{stats.sdgs}</div>
              <div className="text-gray-500">Total SDGs</div>
            </div>
          </div>
          {/* Aksi Cepat */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center hover:bg-accent cursor-pointer">
              <div className="font-semibold mb-1 text-primary">Tambah Produk</div>
              <div className="text-gray-500 text-sm">Buat produk belanja baru</div>
            </div>
            <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center hover:bg-accent cursor-pointer">
              <div className="font-semibold mb-1 text-primary">Tambah Galeri</div>
              <div className="text-gray-500 text-sm">Upload foto kegiatan</div>
            </div>
            <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center hover:bg-accent cursor-pointer">
              <div className="font-semibold mb-1 text-primary">Tambah SDGs</div>
              <div className="text-gray-500 text-sm">Input data SDGs baru</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
