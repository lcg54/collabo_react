import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../config/appName";
import { PATH } from "../config/url";

export default function Header({ user, setUser }) {
  const navigate = useNavigate(); // useNavigate는 React Router의 hook이기 때문에 컴포넌트 함수 내부에서 호출해서 변수로 저장한 뒤 사용해야함

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      navigate(PATH.HOME);
      alert("로그아웃 되었습니다.");
      setTimeout(() => {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        setUser(null);
      }, 0);
    }
  };

  function ChangeNavbarByLogin() {
    switch (user?.role) { // Optional Chaining : null 또는 undefined일때 그냥 .으로 접근하면 에러가 뜨므로 ?.으로 에러 방지
      case "ADMIN":
        return (
          <>
            <Nav.Link onClick={() => navigate(PATH.PRODUCT_INSERT)}>상품등록</Nav.Link>
            <Nav.Link onClick={() => navigate(PATH.CART)}>장바구니</Nav.Link>
            <Nav.Link onClick={() => navigate(PATH.ORDER_LIST)}>주문내역</Nav.Link>
            <Nav.Link onClick={() => navigate(PATH.INFO)}>내 정보</Nav.Link>
            <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
          </>
        );
      case "USER":
        return (
          <>
            <Nav.Link onClick={() => navigate(PATH.CART)}>장바구니</Nav.Link>
            <Nav.Link onClick={() => navigate(PATH.ORDER_LIST)}>주문내역</Nav.Link>
            <Nav.Link onClick={() => navigate(PATH.INFO)}>내 정보</Nav.Link>
            <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
          </>
        );
      default:
        return (
          <>
            <Nav.Link onClick={() => navigate(PATH.LOGIN)}>로그인</Nav.Link>
            <Nav.Link onClick={() => navigate(PATH.SIGNUP)}>회원가입</Nav.Link>
          </>
        );
    }
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href={PATH.HOME}>{APP_NAME}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate(PATH.PRODUCT_LIST)}>상품목록</Nav.Link>
          <ChangeNavbarByLogin />
        </Nav>
        <Nav>
          <NavDropdown title="Example Dropdown">
            <NavDropdown.Item onClick={() => navigate(PATH.FRUIT)}>과일 1개</NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate(PATH.FRUIT_LIST)}>과일 목록</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => navigate(PATH.ELEMENT)}>IT Cafe</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}