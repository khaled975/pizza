import { useFetcher } from "react-router-dom";
import Button from "../../ui/components/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH">
      <Button size="small">Make It Priority</Button>
    </fetcher.Form>
  );
}

export async function action ({request,params}){
    const data = {priority:true}
    await updateOrder(params.id,data)
    return null
}

export default UpdateOrder;
