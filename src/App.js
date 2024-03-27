
import './App.css';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard"
import WeatherDetails from "./components/WeatherDetails/WeatherDetails"
import { useState } from 'react';

function App() {
const [location, setLocation] = useState("")

console.log(location)
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" 
      element={<Dashboard setLocation={setLocation}/>} />
      <Route path="/weather-details/:location" 
      element={<WeatherDetails location={location}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
