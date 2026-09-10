import React from 'react';
import { PageRoute } from '../types';
import { RESTAURANT_NAME, MEAL_SHARING_POLICY } from '../lib/menu-data';
import { KeralaLampIcon, BananaLeafMotif } from './KeralaMotifs';
import { Clock, Phone, MapPin, AlertTriangle, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1D12] text-[#F3EDE3] border-t-2 border-[#C59B4E]/60 pt-12 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background motif accent */}
      <div className="absolute -bottom-10 -right-10 w-64 h-64 text-[#C59B4E]/5 pointer-events-none">
        <BananaLeafMotif className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Prominent Mandatory Sharing Warning Strip in Footer */}
        <div className="mb-10 p-4 rounded-xl bg-gradient-to-r from-[#823214] via-[#5C220E] to-[#823214] border border-[#DFBA6F]/40 shadow-md text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#DFBA6F] shrink-0" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white">
              Restaurant Dining Notice:
            </span>
            <span className="text-sm sm:text-base font-black text-[#F3DCA0] bg-black/30 px-3 py-1 rounded-md border border-[#DFBA6F]/30">
              {MEAL_SHARING_POLICY}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-[#F3EDE3]/80 max-w-xl mx-auto">
            Each meal and pothichoru is curated as an individual portion with fresh accompaniments. We appreciate your gracious support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1B432A] p-1.5 border border-[#C59B4E]/40 flex items-center justify-center">
                <KeralaLampIcon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-lg text-white leading-tight">
                {RESTAURANT_NAME}
              </h3>
            </div>
            <p className="text-xs text-[#F3EDE3]/70 leading-relaxed">
              Serving the authentic heritage tastes of Kerala with uncompromised love, wood-fire preparation, cold-pressed coconut oil and fresh spices.
            </p>
            <div className="pt-2 text-xs text-[#DFBA6F] font-semibold">
              ⭐ 150+ Authentic Kerala Specialties
            </div>
          </div>

          {/* Quick Menu Sections */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#DFBA6F] uppercase tracking-wider mb-3">
              Menu Sections
            </h4>
            <ul className="space-y-2 text-xs text-[#F3EDE3]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('specials')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Spoons Specials & Meals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('biriyani')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Biriyani & Kizhi Specialties
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('mains')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Curries & Traditional Mains
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('rice-noodles')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  Rice, Noodles & Rolls
                </button>
              </li>
            </ul>
          </div>

          {/* Timings */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#DFBA6F] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Service Timings
            </h4>
            <div className="space-y-2 text-xs text-[#F3EDE3]/80 leading-relaxed">
              <div>
                <span className="font-bold text-white block">Lunch & Pothichoru:</span>
                <span>11:30 AM – 04:00 PM</span>
              </div>
              <div>
                <span className="font-bold text-white block">Dinner, Biriyani & Parottas:</span>
                <span>06:30 PM – 11:30 PM</span>
              </div>
              <div className="pt-1 text-[11px] text-[#DFBA6F]/90">
                Open 7 Days a Week
              </div>
            </div>
          </div>

          {/* Contact & Policy */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#DFBA6F] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Dine-In & Counter
            </h4>
            <div className="space-y-2 text-xs text-[#F3EDE3]/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#DFBA6F] mt-0.5" />
                <span>Authentic Kerala Restaurant Dining Hall & Takeaway Counter</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0 text-[#DFBA6F]" />
                <span>Table reservations & Pothichoru parcel counter</span>
              </p>
              <div className="pt-2">
                <span className="inline-block text-[11px] font-bold text-[#F3DCA0] bg-[#823214]/60 px-2.5 py-1 rounded border border-[#DFBA6F]/30">
                  {MEAL_SHARING_POLICY}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F3EDE3]/60">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_NAME}. All rights reserved. • Strictly {MEAL_SHARING_POLICY}.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#DFBA6F] hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
