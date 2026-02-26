import { useEffect, useState } from 'react';
import { Menu, Shield } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  show: boolean;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ show, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
  };

  const handleAdminClick = () => {
    navigate({ to: '/admin' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 ${
        show ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled 
          ? 'shadow-2xl' 
          : 'shadow-xl'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
      
      <div className="container mx-auto px-3 sm:px-4 relative">
        <div className="flex items-center justify-between h-20 md:h-24 gap-2 sm:gap-4">
          {/* Logo and Branding */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-6 shrink-0 min-w-0">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2 sm:gap-3 md:gap-6 group min-w-0"
            >
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                <img
                  src="/assets/IMG_2219.jpeg"
                  alt="Kingston Customizations Logo"
                  className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-black text-white tracking-tight leading-none drop-shadow-lg group-hover:text-yellow-400 transition-colors duration-300 truncate">
                  Kingston Customizations
                </div>
                <div className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-yellow-400 tracking-wider uppercase truncate">
                  Professional Builders
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="relative px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-white font-bold transition-all duration-300 group overflow-hidden rounded-md"
                  aria-label="Navigation Menu"
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-slate-900 transition-colors duration-300">
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 drop-shadow-md" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md shadow-lg" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 bg-slate-900 border-slate-700 shadow-2xl"
              >
                <DropdownMenuItem
                  onClick={() => handleNavClick('hero')}
                  className="text-white hover:bg-yellow-400 hover:text-slate-900 cursor-pointer font-semibold text-base py-3 focus:bg-yellow-400 focus:text-slate-900"
                >
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavClick('services')}
                  className="text-white hover:bg-yellow-400 hover:text-slate-900 cursor-pointer font-semibold text-base py-3 focus:bg-yellow-400 focus:text-slate-900"
                >
                  Services
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavClick('gallery')}
                  className="text-white hover:bg-yellow-400 hover:text-slate-900 cursor-pointer font-semibold text-base py-3 focus:bg-yellow-400 focus:text-slate-900"
                >
                  Our Work
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavClick('about')}
                  className="text-white hover:bg-yellow-400 hover:text-slate-900 cursor-pointer font-semibold text-base py-3 focus:bg-yellow-400 focus:text-slate-900"
                >
                  About Us
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavClick('contact')}
                  className="text-white hover:bg-yellow-400 hover:text-slate-900 cursor-pointer font-semibold text-base py-3 focus:bg-yellow-400 focus:text-slate-900"
                >
                  Contact
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem
                  onClick={handleAdminClick}
                  className="text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 cursor-pointer font-bold text-base py-3 focus:bg-yellow-400 focus:text-slate-900"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Panel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
