import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login } from "../services/auth.service";
import { fetchBusStops } from "../services/api.service";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [result, setResult] = useState();
	const [alert, setAlert] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (result == 200) {
			setAlert('');
			setTimeout(() => navigate("/home"), 1000);
		} else if(result) {
			setAlert("Logowanie nie powiodło się.");
		}
	}, [result]);

	const validateEmail = () => {
		return email.length > 0 && email.includes("@");
	};

	const validateForm = () => {
		return validateEmail() && password.length > 0;
	};

	const handleSubmit = event => {
		event.preventDefault();
	};

	const handleLogin = async () => {
		const result = await login(email, password);
		setResult(result);
	};

	return (
		<Container fluid className="p-0 bg-dark">
			<div className="login">
				<Form onSubmit={handleSubmit}>
					<Form.Group className="emailLogin" size="lg" controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							autoFocus
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value ?? "")}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="password">
						<Form.Label>Hasło</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value ?? "")}
						/>
						<Form.Text >{alert}</Form.Text>
					</Form.Group>
					<div className="loginButtons">
						<Button
							className="loginButton"
							size="lg"
							type="button"
							onClick={handleLogin}>
							Zaloguj
						</Button>
						<button
							className="btn btn-link"
							size="lg"
							type="button"
							disabled={!validateEmail()}
							onClick={() => fetchBusStops()}>
							Resetuj hasło
						</button>
					</div>
				</Form>
			</div>
		</Container>
	);
}
