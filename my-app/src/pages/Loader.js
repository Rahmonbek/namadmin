import React, { Component } from "react";
import style from "../css/Loader.module.css";
export default class Loader extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          zIndex: "1234",
          width: "80vw",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
        }}
      >
        <div class={style.boxcon}>
          <div class={style.box1}></div>
          <h1 className={style.qozi} style={{ color: "black" }}>
            Kuting...
          </h1>
          <div class={style.box2}></div>
        </div>
      </div>
    );
  }
}
