import { shopifyClient } from "@/utils/shopify/shopifyFetch";

export async function POST(req) {
    const { cartId } = await req.json();
    const query = `
    query retrieveCart($cartId: ID!){
        cart(
          id: $cartId
        ) {
          id
          checkoutUrl
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
                    selectedOptions {
                      name
                      value
                    }
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
    const {data, errors, extensions} = await shopifyClient.request(query,  {
      variables: {
        cartId: cartId,
      }
    });
    if(errors) {
      // console.error("ERROR: ", JSON.stringify(errors, null, 2));
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