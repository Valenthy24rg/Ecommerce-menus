import Cart from '../../public/empty-cart.svg'

export const DessertCart = () => {
  return (
    <div className="w-1/4 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Your Cart (0)</h2>
      <div className="flex flex-col items-center justify-center h-48">
        <img
          src={Cart}
          alt="Empty Cart"
          className="mb-4"
        />
        <p className="text-gray-500 text-center">
          Your added items will appear here
        </p>
      </div>
    </div>
  );
};
