import LinkButton from "../../ui/components/LinkButton";

function EmptyCart() {
  return (
    <di className="px-4 py-6">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-3 text-center font-semibold tracking-wider">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </di>
  );
}

export default EmptyCart;
