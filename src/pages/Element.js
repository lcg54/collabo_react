import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL, PATH } from "../config/url";
import { Table } from "react-bootstrap";

export default function Element() {
  const [elementList, setElementList] = useState([]);

  useEffect(() => {
    const url = `${API_BASE_URL}${PATH.ELEMENT}`;

    axios
      .get(url, {}) // GET : "이걸 보여줘"라고 URL로 요청 (url?key=value) / POST : URL에 요청한 객체가 표시되지 않음
      .then((response) => {
        setElementList(response.data);
      })
      .catch((error) => {
        console.error(error); // 에러 처리
      });
  }, []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>상품번호</th>
            <th>상품명</th>
            <th>단가</th>
            <th>카테고리</th>
            <th>재고</th>
            <th>상품 이미지</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          {elementList.map((element) => (
            <tr key={element.id}>
              <td>{Number(element.id)}</td>
              <td>{element.name}</td>
              <td>{Number(element.price).toLocaleString()}원</td>
              <td>{element.category}</td>
              <td>{Number(element.stock)}</td>
              <td>{element.image}</td>
              <td>{element.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}