import React, { useState, useEffect } from "react";
import "./App.css";
import Displaycard from "../Displaycard/index.js";
import SearchBar from "../SearchBar/index.js";
import Switch from "@mui/material/Switch";
import Earth from "../Earth/Scene";
import { Canvas } from "@react-three/fiber";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [categoryResults, setcategoryResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(false);
  const [darkmode, setDarkmode] = useState(false);

  let searchbar = document.getElementById("searchbar");
  let dropdownbox = document.querySelector(".dropdownboxes");

  darkmode
    ? (document.body.style.backgroundColor = "#353740")
    : (document.body.style.backgroundColor = "#F0F0F0");
  darkmode
    ? (document.body.style.color = "white")
    : (document.body.style.color = "black");
  darkmode
    ? document
        .querySelectorAll("#displaycard")
        .forEach((Item) => (Item.style.backgroundColor = "#34535A"))
    : document
        .querySelectorAll("#displaycard")
        .forEach((Item) => (Item.style.backgroundColor = "white"));
  searchbar
    ? darkmode
      ? (searchbar.style.backgroundColor = "#34535A")
      : (searchbar.style.backgroundColor = "white")
    : console.log("Searchbar not loaded yet");
  searchbar
    ? darkmode
      ? (searchbar.style.color = "white")
      : (searchbar.style.color = "black")
    : console.log("Searchbar not loaded yet");
  dropdownbox
    ? darkmode
      ? (dropdownbox.style.backgroundColor = "#34535A")
      : (dropdownbox.style.backgroundColor = "white")
    : console.log("Dropdownbox not loaded yet");
  dropdownbox
    ? darkmode
      ? (dropdownbox.style.color = "white")
      : (dropdownbox.style.color = "black")
    : console.log("Dropdownbox not loaded yet");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  function changeBackgroundColor() {
    setDarkmode(!darkmode);
  }

  useEffect(() => {
    const results = countryData.filter((country) =>
      country.region.includes(category)
    );
    setcategoryResults(results);
  }, [category, countryData]);

  useEffect(() => {
    if (categoryResults.length > 0) {
      const results = categoryResults.filter((country) =>
        country.countryName.toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
    } else {
      const results = countryData.filter((country) =>
        country.countryName.toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
    }
  }, [searchTerm, countryData, categoryResults]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        const newCountryArray = data.map((country) => {
          return {
            countryName: country.name.common,
            capital: country.capital,
            region: country.region,
            population: country.population,
            flag: country.flags.svg,
          };
        });
        console.log(newCountryArray);
        setCountryData(newCountryArray);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  function displayMaps() {
    return searchTerm === "" && categoryResults === [] ? (
      countryData === null ? (
        <p>Loading...</p>
      ) : (
        countryData.map((item) => <Displaycard props={item} />)
      )
    ) : (
      searchResults.map((item) => (
        <Displaycard props={item} {...backgroundColor} />
      ))
    );
  }

  return (
    <div id={backgroundColor} className="App">
      <div id="title-card">
        <h1>Where In the World?</h1>
        <Switch onClick={changeBackgroundColor} defaultChecked />
      </div>
      <SearchBar
        id="searchbar"
        props={{ searchTerm, handleChange, handleCategoryChange }}
      />
      <div className="sickearthmodel">
        <Canvas>
          <ambientLight />
          <Earth scale={1.8} region={category} />
        </Canvas>
      </div>
      <div className="countryarea">{displayMaps()}</div>
    </div>
  );
}

export default App;
