import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./components/Button";
function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <main className="my-10 px-4 text-center">
      <h1 className=" mb-10 text-center text-xl font-semibold uppercase tracking-widest">
        The best pizza.
        <br />
        <span className="text-sm text-yellow-500 sm:text-base ">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu">Start Ordering, {username}</Button>
      )}
    </main>
  );
}

export default Home;
