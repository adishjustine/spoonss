import React, { useState } from 'react';
import { OrderItem, MenuItem } from '../types';
import { MEAL_SHARING_POLICY } from '../lib/menu-data';
import { X, Trash2, Plus, Minus, Check, Printer, Copy, Utensils } from 'lucide-react';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (item: MenuItem) => void;
  onClear: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  orderItems,
  onAdd,
  onRemove,
  onClear,
}) => {
  const [copied, setCopied] = useState(false);
  const [tableNumber, setTableNumber] = useState('1');

  if (!isOpen) return null;

  const totalAmount = orderItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const totalQuantity = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleCopyOrder = () => {
    const text = [
      `*SPOONS KERALA RESTAURANT - Table ${tableNumber} Order*`,
      `Policy: ${MEAL_SHARING_POLICY}`,
      `---------------------------------`,
      ...orderItems.map((o) => `${o.quantity}x ${o.item.name} (${o.item.priceDisplay}) = ₹${o.quantity * o.item.price}`),
      `---------------------------------`,
      `Total items: ${totalQuantity}`,
      `Total Estimated Bill: ₹${totalAmount}`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0B1D12]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E7DDD0] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-[#1B432A] text-white border-b border-[#C59B4E]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#DFBA6F]/20 text-[#DFBA6F] flex items-center justify-center">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#FFFDF9] leading-none">
                  Table Order Pad
                </h3>
                <span className="text-[11px] text-[#DFBA6F]/90 font-medium">
                  {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close Order Pad"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mandatory Sharing Notice inside drawer */}
          <div className="bg-[#823214] text-[#FAF7F2] px-4 py-2 text-xs font-semibold flex items-center justify-between border-b border-[#C59B4E]/30">
            <span className="uppercase text-[10px] tracking-wider text-[#DFBA6F] font-extrabold">
              Notice:
            </span>
            <span className="font-bold tracking-wide">
              {MEAL_SHARING_POLICY}
            </span>
          </div>

          {/* Table Input */}
          <div className="px-4 py-2.5 bg-[#F3EDE3] border-b border-[#E7DDD0] flex items-center justify-between text-xs">
            <label htmlFor="table-select" className="font-bold text-[#6B5E55]">
              Select Table / Seat:
            </label>
            <div className="flex items-center gap-1">
              <span className="text-[#823214] font-bold text-xs">Table #</span>
              <input
                id="table-select"
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-14 px-2 py-0.5 rounded bg-white border border-[#C59B4E]/40 text-center font-bold text-[#1B432A] text-xs focus:ring-1 focus:ring-[#1B432A] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {orderItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8C7A6B]">
                <div className="w-14 h-14 rounded-full bg-[#E7DDD0]/60 flex items-center justify-center mb-3">
                  <Utensils className="w-6 h-6 text-[#6B5E55]" />
                </div>
                <h4 className="font-display font-semibold text-base text-[#1B432A]">
                  Your Order Pad is Empty
                </h4>
                <p className="text-xs text-[#6B5E55] mt-1 max-w-xs">
                  Tap the "+ Add" button next to any Kerala dish to draft your table order and calculate the total.
                </p>
              </div>
            ) : (
              orderItems.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#E7DDD0] bg-white p-3 shadow-2xs flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <h5 className="font-display font-semibold text-sm text-[#1B432A] truncate">
                      {item.name}
                    </h5>
                    <div className="flex items-center gap-2 text-xs text-[#8C7A6B] mt-0.5">
                      <span>{item.priceDisplay} each</span>
                      <span>•</span>
                      <span className="font-bold text-[#823214]">
                        ₹{item.price * quantity}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center bg-[#FAF7F2] border border-[#C59B4E]/60 rounded-lg p-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onRemove(item)}
                      className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#E7DDD0] text-[#823214]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-[#1B432A]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onAdd(item)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-[#1B432A] text-white hover:bg-[#265C3B]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {orderItems.length > 0 && (
            <div className="p-4 bg-[#F3EDE3] border-t border-[#E7DDD0] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6B5E55]">
                <div className="flex justify-between font-medium">
                  <span>Subtotal ({totalQuantity} items):</span>
                  <span className="font-bold text-[#261E1A]">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>GST & Restaurant Service:</span>
                  <span className="text-[#8C7A6B]">As applicable at billing</span>
                </div>
                <div className="h-[1px] bg-[#E7DDD0] my-1" />
                <div className="flex justify-between font-display font-bold text-base text-[#1B432A]">
                  <span>Estimated Total:</span>
                  <span className="text-[#823214] font-extrabold text-lg">₹{totalAmount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyOrder}
                  className="py-2.5 px-3 rounded-xl bg-white border border-[#C59B4E] text-[#823214] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#FAF7F2] transition-colors shadow-2xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Order</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2.5 px-3 rounded-xl bg-[#1B432A] hover:bg-[#265C3B] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-[#DFBA6F]" />
                  <span>Print Slip</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onClear}
                className="w-full text-center text-[11px] font-semibold text-[#A8421A] hover:underline flex items-center justify-center gap-1 pt-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear Table Order Pad</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
