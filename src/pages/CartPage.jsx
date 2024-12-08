import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { updateQuantity, removeFromCart } from "../store/slices/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Format price to 2 decimal places
  const formatPrice = useCallback((price) => {
    return Number(price).toFixed(2);
  }, []);

  const calculateTotal = useCallback(() => {
    return formatPrice(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }, [cartItems, formatPrice]);

  const handleUpdateQuantity = useCallback((id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  }, [dispatch]);

  const handleRemoveItem = useCallback((id) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  const proceedToOrder = async () => {
    try {
      // Assuming you have an orderSlice with proper actions
      dispatch(setLoading(true));
      // Your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/order/101");
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Failed to process order. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const CartItem = ({ item }) => (
    <li className="flex items-center mb-4 border-b pb-3">
      <img src={item.image} alt={item.title} className="w-24 h-auto mr-5" />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="mt-1">Price: ${formatPrice(item.price)}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 border rounded"
          >
            -
          </button>
          <span className="mx-3">Quantity: {item.quantity}</span>
          <button
            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => handleRemoveItem(item.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Remove
      </button>
    </li>
  );

  return (
    <div className="container mx-auto p-5">
      <NavigationBar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-2xl font-bold mb-5">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="list-none p-0">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
            
            <div className="mt-5 flex flex-col items-end">
              <h2 className="text-xl font-semibold">
                Total: ${calculateTotal()}
              </h2>
              <button
                onClick={proceedToOrder}
                disabled={isLoading}
                className="bg-blue-500 text-white px-6 py-2 rounded mt-4 hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isLoading ? "Processing..." : "Proceed to Order"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
