import React, {  useEffect, useState } from 'react'
import { useNavigate ,useParams} from 'react-router-dom';


const Update = () => {
    const [name,setname]=useState();
    const [price,setprice]=useState();
    const [category,setcategory]=useState();
      const [company,setcompany]=useState();
const navigate=useNavigate();
const params=useParams();

useEffect(()=>{
    getproduct();
},[])
    const getproduct=async()=>{
   let result=await fetch(`http://localhost:5001/update/${params.id}`);
   result=await result.json();
   console.log(result)
   setname(result.name)
   setprice(result.price)
   setcategory(result.category)
   setcompany(result.company)
    }
        
 const updatedata=async()=>{
    let result=await fetch(`http://localhost:5001/update/${params.id}`,{
        method:'put',
        body:JSON.stringify({name,price,category,company}),
        headers:{
            'Content-Type':"application/json"
        }
    })
    result=await result.json();
navigate('/');
    }
    

  return (
    <div className='form'>
    <div>
   <div className="flex  justify-center bg-[#C3AA80]">
     <section className=" dark:bg-gray-900 px-32">
       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
         <img
           className="w-8 h-8 mr-2"
           src="https://cdn.pixabay.com/photo/2023/09/22/15/45/panda-8269336_1280.png"
           alt="logo"
         />
         AYUSH SHOP

         <div className="w-80  rounded-lg  border ">
           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update Product
             </h1>
             <form className="space-y-4 md:space-y-6" >
               <div>
                 <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   Name
                 </label>
                 <input
                   onChange={(e)=>{setname(e.target.value)}}
                   value={name}
                   type="text"
                   name="name"
                   id="name"
                   placeholder="Product Name"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   required
                 />
               </div>

               <div>
                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Price
                 </label>
                 <input
                   onChange={(e)=>{setprice(e.target.value)}}
                   type="text"
                   name="price"
                   id="price"
                   value={price}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Price"
                   required
                 />
               </div>
               <div>
                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Category
                 </label>
                 <input
                    onChange={(e)=>{setcategory(e.target.value)}}
                   type="text"
                   name="Category"
                   id="Category"
                   value={category}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Category"
                   required
                 />
               </div>
               

               <div>
                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Company
                 </label>
                 <input
                    onChange={(e)=>{setcompany(e.target.value)}}
                   type="text"
                   name="UCompanyserid"
                   id="Company"
                   value={company}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Company"
                   required
                 />
               </div>
               


               <button 
                 type="button" onClick={updatedata}
                 className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-[#EBE4DB]"
               >
                 Submit PRODUCT
               </button>
               
             </form>
           </div>
         </div>
       </div>
     </section>
   </div>
 </div>
    
 </div>
  )
}

export default Update
