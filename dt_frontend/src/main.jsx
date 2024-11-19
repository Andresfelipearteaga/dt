import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Index from './pages/Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);
