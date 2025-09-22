import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { API_BASE_URL, API_PATH } from "../config/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", address: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 입력값을 실시간으로 State에 반영
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // 폼 제출 (type="submit" 감지 시 동작)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본동작(=새로고침) 막기
    try {
      const response = await axios.post(`${API_BASE_URL}${API_PATH.SIGNUP}`,formData); // axios를 사용한 post 요청
      if (response.status == 201) {
        setFormData({ name: "", email: "", password: "", address: "" });
        setErrors({});
        alert(response.data);
        navigate(API_PATH.LOGIN);
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
    { label: "이름", name: "name", type: "text", placeholder: "이름을 입력해 주세요." },
    { label: "이메일", name: "email", type: "email", placeholder: "이메일을 입력해 주세요." },
    { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호를 입력해 주세요." },
    { label: "주소", name: "address", type: "text", placeholder: "주소를 입력해 주세요." },
  ];

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">회원정보 입력</h2>
              <Form onSubmit={handleSubmit} noValidate>{/* 브라우저가 자체 제공하는 유효성 검사 메시지를 차단 */}
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
                <Button className="w-100 mt-3 mb-2" variant="outline-primary" type="submit">가입하기</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}