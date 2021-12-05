import React from 'react';
import { connect } from 'react-redux';
import { Container } from "react-bootstrap";
import Home from "./components/Home";


import './App.css';
import Header from './components/Header';


function App() {
  return (
    <React.Fragment>
      <Container fluid className={"p-0"}>
        <Header />
        <Home />
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(App);
