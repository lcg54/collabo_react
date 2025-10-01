import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Spinner, Button, ListGroup } from "react-bootstrap";
import { API_BASE_URL, PATH } from "../config/url";
import axios from "axios";

export default function OrderListPage({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}${PATH.ORDER_LIST}`, {
        params: { memberId: user.id },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("주문 내역 조회 실패:", err);
      alert("주문 내역을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <h3>주문 내역을 불러오는 중입니다.</h3>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h4 className="text-muted mb-3">주문 내역이 없습니다.</h4>
        <Button variant="primary" onClick={() => navigate(PATH.PRODUCT_LIST)}>
          상품 보러 가기
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">
        <span style={{ fontSize: "2rem" }}>📋 주문내역</span>
      </h2>

      <Row xs={1} md={2} lg={2} className="g-4">
        {orders.map(order => (
          <Col key={order.orderId}>
            <Card>
              <Card.Body>
                <Card.Title>
                  주문번호: {order.orderId}{order.orderDate}
                </Card.Title>
                <Card.Subtitle className="mt-2 text-muted">
                  상태: {order.orderStatus}
                </Card.Subtitle>
                <Card.Body>
                  {order.orderItems.map(item => (
                    <li key={item.productId}>
                      {item.productName} x {item.quantity}
                    </li>
                  ))}
                </Card.Body>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}