import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Countries from './components/Countries';
import Header from './layout/Header'
import Details from './components/Details'


function App() {
  return (
    <Router>
     <Header/>
     <Routes>
      <Route path="/" base element={<Countries/>}/>
      <Route path="/:country" element={<Details/>}/>
     </Routes>
    </Router>
  );
}

export default App;
