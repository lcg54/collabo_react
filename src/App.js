import { Container, Navbar } from 'react-bootstrap';
import './App.css';
import MenuItems from './ui/MenuItems';
import AppRoutes from './routes/AppRoutes';

function App() {
  const appName = "IT Academy Coffee Shop";

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">{appName}</Navbar.Brand>
          <MenuItems />
        </Container>
      </Navbar>
      <AppRoutes />
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>&copy; 2025 {appName}. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
