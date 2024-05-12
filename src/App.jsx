import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
// import CartContextProvide from "./store/food-cart-context";
import CartContextProvider from "./store/food-cart-context";
import UserProgressContextProvider from "./store/user-progress-context";

function App() {
  // const [meals, setMeals] = useState([]);

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
