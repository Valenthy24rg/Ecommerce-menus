import data from "../data.json";
import AddToCart from '../../public/icon-add-to-cart.svg'
import { useCartStore } from "../store/cartStore";
import Increment from '../../public/icon-increment-quantity.svg'
import Decrement from '../../public/icon-decrement-quantity.svg'


export const DessertMenus = () => {
  const { cart, addToCart, increment, decrement } = useCartStore();
  return (
    <div className="flex-1 pr-8">
      <h1 className="text-3xl font-red-hat font-semibold text-[#260f08] mb-8">Desserts</h1>
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
                <h2 className="text-md font-medium text-[#87635a] mb-2">{dessert.category}</h2>
                <p className="text-[#260f08] text-lg font-semibold mb-4">{dessert.name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">${dessert.price}</span>
                  <div className="flex items-center space-x-2"></div>
                  {cart[dessert.id] ? (
                      <>
                        <button
                          onClick={() => decrement(dessert.id)}
                          className={`px-1 py-2 border rounded-full ${cart[dessert.id] > 0 ? 'bg-[#c73a0f]' : 'bg-gray-200'}`}
                        >
                          <img src={Decrement} alt="-" />
                        </button>
                        <span>{cart[dessert.id]}</span>
                        <button
                          onClick={() => increment(dessert.id)}
                          className={`p-1 border rounded-full ${cart[dessert.id] > 0 ? 'bg-[#c73a0f]' : 'bg-gray-200'}`}
                        >
                          <img src={Increment} alt="+" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => addToCart(dessert.id)}
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
