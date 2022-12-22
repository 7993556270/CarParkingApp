import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import ParkkAllocations from './pages/parkkAllocations';
import ParkedFetails from './pages/parkedFetails';

function App() {
  return (
    <BrowserRouter>
     

      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/allocate' element={ <ParkkAllocations/>}/>
        <Route path="/parked" element={<ParkedFetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
