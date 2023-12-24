import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/components/Button";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress, getPosition } from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

 function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

//  const userPosition = await getPosition()
//  console.log(userPosition);
 
  // GET REAL CART DATA FROM REDUX
  const cart = useSelector((state) => state.cart.cartItems);
  console.log(cart);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  // GET USERNAME FROM REDUX DATA
  // const username = useSelector((state) => state.user.username);
  const {
    username,
    address,
    error: addressError,
    position,
    status: addressStatus,
  } = useSelector((state) => state.user);

  const isAddressLoading = addressStatus === "loading";
  // CHECK IF FORM SUBMITTING OR NOT FOR LOADING
  const isSubmitting = navigation.state === "submitting";
  // GET ERROR DATA
  const formError = useActionData();
  console.log(formError);

  const totalPrice = cart
    .map((item) => item.totalPrice)
    .reduce((acc, crr) => acc + crr, 0);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const totalPriceWithPriorty = totalPrice + priorityPrice;

  if(!cart.length)return <EmptyCart/>
  return (
    <div className="m-auto mt-6 max-w-[600px] px-4">
      <h2 className="mb-6 text-xl font-semibold tracking-wider ">
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div className="mb-3 flex flex-col justify-start gap-2 sm:flex-row sm:items-center">
          <label className="font-semibold sm:basis-40">First Name</label>
          <input
            type="text"
            className="input grow"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className=" font-semibold sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
          </div>
          {formError && (
            <span className="rounded-md bg-red-300/50 px-2 py-2 font-medium text-red-600 block">
              {formError?.phone}
            </span>
          )}
        </div>

        <div className="mb-3 flex flex-col justify-start gap-2 sm:flex-row sm:items-center">
          <label className="font-semibold sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
              disabled={isAddressLoading}
            />
            <span className="absolute right-1 top-[4.5px] md:top-[6.5px]">
              <Button
                size="small"
                onClick={(e) => {
                  // e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isAddressLoading}
              >
                Get Position
              </Button>
            </span>
          {addressError && (
            <span className="rounded-md bg-red-300/50 px-2 py-1 m-3 font-medium text-red-600 block">
              {addressError}
            </span>
          )}
          </div>
        </div>

        <div className="mb-5 flex items-center gap-4 font-bold tracking-wider">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 rounded-full accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input hidden name="cart" value={JSON.stringify(cart)} />
        <div className="mb-4 mt-8">
          <Button disabled={isSubmitting} onClick={console.log(cart)}>
            {isSubmitting || isAddressLoading
              ? "Picking Order..."
              : `Order now (${formatCurrency(totalPriceWithPriorty)})`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  ///////// PARSE DATA TO OBJECT
  const parsedData = Object.fromEntries(formData);

  console.log(parsedData);

  ///////// MUTATE DATA
  const order = {
    ...parsedData,
    cart: JSON.parse(parsedData.cart),
    priority: parsedData.priority === "true",
  };
  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please insert a valid phone number, we might need it to contact you";

  ///////// CHECK IF THERE IS AN ERROR OR NOT
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  console.log(newOrder);
  // CLEAR CART AFTER FINISH ORDER
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
  // return null
}
export default CreateOrder;
