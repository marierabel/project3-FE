import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <></>;
}

export default App;
