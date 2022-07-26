import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../containers/home";

export default function () {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
      </BrowserRouter>
    </>
  );
}
