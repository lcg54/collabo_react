import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Spinner, Button, ListGroup, Dropdown } from "react-bootstrap";
import { API_BASE_URL, PATH } from "../config/url";
import axios from "axios";

export default function OrderListPage({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const pendingOrders = orders.filter(order => order.orderStatus === "PENDING");
  const completeOrders = orders.filter(order => order.orderStatus === "COMPLETE");
  const canceledOrders = orders.filter(order => order.orderStatus === "CANCELED");

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}${PATH.ORDER_LIST}`, {
        params: { memberId: user.id, role: user.role },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("주문 내역 조회 실패:", err);
      alert("주문 내역을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("정말 이 주문을 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`${API_BASE_URL}${PATH.ORDER_DELETE}/${orderId}`, {
        params: { memberId: user.id, role: user.role }
      });
      alert("주문이 삭제되었습니다.");
      setOrders(orders.filter(order => order.orderId !== orderId));
    } catch (err) {
      alert(err.response?.data || "주문 내역 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}${PATH.ORDER_UPDATE}/${orderId}`, null, {
        params: { newStatus, role: user.role }
      });
      alert(`주문 상태가 '${newStatus}'(으)로 변경되었습니다.`);
      fetchOrders();
    } catch (err) {
      alert(err.response?.data || "주문 상태 변경 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <h3>주문 내역을 불러오는 중입니다...</h3>
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
      <Card>
        <Card.Body>
          {pendingOrders.length > 0 && (
            <>
              <h4 className="mt-4 mb-3">⏳ 주문 대기</h4>
              <Row xs={1} md={2} lg={2} className="g-4">
                {pendingOrders.map(order => (
                  <OrderCard key={order.orderId} order={order} user={user} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                ))}
              </Row>
            </>
          )}
          {pendingOrders.length > 0 && completeOrders.length > 0 && (<hr />)}
          {completeOrders.length > 0 && (
            <>
              <h4 className="mt-4 mb-3">✅ 주문 완료</h4>
              <Row xs={1} md={2} lg={2} className="g-4">
                {completeOrders.map(order => (
                  <OrderCard key={order.orderId} order={order} user={user} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                ))}
              </Row>
            </>
          )}
          {(pendingOrders.length > 0 || completeOrders.length > 0)&& canceledOrders.length > 0 && (<hr />)}
          {canceledOrders.length > 0 && (
            <>
              <h4 className="mt-4 mb-3">❌ 주문 취소</h4>
              <Row xs={1} md={2} lg={2} className="g-4">
                {canceledOrders.map(order => (
                  <OrderCard key={order.orderId} order={order} user={user} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                ))}
              </Row>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

function OrderCard({ order, user, onDelete, onStatusChange }) {
  return (
    <Col key={order.orderId}>
      <Card>
        <Card.Body>
          <Card.Title>
            주문번호: {order.orderId}-{order.orderDate}
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

          <div className="d-flex justify-content-end mt-3">
            {user.role === "ADMIN" && (
              <Dropdown className="me-3">
                <Dropdown.Toggle variant="outline-primary" size="sm">
                  상태 변경
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {["PENDING", "COMPLETE", "CANCELED"].map(status => (
                    <Dropdown.Item key={status} onClick={() => onStatusChange(order.orderId, status)}>
                      {status}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(order.orderId)}>
              {order.orderStatus === "PENDING" && user.role === "USER" ? "주문 취소" : "주문내역 삭제"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}