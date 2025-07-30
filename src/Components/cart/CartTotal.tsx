interface CartTotalProps {
  total: number;
}

export const CartTotal: React.FC<CartTotalProps> = ({ total }) => {
  return (
    <div className="flex justify-between items-center mt-4 px-2">
      <span className="font-semibold text-lg text-[#260f08]">
        Orden Total
      </span>
      <span className="font-bold text-lg text-[#c73a0f]">
        ${total.toFixed(2)}
      </span>
    </div>
  );
}; 