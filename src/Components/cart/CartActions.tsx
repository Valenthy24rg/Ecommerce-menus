import Carbon from "../../../public/icon-carbon-neutral.svg";

interface CartActionsProps {
  onConfirmOrder: () => void;
}

export const CartActions: React.FC<CartActionsProps> = ({ onConfirmOrder }) => {
  return (
    <>
      <div>
        <div className="flex items-center text-[12px] gap-2 mt-10 bg-[#f4edeb] rounded-full p-2">
          <img src={Carbon} alt="carbon" />
          <p>Esta es una entrega a <span className="font-bold">carbon natural</span></p>
        </div>
      </div>
      <div>
        <button
          className="w-full bg-[#c73a0f] hover:bg-[#a32a0a] text-white font-semibold py-3 rounded-full text-lg transition mt-6"
          onClick={onConfirmOrder}
        >
          Confirmar Orden
        </button>
      </div>
    </>
  );
}; 