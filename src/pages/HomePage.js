import { Carousel, Container, Image, Nav } from "react-bootstrap";
import { API_BASE_URL, IMAGES, PATH } from "../config/url";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchBigImages = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}${PATH.PRODUCT}${IMAGES}`);
      setProducts(res.data);
    } catch (err) {
      console.log("상품 이미지 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchBigImages();
  }, []);

  return (
    <Container className="my-5">
      <Carousel>
        {products.map(product => (
          <Carousel.Item key={product.id}>
            <Nav.Link onClick={() => {navigate(`${PATH.PRODUCT_DETAIL}/${product.id}`)}}>
              <Image
                className="d-block w-100"
                src={`${API_BASE_URL}${IMAGES}/${product.image}`}
                alt={product.name}
                thumbnail
              />
              <Carousel.Caption>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </Carousel.Caption>
            </Nav.Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}