import { useState } from "react";
import { Button, Card, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 입력값을 실시간으로 State에 반영
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // 폼 제출 (type="submit" 감지 시 동작)
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본동작(=새로고침) 막기

    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = '유효한 이메일 형식이 아닙니다.';
    if (formData.password.length < 6) newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // 에러가 존재하면 아래 try 구문으로 안내려가고 탈출 // else보다 이 방식을 권장
    }

    try {
      // axios를 사용한 POST 요청
      await axios.post(`${API_BASE_URL}/member/signup`, formData);

      setFormData({ name: '', email: '', password: '', address: '' });
      setErrors({});
      alert('회원 가입에 성공하였습니다. 로그인 페이지로 이동합니다.');
      navigate(`/member/login`);

    } catch (error) {
      console.error("회원가입 중 에러 발생:", error);
    }
  };

  const fields = [
    { label: '이메일', name: 'email', type: 'email', placeholder: '이메일을 입력해 주세요.' },
    { label: '비밀번호', name: 'password', type: 'password', placeholder: '비밀번호를 입력해 주세요.' },
  ];

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">로그인</h2>
              <Form onSubmit={handleSubmit} noValidate>{/* 브라우저가 자체 제공하는 유효성 검사 메시지를 차단 */}
                {fields.map(field => (
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
                <Button className="w-100 mt-3 mb-2" variant="primary" type="submit">로그인</Button>
                <Button className="w-100 mt-3 mb-2" variant="outline-secondary" type="submit">회원가입</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
