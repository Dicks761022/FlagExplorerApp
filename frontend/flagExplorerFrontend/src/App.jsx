import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const API_URL = "https://restcountries.com/v3.1/all"
function App() {
  const [countries, setCountries] = useState([]);
  
useEffect(() => {
fetchCountries()
},[]);


//fetch function gets data from server and store inside response
const fetchCountries = async () => {
  try {
  const response = await fetch(API_URL);
  const data = await response.json();

  if(data){
    setCountries(data);
  }
  } catch (error) {
    console.log(error);
  }
};
console.log(countries,"countries");


  return ( <div className='app'>
    <h1>React </h1>    
    </div>
  )
}

export default App
