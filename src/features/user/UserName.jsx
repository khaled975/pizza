import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((state) => state.user.username);
  if (!username) return;
  return <p className="hidden text-sm font-bold sm:block">{username}</p>;
}

export default UserName;
