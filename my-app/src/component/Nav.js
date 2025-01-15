import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu toggle
  const auth = localStorage.getItem('user');
  const admin = localStorage.getItem('admin');
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state);

  const logout = () => {
    localStorage.clear();
    
    navigate('/signup');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the mobile menu
  };

  return (
    <div className='w-full fixed z-10'>
      <nav className="flex items-center justify-between bg-[#F2EDE6] p-2 w-full h-[64px]">
        <div className="flex items-center">
          <img className="w-8 h-8 mr-2 rounded-lg" src="T.png" alt="logo" />
          <span className='text-xl'>
            <Link to="/" className='text-black p-2 rounded-lg font-ovo'>Jiyaji Tailor</Link>
          </span>
        </div>

        {/* Mobile menu toggle button */}
        <button onClick={toggleMenu} className="block md:hidden ml-auto">
          <span className="text-black">☰</span>
        </button>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex md:items-center md:justify-center flex-1">
          <ul className='flex space-x-16'>
            <li>
              <Link to="/products" className='text-black p-2 rounded-lg hover:bg-[#C3AA80] font-ovo'>Products</Link>
            </li>
  
           { admin&&<li>
              <Link to="/add" className='text-black p-2 rounded-lg hover:bg-[#C3AA80]'>Add Products</Link>
            </li>}
            <li>
              <Link to="/cart" className='text-black p-2 rounded-lg font-ovo hover:bg-[#C3AA80]'>Cart - {cart.length}</Link>
            </li>
            <li>
              {auth ? (
                <Link onClick={logout} to={'/signup'} className='text-black font-ovo'>LOGOUT</Link>
              ) : (
                <Link to={'/signup'} className='text-black font-ovo'>SIGNUP</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#F2EDE6] p-4">
          <ul className='flex flex-col space-y-2'>
            <li>
              <Link to="/products" className='text-black p-2 rounded-lg hover:bg-[#C3AA80]'>Products</Link>
            </li>
            
            {/* <li>
              <Link to="/add" className='text-black p-2 rounded-lg hover:bg-[#C3AA80]'>Add Products</Link>
            </li> */}
            <li>
              <Link to="/cart" className='text-black p-2 rounded-lg hover:bg-[#C3AA80]'>Cart - {cart.length}</Link>
            </li>
            <li>
              {auth ? (
                <Link onClick={logout} to={'/signup'} className='text-black'>LOGOUT</Link>
              ) : (
                <Link to={'/signup'} className='text-black'>SIGNUP</Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
