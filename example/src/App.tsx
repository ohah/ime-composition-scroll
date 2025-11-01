import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>IME Composition Scroll - Example</h1>
        <p>
          리액트 라우터를 사용하여 페이지 이동 시 동적으로 추가/제거되는 input 요소들의 blur 이벤트를
          테스트합니다.
        </p>
      </header>

      <Navigation />

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

