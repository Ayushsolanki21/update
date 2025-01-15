import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletecart, incrementQuantity, decrementQuantity } from './redux/Cartsytem';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart); 
  const dispatch = useDispatch();

  const handleDelete = (itemId) => {
    dispatch(deletecart({ _id: itemId })); 
  };

  const handleIncrement = (itemId) => {
    console.log('Increment item ID:', itemId); // Debugging statement
    dispatch(incrementQuantity({ _id: itemId }));
  };

  const handleDecrement = (itemId) => {
    console.log('Decrement item ID:', itemId); // Debugging statement
    dispatch(decrementQuantity({ _id: itemId }));
  };

  const totalPrice = cartItems
    .filter(item => typeof item.price === 'number')
    .reduce((total, item) => total + item.price * item.quantity, 0); // Calculate total price with quantity
  
  return (
    <div className="flex flex-col items-center p-8 bg-[#EBE4DB] min-h-screen ">
      <h1 className="text-3xl font-semibold mb-6 mt-10">Shopping Cart</h1>
     
  
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out"
            >
              <img
              src={`http://localhost:5001${item.image}`} // Use the image property for the product image
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-4" // Adjust size as needed
            />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
              <p className="text-gray-700 mb-1">Price: <span className="font-medium">${item.price}</span></p>
              <p className="text-gray-700 mb-1">Quantity: <span className="font-medium">{item.quantity}</span></p>
              <p className="text-gray-700 mb-1">Category: <span className="font-medium">{item.category}</span></p>
              <p className="text-gray-700 mb-4">Company: <span className="font-medium">{item.company}</span></p>
              
              <div className='flex mb-2'>
              <button 
                  className='bg-[#C3AA80] hover:bg-[#ebe9E1] text-white font-semibold w-20 mr-5 rounded'
                  onClick={() => handleDecrement(item._id)}
                >
                  -
                </button>
                <h1 className="font-medium">{item.quantity}</h1>
              
                <button 
                  className='bg-[#C3AA80] hover:bg-[#ebe9E1] text-white font-semibold w-20 ml-5 rounded'
                  onClick={() => handleIncrement(item._id)}
                >
                  +
                </button>
              </div>
              
              <button
                className="w-full bg-[#C3AA80] hover:bg-[#ebe9e4] text-white font-semibold py-2 rounded focus:outline-none transition-colors duration-150 ease-in-out"
                onClick={() => handleDelete(item._id)} // Pass item._id here
              >
                Delete from Cart
              </button>
            </div>
          ))}
           
        </div>
      )}
      <div className=' flex justify-end mt-10'>
      <p className="text-gray-600 mb-8 text-lg">
        Total items: <span className="font-bold">{cartItems.length}</span><br/>
        Total price: <span className="font-bold">${totalPrice.toFixed(2)}</span>
      </p>
      </div>
      <button  className='bg-[#C3AA80] p-3 rounded-lg w-full'>Order Now</button>
    </div>
    
  );
};

export default Cart;
