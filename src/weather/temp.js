//https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=9472f79cfe93c033f9f8720be71f6504
import './temp.css';
import WeatherCard from './weatherCard'
import React, { useState ,useEffect } from 'react';

const Temp = () => {
    const[searchValue ,setSearchValue] = useState("Himachal Pradesh")
    const [tempInfo , setTempInfo] = useState({}) //passed a empty object
    const getWeatherInfo = async() => {
       try{
       
         let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=9472f79cfe93c033f9f8720be71f6504`;

         let response = await fetch(url);
         let data =await response.json();
         const {temp, humidity , pressure} = data.main;
         const {main: weathermood} =data.weather[0]; //destructuring also changed the name
         const {name} = data;
         const {speed} = data.wind;
         const {country ,sunset } =data.sys;

         const myNewWeatherInfo = {
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country ,
            sunset 
        }
        setTempInfo(myNewWeatherInfo);
       }
      
       catch (error){
         console.log(error);
       }
    };
    useEffect(()=> {           //by default without serching hp will display
        getWeatherInfo();   
    },[]); //dependency empty array will execute it at once only
    return(
    <>
        <div className='wrap'>
            <div className = 'search'>
                <input type = "search" placeholder='search...' 
                autoFocus //input field automatically gets focus when page loads
                value ={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                id='search'
                className='searchTerm'/>
                <button className ='searchButton' onClick={getWeatherInfo}>
                    Search
                </button>
            </div>
         </div>
         <WeatherCard tempInfo = {tempInfo}/>
    </>
     
    )
}
export default Temp;