import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("company", company);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5001/addproduct", {
        method: "POST",
        body: formData,
        credentials: 'include'
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Product submitted successfully:", result);
      navigate("/");
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2Eee9]">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full lg:w-3/4 xl:w-2/3 mt-29">
        <img
          className="w-full lg:w-1/2 h-full object-cover hidden lg:block"
          src="one.jpg"
          alt="logo"
        />
        <div className="relative w-full lg:w-1/2 p-8 flex flex-col justify-center bg-white lg:bg-transparent">
          <div className="flex justify-center mb-4">
            <img
              className="w-16 h-16 rounded-full"
              src="T.png"
              alt="logo"
            />
          </div>
          <h1 className="text-3xl text-center text-[#563113] font-ovo mb-6">Jiyaji Tailor</h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                name="price"
                id="price"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Price"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">Category</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                id="category"
                className="w-full border border-gray-300 p-2 rounded-lg"
                required
              >
                <option value="">Select a category</option>
                <option value="shirts">Shirts</option>
                <option value="trousers">Trousers</option>
                <option value="cargos-joggers">Cargos & Joggers</option>
                <option value="shorts">Shorts</option>
                <option value="kurta-pajama">Kurta Pajama</option>
              </select>
            </div>
            <div>
              <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700">Company</label>
              <input
                onChange={(e) => setCompany(e.target.value)}
                type="text"
                name="company"
                id="company"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Company"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">Image</label>
              <input
                onChange={handleFileChange}
                type="file"
                name="image"
                id="image"
                className="w-full border border-gray-300 p-2 rounded-lg"
                required
              />
            </div>
            <button
              onClick={submitProduct}
              type="button"
              className="w-full text-white bg-[#563100] rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
