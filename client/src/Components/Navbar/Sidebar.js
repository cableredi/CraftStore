import React from "react";
import { useHistory } from "react-router-dom";
import LoginNav from "./LoginNav";

export default function SideBar(props) {
  const { setCategoryValue } = props;
  const history = useHistory();

  const handleClick = (value) => {
    setCategoryValue(value);
    history.push("/products");
  };

  return (
    <header className="SideBar">
      <span className="SideBar__header">Categories</span>
      <ul className="SideBar__categories">
        <li onClick={() => handleClick("")}>All</li>
        <li onClick={() => handleClick("stained")}>Stained</li>
        <li onClick={() => handleClick("fused")}>Fused</li>
      </ul>
      <div className="SideBar__login">
        <LoginNav />
      </div>
    </header>
  );
}
