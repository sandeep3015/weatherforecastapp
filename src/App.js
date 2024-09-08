import { BrowserRouter, Routes, Route } from "react-router-dom";
import CitiesPage from './components/CitiesPage'
import WeatherPage from './components/WeatherPage'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<CitiesPage />}/>
        <Route path='/weather/:city' element={<WeatherPage />}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
