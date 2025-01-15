import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddCart } from './redux/Cartsytem';

const Products = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = localStorage.getItem('admin');

  async function getData() {
    try {
      let response = await fetch('http://localhost:5001/products', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      let products = await response.json();
      if (Array.isArray(products)) {
        setData(products);
      } else {
        console.error('Expected an array of products, received:', products);
        setData([]); // Set to empty array if not valid
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleQuantityChange = (id, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: quantity,
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1; // Default to 1 if not set
    // Create a new product object with the selected quantity
    const productWithQuantity = { ...product, quantity };
    dispatch(AddCart(productWithQuantity));
  };

  const handleDeleteCart = async (id) => {
    try {
      let deleteitem = await fetch(`http://localhost:5001/delete/${id}`, {
        method: 'DELETE',
      });
      deleteitem = await deleteitem.json();
      console.log(deleteitem);
      getData(); // Refresh product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const filteredData = data.filter((item) =>
    item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const incrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 1) - 1, 1),
    }));
  };

  return (
    <div className="flex flex-col items-center bg-[#EBE4DB] h-max">
      <div className='mt-10'>
        <video
          className="w-36 h-22 mr-2 mb-10 mt-10 rounded-lg"
          src="T.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ objectFit: 'cover' }}
        />
      </div>

      <input
        type="text"
        placeholder="Search products..."
        className="mb-5 px-4 py-1 border border-gray-300 rounded w-full max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredData.length === 0 && <p>No products found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-6">
        {filteredData.map((item, index) => (
          <div key={index} className="border border-black p-5 rounded-lg shadow-lg">
            <img
              src={`http://localhost:5001${item.image}`} // Use the image property for the product image
              alt={item.name}
              className="w-full h-60 object-cover rounded-lg mb-4 transform transition-transform duration-300 hover:scale-105 hover:cursor-zoom-in" // Adjust size as needed
            />
            <h2 className="font-bold text-lg mb-2 font-ovo">{item.name}</h2>
            <p className="text-gray-700 font-ovo">Price: ${item.price}</p>
            <p className="text-gray-700 font-ovo">Category: {item.category}</p>
            <p className="text-gray-700 font-ovo">Company: {item.company}</p>
            <div className="flex items-center mb-2 mt-2 font-ovo">
              <span className="font-ovo mr-2">Quantity:</span>
              <button 
                className="px-2 py-1 bg-gray-300 rounded-l" 
                onClick={() => decrementQuantity(item._id)}
              >-</button>
              <span className="px-4 py-1 bg-white border-t border-b">{quantities[item._id] || 1}</span>
              <button 
                className="px-2 py-1 bg-gray-300 rounded-r" 
                onClick={() => incrementQuantity(item._id)}
              >+</button>
            </div>
            <div className={`flex justify-center ${admin ? 'space-x-3' : ''}`}>
              <button
                className={`mt-3 ${admin ? '' : 'w-full'} bg-[#C3AA80] hover:bg-[#977337] text-[white] font-ovo px-4 py-2 rounded`}
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
              {admin && (
                <>
                  <button
                    className="mt-3 bg-[#C3AA80] hover:bg-[#977337] text-[white] px-4 py-2 rounded"
                    onClick={() => handleDeleteCart(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="mt-3 bg-[#C3AA80] hover:bg-[#977337] text-[white] px-4 py-2 rounded"
                    onClick={() => handleUpdate(item._id)}
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
