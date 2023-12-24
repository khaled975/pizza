import { useDispatch } from "react-redux";
import Button from "../../ui/components/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./cartSlice";
import UpdatePizaaQuantity from "../../ui/components/updatePizaaQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  return (
    <li className="py-3">
      <p className="mb-3 font-semibold tracking-wider">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-end gap-4 text-sm font-bold">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdatePizaaQuantity pizzaId={pizzaId} quantity={quantity} />
        <Button size="small" onClick={() => dispatch(deleteItem(pizzaId))}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
