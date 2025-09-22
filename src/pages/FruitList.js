import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_PATH } from "../config/api";
import { Table } from "react-bootstrap";

export default function FruitList() {
  const [fruitList, setFruitList] = useState([]);

  useEffect(() => {
    const url = `${API_BASE_URL}${API_PATH.FRUIT_LIST}`;

    axios
      .get(url, {}) // GET : "이걸 보여줘"라고 URL로 요청 (url?key=value) / POST : URL에 요청한 객체가 표시되지 않음
      .then((response) => {
        setFruitList(response.data);
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
            <th>아이디</th>
            <th>상품명</th>
            <th>단가</th>
          </tr>
        </thead>
        <tbody>
          {fruitList.map((fruit) => (
            <tr key={fruit.id}>
              <td>{fruit.id}</td>
              <td>{fruit.name}</td>
              <td>{Number(fruit.price).toLocaleString()}원</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}