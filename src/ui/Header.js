import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "./../config/appName";

function App() {

  const navigate = useNavigate(); // useNavigate는 React Router의 hook이기 때문에 컴포넌트 함수 내부에서 호출해서 변수로 저장한 뒤 사용해야함

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">{APP_NAME}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="">상품 보기</Nav.Link>
          <Nav.Link onClick={()=>navigate(`/member/login`)}>로그인</Nav.Link>
          <Nav.Link onClick={()=>navigate(`/member/signup`)}>회원가입</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Example Dropdown">
            <NavDropdown.Item onClick={()=>navigate(`/fruit`)}>과일 1개</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>navigate(`/fruit/list`)}>과일 목록</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={()=>navigate(`/element`)}>IT Cafe</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default App;