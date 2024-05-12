import { useContext, useRef } from "react";
import LogoImage from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/food-cart-context";
import { UserProgressContext } from "../store/user-progress-context";

export default function Header() {
  const { carts } = useContext(CartContext);
  const { handleOpenCart } = useContext(UserProgressContext);
  const modalCart = useRef();
  const modalCheckout = useRef();
  const modalConfirm = useRef();

  const cartQuantity = carts.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleSubmitCart() {
    modalCart.current.close();
    modalCheckout.current.showModal();
  }

  async function handleSubmitCheckout(data) {
    console.log(data);
    const processData = { customer: data };
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: processData }),
    });
    const responseData = await response.json();
    console.log(responseData);
    modalCheckout.current.close();
    modalConfirm.current.showModal();
  }

  let modalCartActions = <button className="text-button">Close</button>;

  if (cartQuantity > 0) {
    modalCartActions = (
      <>
        <button className="text-button">Close</button>
        <button className="button" onClick={handleSubmitCart}>
          Go to Checkout
        </button>
      </>
    );
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={LogoImage} alt="Restaurant Image" />
          <h1>React Food</h1>
        </div>
        <nav>
          <Button onClick={handleOpenCart} textOnly>
            Cart ({cartQuantity})
          </Button>
        </nav>
      </header>
    </>
  );
}
