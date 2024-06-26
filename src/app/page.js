
import AllProducts from "./AllProducts";

async function getData() {
  const url = new URL(process.env.FETCH_URL);
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
        id: node.id,
        variantId: node.variants.edges[0].node.id,
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

  return products;
}
export default async function Home() {
  const products = await getData();
  return (
    <>
    <AllProducts products={products}/>
    </>
  );
}
