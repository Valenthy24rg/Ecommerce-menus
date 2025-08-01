import data from "../data.json";
import AddToCart from '../../public/icon-add-to-cart.svg'
import { useCartStore } from "../store/cartStore";
import Increment from '../../public/icon-increment-quantity.svg'
import Decrement from '../../public/icon-decrement-quantity.svg'
import { Link, useNavigate } from "react-router-dom";

export const DessertMenus = () => {
  const { cart, addToCart, increment, decrement } = useCartStore();
  const navigate = useNavigate();
  
  const userName = localStorage.getItem('userName') || 'Usuario';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div className="flex-1 pr-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-red-hat font-semibold text-[#260f08]">Desserts</h1>
          <p className="text-sm text-gray-600">Bienvenido, {userName}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-[#c73a0f] text-white px-4 py-2 rounded-md hover:bg-[#a62d0c] transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
      <div className="flex flex-wrap -mx-4">
        {data.map((dessert) => (
          <div key={dessert.id} className="w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/dessert/${dessert.id}`}>
              <img
                src={dessert.image.desktop}
                alt={dessert.name}
                className="w-full h-48 object-cover"
              />
               </Link>
              <div className="p-4">
                <h2 className="text-md font-medium text-[#87635a] mb-2">{dessert.category}</h2>
                <Link to={`/dessert/${dessert.id}`} className="text-[#c73a0f] hover:underline">
                  <p className="text-[#260f08] text-lg font-semibold mb-4">{dessert.name}</p>
                </Link>
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
