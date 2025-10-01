import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { API_BASE_URL, PATH } from "../config/url";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProductUpdatePage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: "", price: "", category: "", stock: "", image: "", description: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}${PATH.PRODUCT_DETAIL}/${id}`);
      setFormData(response.data);
    } catch (err) {
      if (err.response && err.response.data) alert(err.response.data);
      else alert("서버와의 통신 중 오류가 발생했습니다.");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}${PATH.PRODUCT_UPDATE}/${id}`, formData);
      alert(response.data);
      navigate(PATH.PRODUCT_LIST);
    } catch (err) {
      if (err.response && err.response.data) setErrors((prev) => ({ ...prev, ...err.response.data }));
      else alert("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" />
        <h3>상품 정보를 불러오는 중입니다...</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">
        <span style={{ fontSize: "2rem" }}>✅ 상품수정</span>
      </h2>
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
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>

            <Button className="mt-3" variant="success" type="submit">수정</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}