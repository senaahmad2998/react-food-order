import { createContext, useState } from "react";

export const UserProgressContext = createContext({
  progress: "",
  handleOpenCart: () => {},
  handleCloseCart: () => {},
  handleOpenCheckout: () => {},
  handleCloseCheckout: () => {},
});

export default function UserProgressContextProvider({ children }) {
  const [progress, setProgress] = useState("");

  function handleOpenCart() {
    setProgress("cart");
  }

  function handleCloseCart() {
    setProgress("");
  }

  function handleOpenCheckout() {
    setProgress("checkout");
  }

  function handleCloseCheckout() {
    setProgress("");
  }

  const userCtxValue = {
    progress,
    handleOpenCart,
    handleCloseCart,
    handleOpenCheckout,
    handleCloseCheckout,
  };

  return (
    <UserProgressContext.Provider value={userCtxValue}>
      {children}
    </UserProgressContext.Provider>
  );
}
