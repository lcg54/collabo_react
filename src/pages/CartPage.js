import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Row, Col, Form, Button, Image, Spinner } from "react-bootstrap";
import { API_BASE_URL, IMAGES, PATH } from "../config/url";
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
      const res = await axios.get(`${API_BASE_URL}${PATH.CART}`, { params: { memberId: user.id } });
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

  const handleQuantityChange = async (itemId, newQuantity) => {
    setCart(prev => ({
      ...prev, items: prev.items.map(item =>
        item.id === itemId ? { ...item, quantity: Number(newQuantity) } : item
      ),
    }));
    try {
      await axios.patch(`${API_BASE_URL}${PATH.CART}/${itemId}`, 
        { quantity: Number(newQuantity) },
        { params: { memberId: user.id } }
      );
    } catch (err) {
      console.error("수량 변경 실패:", err);
    }
  };

  const handleOrder = async () => {
    if (checkedItems.length === 0) {
      alert("주문할 상품을 선택하세요.");
      return;
    }
    if (!window.confirm("선택한 상품을 주문하시겠습니까?")) return;
    
    const selectedItems = cart.items.filter(item => checkedItems.includes(item.id));
    try {
      const res = await axios.post(`${API_BASE_URL}${PATH.ORDER}`, {
        memberId: user.id,
        orderStatus: "PENDING",
        orderItems: selectedItems.map(item => ({
          cartProductId: item.id,
          productId: item.productId,
          quantity: item.quantity,
        }))
      });
      alert(res.data);
      await fetchCart(); // 장바구니 갱신
      setCheckedItems([]);
      navigate(PATH.ORDER_LIST);
    } catch (err) {
      console.error("주문 실패:", err);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (!window.confirm("이 상품을 장바구니에서 삭제하시겠습니까?")) return;
    try {
      const res = await axios.delete(`${API_BASE_URL}${PATH.CART_DELETE}/${itemId}`, { params: { memberId: user.id } });
      alert(res.data);
      await fetchCart(); // 장바구니 갱신
    } catch (err) {
      console.log("삭제 실패:", err);
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <h3>주문 목록을 불러오는 중입니다.</h3>
      </Container>
    );
  }

  if (!cart || cart.items.length === 0)
    return (
      <Container className="my-5 text-center">
        <h4 className="text-muted mb-3">장바구니가 비어 있습니다.</h4>
        <Button variant="primary" onClick={() => navigate(PATH.PRODUCT_LIST)}>상품 보러 가기</Button>
      </Container>
    );

  const totalPrice = cart.items
    .filter((item) => checkedItems.includes(item.id)) // 체크된 상품만
    .reduce((acc, item) => acc + item.price * item.quantity, 0); // 합산 (acc = 누적값, 0 = 초기값)

  return (
    <Container className="my-5">
      <h2 className="mb-4">
        <span style={{ fontSize: "2rem" }}>🛒 장바구니</span>
      </h2>

      <Table striped bordered>
        <thead>
          <tr>
            <th className="text-center">
              <Form.Check
                type="checkbox"
                label="전체 선택"
                checked={cart.items.length > 0 && checkedItems.length === cart.items.length}
                onChange={(e) => toggleAllCheckBox(e.target.checked)}
              />
            </th>
            <th className="text-center">상품 정보</th>
            <th className="text-center">수량</th>
            <th className="text-center">금액</th>
            <th className="text-center">메뉴</th>
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
                      src={`${API_BASE_URL}${IMAGES}/${item.productImage}`}
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
                  variant="outline-success"
                  size="sm"
                  onClick={() => navigate(`${PATH.PRODUCT_DETAIL}/${item.productId}`)}
                >
                  상세보기
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  장바구니에서 제거
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end mt-3">
        <h3 className="mb-3">총 주문 금액: {totalPrice.toLocaleString()}원</h3>
        <Button 
          variant="success"
          size="lg"
          onClick={() => navigate(PATH.PRODUCT_LIST)}
        >
          쇼핑 이어하기
        </Button>
        &nbsp;&nbsp;
        <Button 
          variant="primary"
          size="lg"
          onClick={handleOrder}
          disabled={checkedItems.length === 0}
        >
          주문하기
        </Button>
      </div>
    </Container>
  );
};