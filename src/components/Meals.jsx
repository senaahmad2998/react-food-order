import { useContext, useEffect } from "react";
import { CartContext } from "../store/food-cart-context.jsx";
import MealItem from "./MealItem.jsx";
import useFetch from "../hooks/useFetch.jsx";
import Error from "./Error.jsx";

const defaultConfig = {};

export default function Meals() {
  const { addItem, items } = useContext(CartContext);
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/meals",
    defaultConfig,
    []
  );

  useEffect(() => {
    addItem(data);
  }, [data]);

  if (isLoading) {
    return <p className="center">Fetching Meals</p>;
  }

  if (error) {
    console.log(error);
    return <Error title="Failed to fetch meals." message={error} />;
  }

  return (
    <ul id="meals">
      {items.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
