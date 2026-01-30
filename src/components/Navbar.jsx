import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Navbar background - solid for better readability
  const getNavbarBg = () => {
    if (!isHomePage) return 'bg-[#1E3A5F] shadow-md';
    return isScrolled ? 'bg-[#1E3A5F] shadow-md' : 'bg-[#1E3A5F]/90 shadow-sm';
  };

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/profil-desa', label: 'Profil Desa' },
    { path: '/infografis', label: 'Infografis' },
    { path: '/listing', label: 'Peta Desa' },
    { path: '/galeri', label: 'Galeri' },
    { path: '/belanja', label: 'UMKM' },
    { path: '/ppid', label: 'PPID' },
  ];

  return (
    <>
      {/* Navbar Container */}
      <div className="fixed top-0 inset-x-0 z-50">
        <nav className={`text-white font-poppins transition-all duration-300 ${getNavbarBg()}`}>
          <div className="max-w-7xl mx-auto">
          <div className="px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo + Nama di Kiri */}
              <Link to="/" className="flex items-center gap-3 shrink-0 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src="/images/Logo.png" 
                    alt="Logo Desa"
                    className="relative h-14 w-14 object-contain transform group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div className="leading-tight">
                  <div className="text-lg md:text-xl font-bold">Pekon Balak</div>
                  <div className="text-sm md:text-base text-white/90">Kabupaten Tanggamus</div>
                </div>
              </Link>

              {/* Menu Desktop (md+) di Kanan */}
              <ul className="hidden md:flex items-center gap-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path || 
                    (item.path.includes('#') && location.pathname + location.hash === item.path);
                  
                  return (
                    <li key={item.path}>
                      <Link 
                        to={item.path} 
                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 block ${
                          isActive 
                            ? 'text-white' 
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {item.label}
                        
                        {/* Bottom border for active state */}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Tombol Hamburger (mobile) */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded hover:bg-white/10 transition-colors duration-200 focus:outline-none"
                aria-label="Toggle menu"
              >
                {/* ikon hamburger */}
                <svg 
                  className={`h-6 w-6 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0 hidden' : 'rotate-0 opacity-100 block'}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none"
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                
                {/* ikon close */}
                <svg 
                  className={`h-6 w-6 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100 block' : '-rotate-90 opacity-0 hidden'}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Mobile dengan Glassmorphism */}
            <div className={`overflow-hidden transition-all duration-500 ${
              isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } md:hidden`}>
              <div className="border-t border-white/20 mt-2">
                <ul className="flex flex-col text-sm font-medium py-3 space-y-1">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path || 
                      (item.path.includes('#') && location.pathname + location.hash === item.path);
                    
                    return (
                      <li key={item.path}>
                        <Link 
                          to={item.path} 
                          onClick={closeMobileMenu} 
                          className={`block py-3 px-4 transition-colors duration-200 ${
                            isActive 
                              ? 'text-white bg-white/10' 
                              : 'text-white/80 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          </div>
        </nav>
      </div>

      {/* Spacer agar konten tidak tertutup navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
