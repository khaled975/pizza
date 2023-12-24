import { useState } from "react";
import Button from "../../ui/components/Button";
import { useDispatch } from "react-redux";
import { updateUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if(!username) return
    dispatch(updateUser(username));
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        className="my-4 w-60 rounded-full border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 sm:w-72"
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
