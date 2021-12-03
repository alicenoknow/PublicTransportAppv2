import React from 'react';
import { connect } from 'react-redux';
import { Container } from "react-bootstrap";
import Routes from "./routes/Routes"

import './App.css';
import Header from './components/Header';
import { pointLayerConfig } from './keplerConfig/pointLayerConfig';


function App() {
  return (
    <React.Fragment>
      <Container className={"App"} fluid>
        <Header />
        <Routes layerConfigs={[pointLayerConfig]} />
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(App);
