import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";
import {
	login,
	requestPasswordReset,
	resetPassword,
} from "../services/auth.service";

export default class Login extends Component {
	state = {
		email: "",
		password: "",
		loginStatus: 1,
		alert: "",
		reset: false,
		magic: "",
	};

	validateEmail = () => {
		const { email } = this.state;
		return email.length > 0 && email.includes("@");
	};

	validateForm = () => {
		const { password } = this.state;
		return this.validateEmail() && password.length > 0;
	};

	handleSubmit = event => {
		event.preventDefault();
		this.handleLogin();
	};

	handleLogin = async () => {
		const { reset, email, password, magic } = this.state;
		if (reset) {
			this.setState({ alert: "Resetowanie hasła..." });
			const result = await resetPassword(email, password, magic);
			this.setState({ reset: false });

			if (result !== 200) {
				this.setState({ alert: "Nie udało się zresetować hasła." });
			} else {
				this.setState({ alert: "Hasło zostało zresetowane." });
			}
		} else {
			this.setState({ alert: "Logowanie..." });
			const result = await login(email, password);

			if (result === 200) {
				setTimeout(() => {
					this.setState({ loginStatus: result });
				}, 1500);
			} else {
				this.setState({ alert: "Nie udało się zalogować." });
			}
		}
	};

	componentWillUnmount() {
		this.setState = () => {
			return;
		};
	}

	handlePasswordReset = async () => {
		const { email } = this.state;
		this.setState({ alert: "Sprawdzanie danych..." });
		const result = await requestPasswordReset(email);

		if (result === 200) {
			this.setState({ reset: true });
			this.setState({
				alert:
					"Zresetuj hasło z użyciem kodu wysłanego na podany adres e-mail.",
			});
		} else {
			this.setState({
				alert: "Nie udało się znaleźć konta z podanym adresem e-mail.",
			});
		}
	};

	render() {
		const { email, password, magic, reset, loginStatus } = this.state;
		if (loginStatus === 200) {
			return <Navigate to="/home" replace={true} />;
		}
		return (
			<Container fluid className="p-0 bg-dark">
				<div className="login">
					<Form onSubmit={this.handleSubmit}>
						<Form.Group className="emailLogin" size="lg" controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								autoFocus
								type="email"
								value={email}
								onChange={e => this.setState({ email: e.target.value ?? "" })}
							/>
						</Form.Group>
						{reset && (
							<Form.Group size="lg" controlId="text">
								<Form.Label>{"Kod"}</Form.Label>
								<Form.Control
									type="text"
									value={magic}
									onChange={e => this.setState({ magic: e.target.value ?? "" })}
								/>
							</Form.Group>
						)}
						<Form.Group size="lg" controlId="password">
							<Form.Label>{reset ? "Nowe hasło" : "Hasło"}</Form.Label>
							<Form.Control
								type="password"
								value={password}
								onChange={e =>
									this.setState({ password: e.target.value ?? "" })
								}
							/>
							<Form.Text>{this.state.alert}</Form.Text>
						</Form.Group>
						<div className="loginButtons">
							<Button
								className="loginButton"
								size="lg"
								type="submit"
								disabled={!this.validateForm()}
								>
								{reset ? "Resetuj hasło" : "Zaloguj"}
							</Button>
							{!reset && (
								<button
									className="btn btn-link"
									size="lg"
									type="button"
									disabled={!this.validateEmail()}
									onClick={this.handlePasswordReset}>
									Resetuj hasło
								</button>
							)}
						</div>
					</Form>
				</div>
			</Container>
		);
	}
}

