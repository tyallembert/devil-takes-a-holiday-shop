import styles from "./page.module.scss";
import Link from "next/link";

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
        id: node.id || "",
        title: node.title || "",
        description: node.description || "",
        handle: node.handle || "",
        price: node.variants.edges[0].node.price.amount || "",
        currencyCode: node.variants.edges[0].node.price.currencyCode || "",
        imageSRC: node.images.edges[0].node.originalSrc || "",
        altText: node.images.edges[0].node.altText || ""
      }
    )
  }).filter(product => product.id !== "");
  // const products=null;

  return products;
}
export default async function Home() {
  const products = await getData();
  return (
    <main className={styles.main}>
      <h1>DTAH Store</h1>
      <div className={styles.allProducts}>
      {
        products ? (
          products.map(( product ) => (
            <Link key={product.id} href={`/products/${product.handle}`} className={styles.productContainer}>
              <img src={product.imageSRC} alt={product.altText} />
              <div className={styles.textContainer}>
                <h2>{product.title}</h2>
                <p>${product.price}</p>
              </div>
            </Link>
          ))
        ):null
      }
      </div>
    </main>
  );
}
