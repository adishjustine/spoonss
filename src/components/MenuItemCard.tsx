import React from 'react';
import { MenuItem } from '../types';
import { Plus, Minus, Flame, Sparkles } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  quantity?: number;
  onAdd?: (item: MenuItem) => void;
  onRemove?: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  quantity = 0,
  onAdd,
  onRemove,
}) => {
  // Diet icon and border color
  const renderDietBadge = () => {
    switch (item.diet) {
      case 'veg':
        return (
          <span
            title="Vegetarian"
            className="inline-flex items-center justify-center w-4 h-4 border border-emerald-600 rounded-xs bg-white shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
          </span>
        );
      case 'egg':
        return (
          <span
            title="Egg preparation"
            className="inline-flex items-center justify-center w-4 h-4 border border-amber-600 rounded-xs bg-white shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </span>
        );
      case 'seafood':
        return (
          <span
            title="Coastal Fresh Seafood"
            className="inline-flex items-center justify-center w-4 h-4 border border-cyan-700 rounded-xs bg-white shrink-0"
          >
            <span className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-cyan-700" />
          </span>
        );
      case 'non-veg':
      default:
        return (
          <span
            title="Non-Vegetarian"
            className="inline-flex items-center justify-center w-4 h-4 border border-red-600 rounded-xs bg-white shrink-0"
          >
            <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-red-600" />
          </span>
        );
    }
  };

  return (
    <article
      id={`item-${item.id}`}
      className={`group relative rounded-xl transition-all duration-200 p-3.5 sm:p-4 bg-white/70 hover:bg-white border border-[#E7DDD0]/80 hover:border-[#C59B4E]/60 shadow-xs hover:shadow-md ${
        quantity > 0 ? 'ring-1.5 ring-[#C59B4E] bg-[#FFFDF9]' : ''
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        {/* Left: Indicator & Dish Name */}
        <div className="flex items-center gap-2 min-w-0">
          {renderDietBadge()}
          <h4 className="font-display font-semibold text-[15px] sm:text-[17px] text-[#1B432A] group-hover:text-[#823214] transition-colors leading-tight truncate">
            {item.name}
          </h4>
          {item.isChefSpecial && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#C59B4E]/15 text-[#823214] shrink-0 border border-[#C59B4E]/30">
              <Sparkles className="w-2.5 h-2.5 text-[#C59B4E]" />
              Special
            </span>
          )}
        </div>

        {/* Dotted Leader */}
        <div className="menu-leader hidden sm:block" aria-hidden="true" />

        {/* Right: Price */}
        <div className="text-right shrink-0 flex items-center gap-2 pl-1">
          <span className="font-display font-bold text-base sm:text-lg text-[#823214] tracking-tight">
            {item.priceDisplay}
          </span>
        </div>
      </div>

      {/* Description & Spice indicators */}
      <div className="mt-1.5 flex items-start justify-between gap-3">
        <div className="text-xs sm:text-[13px] text-[#6B5E55] leading-relaxed max-w-xl">
          {item.description}

          {/* Badges row for mobile */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {item.isChefSpecial && (
              <span className="sm:hidden inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#C59B4E]/15 text-[#823214] border border-[#C59B4E]/30">
                <Sparkles className="w-2.5 h-2.5 text-[#C59B4E]" />
                Special
              </span>
            )}
            {item.spicyLevel && item.spicyLevel > 0 && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-[#A8421A] font-medium" title={`Spiciness: Level ${item.spicyLevel} of 3`}>
                {Array.from({ length: item.spicyLevel }).map((_, i) => (
                  <Flame key={i} className="w-3 h-3 fill-[#DC662E] text-[#DC662E]" />
                ))}
              </span>
            )}
            <span className="text-[11px] text-[#8C7A6B]">
              {item.category}
            </span>
          </div>
        </div>

        {/* Quick Add / Quantity controller */}
        {onAdd && (
          <div className="shrink-0 flex items-center gap-1.5 self-center">
            {quantity > 0 ? (
              <div className="flex items-center bg-[#FAF7F2] border border-[#C59B4E] rounded-lg p-0.5 shadow-xs">
                <button
                  type="button"
                  id={`btn-dec-${item.id}`}
                  onClick={() => onRemove && onRemove(item)}
                  aria-label={`Decrease ${item.name}`}
                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#E7DDD0] text-[#823214] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-bold text-[#1B432A]">
                  {quantity}
                </span>
                <button
                  type="button"
                  id={`btn-inc-${item.id}`}
                  onClick={() => onAdd(item)}
                  aria-label={`Increase ${item.name}`}
                  className="w-7 h-7 flex items-center justify-center rounded-md bg-[#1B432A] text-white hover:bg-[#265C3B] transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                id={`btn-add-${item.id}`}
                onClick={() => onAdd(item)}
                aria-label={`Add ${item.name} to order preview`}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg border border-[#C59B4E]/50 text-[#823214] bg-[#FAF7F2] hover:bg-[#1B432A] hover:text-white hover:border-[#1B432A] transition-all shadow-xs"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
