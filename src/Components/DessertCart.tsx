import { useCartStore } from "../store/cartStore";
import data from "../data.json";
import Cart from "../../public/empty-cart.svg";
import RemoveIcon from "../../public/icon-remove-item.svg";
import Carbon from "../../public/icon-carbon-neutral.svg"
import { useState } from "react";
import OrderConfirmationModal from "./OrderConfirmationModal";
export const DessertCart = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const [showModal, setShowModal] = useState(false);
  const hasItems = Object.keys(cart).length > 0;
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const dessert = data.find((d) => d.id === Number(id));
    return sum + (dessert ? dessert.price * qty : 0);
  }, 0);

  const handleConfirmOrder = () => {
    setShowModal(true);
  };

  const handleStartNewOrder = () => {
    clearCart();
    setShowModal(false);
  };

  return (
    <div className="w-1/4 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Your Cart ({Object.values(cart).reduce((a, b) => a + b, 0)})
      </h2>
      <div className="flex flex-col">
        {hasItems ? (
          <>
            <ul className="w-full">
              {Object.entries(cart).map(([id, qty]) => {
                const dessert = data.find((d) => d.id === Number(id));
                return (
                  <>
                    <li
                      key={id}
                      className="flex flex-col py-2 border-b last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#260f08]">
                          {dessert ? dessert.name : `Dessert #${id}`}
                        </span>
                        <button
                          onClick={() => removeFromCart(Number(id))}
                          className="p-1 hover:bg-gray-100 rounded-full"
                          title="Remove"
                        >
                          <img src={RemoveIcon} alt="Remove" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-[#c73a0f]">{qty}x</span>
                        <span className="text-gray-400 text-sm">
                          @ ${dessert ? dessert.price.toFixed(2) : "0.00"}
                        </span>
                        <span className="text-[#260f08] font-semibold text-sm ml-2">
                          ${dessert ? (dessert.price * qty).toFixed(2) : "0.00"}
                        </span>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
            <div className="flex justify-between items-center mt-4 px-2">
              <span className="font-semibold text-lg text-[#260f08]">
                Orden Total
              </span>
              <span className="font-bold text-lg text-[#c73a0f]">
                ${total.toFixed(2)}
              </span>
            </div>
            <div>
              <div className="flex items-center text-[12px] gap-2 mt-10 bg-[#f4edeb] rounded-full p-2">
                <img src={Carbon} alt="carbon" />
                <p>Esta es una entrega a <span className="font-bold">carbon natural</span></p>
              </div>
            </div>
            <div>
              <button
                className="w-full bg-[#c73a0f] hover:bg-[#a32a0a] text-white font-semibold py-3 rounded-full text-lg transition mt-6"
                onClick={handleConfirmOrder}
              >
                Confirmar Orden
              </button>
            </div>
          </>
        ) : (
          <>
            <img src={Cart} alt="Empty Cart" className="mb-4" />
            <p className="text-gray-500 text-center">
              Your added items will appear here
            </p>
          </>
        )}
      </div>
      <OrderConfirmationModal
        isOpen={showModal}
        cart={cart}
        total={total}
        onClose={() => setShowModal(false)}
        onStartNewOrder={handleStartNewOrder}
      />
    </div>
  );
};
