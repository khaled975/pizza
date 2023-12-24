import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  function handelSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handelSubmit}>
      <input
        type="text"
        className="w-32 rounded-full px-4 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-25 sm:w-60 sm:focus:w-80"
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
