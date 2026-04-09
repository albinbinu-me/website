import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <CursorGlow />
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <Suspense fallback={<div className="flex-1 flex items-center justify-center min-h-[100vh]"><div className="w-8 h-8 border-2 border-champagne-gold border-t-transparent rounded-full animate-spin"></div></div>}>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </div>
      <FloatingWhatsApp />
      <Footer />
    </Router>
  );
}

export default App;
