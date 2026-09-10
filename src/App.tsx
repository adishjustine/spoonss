import React, { useState, useEffect, useMemo } from 'react';
import { PageRoute, MenuItem, OrderItem } from './types';
import { RESTAURANT_NAME, SECTIONS, MEAL_SHARING_POLICY } from './lib/menu-data';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { MenuSectionView } from './components/MenuSectionView';
import { OrderDrawer } from './components/OrderDrawer';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  // Determine route from window.location pathname or hash
  const getInitialRoute = (): PageRoute => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase().replace('#', '');

    if (path.includes('specials') || hash.includes('specials')) return 'specials';
    if (path.includes('biriyani') || hash.includes('biriyani')) return 'biriyani';
    if (path.includes('mains') || hash.includes('mains')) return 'mains';
    if (path.includes('rice-noodles') || hash.includes('rice-noodles')) return 'rice-noodles';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialRoute);
  const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('spoons_kerala_order');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Save order in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('spoons_kerala_order', JSON.stringify(orderItems));
    } catch {
      // ignore
    }
  }, [orderItems]);

  // Handle URL change
  const navigate = (route: PageRoute) => {
    setCurrentPage(route);
    const targetPath = route === 'home' ? '/' : `/menu/${route}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ route }, '', targetPath);
    }
  };

  // Sync back/forward browser buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update Page Title and SEO
  useEffect(() => {
    const section = SECTIONS.find((s) => s.id === currentPage);
    if (currentPage === 'home') {
      document.title = `${RESTAURANT_NAME} — Authentic Kerala Menu (Meals sharing not allowed)`;
    } else if (section) {
      document.title = `${section.title} — ${RESTAURANT_NAME} (Meals sharing not allowed)`;
    }
  }, [currentPage]);

  // Map for fast quantity lookups
  const orderMap = useMemo(() => {
    const map: Record<string, number> = {};
    orderItems.forEach((o) => {
      map[o.item.id] = o.quantity;
    });
    return map;
  }, [orderItems]);

  const handleAddItem = (item: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((o) => o.item.id === item.id);
      if (existing) {
        return prev.map((o) =>
          o.item.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleRemoveItem = (item: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((o) => o.item.id === item.id);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((o) => o.item.id !== item.id);
      }
      return prev.map((o) =>
        o.item.id === item.id ? { ...o, quantity: o.quantity - 1 } : o
      );
    });
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = orderItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#261E1A] font-sans antialiased">
      {/* Shared Header with Meals Sharing Banner */}
      <Header
        currentPage={currentPage}
        onNavigate={navigate}
        orderItems={orderItems}
        onOpenOrderPad={() => setOrderDrawerOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Page Content */}
      <div className="flex-1">
        {currentPage === 'home' ? (
          <HomeView
            onNavigate={navigate}
            onOpenOrderPad={() => setOrderDrawerOpen(true)}
            onOpenSearch={() => setSearchModalOpen(true)}
            onAdd={handleAddItem}
            orderMap={orderMap}
          />
        ) : (
          <MenuSectionView
            page={currentPage}
            orderMap={orderMap}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
            onNavigate={navigate}
          />
        )}
      </div>

      {/* Shared Footer with Meals Sharing Notice */}
      <Footer onNavigate={navigate} />

      {/* Mobile Floating Order Bar (when user has items in their table order pad) */}
      {totalQuantity > 0 && (
        <div className="fixed bottom-3 inset-x-3 sm:hidden z-30">
          <button
            type="button"
            onClick={() => setOrderDrawerOpen(true)}
            className="w-full py-3 px-4 rounded-2xl bg-[#823214] text-white font-bold text-xs shadow-2xl flex items-center justify-between border border-[#DFBA6F]/50 ring-2 ring-[#132E1C]/20"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#DFBA6F] text-[#0B1D12] flex items-center justify-center text-xs font-black">
                {totalQuantity}
              </span>
              <span className="text-left leading-tight">
                <span className="block font-display text-sm text-[#FFFDF9]">Table Order Pad</span>
                <span className="text-[10px] text-[#DFBA6F]/90 font-medium">
                  {MEAL_SHARING_POLICY}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-sm text-[#DFBA6F]">
                ₹{totalAmount}
              </span>
              <div className="p-1.5 rounded-lg bg-white/10">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Slide-out Order Drawer */}
      <OrderDrawer
        isOpen={orderDrawerOpen}
        onClose={() => setOrderDrawerOpen(false)}
        orderItems={orderItems}
        onAdd={handleAddItem}
        onRemove={handleRemoveItem}
        onClear={handleClearOrder}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        orderMap={orderMap}
        onAdd={handleAddItem}
        onRemove={handleRemoveItem}
      />
    </div>
  );
}
