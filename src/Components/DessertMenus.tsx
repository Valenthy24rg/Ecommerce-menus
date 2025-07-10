import { useState } from "react";
import data from "../data.json";
import AddToCart from '../../public/icon-add-to-cart.svg'


export const DessertMenus = () => {
   const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleAddToCart = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: 1,
    }));
  };

  const handleIncrement = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: number) => {
    setQuantities((prev) => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };
  return (
    <div className="flex-1 pr-8">
      <h1 className="text-3xl font-red-hat mb-8">Desserts</h1>
      <div className="flex flex-wrap -mx-4">
        {data.map((dessert) => (
          <div key={dessert.id} className="w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={dessert.image.desktop}
                alt={dessert.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-normal mb-2">{dessert.category}</h2>
                <p className="text-gray-600 font-bold mb-4">{dessert.name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{dessert.price}</span>
                  <div className="flex items-center space-x-2"></div>
                  {quantities[dessert.id] ? (
                      <>
                        <button
                          onClick={() => handleDecrement(dessert.id)}
                          className="bg-gray-200 p-1 border rounded-full"
                        >
                          <img src="/icon-decrement-quantity.svg" alt="-" />
                        </button>
                        <span>{quantities[dessert.id]}</span>
                        <button
                          onClick={() => handleIncrement(dessert.id)}
                          className="bg-gray-200 p-1 border rounded-full"
                        >
                          <img src="/icon-increment-quantity.svg" alt="+" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(dessert.id)}
                        className="bg-white text-[#c73a0f] border rounded-full px-3 py-1 flex gap-2"
                      >
                        <img src={AddToCart} alt="" />
                        Add to Cart
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
