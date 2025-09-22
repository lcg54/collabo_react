import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../constant/appName";
import { API_PATH } from "../config/api";

export default function Header({ user, setUser }) {
  const navigate = useNavigate(); // useNavigate는 React Router의 hook이기 때문에 컴포넌트 함수 내부에서 호출해서 변수로 저장한 뒤 사용해야함

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      setUser(null);
      navigate(API_PATH.HOME);
    }
  };

  function ChangeNavbarByLogin() {
    switch (user?.role) { // Optional Chaining : null 또는 undefined일때 그냥 .으로 접근하면 에러가 뜨므로 ?.으로 에러 방지
      case "ADMIN":
        return (
          <>
            <Nav.Link onClick={() => navigate('/')}>상품 등록</Nav.Link>
            <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
          </>
        );
      case "USER":
        return (
          <>
            <Nav.Link onClick={() => navigate(`/`)}>장바구니</Nav.Link>
            <Nav.Link onClick={() => navigate(`/`)}>주문 내역</Nav.Link>
            <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
          </>
        );
      default:
        return (
          <>
            <Nav.Link onClick={() => navigate(API_PATH.LOGIN)}>로그인</Nav.Link>
            <Nav.Link onClick={() => navigate(API_PATH.SIGNUP)}>회원가입</Nav.Link>
          </>
        );
    }
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">{APP_NAME}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate(`/`)}>상품 보기</Nav.Link>
          <ChangeNavbarByLogin />
        </Nav>
        <Nav>
          <NavDropdown title="Example Dropdown">
            <NavDropdown.Item onClick={() => navigate(API_PATH.FRUIT)}>과일 1개</NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate(API_PATH.FRUIT_LIST)}>과일 목록</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => navigate(API_PATH.ELEMENT)}>IT Cafe</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}