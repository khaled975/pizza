import Header from "./components/Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./components/Loader";
function AppLayout() {
  const navigation = useNavigation();
  // console.log(navigation);

  const isLoading = navigation.state === "loading";
  return (
    <>
      <div className="grid h-screen grid-rows-[auto_1fr_auto]">
        {isLoading && <Loader />}
        <Header />
        <main className="overflow-y-scroll">
          <Outlet />
        </main>
        <CartOverview />
      </div>
    </>
  );
}

export default AppLayout;
