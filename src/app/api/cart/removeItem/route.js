import { shopifyClient } from "@/utils/shopify/shopifyFetch";

export async function POST(req) {
    const { lineIds, cartId } = await req.json();
    console.log("REMOVING ITEM FROM CART");
    console.log("=============================")
    console.log("LINE IDS: ", lineIds)
    const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                        id
                        image {
                          altText
                          originalSrc
                        }
                        price {
                          amount
                          currencyCode
                        }
                        product {
                          title
                          description
                        }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
      
    `;
    const {data, errors, extensions} = await shopifyClient.request(query, {
      variables: {
        cartId: cartId,
        lineIds: lineIds
      }
    });
    if(errors) {
      console.error(JSON.stringify(errors, null, 2));
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