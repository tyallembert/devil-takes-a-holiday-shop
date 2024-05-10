import { shopifyClient } from "@/utils/shopify/shopifyFetch";

export async function POST(req) {
    const { lines, cartID } = await req.json();
    console.log("ADDING TO CART");
    console.log("=============================")
    const query = `
    mutation {
        cartLinesUpdate(
          cartId: ${cartID}
          lines: [
            ${
            lines.map(line => {
                return `
                {
                    quantity: ${line.quantity},
                    merchandiseId: "${line.merchandiseId}"
                }
                `
            }).join(",")
            }
          ]
        ) {
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
    const {data, errors, extensions} = await shopifyClient.request(query);
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