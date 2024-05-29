import React from 'react';
import ProductPage from './ProductPage';

async function getData(slug) {
  const url = new URL(process.env.FETCH_URL);
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
  const images = dataJSON.productByHandle.images.edges.map((edge) => {
    return {
      id: edge.node.id,
      src: edge.node.originalSrc,
      alt: edge.node.altText,
      width: edge.node.width,
      height: edge.node.height
    }
  })
  const variants = dataJSON.productByHandle.variants.edges.map((variant) => {
    return {
      id: variant.node.id,
      options: variant.node.selectedOptions
    }
  })
  const product = {
    id: dataJSON.productByHandle.id,
    title: dataJSON.productByHandle.title,
    description: dataJSON.productByHandle.description,
    handle: dataJSON.productByHandle.handle,
    variantId: dataJSON.productByHandle.variants.edges[0].node.id,
    variants: variants,
    price: dataJSON.productByHandle.variants.edges[0].node.price.amount,
    currencyCode: dataJSON.productByHandle.variants.edges[0].node.price.currencyCode,
    options: dataJSON.productByHandle.options,
    images: images,
  
  };
  return product;
}
async function ProductDetails({ params }) {
  const productDetails = await getData(params.slug);
  return (
    <ProductPage />
  )
}

export default ProductDetails