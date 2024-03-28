import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import AirIcon from '@mui/icons-material/Air';
import DeviceThermostatRoundedIcon from '@mui/icons-material/DeviceThermostatRounded';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import axios from "axios"
import styles from "./WeatherDetails.module.css"
import { format, addDays } from 'date-fns';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import bg1 from "../../Assets/bg1.jpg"
import bg2 from "../../Assets/bg2.jpg"
import bg3 from "../../Assets/bg3.jpg"
import bg4 from "../../Assets/bg4.jpg"
import weather from "../../Assets/weather.jpg"

const WeatherDetails = ({location}) => {
const [loading, setLoading] = useState(false)
const [weatherData, setWeatherData] = useState(null);
const navigate = useNavigate();

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const [showDropdown, setShowDropdown] = useState(false);
  const [unit, setUnit] = useState('F'); 
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgroundImages = [bg1, bg2, bg3, bg4, weather];




useEffect(() => {

  const today = new Date();
    const endDate = today.toISOString().slice(0, 10);
    const startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10); 

 

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.weatherbit.io/v2.0/history/energy`, {
        params: {
          city: location,
          start_date: startDate,
          end_date: endDate,
          threshold: 63,
          units: 'I',
          key: '8ff6b1c427824112b02b9f92f1485bbb',
          tp: 'daily'
        }
      });
      console.log(response.data);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  fetchData();
}, [location]);





const handleSearchClick = () => {

  navigate('/');
};





const toggleDropdown = () => {
  setShowDropdown(!showDropdown);
};

const handleUnitChange = (selectedUnit) => {
  const newUnit = unit === 'F' ? 'C' : 'F';
  setUnit(newUnit);
  setShowDropdown(false);
};

const convertTemperature = (temp) => {

  let convertedTemp;
  if (unit === 'F') {
    convertedTemp = temp;
  } else {
    convertedTemp = Math.floor(((temp - 32) * 5) / 9);
  }
  return convertedTemp;
}



const handleChangeBackground = () => {
  setBackgroundIndex((backgroundIndex + 1) % backgroundImages.length); // Change the background image index
};



  return (
    <Box className={styles.weatherDetailContainer}>
      <Box className={styles.weatherWrapper}> 
  <Box className={styles.contentWrapper}>
  <Box className={styles.imgContainer} style={{ backgroundImage: `url(${backgroundImages[backgroundIndex]})` }}>
    <Box className={styles.placeBox}>
      <Box className={styles.areaContent}>    <Box>{weatherData?.city_name}</Box>
<Box>{weatherData?.country_code}</Box></Box>

<Box className={styles.utilityMenu}>
<Box className={styles.searchIconBox}  onClick={handleSearchClick}>
  <SearchRoundedIcon className={styles.searchIcon}/>
</Box>
<Box onClick={toggleDropdown}  className={styles.settingsBox}>
<SettingsRoundedIcon className={styles.settingIcon}/>
{showDropdown && (
                    <Box className={styles.dropdown}>
 <Box onClick={() => handleUnitChange('C')}  className={styles.dropdownItem}>
        Switch Unit
      </Box>
      <Box onClick={handleChangeBackground} className={styles.dropdownItem}>
        Change Background
      </Box>
                    </Box>
                  )}
</Box>

</Box>


    </Box>
    

  </Box>
  <Box className={styles.feedContainer}>
<Box className={styles.bigInfoCard}>
  <Box className={`${styles.innerInfo} ${styles.temp}`}>

  {convertTemperature(weatherData?.data[0].temp)}

<span className={styles.degree}>°{unit}</span>
<span className={styles.dateBorder}>Today's</span>
  </Box>
  <Box  className={styles.iconBox}>
  <CloudQueueRoundedIcon className={styles.cloudIcons}/>
<Box >
  <p className={styles.iconBoxText}>{weatherData?.data[0].clouds}% <br />
  {weatherData?.data[0].wind_spd}mph</p>
</Box>
  </Box>
</Box>
<Box className={styles.futureWeather}>
  {weatherData?.data.slice(1, 7).map((day, index) => {
  
const today = new Date()
  const date = addDays(today, index + 1); 
  const dayOfWeek = daysOfWeek[date.getDay()];

 return (
    <Box key={index} className={styles.futureInfo} >
      {convertTemperature(day.temp)} °{unit}
      <Box className={styles.smallWindHead}>Wind: {day?.wind_spd} mph</Box>
      <Box className={styles.smallCloudHead}>Cloud Cover: {day?.clouds}%</Box>
      <Box className={styles.daysBox}>{dayOfWeek}</Box>
    </Box>
  )}
  )}
</Box>
  </Box>

  </Box>
      </Box>
    </Box>
  )
}

export default WeatherDetails