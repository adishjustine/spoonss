import React, { useState, useMemo } from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS, MEAL_SHARING_POLICY } from '../lib/menu-data';
import { MenuItemCard } from './MenuItemCard';
import { Search, X, Utensils } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderMap: Record<string, number>;
  onAdd: (item: MenuItem) => void;
  onRemove: (item: MenuItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  orderMap,
  onAdd,
  onRemove,
}) => {
  const [query, setQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesText =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase()));

      if (!matchesText) return false;

      if (selectedDiet === 'all') return true;
      if (selectedDiet === 'veg') return item.diet === 'veg';
      if (selectedDiet === 'non-veg') return item.diet === 'non-veg';
      if (selectedDiet === 'seafood') return item.diet === 'seafood';
      if (selectedDiet === 'egg') return item.diet === 'egg';
      if (selectedDiet === 'special') return item.isChefSpecial;

      return true;
    });
  }, [query, selectedDiet]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 bg-[#0B1D12]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-start justify-center p-3 sm:p-6 mt-12 sm:mt-16">
        <div className="relative w-full max-w-3xl rounded-2xl bg-[#FAF7F2] border border-[#C59B4E]/40 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
          {/* Header with Search Input */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#E7DDD0]">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#1B432A]/10 text-[#1B432A] flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#1B432A]">
                    Search Menu
                  </h3>
                  <p className="text-[11px] text-[#8C7A6B]">
                    Find any of our 150+ authentic dishes & roasts
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-[#F3EDE3] text-[#6B5E55] flex items-center justify-center transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input bar */}
            <div className="relative">
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try 'Pothichoru', 'Kizhi Biriyani', 'Kappa Beef', 'Prawns Roast'..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#FAF7F2] border border-[#C59B4E]/50 text-sm font-medium text-[#261E1A] placeholder:text-[#8C7A6B] focus:outline-hidden focus:ring-2 focus:ring-[#1B432A] focus:border-transparent transition-all shadow-inner"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8C7A6B]" />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3.5 top-3.5 text-[#8C7A6B] hover:text-[#261E1A]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Badges */}
            <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'veg', label: 'Vegetarian' },
                { id: 'non-veg', label: 'Non-Veg' },
                { id: 'seafood', label: 'Seafood' },
                { id: 'egg', label: 'Egg Dishes' },
                { id: 'special', label: 'Chef Specials' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedDiet(tab.id)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap font-bold text-xs transition-all ${
                    selectedDiet === tab.id
                      ? 'bg-[#1B432A] text-white'
                      : 'bg-[#F3EDE3] text-[#6B5E55] hover:bg-[#E7DDD0]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dining Policy reminder in search */}
          <div className="bg-[#823214]/10 border-b border-[#823214]/20 px-4 py-1.5 text-xs text-[#823214] font-bold flex items-center justify-between">
            <span>Dining Reminder:</span>
            <span className="underline decoration-[#C59B4E]">{MEAL_SHARING_POLICY}</span>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 text-[#8C7A6B]">
                <Utensils className="w-10 h-10 mx-auto text-[#C59B4E]/60 mb-2" />
                <p className="font-display font-semibold text-base text-[#1B432A]">
                  No dishes matched "{query}"
                </p>
                <p className="text-xs text-[#6B5E55] mt-1">
                  Try searching for ingredients like "fish", "chicken", "biriyani", or "porotta".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    quantity={orderMap[item.id] || 0}
                    onAdd={onAdd}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer count */}
          <div className="p-3 bg-[#F3EDE3] border-t border-[#E7DDD0] text-center text-xs text-[#6B5E55]">
            Showing <strong className="text-[#1B432A]">{filteredItems.length}</strong> delicious items
          </div>
        </div>
      </div>
    </div>
  );
};
