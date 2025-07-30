import Cart from "../../../public/empty-cart.svg";

export const EmptyCart: React.FC = () => {
  return (
    <>
      <img src={Cart} alt="Empty Cart" className="mb-4" />
      <p className="text-gray-500 text-center">
        Your added items will appear here
      </p>
    </>
  );
}; 