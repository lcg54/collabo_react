import { Container, Navbar } from 'react-bootstrap';
import './App.css';
import MenuItems from './ui/MenuItems';
import AppRoutes from './routes/AppRoutes';
// import { useState } from 'react';

function App() {
  const appName = "IT Academy Coffee Shop";

  // const [mode, setMode] = useState('main');



  // const Switcher = () => {
  //   switch (mode) {
  //     case 'main': return <Main />;
  //   }
  // }

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">{appName}</Navbar.Brand>
          <MenuItems />
        </Container>
      </Navbar>
      {/* <Switcher /> */}
      <AppRoutes />
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>&copy; 2025 {appName}. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
