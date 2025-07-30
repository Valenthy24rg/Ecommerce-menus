import { useCartStore } from "../store/cartStore";
import { useCartTotal, useCartDesserts } from "../hooks/useCartUtils";
import { useState } from "react";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { CartItem, CartTotal, CartActions, EmptyCart } from "./cart";

export const DessertCart = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const [showModal, setShowModal] = useState(false);
  const hasItems = Object.keys(cart).length > 0;
  const total = useCartTotal(cart);
  const dessertsInCart = useCartDesserts(cart);

  const handleConfirmOrder = () => setShowModal(true);

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
              {dessertsInCart.map(({ id, quantity }) => (
                <CartItem
                  key={id}
                  id={id}
                  quantity={quantity}
                  onRemove={removeFromCart}
                />
              ))}
            </ul>
            <CartTotal total={total} />
            <CartActions onConfirmOrder={handleConfirmOrder} />
          </>
        ) : (
          <EmptyCart />
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
