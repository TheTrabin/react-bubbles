import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../utils/axiosWithAuth";


const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  const getColors = () => {
    axiosWithAuth()
    .get('/colors')
    .then(res => {
        console.log("Colors:", res);
        setColorList({colorList: res.data});
        
      })
    .catch(err => console.log(err.response))
};

useEffect(() => {
  getColors();
  
}, []);
console.log("Updated colorList: ", colorList);
  // set that data to the colorList state property

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
