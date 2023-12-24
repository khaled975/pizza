import { useDispatch } from "react-redux";
import { decreasePizzaQuantity, increasePizzaQuantity } from "../../features/cart/cartSlice"
import Button from "./Button"

function UpdatePizaaQuantity({pizzaId,quantity}){
    const dispatch = useDispatch()
    return(
        <>
            <Button
          size="small"
          onClick={() => dispatch(increasePizzaQuantity(pizzaId))}
        >
          +
        </Button>
        <p>{quantity}</p>
        <Button size="small"  onClick={() => dispatch(decreasePizzaQuantity(pizzaId))}>-</Button>
        </>
    )
}

export default UpdatePizaaQuantity
