import React, { useState } from "react";
import InfoIcon from "./InfoIcon";

import easyTimeFormat from "../helpers/easyTimeFormat";

const CounterStat = (props) => {
  const [isClicked, setClicked] = useState(0);
  const { title, colour, keys, data } = props;
  const { daily, total } = keys;

  const handleClick = (e) => {
    console.log("click");
    setClicked(!isClicked);
  }

  // const oneDay = 60 * 60 * 24 * 1000;
  // let today = new Date();
  let {day, monthTrim, year} = easyTimeFormat(data[daily].date);
  // console.log(today, latestFigureDate)
  // console.log((today - latestFigureDate) < oneDay);

  return (
    <div className="counter-stat">
      <div className="title" onClick={handleClick} >
        <InfoIcon colour={colour} />
        <p>{title}</p>
      </div>
      {!isClicked 
             ? data[daily].value
                ? <>  
                    <p className="value">{data[total].value.toLocaleString('en-GB')}</p>
                    <p>+{data[daily].value.toLocaleString('en-GB')} as of {day}-{monthTrim}-{year} </p>
                  </>
                : <p className="value">N/A</p>
             : 
             <>
              <p>Total</p>
              <p className="value">{data[total].value.toLocaleString('en-GB')}</p>
             </>
      }
    </div>
  );
};

export default CounterStat;
