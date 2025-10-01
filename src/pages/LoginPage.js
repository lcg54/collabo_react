import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { API_BASE_URL, PATH } from "../config/url";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ setUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [keepLogin, setKeepLogin] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}${PATH.LOGIN}`,formData);
      if (response.status === 200) {
        const { message, user } = response.data;
        if (keepLogin) localStorage.setItem("user", JSON.stringify(user)); // 체크되면 localStorage에 장기저장
        else sessionStorage.setItem("user", JSON.stringify(user)); // 체크 안되면 session 동안만 단기저장
        setFormData({ email: "", password: "" });
        setErrors({});
        alert(message);
        setUser(user);
        navigate(PATH.HOME);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors((prev) => ({ ...prev, ...error.response.data }));
      } else {
        alert("서버와의 통신 중 오류가 발생했습니다.");
      }
    }
  };

  const fields = [
    { label: "이메일", name: "email", type: "email", placeholder: "이메일을 입력해 주세요." },
    { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해 주세요." },
  ];

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
      <Row className="w-100 justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">로그인</h2>
              <Form onSubmit={handleSubmit} noValidate>{/* HTML 기본 검증 비활성화 */}
                {fields.map((field) => (
                  <Form.Group className="mb-3" key={field.name}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      isInvalid={!!errors[field.name]}
                    />
                    <Form.Control.Feedback type="invalid">{errors[field.name]}</Form.Control.Feedback>
                  </Form.Group>
                ))}
                <Form.Check
                  type="checkbox"
                  label="다음에도 로그인 유지"
                  name="keepLogin"
                  checked={keepLogin}
                  onChange={(e) => setKeepLogin(e.target.checked)}
                />
                <Button className="w-100 mt-3 mb-2" variant="primary" type="submit">로그인</Button>
                <Button className="w-100 mt-2 mb-2" variant="outline-secondary"
                  onClick={() => {
                    alert("회원가입 페이지로 이동합니다.");
                    navigate(PATH.SIGNUP);
                  }}
                >회원가입</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}