import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
	login,
	requestPasswordReset,
	resetPassword,
} from "../services/auth.service";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState(1);
	const [alert, setAlert] = useState("");
	const [reset, setReset] = useState(false);
	const [magic, setMagic] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (loginStatus === 200) {
			setAlert("");
			setTimeout(() => navigate("/home"), 3000);
		} else if (!loginStatus) {
			setAlert("Logowanie nie powiodło się.");
		}
	}, [loginStatus, navigate]);

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
		if (reset) {
			setAlert("Resetowanie hasła...");
			const result = await resetPassword(email, password, magic);
			setReset(false);

			if (result !== 200) {
				setAlert("Nie udało się zresetować hasła.");
			} else {
				setAlert("Hasło zostało zresetowane.");
			}
		} else {
			setAlert("Logowanie...");
			const result = await login(email, password);
			setLoginStatus(result);
		}
	};

	const handlePasswordReset = async () => {
		setAlert("Sprawdzanie danych...");
		const result = await requestPasswordReset(email);

		if (result === 200) {
			setReset(true);
			setAlert("Zresetuj hasło z użyciem kodu wysłanego na podany adres e-mail.");
		} else {
			setAlert("Nie udało się znaleźć konta z podanym adresem e-mail.");
		}
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
					{reset && <Form.Group size="lg" controlId="text">
						<Form.Label>{"Kod"}</Form.Label>
						<Form.Control
							type="text"
							value={magic}
							onChange={e => setMagic(e.target.value ?? "")}
						/>
					</Form.Group>}
					<Form.Group size="lg" controlId="password">
						<Form.Label>{reset ? "Nowe hasło" : "Hasło"}</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value ?? "")}
						/>
						<Form.Text>{alert}</Form.Text>
					</Form.Group>
					<div className="loginButtons">
						<Button
							className="loginButton"
							size="lg"
							type="button"
							disabled={!validateForm()}
							onClick={handleLogin}>
							{reset ? "Resetuj hasło" : "Zaloguj"}
						</Button>
						{!reset && (
							<button
								className="btn btn-link"
								size="lg"
								type="button"
								disabled={!validateEmail()}
								onClick={handlePasswordReset}>
								Resetuj hasło
							</button>
						)}
					</div>
				</Form>
			</div>
		</Container>
	);
}
