import { useContext } from "react";
import { CartContext } from "../store/food-cart-context.jsx";
import Button from "./UI/Button";
import { formattingCurrency } from "../util/Formatting.js";

export default function MealItem({ meal }) {
  const { addItemToCart } = useContext(CartContext);
  return (
    <li className="meal-item" key={meal.id}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {formattingCurrency.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => addItemToCart(meal)}>Add Cart</Button>
        </p>
      </article>
    </li>
  );
}
