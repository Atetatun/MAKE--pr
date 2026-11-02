import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { TemplateGallery } from './pages/TemplateGallery';
import { CVBuilder } from './pages/CVBuilder';
import { Dashboard } from './pages/Dashboard';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/templates" element={<TemplateGallery />} />
        <Route path="/builder" element={<CVBuilder />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
