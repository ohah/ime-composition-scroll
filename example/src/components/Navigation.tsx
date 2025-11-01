import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          IME Scroll Example
        </Link>
        <ul className="nav-links">
          <li>
            <Link
              to="/"
              className={isActive('/') ? 'nav-link active' : 'nav-link'}
            >
              홈
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={isActive('/about') ? 'nav-link active' : 'nav-link'}
            >
              소개
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={isActive('/contact') ? 'nav-link active' : 'nav-link'}
            >
              연락처
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={isActive('/blog') ? 'nav-link active' : 'nav-link'}
            >
              블로그
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

