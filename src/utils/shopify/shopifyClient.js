import {createStorefrontApiClient} from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-04',
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});