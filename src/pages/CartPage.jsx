import React, { useState } from "react";
import { demoCartItems } from "../data/demoCartItems"; // Adjust the path as necessary
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [cartItems, setCartItems] = useState(demoCartItems); // State for cart items
  const navigate=useNavigate();
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const proceedToOrder = () => {
    // Implement order processing logic here
    alert("Proceeding to order...");
    navigate("/order/101");
  };

  return (
    <div className="p-5  mx-auto">
      <NavigationBar />
      <div>
        <h1 className="text-center text-2xl font-bold mb-5">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <ul className="list-none p-0">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center mb-4 border-b pb-3">
                <img src={item.image} alt={item.title} className="w-24 h-auto mr-5" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1">Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <h2 className="text-right text-xl font-semibold mt-5">Total: ${calculateTotal()}</h2>
        {cartItems.length > 0 && (
          <button
            onClick={proceedToOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-5 hover:bg-blue-600 float-right"
          >
            Proceed to Order
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
