import React from "react";
import data from "../data.json";
import ConfirmedIcon from "../../public/icon-order-confirmed.svg";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  cart: Record<string, number>;
  total: number;
  onClose: () => void;
  onStartNewOrder: () => void;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  cart,
  total,
  onClose,
  onStartNewOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#e0d6d2] scrollbar-thumb-rounded hover:scrollbar-thumb-[#cfc2bb]">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex flex-col items-center">
          <img src={ConfirmedIcon} alt="Order Confirmed" className="w-10 mb-2" />
          <h2 className="text-2xl font-bold text-[#260f08] mb-1">Orden Confirmada</h2>
          <p className="text-gray-500 mb-4 text-center">¡Esperamos que disfrutes tu comida!</p>
        </div>
        <div className="bg-[#f9f6f5] rounded-lg p-4 mb-6">
          <ul>
            {Object.entries(cart).map(([id, qty]) => {
              const dessert = data.find((d) => d.id === Number(id));
              if (!dessert) return null;
              return (
                <li key={id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-2">
                    <img src={dessert.image.desktop} alt={dessert.name} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <div className="font-semibold text-[#260f08]">{dessert.name}</div>
                      <div className="text-sm">
                        <span className="font-bold text-[#c73a0f]">{qty}x</span>
                        <span className="text-gray-400 ml-1">@ ${dessert.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-[#260f08]">${(dessert.price * qty).toFixed(2)}</div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-between items-center mt-4 px-2">
            <span className="font-semibold text-lg text-[#260f08]">Order Total</span>
            <span className="font-bold text-xl">${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          className="w-full bg-[#c73a0f] hover:bg-[#a32a0a] text-white font-semibold py-3 rounded-full text-lg transition"
          onClick={onStartNewOrder}
        >
          Iniciar Nueva Orden
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
