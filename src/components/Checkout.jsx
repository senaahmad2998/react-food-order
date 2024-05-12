import { useContext } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import { formattingCurrency } from "../util/Formatting";
import { UserProgressContext } from "../store/user-progress-context";
import { CartContext } from "../store/food-cart-context";
import useFetch from "../hooks/useFetch";
import Error from "./Error";

const ordersInitialConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const userCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useFetch("http://localhost:3000/orders", ordersInitialConfig);

  const totalPrice = cartCtx.carts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = formattingCurrency.format(totalPrice);

  function handleCloseCheckoutModal() {
    userCtx.handleCloseCheckout();
  }

  function handleCloseConfirmModal() {
    userCtx.handleCloseCheckout();
    cartCtx.clearItemInCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.carts,
          customer: customerData,
        },
      })
    );
  }

  let action = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckoutModal}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    action = <p>Cart is Sending. Please Wait for a moment.</p>;
  }

  if (data && !error) {
    return (
      <Modal
        onClose={
          userCtx.progress === "checkout" ? handleCloseConfirmModal : null
        }
        open={userCtx.progress === "checkout"}
      >
        <h2>Your order success</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleCloseConfirmModal}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      onClose={
        userCtx.progress === "checkout" ? handleCloseCheckoutModal : null
      }
      open={userCtx.progress === "checkout"}
    >
      <h2>Checkout</h2>
      <p>Total Amount: {formattedTotalPrice}</p>

      <form onSubmit={handleSubmit}>
        <Input id="name" label="Full Name" type="text" />
        <Input id="email" label="E-Mail Address" type="email" />
        <Input id="street" label="Street" type="text" />

        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="number" />
          <Input id="city" label="City" type="text" />
        </div>

        {error && (
          <Error
            title="There is a error when sending cart item"
            message={error}
          />
        )}

        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
