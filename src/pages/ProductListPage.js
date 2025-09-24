import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Container, Form, Row } from "react-bootstrap";
import { API_BASE_URL, API_PATH } from "../config/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductList({ user }) {
  const [products, setProducts] = useState([]);
  // 프론트에서 페이징하면 코딩이 쉽긴 하지만 데이터가 많을 경우 망함. 따라서 백엔드에서 페이징 진행
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}${API_PATH.PRODUCT_LIST}`, {
        params: { page: currentPage, size: 6, category: category || undefined },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      })
      .catch((err) => {
        console.error(err);
        alert("서버와의 통신 중 오류가 발생했습니다.");
      });
  }, [currentPage, category]);

  return (
    <Container className="my-5">
      <h1 className="my-4">상품 목록</h1>

      {/* 검색/필터 UI */}
      <Row className="mb-4 align-items-center">
        <Col xs="auto">
          <Form.Select>
            <option>전체 기간</option>
            <option>~2024</option>
            <option>~2023</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Form.Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1); // 카테고리 변경 시 1페이지로 이동
            }}
          >
            <option value="">카테고리 선택</option>
            <option value="BREAD">빵</option>
            <option value="BEVERAGE">음료수</option>
            <option value="CAKE">케이크</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Form.Select>
            <option>전체 검색</option>
            <option>1</option>
            <option>2</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Control type="text" placeholder="검색어를 입력하세요" />
        </Col>
      </Row>

      {/* 상품 카드 리스트 */}
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card
              className="h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`${API_PATH.PRODUCT}/${product.id}`)}
            >
              <Card.Img
                variant="top"
                src={`${API_BASE_URL}/images/${product.image}`}
                alt={product.name}
                style={{ width: '100%', height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: 'none' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '70%', padding: '4px', border: 'none' }}>
                        <Card.Title>{product.name}({product.id})</Card.Title>
                      </td>
                      {user?.role === 'ADMIN' && (
                        <td rowSpan={2} style={{ padding: '4px', border: 'none', textAlign:'center', verticalAlign: 'middle' }}>
                          <Button
                            variant="warning"
                            className="mb-2"
                            onClick={(e) => {
                              e.stopPropagation(); // 카드 클릭 이벤트와 충돌 방지
                              navigate(API_PATH.PRODUCT_UPDATE);
                            }}
                          >
                            수정
                          </Button>
                          <Button 
                            variant="danger" 
                            onClick={async e => {
                              e.stopPropagation(); // 카드 클릭 이벤트와 충돌 방지
                              if (window.confirm(`정말 ${product.name}(${product.id}) 을(를) 삭제하시겠습니까?`)) {
                                try {
                                  await axios.delete(`${API_BASE_URL}${API_PATH.PRODUCT_DELETE}/${product.id}`);
                                  const res = await axios.get(`${API_BASE_URL}${API_PATH.PRODUCT_LIST}`, {
                                    params: { page: currentPage, size: 6, category: category || undefined },
                                  });
                                  setProducts(res.data.products);
                                  setTotalPages(res.data.totalPages);
                                  setCurrentPage(res.data.currentPage);
                                  alert("상품이 삭제되었습니다.");
                                } catch (err) {
                                  console.error(err);
                                  alert("상품 삭제 중 오류가 발생했습니다.");
                                }
                              }
                            }}
                          >
                            삭제
                          </Button>
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td style={{ width: '70%', padding: '4px', border: 'none' }}>
                        <Card.Text>가격 : {product.price.toLocaleString()}원</Card.Text>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 페이지네이션 */}
      <Row className="justify-content-center mt-2">
        <Col>
        {user?.role === 'ADMIN' && (
        <Button
          variant="success"
          className="mb-3"
          onClick={() => navigate(API_PATH.PRODUCT_INSERT)}
        >
          상품 등록
        </Button>
      )}
        </Col>
        <Col xs="auto">
          <ButtonGroup>
            <Button
              variant="outline-secondary"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              맨처음
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              이전
            </Button>
            {(() => {
              const blockSize = 10;
              const currentBlock = Math.floor((currentPage - 1) / blockSize);
              const startPage = currentBlock * blockSize + 1;
              const endPage = Math.min(startPage + blockSize - 1, totalPages);
                        
              return [...Array(endPage - startPage + 1)].map((_, i) => {
                const pageNum = startPage + i;
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "primary" : "outline-primary"}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              });
            })()}
            <Button
              variant="outline-secondary"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              다음
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              맨끝
            </Button>
          </ButtonGroup>
        </Col>
        <Col className="text-end">
            <Button variant="primary" disabled>
              {currentPage}/{totalPages} 페이지
            </Button>
        </Col>
      </Row>
    </Container>
  );
}