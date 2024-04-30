import { shopifyClient } from "@/utils/shopify/shopifyFetch";

export async function GET() {
    const query = `
    query {
      products(first: 50) {
        edges {
          node {
            id
            title
            description
            handle
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const {data, errors, extensions} = await shopifyClient.request(query);
  console.log(JSON.stringify(errors, null, 4))
  if(errors) {
    console.error(errors);
    return new Response(JSON.stringify(errors), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      } 
    });
  }
  return new Response(JSON.stringify(data), { 
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    } 
  });
}