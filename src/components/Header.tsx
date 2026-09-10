import React, { useState } from 'react';
import { PageRoute, OrderItem } from '../types';
import { RESTAURANT_NAME, MEAL_SHARING_POLICY } from '../lib/menu-data';
import { KeralaLampIcon } from './KeralaMotifs';
import { Menu as MenuIcon, X, ShoppingBag, Search, UtensilsCrossed } from 'lucide-react';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (route: PageRoute) => void;
  orderItems: OrderItem[];
  onOpenOrderPad: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  orderItems,
  onOpenOrderPad,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalOrderCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const navItems: { route: PageRoute; label: string; short: string }[] = [
    { route: 'home', label: 'Home', short: 'Home' },
    { route: 'specials', label: 'Spoons Specials', short: 'Specials' },
    { route: 'biriyani', label: 'Biriyani & Kizhi', short: 'Biriyani' },
    { route: 'mains', label: 'Curries & Mains', short: 'Curries' },
    { route: 'rice-noodles', label: 'Rice, Noodles & Rolls', short: 'Rice & Rolls' },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DDD0]/80 shadow-xs">
      {/* Topmost notice bar for sharing rule */}
      <div className="bg-[#132E1C] text-[#DFBA6F] py-1.5 px-3 border-b border-[#C59B4E]/30 text-center text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC662E] animate-ping" />
            <span className="font-bold tracking-wide uppercase text-[11px] text-white">
              Restaurant Policy:
            </span>
            <span className="text-[#F3DCA0] font-bold underline decoration-[#DC662E]/70 decoration-2 underline-offset-2">
              {MEAL_SHARING_POLICY}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[#FAF7F2]/70 text-[11px]">
            <span>Authentic Kerala Cuisine</span>
            <span>•</span>
            <span>Dine-in & Pothichoru Takeaway</span>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#1B432A] to-[#0B1D12] p-2 border border-[#C59B4E]/50 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <KeralaLampIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <span className="block font-display font-black text-lg sm:text-xl tracking-tight text-[#1B432A] group-hover:text-[#823214] transition-colors leading-none">
                {RESTAURANT_NAME}
              </span>
              <span className="block text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-[#A67C33] mt-0.5">
                Authentic Kerala Kitchen
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  id={`nav-link-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#1B432A] text-[#FFFDF9] shadow-xs ring-1 ring-[#C59B4E]/50'
                      : 'text-[#6B5E55] hover:text-[#1B432A] hover:bg-[#F3EDE3]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              id="btn-search-trigger"
              onClick={onOpenSearch}
              aria-label="Search Menu Dishes"
              className="p-2 sm:px-3 sm:py-2 rounded-full border border-[#E7DDD0] bg-white/80 hover:bg-white text-[#6B5E55] hover:text-[#1B432A] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Search className="w-4 h-4 text-[#8C7A6B]" />
              <span className="hidden sm:inline">Search Dish</span>
            </button>

            {/* Table Order Pad Trigger */}
            <button
              type="button"
              id="btn-orderpad-trigger"
              onClick={onOpenOrderPad}
              aria-label="View Selected Dishes"
              className="relative px-3 sm:px-4 py-2 rounded-full bg-[#823214] hover:bg-[#A8421A] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-[#DFBA6F]" />
              <span className="hidden xs:inline">Table Pad</span>
              {totalOrderCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#DC662E] text-white text-[11px] font-extrabold shadow-2xs">
                  {totalOrderCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-xl text-[#1B432A] hover:bg-[#F3EDE3] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7DDD0] bg-[#FAF7F2] px-4 pt-3 pb-6 shadow-xl space-y-2 animate-fadeIn">
          <div className="p-2.5 rounded-lg bg-[#823214]/10 border border-[#823214]/20 text-xs text-[#823214] font-bold flex items-center gap-2 mb-3">
            <UtensilsCrossed className="w-4 h-4 shrink-0 text-[#823214]" />
            <span>Reminder: {MEAL_SHARING_POLICY}</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#1B432A] text-white shadow-xs'
                      : 'text-[#261E1A] hover:bg-[#F3EDE3]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#DFBA6F]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
