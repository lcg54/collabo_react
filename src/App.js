import './App.css';
import Header from './ui/Header';
import AppRoutes from './routes/AppRoutes';
import Footer from './ui/Footer';
import { useEffect, useState } from 'react';

export default function App() {
  const [user, setUser] = useState(null);

  // 앱 실행 시 1번만, Storage에 저장된 값 읽어오기 (local : 브라우저 꺼져도 로그인 유지 / session : 브라우저 꺼지면 로그인 풀림)
  useEffect(() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser)); // JSON.parse : json 문자열을 객체로 반환
  }, []);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <AppRoutes setUser={setUser} />
      <Footer />
    </>
  );
}