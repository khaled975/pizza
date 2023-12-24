import { Link } from "react-router-dom";
import Button from "../../ui/components/Button";
import LinkButton from "../../ui/components/LinkButton";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";
const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {

  const cart = useSelector(state=>state.cart.cartItems)

  // const cart = fakeCart;
  const username = useSelector(state=>state.user.username)
  const dispatch = useDispatch()
  function handelClearCart(){
    dispatch(clearCart())
  }
  if(!cart.length) return <EmptyCart/>
  return (
    <div className="px-4 py-6">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-3 font-semibold tracking-wider">
        Your cart, <strong>{username}</strong>
      </h2>
      <ul className="mt-4 divide-y divide-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-2 space-x-3">
        <Button to="/order/new">Order pizzas</Button>
        <Button type='clear' onClick={handelClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
