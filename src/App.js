import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Help from "./components/Help";
import "./App.css";

function App(props) {
	return (
		<Container fluid className={"p-0"}>
			<Routes >
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/help" element={<Help />} />
			</Routes>
		</Container>
	);
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(App);
