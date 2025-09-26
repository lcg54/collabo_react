import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { API_BASE_URL, API_PATH } from "../config/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductInsertPage() {
  const [formData, setFormData] = useState({ name: "", price: "", category: "", stock: "", image: "", description: "" });
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
      const response = await axios.post(`${API_BASE_URL}${API_PATH.PRODUCT_INSERT}`, formData);
      if (response.status === 201) {
        alert(response.data);
        navigate(API_PATH.PRODUCT_LIST);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors((prev) => ({ ...prev, ...err.response.data }));
      } else {
        alert("서버와의 통신 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Container className="my-5">
      <h1  className="my-4">상품 등록</h1>
      <Row>
        <Col md={8}>
          <Form onSubmit={handleSubmit} noValidate>
            
            <Form.Group className="mb-3">
              <Form.Label>상품명</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                placeholder="상품명을 입력해주세요."
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>가격</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                placeholder="가격을 입력해주세요."
                onChange={handleChange}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>카테고리</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                isInvalid={!!errors.category}
              >
                <option value="">카테고리를 선택하세요</option>
                <option value="BREAD">빵</option>
                <option value="BEVERAGE">음료수</option>
                <option value="CAKE">케이크</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>재고</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                placeholder="재고를 입력해주세요."
                onChange={handleChange}
                isInvalid={!!errors.stock}
              />
              <Form.Control.Feedback type="invalid">
                {errors.stock}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>이미지</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                placeholder="이미지 URL을 입력해주세요."
                onChange={handleChange}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>상품 설명</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                placeholder="상품에 대한 설명을 입력해주세요."
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Button className="mt-3" variant="success" type="submit">
              상품 등록
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
