import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletecart, incrementQuantity, decrementQuantity } from "./redux/Cartsytem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDelete = (itemId) => {
    dispatch(deletecart({ _id: itemId }));
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity({ _id: itemId }));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity({ _id: itemId }));
  };

  const totalPrice = cartItems
    .filter((item) => typeof item.price === "number")
    .reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-4 max-w-xxl mx-auto z-0 ">
      <div className="bg-white shadow-lg rounded-lg mt-20 m-10 ">
        <div className="flex items-center justify-between px-4 py-3 bg-[#C3AA80]">
          <h1 className="text-lg font-bold">Shopping Cart</h1>
          <span className="text-[#C3AA80]">({cartItems.length} items)</span>
        </div>

        <div className="p-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center mb-4">
              <img
                className="h-16 w-16 object-contain rounded-lg mr-4"
                src={`http://localhost:5001${item.image}`}
                alt={item.name}
              />
              <div className="flex-1">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <span className="text-gray-600">${item.price.toFixed(2)}</span>
                <div className="flex items-center mt-2">
                  <button
                    className="px-2 py-1 bg-[#F2EDE6] rounded hover:bg-gray-400"
                    onClick={() => handleDecrement(item._id)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-[#F2EDE6] rounded hover:bg-gray-400"
                    onClick={() => handleIncrement(item._id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="text-gray-600 hover:text-red-500"
                onClick={() => handleDelete(item._id)}
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19 13H5v-2h14v2z" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 bg-[#F2EDE6]">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="block w-full mt-4 bg-[#967237] hover:bg-[#966620] text-[white] font-bold py-2 px-4 rounded">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
