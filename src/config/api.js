const API_HOST = "localhost"; // 호스트 컴퓨터 이름 (127.0.0.1)
const API_PORT = "9000"; // 스프링부트 포트번호
export const API_BASE_URL = `http://${API_HOST}:${API_PORT}`;

export const API_PATH = {
  HOME: '/',
  LOGIN: '/member/login',
  SIGNUP: '/member/signup',

  PRODUCT_DETAIL: '/product/detail',
  PRODUCT_LIST: '/product/list',
  PRODUCT_INSERT: '/product/insert',
  PRODUCT_UPDATE: '/product/update',
  PRODUCT_DELETE: '/product/delete',

  CART: '/cart',
  CART_INSERT: '/cart/insert',
  CART_DELETE: '/cart/delete',

  ORDER: '/order',
  ORDER_LIST: '/order/list',
  
  FRUIT: '/fruit',
  FRUIT_LIST: '/fruit/list',
  ELEMENT: '/element',
};