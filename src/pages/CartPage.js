import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, API_PATH } from "../config/api";
import { Container, Table, Row, Col, Form, Button, Image } from "react-bootstrap";
import axios from "axios";

export default function CartPage({ user }) {
  const [cart, setCart] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}${API_PATH.CART}`, { params: { memberId: user.id } });
      setCart(res.data);
    } catch (err) {
      console.log("장바구니 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckBox = (itemId) => {
    setCheckedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const toggleAllCheckBox = (checked) => {
    if (checked && cart) setCheckedItems(cart.items.map(item => item.id));
    else setCheckedItems([]);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCart(prev => ({
      ...prev, items: prev.items.map(item =>
        item.id === itemId ? { ...item, quantity: Number(newQuantity) } : item
      ),
    }));
  };

  const handleOrder = async () => {
    if (checkedItems.length === 0) {
      alert("주문할 상품을 선택하세요.");
      return;
    }
    const selectedItems = cart.items.filter(item => checkedItems.includes(item.id));
    try {
      const res = await axios.post(`${API_BASE_URL}${API_PATH.ORDER}`, {
        memberId: user.id,
        orderStatus: "PENDING",
        orderItems: selectedItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        }))
      });
      window.confirm()
      alert(res.data);
      fetchCart(); // 장바구니 갱신
      setCheckedItems([]);
    } catch (err) {
      console.error("주문 실패:", err);
      alert("주문 중 오류가 발생했습니다.");
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (!window.confirm("이 상품을 장바구니에서 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`${API_BASE_URL}${API_PATH.CART_DELETE}/${itemId}`, { params: { memberId: user.id } });
      alert("상품이 장바구니에서 삭제되었습니다.");
      fetchCart(); // 장바구니 갱신
    } catch (err) {
      console.log("삭제 실패:", err);
    }
  };

  if (loading) return <div className="text-center mt-5">로딩 중...</div>;

  if (!cart || cart.items.length === 0)
    return (
      <Container className="mt-5 text-center">
        <h4 className="text-muted mb-3">장바구니가 비어 있습니다.</h4>
        <Button variant="primary" onClick={() => navigate(API_PATH.PRODUCT_LIST)}>상품 보러 가기</Button>
      </Container>
    );

  const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">
        <span style={{ color: "blue", fontSize: "2rem" }}>{cart.memberName}</span>
        <span style={{ fontSize: "1.3rem" }}>님의 장바구니</span>
      </h2>

      <Table striped bordered>
        <thead>
          <tr>
            <th style={{ width: "8%", textAlign: "center" }}>
              <Form.Check
                type="checkbox"
                label="전체 선택"
                checked={checkedItems.length === cart.items.length}
                onChange={(e) => toggleAllCheckBox(e.target.checked)}
              />
            </th>
            <th style={{ width: "40%" }} className="text-center">상품 정보</th>
            <th style={{ width: "15%" }} className="text-center">수량</th>
            <th style={{ width: "20%" }} className="text-center">금액</th>
            <th style={{ width: "15%" }} className="text-center">삭제</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map(item => (
            <tr key={item.id}>
              <td className="text-center align-middle">
                <Form.Check
                  type="checkbox"
                  checked={checkedItems.includes(item.id)}
                  onChange={() => toggleCheckBox(item.id)}
                  style={{ transform: "scale(1.3)", cursor: "pointer" }}
                />
              </td>
              <td className="align-middle">
                <Row>
                  <Col xs={4}>
                    <Image
                      src={`${API_BASE_URL}/images/${item.productImage}`}
                      thumbnail
                      alt={item.productName}
                      width={80}
                      height={80}
                    />
                  </Col>
                  <Col xs={8} className="d-flex align-items-center">
                    {item.productName}
                  </Col>
                </Row>
              </td>
              <td className="text-center align-middle">
                <Form.Control
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  style={{ width: "80px", margin: "0 auto" }}
                />
              </td>
              <td className="text-center align-middle">
                {(item.price * item.quantity).toLocaleString()} 원
              </td>
              <td className="text-center align-middle">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end mt-3">
        <h3>총 주문 금액: {totalPrice.toLocaleString()}원</h3>
        <Button variant="primary" size="lg" onClick={handleOrder}>주문하기</Button>
      </div>
    </Container>
  );
};