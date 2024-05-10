import {createStorefrontApiClient} from '@shopify/storefront-api-client';

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION,
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

export async function shopifyFetch({ query, variables }) {
    const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
    const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
    try {
      const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': key
        },
        body: { query, variables } && JSON.stringify({ query, variables })
      });
  
      return {
        status: result.status,
        body: await result.json()
      };
    } catch (error) {
      return {
        status: 500,
        error: 'Error receiving data'
      };
    }
  }