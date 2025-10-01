import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row, Spinner, Table, Form, Modal } from "react-bootstrap";
import { API_BASE_URL, PATH } from "../config/url";
import axios from "axios";

export default function ProductDetailPage({ user }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}${PATH.PRODUCT_DETAIL}/${id}`);
      setProduct(res.data);
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

  const handleAddToCart = async () => {
    if (!user) return alert("로그인 후 이용해주세요.");
    if (quantity < 1) return alert("수량은 1개 이상이어야 합니다.");
    try {
      await axios.post(
        `${API_BASE_URL}${PATH.CART_INSERT}`,
        { productId: product.id, quantity: quantity },
        { params: { memberId: user.id } }
      );
      alert("상품이 장바구니에 추가되었습니다.");
      navigate(PATH.CART);
    } catch (err) {
      console.error("장바구니 추가 실패:", err);
    }
  };

  const handleBuyNowClick = () => {
    if (!user) return alert("로그인 후 이용해주세요.");
    if (quantity < 1) return alert("수량은 1개 이상이어야 합니다.");
    setShowConfirm(true);
  };

  const handleOrder = async () => {
    setShowConfirm(false);
    try {
      const res = await axios.post(`${API_BASE_URL}${PATH.ORDER}`, {
      memberId: user.id,
      orderStatus: "PENDING",
      orderItems: [
        {
          cartProductId: 0, // 장바구니 거치지 않으므로 더미값
          productId: product.id,
          quantity: quantity,
        },
      ],
    });
      alert(res.data);
      navigate(PATH.ORDER_LIST);
    } catch (err) {
      console.error("주문 실패:", err);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" />
        <h3>상품 정보를 읽어오는 중입니다.</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
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
                <Col xs={4} className="text-center">
                  <strong>구매 수량</strong>
                </Col>
                <Col xs={4}>
                  <Form.Control
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={!user}
                  />
                </Col>
              </Form.Group>

              <div className="d-flex justify-content-center mt-3">
                <Button
                  variant="success"
                  className="me-3 px-4"
                  onClick={() => navigate(PATH.PRODUCT_LIST)}
                >
                  목록으로
                </Button>
                <Button
                  variant="primary"
                  className="me-3 px-4"
                  onClick={handleAddToCart}
                >
                  장바구니에 담기
                </Button>
                <Button
                  variant="danger"
                  className="me-3 px-4"
                  onClick={handleBuyNowClick}
                >
                  바로 구매하기
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>구매 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>{product.name}</strong>을(를) {quantity}개 구매하시겠습니까?
          </p>
          <p className="text-muted">
            총 금액: <strong>{(product.price * quantity).toLocaleString()}원</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            취소
          </Button>
          <Button variant="danger" onClick={handleOrder}>
            구매 확정
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}