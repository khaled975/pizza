// Test ID: IIDSAT  CQE92U

import { useFetcher, useLoaderData, useParams } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { getOrder } from "../../services/apiRestaurant";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();
  // console.log(order);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  console.log(fetcher);

  return (
    <div className="px-4 py-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-600 px-2 py-1 text-sm font-semibold uppercase tracking-wide text-red-100">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-600 px-2 py-1 text-sm font-semibold uppercase tracking-wide text-green-100">
            {status} order
          </span>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between bg-stone-200 px-2 py-3">
        <p className="font-semibold text-stone-800">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs font-semibold text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="my-4 divide-y divide-stone-200 border-y">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher?.state === "loading"}
            ingredients={
              fetcher?.data?.find((ele) => ele.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>
      <div className="space-y-2 bg-stone-200 px-2 py-3">
        <p className=" text-sm tracking-wide">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm tracking-wide">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && (
        <span className="mt-3 block text-end">
          <UpdateOrder />
        </span>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.id);
  return order;
}
export default Order;
