import { Carousel, Container, Image, Nav } from "react-bootstrap";
import { API_BASE_URL } from "../config/url";

const carouselItems = [
  { src: "croissant_03_bigsize.png", alt: "크로아상", title: "크로아상", description: "바삭하고 결이 살아있는 프랑스식 버터 페이스트리" },
  { src: "brioche_04_bigsize.png", alt: "브리오슈", title: "브리오슈", description: "달콤하고 부드러운 식감의 버터 함유 빵." },
  { src: "americano01_bigsize.png", alt: "아메리카노", title: "아메리카노", description: "에스프레소에 뜨거운 물을 추가한 커피." },
  { src: "whitewine01_bigsize.png", alt: "화이트 와인", title: "화이트 와인", description: "청포도로 만든 가볍고 산뜻한 와인." },
  { src: "french_baguette_01_bigsize.png", alt: "프랑스 바게트", title: "프랑스 바게트", description: "바삭한 겉과 쫄깃한 속의 긴 막대형 빵." },
];

export default function HomePage() {
  return (
    <Container className="mt-4">
      <Carousel>
        {carouselItems.map((item, idx) => (
          <Carousel.Item key={idx}>
            <Nav.Link onClick={() => {}}>
              <Image
                className="d-block w-100"
                src={`${API_BASE_URL}/images/${item.src}`}
                alt={item.alt}
                thumbnail
              />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Carousel.Caption>
            </Nav.Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}