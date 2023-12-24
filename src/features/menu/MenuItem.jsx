import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/components/Button";
import { formatCurrency } from "../../utils/helpers";
import {
  addItem,
  deleteItem,
} from "../cart/cartSlice";
import UpdatePizaaQuantity from "../../ui/components/updatePizaaQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  // CHECK IF PIZZA IN THE CART
  const isPizzaInCart = useSelector((state) =>
    state.cart.cartItems.map((item) => item.pizzaId).includes(id),
  );
  // GET PIZZA QUANTITY
  const pizzaQuantity = useSelector(
    (state) =>
      state.cart.cartItems.find((item) => item.pizzaId === id)?.quantity ?? 0,
  );
  console.log(pizzaQuantity);


  const dispatch = useDispatch();

  function handelAddItem() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }



  return (
    <li className="flex gap-2 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium ">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm font-medium uppercase text-stone-500">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          <div className="flex items-center space-x-3">
            {isPizzaInCart && (
              <>
                <UpdatePizaaQuantity pizzaId={id} quantity={pizzaQuantity} />
                <Button size="small" onClick={() => dispatch(deleteItem(id))}>
                  delete
                </Button>
              </>
            )}
            {!soldOut && !isPizzaInCart && (
              <Button size="small" onClick={handelAddItem}>
                Add To Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
