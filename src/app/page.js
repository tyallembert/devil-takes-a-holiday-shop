
import AllProducts from "./AllProducts";
import CartButton from "./_components/CartButton";

async function getData() {
  const url = new URL('http://localhost:3000');
  url.pathname = '/api/products';
  const data = await fetch(url);
  if(!data.ok) {
    console.error("Error fetching data")
    return;
  }
  const dataJSON = await data.json();
  const products = dataJSON.products.edges.map(({ node }) => {
    // maybe put in if statement to check if some part of node is null
    return (
      {
        id: node.variants.edges[0].node.id,
        title: node.title,
        description: node.description,
        handle: node.handle,
        price: node.variants.edges[0].node.price.amount,
        currencyCode: node.variants.edges[0].node.price.currencyCode,
        imageSRC: node.images.edges[0].node.originalSrc,
        altText: node.images.edges[0].node.altText
      }
    )
  }).filter(product => product.id !== "");
  // const products=null;

  return products;
}
export default async function Home() {
  const products = await getData();
  return (
    <>
    <CartButton />
    <AllProducts products={products}/>
    </>
  );
}
