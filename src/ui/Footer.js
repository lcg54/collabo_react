import { APP_NAME } from "../config/appName";

export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <p>&copy; 2025 {APP_NAME}. All rights reserved.</p>
    </footer>
  );
}