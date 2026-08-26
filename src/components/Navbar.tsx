import { useState } from 'react';
import { NavLink as RouterNavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideTabs } from './SlideTabs';
import logoImg from '../images/Untitled design.png';

const NavLink = ({ to, label, children }: { to: string; label: string; children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <RouterNavLink 
        to={to} 
        className={`flex items-center gap-1 py-2 text-sm font-semibold transition-colors ${
          isActive ? 'text-[var(--color-primary)]' : 'text-gray-600 hover:text-[var(--color-primary)]'
        } whitespace-nowrap`}
      >
        {label}
        {children && <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </RouterNavLink>
      
      {/* Active Indicator */}
      {isActive && (
        <motion.div 
          layoutId="navbar-indicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-primary)] rounded-full"
        />
      )}

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && children && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 flex flex-col"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const userRole = localStorage.getItem('userRole');
  const userEmail = localStorage.getItem('userEmail');
  const isLoggedIn = !!(userRole || userEmail);
  const isStudent = userRole === 'student';
  const dashboardLink = isLoggedIn ? `/dashboard/${userRole || 'student'}` : '/login';

  return (
    <header className="bg-[#FFFDF5] border-b border-[#F3EAD8] sticky top-0 z-50">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 py-1 group">
              <img src={logoImg} alt="YashEdu Logo" className="h-12 sm:h-16 md:h-18 w-auto object-contain transition-all group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#D3010A] leading-none">
                  YashEdu <span className="text-[#01274C]">Academy</span>
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-widest mt-0.5">
                  Educational Institute
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isStudent && (
            <nav className="hidden md:flex items-center justify-center flex-1 px-4">
              <SlideTabs />
            </nav>
          )}

          {/* Action Buttons */}
          <div className="hidden md:flex items-center justify-end gap-4">
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <Link to={dashboardLink} className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-base font-bold rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap">
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-base font-bold rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap">
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FFFDF5] border-b border-[#F3EAD8] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
              {!isStudent && (
                <>
                  <Link to="/" className="text-gray-600 font-medium py-2 border-b border-gray-100">Home</Link>
                  <Link to="/courses" className="text-gray-600 font-medium py-2 border-b border-gray-100">Courses</Link>
                  <Link to="/blog" className="text-gray-600 font-medium py-2 border-b border-gray-100">Blogs</Link>
                  <Link to="/about" className="text-gray-600 font-medium py-2 border-b border-gray-100">About Us</Link>
                  <Link to="/contact" className="text-gray-600 font-medium py-2 border-b border-gray-100">Contact</Link>
                </>
              )}
              
              <div className="flex flex-col gap-3 mt-4">
                {isLoggedIn ? (
                  <Link to={dashboardLink} className="w-full text-center py-2 bg-[var(--color-primary)] text-white font-medium rounded-lg">Dashboard</Link>
                ) : (
                  <>
                    <Link to="/login" className="w-full text-center py-2 text-[var(--color-primary)] font-medium border border-[var(--color-primary)] rounded-lg">Login</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
