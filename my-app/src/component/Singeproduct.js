import React, { useEffect, useState } from 'react'

const Singeproduct = () => {

    useEffect(async()=>{
     let result=await fetch('http://localhost:5001/product/${params.id}');
    result=await result.json();
    setsingleproduct(result);

    },[])

   const [singleproduct,setsingleproduct]=useState({});

  return (
    <div>
      <h1>Product:-</h1>
      {console.log(singleproduct)};
    </div>
  )
}

export default Singeproduct
