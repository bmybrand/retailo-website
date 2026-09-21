export const PRODUCT_BASE_URL = "https://ecom.resolutedigitalspk.com";

export const productLinks = {
  register: `${PRODUCT_BASE_URL}/register`,
  signIn: `${PRODUCT_BASE_URL}/signin`,
  dashboard: `${PRODUCT_BASE_URL}/dashboard`,
  orders: `${PRODUCT_BASE_URL}/orders`,
  shipments: `${PRODUCT_BASE_URL}/shipments`,
  products: `${PRODUCT_BASE_URL}/products`,
  customers: `${PRODUCT_BASE_URL}/customers`,
  website: `${PRODUCT_BASE_URL}/developer-storefront`,
  stores: `${PRODUCT_BASE_URL}/store-management`,
  locations: `${PRODUCT_BASE_URL}/settings/locations`,
  delivery: `${PRODUCT_BASE_URL}/shippingAutomation`,
  taxes: `${PRODUCT_BASE_URL}/settings/taxes`,
  payments: `${PRODUCT_BASE_URL}/settings/payments`,
  discounts: `${PRODUCT_BASE_URL}/settings/coupons`,
  team: `${PRODUCT_BASE_URL}/team-members`,
  settings: `${PRODUCT_BASE_URL}/generalSettings`,
  security: `${PRODUCT_BASE_URL}/security`,
  notifications: `${PRODUCT_BASE_URL}/notifications`,
} as const;
