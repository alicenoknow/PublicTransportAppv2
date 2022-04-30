import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Upload from "./components/Upload";
import "./App.css";

function App(props) {
	console.warn(props.navigator)
	return (
		<Container fluid className={"p-0"}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/upload" element={<Upload />} />
			</Routes>
		</Container>
	);
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(App);
