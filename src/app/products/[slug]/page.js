import Image from 'next/image';
import React from 'react'

async function getData(slug) {
  console.log("GETTING DATA")
  console.log("===================================")
  const url = new URL('http://localhost:3000');
  url.pathname = `/api/products/getDetails`;
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug: slug })
  });
  if(!data.ok) {
    console.error("Error fetching data")
    return;
  }
  const dataJSON = await data.json();
  console.log("===================================")
  console.log(JSON.stringify(dataJSON, null, 2))
  const product = {
    id: dataJSON.productByHandle.id || "",
    title: dataJSON.productByHandle.title || "",
    description: dataJSON.productByHandle.description || "",
    handle: dataJSON.productByHandle.handle || "",
    price: dataJSON.productByHandle.variants.edges[0].node.price.amount || "",
    currencyCode: dataJSON.productByHandle.variants.edges[0].node.price.currencyCode || "",
    imageSRC: dataJSON.productByHandle.images.edges[0].node.originalSrc || "",
    altText: dataJSON.productByHandle.images.edges[0].node.altText || ""
  
  };
  return product;
}
async function ProductDetails({ params }) {
  const productDetails = await getData(params.slug);
  return (
    <div>
      <h2>Product Details</h2>
      <p>{params.slug}</p>
      <Image src={productDetails.imageSRC} alt={productDetails.altText} width={300} height={500}/>
    </div>
  )
}

export default ProductDetails