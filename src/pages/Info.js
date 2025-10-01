import { Card, Container } from "react-bootstrap";
import { API_BASE_URL, PATH } from "../config/url";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MyPage({ user }) {
  const [userInfo, setUserInfo] = useState({});
  
  useEffect(() => {
    if (!user) return;
    fetchUserInfo();
  }, [user]);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}${PATH.INFO}`, { params: { memberId: user.id } });
      setUserInfo(res.data);
    } catch (err) {
      console.log("회원정보 불러오기 실패:", err);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">
        <span style={{ fontSize: "2rem" }}>📖 내 정보</span>
      </h2>
      <Card>
        <Card.Body>
          <ul>
            <li>회원번호 : {userInfo.id}</li>
            <li>이름 : {userInfo.name}</li>
            <li>이메일 : {userInfo.email}</li>
            <li>주소 : {userInfo.address}</li>
            <li>가입일 : {userInfo.regDate}</li>
            <li>role : {userInfo.role}</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}