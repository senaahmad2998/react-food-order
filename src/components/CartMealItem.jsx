export default function CartMealItem({
  name,
  price,
  quantity,
  increaseItem,
  decreaseItem,
}) {
  return (
    <li className="cart-item">
      <div>
        <span>{name}</span>
        <span>{price}</span>
      </div>
      <div className="cart-item-actions">
        <button onClick={decreaseItem}>-</button>
        <span>{quantity}</span>
        <button onClick={increaseItem}>+</button>
      </div>
    </li>
  );
}
