import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL, PATH } from "../config/url";
import { Table } from "react-bootstrap";

// axios 라이브러리를 이용하여 React에서 Spring으로부터 데이터를 요청
export default function Fruit() {
  const [fruit, setFruit] = useState({});

  useEffect(() => {
    const url = `${API_BASE_URL}${PATH.FRUIT}`;

    axios
      .get(url, {}) // GET : "이걸 보여줘"라고 URL로 요청 (url?key=value) / POST : URL에 요청한 객체가 표시되지 않음
      .then((response) => {
        setFruit(response.data);
      })
      .catch((error) => {
        console.error(error); // 에러 처리
      });
  }, []);

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <td>아이디</td>
            <td>{fruit.id}</td>
          </tr>
          <tr>
            <td>상품명</td>
            <td>{fruit.name}</td>
          </tr>
          <tr>
            <td>단가</td>
            <td>{Number(fruit.price).toLocaleString()}원</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}