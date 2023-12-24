import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function CartOverview() {
  const cart = useSelector((store) => store.cart.cartItems);

  const cartDetails = {
    length: cart.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: cart
      .map((item) => item.totalPrice)
      .reduce((acc, crr) => acc + crr, 0),
  };

  // console.log(cart);

  if (!cartDetails.length) return;

  return (
    <div className="align-center flex justify-between bg-stone-800 px-4 py-3 uppercase text-stone-200">
      <p className="space-x-2 font-semibold text-stone-300">
        <span>{cartDetails.length} Pizza &rarr;</span>
        <span>{cartDetails.totalPrice}$</span>
      </p>
      <Link to="/cart" className="text-sm">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
