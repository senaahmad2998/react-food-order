import { useContext } from "react";
import { CartContext } from "../store/food-cart-context";
import { formattingCurrency } from "../util/Formatting";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/user-progress-context";
import CartMealItem from "./CartMealItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalPrice = cartCtx.carts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = formattingCurrency.format(totalPrice);

  function handleCloseCartModal() {
    userProgressCtx.handleCloseCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.handleOpenCheckout();
  }

  return (
    <Modal
      className="cart"
      onClose={
        userProgressCtx.progress === "cart" ? handleCloseCartModal : null
      }
      open={userProgressCtx.progress === "cart"}
    >
      {cartCtx.carts.length === 0 && <p>No items in cart!</p>}
      {cartCtx.carts.length > 0 && (
        <ul>
          {cartCtx.carts.map((cart) => {
            console.log(cart);
            return (
              <CartMealItem
                key={cart.id}
                name={cart.name}
                price={cart.price}
                quantity={cart.quantity}
                increaseItem={() => cartCtx.addItemToCart(cart)}
                decreaseItem={() => cartCtx.deleteItem(cart)}
              />
            );
          })}
        </ul>
      )}
      <p className="cart-total">
        <strong>{formattedTotalPrice}</strong>
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCartModal}>
          Close
        </Button>
        {cartCtx.carts.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
