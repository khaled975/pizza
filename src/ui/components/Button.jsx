import { Link } from "react-router-dom";

function Button({ children, disabled, to, size, type ,onClick}) {
  const small = size === "small";
  const clear = type === "clear";
  // const primary = size === "primary";

  const className = `rounded-full ${
    clear
      ? " hover:bg-stone-300 focus:ring-stone-300 border-2 border-stone-300 text-stone-400 hover:text-stone-800"
      : "bg-yellow-400 hover:bg-yellow-300 focus:ring-yellow-400 "
  } inline-block ${
    small ? "px-3 py-2 md:px-4 md:py-2.5 text-xs" : "px-5 py-3"
  } font-semibold text-sm focus:outline-none focus:ring-offset-2 focus:ring disabled:cursor-not-allowed uppercase tracking-wider text-stone-800 transition-colors duration-300 `;
  if (to)
    return (
      <Link to={to} className={className} >
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
