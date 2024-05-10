import { shopifyClient } from "@/utils/shopify/shopifyFetch";

export async function POST(req) {
    const { cartID } = await req.json();
    console.log("GETTING NEW CART");
    console.log("=============================")
    const query = `
    query {
        cart(
          id: "${cartID}"
        ) {
          id
          createdAt
          updatedAt
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
                attributes {
                  key
                  value
                }
              }
            }
          }
          attributes {
            key
            value
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
          buyerIdentity {
            email
            phone
            customer {
              id
            }
            countryCode
            deliveryAddressPreferences {
              ... on MailingAddress {
                address1
                address2
                city
                provinceCode
                countryCodeV2
                zip
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