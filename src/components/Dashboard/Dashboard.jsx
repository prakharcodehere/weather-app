
import React, { useState } from 'react'
import styles from "./Dashboard.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom"
import { input } from '@nextui-org/react';


const Dashboard = ({setLocation}) => {

  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate();
  let timeoutId;




const handleInputChange = (e) =>{
  const { value } = e.target;
  setInputValue(value);
  clearTimeout(timeoutId); 

  timeoutId = setTimeout(() => {
    SearchLocation(value.trim()); 
  }, 500);
}


const handleSearch = () => {
  if (inputValue.trim() === '') {
    alert('Please enter a city or country.');
  } else {
    navigate(`/weather-details/${inputValue}`)
    SearchLocation(inputValue.trim());
  }
};

const SearchLocation = (location) => {
  setLocation(location);
};


  return (
    <div className={styles.dashboardContainer}>
<div className={styles.searchBarWrapper}>


<Stack>
<TextField id="outlined-basic" label="Enter City/Country" variant="outlined" 
className={styles.searchBar}  onChange={handleInputChange} value={inputValue}/>
<Button variant="outlined" startIcon={<SearchIcon />} 
className={styles.searchBtn} onClick={handleSearch}>
       Search
      </Button>
</Stack>



</div>
    </div>
  )
}

export default Dashboard