import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row, Spinner, Table, Form } from "react-bootstrap";
import { API_BASE_URL, API_PATH } from "../config/api";
import axios from "axios";

export default function ProductDetailPage({ user }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}${API_PATH.PRODUCT_DETAIL}/${id}`);
      setProduct(response.data);
    } catch (err) {
      alert("서버와의 통신 중 오류가 발생했습니다.");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" />
        <h3>상품 정보를 읽어오는 중입니다.</h3>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Card>
        <Row className="g-0">
          <Col md={4}>
            <Card.Img
              variant="top"
              src={`${API_BASE_URL}/images/${product.image}`}
              alt={product.name}
              style={{ width: '100%', height: '380px', objectFit: "cover" }}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className="fd-3">
                {product.name}
              </Card.Title>
              <Table striped>
                <tbody>
                  {[
                    { label: "가격", value: `${product.price.toLocaleString()}원` },
                    { label: "카테고리", value: product.category },
                    { label: "재고", value: `${product.stock}개` },
                    { label: "설명", value: product.description },
                    { label: "등록일", value: product.regDate },
                  ].map(field => (
                    <tr key={field.value}>
                      <th className="text-center" style={{ width: "30%" }}>
                        {field.label}
                      </th>
                      <td>{field.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Form.Group as={Row} className="mb-3 align-items-center">
                <Col xs={3} className="text-center">
                  <strong>구매 수량</strong>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="number"
                    min="1"
                    disabled={!user}
                  />
                </Col>
              </Form.Group>
              <div className="d-flex justify-content-center mt-3">
                <Button
                  variant="primary"
                  className="me-3 px-4"
                  onClick={() => navigate(API_PATH.PRODUCT_LIST)}
                >
                  목록으로
                </Button>
                <Button
                  variant="success"
                  className="me-3 px-4"
                  onClick={() => navigate('/')}
                >
                  장바구니
                </Button>
                <Button
                  variant="danger"
                  className="me-3 px-4"
                  onClick={() => navigate('/')}
                >
                  구매하기
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}