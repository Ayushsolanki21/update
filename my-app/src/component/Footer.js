import React from "react";

const Footer = () => {

 
  return (
    <footer className="bg-[#F2EDE6] text-white p-8 md:p-12 w-full">
      <div className="flex flex-col lg:flex-row mb-12 lg:mb-36">
        <div className="mx-4 lg:mx-12 mb-6 lg:mb-0">
          <ul>
            <li className="text-lg lg:text-xl mb-2">Most Trending</li>
            <li className="mb-1">Relax Shirt</li>
            <li className="mb-1">Oxford Shirt</li>
            <li className="mb-1">Air Pant</li>
            <li className="mb-1">Lounge Pant</li>
          </ul>
        </div>
        <div className="mx-4 lg:mx-12 mb-6 lg:mb-0">
          <ul>
            <li className="text-lg lg:text-xl mb-2">Support</li>
            <li className="mb-1">Returns Or Exchange</li>
            <li className="mb-1">Track Your Order</li>
            <li className="mb-1">FAQs</li>
            <li className="mb-1">Contact Us</li>
            <li className="mb-1">Return & Exchange Policy</li>
          </ul>
        </div>
        <div className="mx-4 lg:mx-12 mb-6 lg:mb-0">
          <ul>
            <li className="text-lg lg:text-xl mb-2">Information</li>
            <li className="mb-1">About us</li>
            <li className="mb-1">All Reviews</li>
            <li className="mb-1">Privacy Policy</li>
            <li className="mb-1">Terms of Service</li>
            <li className="mb-1">Sitemap</li>
          </ul>
        </div>
        <div className="mx-4 lg:mx-12">
          <ul>
            <li className="text-lg lg:text-xl mb-2">Most Trending</li>
            <li className="mb-1">Relax Shirt</li>
            <li className="mb-1">Oxford Shirt</li>
            <li className="mb-1">Air Pant</li>
            <li className="mb-1">Lounge Pant</li> 
          </ul>
        </div>
      </div>

      <div className="container mx-auto text-center">
        <p className="mb-2 text-sm md:text-base">© 2024 Jiyaji Tailor. All Rights Reserved.</p>
        <p className="text-sm md:text-base">Contact Us: 992-670-0868 | Jiyaji@tailor.com</p>
      </div>
    </footer>
  );
};

export default Footer;
