import { shopifyClient } from "@/utils/shopify/shopifyFetch";

export async function POST(req) {
    const { slug } = await req.json();
    const query = `
    query {
      productByHandle(handle: "${slug}") {
        id
        title
        description
        handle
        variants(first: 5) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
        options {
          id
          name
          values
        }
        images(first: 5) {
          edges {
            node {
              id
              originalSrc
              altText
              width
              height
            }
          }
        }
      }
    }
    `;
    const {data, errors, extensions} = await shopifyClient.request(query);
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