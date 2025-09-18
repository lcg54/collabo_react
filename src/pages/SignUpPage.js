import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function App({ InsertMember }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '' });

  // 입력값을 실시간으로 상태에 반영
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 폼 제출 (type="submit" 감지 시 동작)
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 기본동작(=새로고침) 막기
    InsertMember(formData);
    setFormData({ name: '', email: '', password: '', address: '' })
  };

  const fields = [
    { label: '이름', name: 'name', type: 'text', placeholder: '이름을 입력해 주세요.' },
    { label: '이메일', name: 'email', type: 'email', placeholder: '이메일을 입력해 주세요.' },
    { label: '비밀번호', name: 'password', type: 'password', placeholder: '비밀번호를 입력해 주세요.' },
    { label: '주소', name: 'address', type: 'text', placeholder: '주소를 입력해 주세요.' }
  ];

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">회원 가입</h2>
              <Form onSubmit={handleSubmit}>
                {fields.map(field => (
                  <Form.Group className="mb-3" key={field.name}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                ))}
                <Button
                  className="w-100 mt-4 mb-1"
                  variant="outline-primary"
                  type="submit"
                >회원 가입</Button>
              </Form>
            </Card.Body>  
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;