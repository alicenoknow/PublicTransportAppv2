import React from "react";
import { Component } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { uploadFile } from "../services/upload.service";

class Upload extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.state = {
			selectedFile: undefined,
		};
	}

	onFileChange = event => {
		this.setState({ selectedFile: event.target.files[0] });
	};

	onFileUpload = () => {
		uploadFile(this.state.selectedFile);
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
				</div>
			);
		}
	};

	render() {
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

export default Upload;
