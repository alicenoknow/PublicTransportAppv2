import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import "./App.css";

function App() {
  return (
    <Container fluid className={"p-0"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Container>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(App);
