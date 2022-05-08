import React from "react";
import { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { uploadFile } from "../services/upload.service";
import { setLoading } from "../redux/actions";
import { Navigate } from "react-router-dom";


class Upload extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.state = {
			selectedFile: undefined,
			info: "",
			unauthorized: false,
		};
	}

	onFileChange = event => {
		this.setState({ selectedFile: event.target.files[0] });
	};

	onFileUpload = async () => {
		const formData = new FormData();
		formData.append("file", this.state.selectedFile);
		this.props.setLoading(true);
		const status = await uploadFile(formData);
		this.props.setLoading(true);

		if (status === 200) {
			this.setState({info: "Plik został przesłany."});
		} else if (status === 401) {
			this.setState({unauthorized: true});
		} else {
			this.setState({info: "Nie udało się przesłać pliku."});
		}
	};

	fileData = () => {
		if (this.state.selectedFile) {
			return (
				<div>
					<div className="mediumText">Szczegóły:</div>
					<p className="smallText">Nazwa: {this.state.selectedFile.name}</p>
					<p className="smallText">Typ: {this.state.selectedFile.type}</p>
					<p className="smallText">
						Ostatnia modyfikacja:{" "}
						{this.state.selectedFile.lastModifiedDate.toDateString()}
					</p>
					<div className="mediumText">{this.state.info}</div>
				</div>
			);
		}
	};

	render() {
		if (this.state.unauthorized) {
			return <Navigate to="/" replace={true} />
		}
		return (
			<Container fluid className="p-0 bg-dark">
				<div className="login">
					<div className="upload">
						<h3 className="bigText">Załaduj plik z danymi</h3>
						<div>
							<input
								ref={this.myRef}
								type="file"
								className="d-none"
								accept=".csv"
								onChange={this.onFileChange}
							/>
							<Button
								className="buttonSeparator"
								size="lg"
								onClick={() => this.myRef.current?.click()}>
								Wczytaj dane
							</Button>
							<Button
								className="buttonSeparator"
								size="lg"
								disabled={this.state.selectedFile === undefined}
								onClick={this.onFileUpload}>
								Prześlij
							</Button>
						</div>
						{this.fileData()}
					</div>
				</div>
			</Container>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {
	setLoading,
};

export default connect(mapStateToProps, dispatchToProps)(Upload);
