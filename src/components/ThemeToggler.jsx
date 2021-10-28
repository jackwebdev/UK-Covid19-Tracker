import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


const ThemeToggler = () => {
  const {theme, setTheme} = useContext(ThemeContext)
   

  const handleChange = (e) => {
    setTheme(theme === "light" ? "dark" : "light");
  };


  return (
    <div className="toggler">
      <label className="switch">
        <input type="checkbox" onChange={handleChange} checked={theme === "light" ? true : false} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ThemeToggler;
