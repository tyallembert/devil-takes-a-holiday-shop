import { shopifyClient } from "@/utils/shopify/shopifyFetch";

export async function POST(req) {
    const { lines, cartId } = await req.json();
    const formattedLines = lines.map((line) => {
      return {
        quantity: line.quantity,
        merchandiseId: line.merchandiseId
      }
    });
    const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!){
        cartLinesAdd(cartId: $cartId, lines: $lines) {
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
        lines: formattedLines
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