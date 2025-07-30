import data from "../../data.json";
import RemoveIcon from "../../../public/icon-remove-item.svg";

interface CartItemProps {
  id: number;
  quantity: number;
  onRemove: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ id, quantity, onRemove }) => {
  const dessert = data.find((d) => d.id === id);

  if (!dessert) {
    return null;
  }

  return (
    <li className="flex flex-col py-2 border-b last:border-b-0">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-[#260f08]">
          {dessert.name}
        </span>
        <button
          onClick={() => onRemove(id)}
          className="p-1 hover:bg-gray-100 rounded-full"
          title="Remove"
        >
          <img src={RemoveIcon} alt="Remove" />
        </button>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="font-bold text-[#c73a0f]">{quantity}x</span>
        <span className="text-gray-400 text-sm">
          @ ${dessert.price.toFixed(2)}
        </span>
        <span className="text-[#260f08] font-semibold text-sm ml-2">
          ${(dessert.price * quantity).toFixed(2)}
        </span>
      </div>
    </li>
  );
}; 