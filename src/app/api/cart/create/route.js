import { shopifyClient } from "@/utils/shopify/shopifyFetch";

export async function POST(req) {
    const { line } = await req.json();
    console.log("CREATING NEW CART");
    console.log("=============================")
    const query = `
    mutation {
        cartCreate(
          input: {
            lines: [
                {
                    quantity: ${line.quantity},
                    merchandiseId: "${line.merchandiseId}"
                }
            ],
            buyerIdentity: {
              email: "tyallembert@gmail.com",
              countryCode: US,
              deliveryAddressPreferences: {
                deliveryAddress: {
                    address1: "123 Main St",
                    city: "Anytown",
                    province: "CA",
                    country: "United States",
                    zip: "12345"
                }
              }
            }
          }
        ) {
          cart {
            id
            createdAt
            updatedAt
            lines(first: 10) {
              edges {
                node {
                  id
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
            buyerIdentity {
              deliveryAddressPreferences {
                __typename
              }
            }
            attributes {
              key
              value
            }
            # The estimated total cost of all merchandise that the customer will pay at checkout.
            cost {
              totalAmount {
                amount
                currencyCode
              }
              # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
              subtotalAmount {
                amount
                currencyCode
              }
              # The estimated tax amount for the customer to pay at checkout.
              totalTaxAmount {
                amount
                currencyCode
              }
              # The estimated duty amount for the customer to pay at checkout.
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