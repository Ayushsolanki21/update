import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './component/Nav';
import Signup from './component/Signup';
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import Products from './component/Products';
import Cart from './component/Cart';
import Update from './component/Update';
import Home from './component/Home';
import Footer from './component/Footer';
import AdminRoute from './component/adminepanel/Admin'; // Import AdminPanel
import Singeproduct from './component/Singeproduct';
import Loginprotected from './component/adminepanel/Loginprotected';
const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/product/:id" element={<Singeproduct/>} />          
            <Route element={<AdminRoute />}>
              <Route path="/add" element={<AddProduct />} />
            </Route>
          </Route>
          <Route element={<Loginprotected />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
