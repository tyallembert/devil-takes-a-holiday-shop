import React from 'react';
import ProductPage from './ProductPage';
import { CartProvider } from '@shopify/hydrogen-react';

async function getData(slug) {
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
  const product = {
    id: dataJSON.productByHandle.id,
    title: dataJSON.productByHandle.title,
    description: dataJSON.productByHandle.description,
    handle: dataJSON.productByHandle.handle,
    variantId: dataJSON.productByHandle.variants.edges[0].node.id,
    price: dataJSON.productByHandle.variants.edges[0].node.price.amount,
    currencyCode: dataJSON.productByHandle.variants.edges[0].node.price.currencyCode,
    imageSRC: dataJSON.productByHandle.images.edges[0].node.originalSrc,
    altText: dataJSON.productByHandle.images.edges[0].node.altText
  
  };
  return product;
}

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN;
const version = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION;

async function ProductDetails({ params }) {
  const productDetails = await getData(params.slug);
  return (
    <ProductPage productDetails={productDetails} domain={domain} token={token} version={version}/>
  )
}

export default ProductDetails