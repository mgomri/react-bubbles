import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import Loader from 'react-loader-spinner';


const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() =>{
      const getBubbles = () => {
        axiosWithAuth()
      .get('/api/colors')
      .then(res => {
        setColorList(res.data);
        setIsFetching(false);
      })
      .catch(err => console.log(err));
    };

    setTimeout(() => {
      getBubbles();
    }, 1500)
  }, [])
  

  return (
    <div className='bubble-pg'>
      <div id='loader'>
        {isFetching && (
          <Loader type="Puff" color="#00BFFF" height={80} width={80} />
        )}
      </div>
      <div className='bubble-view'>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      </div>
    </div>
  );
};

export default BubblePage;