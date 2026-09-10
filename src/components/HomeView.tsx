import React from 'react';
import { PageRoute, MenuItem } from '../types';
import { RESTAURANT_NAME, RESTAURANT_TAGLINE, SECTIONS, MEAL_SHARING_POLICY, MENU_ITEMS } from '../lib/menu-data';
import { KeralaLampIcon, BananaLeafMotif, KasavuDivider, SpiceStarIcon } from './KeralaMotifs';
import { NoticeBanner } from './NoticeBanner';
import { ArrowRight, Utensils, Sparkles, Clock, Flame, ShieldAlert, Compass } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenOrderPad: () => void;
  onOpenSearch: () => void;
  onAdd: (item: MenuItem) => void;
  orderMap: Record<string, number>;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenSearch,
}) => {
  // Highlighted signature items from the actual menu
  const signatureItems = MENU_ITEMS.filter((i) => i.isChefSpecial).slice(0, 6);

  return (
    <div className="bg-[#FAF7F2]">
      {/* Grand Kerala Heritage Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1D12] via-[#132E1C] to-[#1B432A] text-white pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#C59B4E]/40">
        {/* Subtle patterned backdrop */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#DFBA6F_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute -top-16 -right-16 w-96 h-96 text-[#C59B4E]/10 pointer-events-none">
          <BananaLeafMotif className="w-full h-full" />
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 text-[#C59B4E]/10 pointer-events-none">
          <BananaLeafMotif className="w-full h-full" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Traditional Kerala Crest */}
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-[#1B432A] to-[#0B1D12] border border-[#C59B4E]/60 shadow-xl mb-6">
            <KeralaLampIcon className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="flex items-center justify-center gap-2 text-[#DFBA6F] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-3">
            <SpiceStarIcon className="w-4 h-4 text-[#DFBA6F]" />
            <span>God's Own Country • Traditional Culinary Heritage</span>
            <SpiceStarIcon className="w-4 h-4 text-[#DFBA6F]" />
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#FFFDF9] tracking-tight leading-[1.08]">
            {RESTAURANT_NAME}
          </h1>

          <p className="mt-4 font-sans text-base sm:text-xl text-[#F3EDE3]/90 max-w-2xl mx-auto font-light leading-relaxed">
            {RESTAURANT_TAGLINE}. Authentic banana-leaf pothichoru, aromatic kizhi biriyanis, coastal seafood roasts, and flaky Malabar parottas.
          </p>

          {/* Prominent policy highlight on Home Hero */}
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#823214]/90 border border-[#DFBA6F]/50 shadow-lg text-xs sm:text-sm font-bold text-white max-w-md mx-auto">
            <ShieldAlert className="w-4 h-4 text-[#DFBA6F] shrink-0" />
            <span>Important Dining Rule: <strong className="underline decoration-[#DFBA6F] decoration-2 text-[#F3DCA0]">{MEAL_SHARING_POLICY}</strong></span>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              id="hero-btn-specials"
              onClick={() => onNavigate('specials')}
              className="px-6 py-3.5 rounded-full bg-[#C59B4E] hover:bg-[#DFBA6F] text-[#0B1D12] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Spoons Specials</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              id="hero-btn-search"
              onClick={onOpenSearch}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#DFBA6F]/40 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Search 150+ Menu Items</span>
            </button>
          </div>

          {/* Quick stats / highlights */}
          <div className="mt-12 pt-8 border-t border-[#C59B4E]/25 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="block font-display font-black text-2xl sm:text-3xl text-[#DFBA6F]">150+</span>
              <span className="text-xs text-[#F3EDE3]/70 font-medium">Authentic Dishes</span>
            </div>
            <div>
              <span className="block font-display font-black text-2xl sm:text-3xl text-[#DFBA6F]">100%</span>
              <span className="text-xs text-[#F3EDE3]/70 font-medium">Cold-Pressed Coconut Oil</span>
            </div>
            <div>
              <span className="block font-display font-black text-2xl sm:text-3xl text-[#DFBA6F]">Fresh</span>
              <span className="text-xs text-[#F3EDE3]/70 font-medium">Clay Chatti Cooking</span>
            </div>
            <div>
              <span className="block font-display font-black text-2xl sm:text-3xl text-[#DFBA6F]">Daily</span>
              <span className="text-xs text-[#F3EDE3]/70 font-medium">Fresh Catch Seafood</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Notice Strip */}
      <NoticeBanner variant="banner" />

      {/* Main 4 Menu Section Cards (Categorized Navigation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#A8421A] flex items-center justify-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            Curated Kerala Dining
          </span>
          <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-[#1B432A] tracking-tight">
            Explore Our Four Menu Sections
          </h2>
          <p className="mt-2 text-sm text-[#6B5E55] leading-relaxed">
            Select a menu section below to browse detailed dishes with traditional preparation notes and prices. Note: {MEAL_SHARING_POLICY}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SECTIONS.map((section, idx) => (
            <div
              key={section.id}
              id={`card-section-${section.id}`}
              onClick={() => onNavigate(section.id)}
              className="group relative rounded-2xl bg-white border border-[#E7DDD0] hover:border-[#C59B4E] p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Top gradient accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
                style={{ backgroundColor: section.bgAccent }}
              />

              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-[#823214] bg-[#F3EDE3] px-3 py-1 rounded-full border border-[#C59B4E]/30">
                    Section 0{idx + 1}
                  </span>
                  <span className="text-xs text-[#8C7A6B] font-semibold flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5 text-[#C59B4E]" />
                    {section.categories.length} Categories
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1B432A] group-hover:text-[#823214] transition-colors leading-snug">
                  {section.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-[#6B5E55] leading-relaxed">
                  {section.description}
                </p>

                {/* Categories preview chips */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {section.categories.map((catName) => (
                    <span
                      key={catName}
                      className="text-[11px] font-semibold text-[#261E1A] bg-[#FAF7F2] border border-[#E7DDD0] px-2.5 py-1 rounded-md group-hover:border-[#C59B4E]/50 transition-colors"
                    >
                      {catName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-8 pt-4 border-t border-[#E7DDD0]/80 flex items-center justify-between">
                <span className="text-xs font-bold text-[#823214] group-hover:text-[#C25121] flex items-center gap-1.5">
                  <span>Open Section Menu</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-semibold text-[#8C7A6B]">
                  {MEAL_SHARING_POLICY}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kasavu Divider */}
      <div className="max-w-4xl mx-auto px-4">
        <KasavuDivider />
      </div>

      {/* Chef's Signature Highlights Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#A8421A] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B4E]" />
              Signature Recommendations
            </span>
            <h2 className="mt-1 font-display font-extrabold text-2xl sm:text-3xl text-[#1B432A]">
              Chef's Special Kerala Delicacies
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E55] mt-1">
              Hand-picked traditional recipes celebrating fresh seafood, Malabar spices & plantain leaves.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('specials')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#823214] hover:text-[#C25121] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>View All Specials</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {signatureItems.map((dish) => (
            <div
              key={dish.id}
              className="rounded-xl border border-[#E7DDD0] bg-white p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#A8421A] bg-[#823214]/10 px-2 py-0.5 rounded">
                    {dish.category}
                  </span>
                  <span className="font-display font-bold text-base text-[#823214]">
                    {dish.priceDisplay}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#1B432A]">
                  {dish.name}
                </h3>
                <p className="mt-1.5 text-xs text-[#6B5E55] leading-relaxed">
                  {dish.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E7DDD0] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#8C7A6B] font-medium">
                  {dish.diet === 'veg' ? 'Pure Vegetarian' : dish.diet === 'seafood' ? 'Fresh Coastal Catch' : 'Slow Cooked Meat'}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate(dish.page)}
                  className="text-xs font-bold text-[#1B432A] hover:text-[#823214] flex items-center gap-1 cursor-pointer"
                >
                  <span>View in {dish.page}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Traditional Kerala Dining Policies & Ethos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="rounded-2xl bg-gradient-to-r from-[#1B432A] to-[#132E1C] text-white p-6 sm:p-10 border border-[#C59B4E]/50 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 text-[#C59B4E]/10 pointer-events-none">
            <BananaLeafMotif className="w-full h-full" />
          </div>

          <div className="relative max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#DFBA6F] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Spoons Dining Ethos & Rules
            </span>

            <h3 className="mt-2 font-display font-extrabold text-2xl sm:text-3xl text-[#FFFDF9]">
              The Sacred Banana Leaf Tradition
            </h3>

            <p className="mt-3 text-sm text-[#F3EDE3]/85 leading-relaxed">
              In the traditional kitchens of Kerala, food is not merely prepared—it is a sacred hospitality ritual. Our Pothichoru and Kizhi preparations are wrapped hot in wilted plantain leaves so the essential natural oils of the leaf infuse deep into the rice, curries, and roasts.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-[#823214]/80 border border-[#DFBA6F]/40">
              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 text-[#DFBA6F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">
                    Policy Announcement: {MEAL_SHARING_POLICY}
                  </h4>
                  <p className="mt-1 text-xs text-[#F3EDE3]/90 leading-relaxed">
                    To maintain our authentic unlimited sambar, moru and side-serving hospitality without compromise, each full Meal and Pothichoru is priced and plated strictly for a single diner. We appreciate your kind understanding.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#DFBA6F]">
              <span>✓ Wood-fire slow dum cooking</span>
              <span>•</span>
              <span>✓ Pure cold-pressed coconut oil</span>
              <span>•</span>
              <span>✓ Freshly ground Malabar spices</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
