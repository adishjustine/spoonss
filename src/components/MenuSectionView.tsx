import React, { useState, useMemo } from 'react';
import { PageRoute, MenuItem } from '../types';
import { SECTIONS, getCategoriesByPage, MEAL_SHARING_POLICY } from '../lib/menu-data';
import { MenuItemCard } from './MenuItemCard';
import { KasavuDivider, BananaLeafMotif, SpiceStarIcon } from './KeralaMotifs';
import { NoticeBanner } from './NoticeBanner';
import { Filter, Search, ArrowRight, ArrowLeft } from 'lucide-react';

interface MenuSectionViewProps {
  page: 'specials' | 'biriyani' | 'mains' | 'rice-noodles';
  orderMap: Record<string, number>;
  onAdd: (item: MenuItem) => void;
  onRemove: (item: MenuItem) => void;
  onNavigate: (route: PageRoute) => void;
}

export const MenuSectionView: React.FC<MenuSectionViewProps> = ({
  page,
  orderMap,
  onAdd,
  onRemove,
  onNavigate,
}) => {
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  const currentSection = SECTIONS.find((s) => s.id === page) || SECTIONS[0];
  const allCategories = useMemo(() => getCategoriesByPage(page), [page]);

  // Find previous & next sections for smooth bottom navigation
  const currentIndex = SECTIONS.findIndex((s) => s.id === page);
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

  // Filter categories and items
  const filteredCategories = useMemo(() => {
    return allCategories.map((cat) => {
      const items = cat.items.filter((item) => {
        // Text match
        if (localSearch) {
          const match =
            item.name.toLowerCase().includes(localSearch.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(localSearch.toLowerCase()));
          if (!match) return false;
        }

        // Diet filter
        if (selectedDiet === 'all') return true;
        if (selectedDiet === 'veg') return item.diet === 'veg';
        if (selectedDiet === 'non-veg') return item.diet === 'non-veg';
        if (selectedDiet === 'seafood') return item.diet === 'seafood';
        if (selectedDiet === 'egg') return item.diet === 'egg';
        if (selectedDiet === 'special') return item.isChefSpecial;

        return true;
      });

      return {
        ...cat,
        items,
      };
    }).filter((cat) => cat.items.length > 0);
  }, [allCategories, selectedDiet, localSearch]);

  const scrollToCategory = (catId: string) => {
    const el = document.getElementById(`section-${catId}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-20">
      {/* Top Section Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#132E1C] via-[#1B432A] to-[#132E1C] text-white pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#C59B4E]/40">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#DFBA6F_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-12 -top-12 w-64 h-64 text-[#C59B4E]/15 pointer-events-none">
          <BananaLeafMotif className="w-full h-full" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb & sharing policy badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#DFBA6F]/90">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-white">{currentSection.title}</span>
            </div>

            {/* Prominent policy tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#823214]/80 border border-[#DFBA6F]/40 text-xs text-[#FAF7F2] font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#DC662E] animate-pulse" />
              <span>{MEAL_SHARING_POLICY}</span>
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[#DFBA6F] text-xs uppercase font-extrabold tracking-widest mb-1.5">
              <SpiceStarIcon className="w-3.5 h-3.5" />
              <span>Spoons Kerala Special Menu</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#FFFDF9] tracking-tight leading-tight">
              {currentSection.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#F3EDE3]/85 max-w-2xl leading-relaxed">
              {currentSection.description}
            </p>
          </div>

          {/* Quick Category Jump Navigation (Sticky pill bar) */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[#DFBA6F] uppercase tracking-wider shrink-0 pr-1">
              Categories:
            </span>
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToCategory(cat.id)}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#DFBA6F]/30 text-xs font-semibold text-white whitespace-nowrap transition-colors"
              >
                {cat.title} ({cat.items.length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Live Search Toolbar */}
      <div className="sticky top-18 sm:top-20 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DDD0] py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Dietary filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
              <span className="text-[11px] font-bold text-[#6B5E55] uppercase tracking-wider flex items-center gap-1 pr-1">
                <Filter className="w-3 h-3 text-[#A67C33]" />
                Filter:
              </span>
              {[
                { id: 'all', label: 'All Dishes' },
                { id: 'veg', label: 'Veg' },
                { id: 'non-veg', label: 'Non-Veg' },
                { id: 'seafood', label: 'Seafood' },
                { id: 'egg', label: 'Egg' },
                { id: 'special', label: 'Chef Specials' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setSelectedDiet(btn.id)}
                  className={`px-3 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition-all ${
                    selectedDiet === btn.id
                      ? 'bg-[#1B432A] text-white shadow-xs'
                      : 'bg-white border border-[#E7DDD0] text-[#6B5E55] hover:bg-[#F3EDE3]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Quick in-page search */}
            <div className="relative sm:w-64">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Filter these items..."
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white border border-[#E7DDD0] text-xs font-medium text-[#261E1A] placeholder:text-[#8C7A6B] focus:ring-1 focus:ring-[#1B432A] focus:outline-hidden"
              />
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-[#8C7A6B]" />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => setLocalSearch('')}
                  className="absolute right-2.5 top-1.5 text-xs text-[#8C7A6B] hover:text-[#261E1A]"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-12 sm:space-y-16">
        {/* Notice Card for Dining Policy */}
        <NoticeBanner variant="card" className="border-[#C59B4E]/40" />

        {/* Grouped Category Sections */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E7DDD0] p-8">
            <p className="font-display text-lg font-bold text-[#1B432A]">
              No dishes found matching your current filters
            </p>
            <p className="text-xs text-[#6B5E55] mt-1">
              Try clearing the search query or switching to "All Dishes".
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDiet('all');
                setLocalSearch('');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#1B432A] text-white text-xs font-bold shadow-xs hover:bg-[#265C3B] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <section
              key={category.id}
              id={`section-${category.id}`}
              className="scroll-mt-36"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rotate-45 bg-[#C59B4E]" />
                  <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-[#1B432A] tracking-tight">
                    {category.title}
                  </h2>
                  <span className="text-xs font-bold text-[#823214] bg-[#F3EDE3] px-2.5 py-0.5 rounded-full border border-[#C59B4E]/30">
                    {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Subtle policy reminder badge */}
                <span className="hidden sm:inline-block text-[11px] font-bold text-[#823214] uppercase tracking-wider bg-[#823214]/10 px-2.5 py-1 rounded-full">
                  {MEAL_SHARING_POLICY}
                </span>
              </div>

              {/* Items Grid with Dotted Leader design */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {category.items.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    quantity={orderMap[item.id] || 0}
                    onAdd={onAdd}
                    onRemove={onRemove}
                  />
                ))}
              </div>

              {/* Decorative Kerala Divider between categories */}
              <KasavuDivider className="mt-10 sm:mt-12" />
            </section>
          ))
        )}

        {/* Section Navigation Footer (Next/Previous Section Links) */}
        <div className="pt-6 border-t border-[#E7DDD0] flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevSection ? (
            <button
              type="button"
              onClick={() => {
                onNavigate(prevSection.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#E7DDD0] hover:border-[#C59B4E] text-[#1B432A] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-[#C59B4E]" />
              <div className="text-left">
                <span className="block text-[10px] text-[#8C7A6B] uppercase font-semibold">Previous</span>
                <span>{prevSection.title}</span>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextSection ? (
            <button
              type="button"
              onClick={() => {
                onNavigate(nextSection.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#1B432A] hover:bg-[#265C3B] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <div className="text-right">
                <span className="block text-[10px] text-[#DFBA6F] uppercase font-semibold">Next Section</span>
                <span>{nextSection.title}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#DFBA6F]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#823214] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Back to Home Overview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
