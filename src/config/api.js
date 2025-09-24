const API_HOST = "localhost"; // 호스트 컴퓨터 이름 (127.0.0.1)
const API_PORT = "9000"; // 스프링부트 포트번호

export const API_BASE_URL = `http://${API_HOST}:${API_PORT}`;

export const API_PATH = {
  FRUIT: '/fruit',
  FRUIT_LIST: '/fruit/list',
  ELEMENT: '/element',
  
  HOME: '/',
  LOGIN: '/member/login',
  SIGNUP: '/member/signup',
  PRODUCT: '/product',
  PRODUCT_LIST: '/product/list',
  PRODUCT_INSERT: '/product/insert',
  PRODUCT_UPDATE: '/product/update',
  PRODUCT_DELETE: '/product/delete',
};