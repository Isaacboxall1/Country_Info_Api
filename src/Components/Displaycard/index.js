import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./styles.css";

export default function Displaycard({ props }) {
  return (
    <motion.div
      id="displaycard"
      className="countrycontainer"
      whileHover={{ scale: 1.35, rotate: 0 }}
    >
      <img className="flagimage" src={props.flag} alt="flag" />
      <div className="text-elements">
        <h1>{props.countryName}</h1>
        <div className="jank">
          <p className="fields">Population:</p>
          <p>{props.population}</p>
          <p className="fields">Region:</p>
          <p>{props.region}</p>
          <p className="fields">Capital:</p>
          <p>{props.capital}</p>
        </div>
      </div>
    </motion.div>
  );
}
