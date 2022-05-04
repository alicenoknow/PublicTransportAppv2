import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { ScrollView } from "@cantonjs/react-scroll-view";


class Help extends Component {
	render() {
		return (
			<Container fluid className="p-0 bg-dark">
				<div className="help">
                <ScrollView style={{ height: "99vh", paddingTop: "5%", paddingBottom: "5%" }}>
					<h1 id="spis-tre-ci">Spis treści</h1>
					<ol>
						<li>
							<a href="#wstęp">Wstęp</a>
						</li>
						<li>
							<a href="#ładowanie-danych">Ładowanie danych</a>
						</li>
						<li>
							<a href="#panele-boczne">Panele boczne</a>
						</li>
						<li>
							<a href="#rodzaje-wizualizacji">Rodzaje wizualizacji</a>
						</li>
						<li>
							<a href="#obszary-i-przystanki">Obszary i przystanki</a>
						</li>
						<li>
							<a href="#filtry">Filtry</a>
						</li>
						<li>
							<a href="#wyświetlanie-wizualizacji">Wyświetlanie wizualizacji</a>
						</li>
						<li>
							<a href="#pobieranie-danych">Pobieranie danych</a>
						</li>
					</ol>
					<h2 id="wst-p">Wstęp</h2>
                    <p>
						Strona umożliwia przeprowadzanie analiz jednokierunkowych oraz wahadłowych dla wybranych parametrów oraz wizualzację wyników. 
					</p>
					<h2 id="-adowanie-danych">Ładowanie danych</h2>
					<p>
						W celu przesłania nowych danych do systemu, należy kliknąć zakładkę{" "}
						<em>Dane</em> znajdującą się na górnym pasku. Po załadowaniu strony,
						pojawi się możliwość wyboru arkusza z danymi z naszego komputera.
					</p>
					<h2 id="panele-boczne">Panele boczne</h2>
					<p>
						Na stronie głównej, w górnych rogach mapy znajdują się dwa przyciski
						służące do wysuwania/chowania paneli bocznych. Lewy panel odpowiada
						za ustawianie parametrów wizualizacji, natomiast prawy panel jest
						panelem informacyjnym. Możemy tam zobaczyć jakie parametry
						wizualizacji są obecnie wybrane. Po kliknięciu na elementy
						wizualizacji, takie jak przystanki czy linie w panelu bocznym
						pojawią się dodatkowe informacje na ich temat.
					</p>
					<h2 id="rodzaje-wizualizacji">Rodzaje wizualizacji</h2>
					<p>
						W tej sekcji możemy wybrać rodzaj analizy
						(jednokierunkowa/wahadłowa) oraz wybrać początek i koniec trasy.
						Możliwe opcje początka i końca trasy to:
					</p>
					<ul>
						<li>
							<p>
								<strong>Wybrane przystanki</strong> - ta opcja umożliwia
								wybranie 1 lub więcej przystanków poprzez kliknięcie na
								przystanek na mapie. Jeśli przystanek został wybrany jako jeden
								z początkowych/końcowych jego kolor zostanie zmieniony na
								odpowiadający kolor sekcji początkowej/końcowej w lewym panelu
								oraz jegno nazwa wyświetli się w zakładce w prawym panelu
								informacyjnym. W celu odznaczenia przystanku należy ponownie
								kliknąć na niego na mapie.
							</p>
						</li>
						<li>
							<p>
								<strong>Wybrane obszary</strong> - ta opcja umożliwia wybranie 1
								lub więcej obszarów poprzez kliknięcie na obszar na mapie. Jeśli
								obszar został wybrany jako jeden z początkowych/końcowych jego
								kolor zostanie zmieniony na odpowiadający kolor sekcji
								początkowej/końcowej w lewym panelu oraz jegno nazwa wyświetli
								się w zakładce w prawym panelu informacyjnym. W celu odznaczenia
								obszaru należy ponownie kliknąć na niego na mapie. Definiowanie
								własnych obszarów zostało omówione w sekcji{" "}
								<a href="#obszary-i-przystanki">Obszary i przystanki</a>
							</p>
						</li>
						<li>
							<p>
								<strong>Wszystkie przystanki</strong> - ta opcja umożliwia
								wybranie wszystkich przystanków. Jeśli wybrana zostanie ta
								opcja, wtedy wizualizacja zostanie przedstawiona w formie kół
								wokół przystanków, nie linii, ponieważ analiza za pomocą linii
								byłaby w tym przypadku nieczytelna. W tej wizualizacji, każde
								połączenie przystanek-przystanek przedstawione jest jako osobne
								koło. Promień koła odpowiada ilości pasażerów. Koła nakładają
								się na siebie, oznacza to, że im ciemniejsze jest wynikowe koło,
								tym więcej połączeń ma ten przystanek. Szczegółowe informacje na
								temat połączeń wyświetlą się w prawym panelu, po kliknięciu na
								wybrany przystanek.
							</p>
						</li>
					</ul>
					<h2 id="obszary-i-przystanki">Obszary i przystanki</h2>
					<h4 id="widok">Widok</h4>
					<p>
						Zakładka umożliwia wyświetlanie/schowanie przystanków i obszarów na
						mapie.
					</p>
					<h4 id="zarz-dzaj-obszarami">Zarządzaj obszarami</h4>
					<p>
						Zakładka zawiera listę dostępnych obszarów. Obszary można usuwać
						poprzez kliknięcie przycisku <strong>x</strong> przy nazwie obszaru.
						<strong>
							Uwaga: usunięcie obszaru spowoduje całkowite usunięcie go z bazy
							danych i nie będzie on już dostępny po odświeżeniu strony!
						</strong>{" "}
					</p>
					<h5 id="dodawanie-w-asnego-obszaru">Dodawanie własnego obszaru</h5>
					<p>
						Możemy też dodać własny obszar poprzez kliknięcie przycisku{" "}
						<em>Dodaj nowy obszar</em>, przełączy on mapę w tryb edycji.
						Zaznaczając punkty na mapie możemy wyznaczyć żądany obszar.
						Pojedynczy obszar może składać się tylko z jednego wielokąta. Po
						narysowaniu obszaru, należy wpisać jego nazwę w polu tekstowym na
						górze mapy oraz kliknąć przycisk <em>Utwórz</em>. Obszar zostanie
						dodany do listy.
					</p>
					<h2 id="filtry">Filtry</h2>
					<h4 id="wybierz-godziny">Wybierz godziny</h4>
					<p>
						Ta sekcja umożliwia ustawienie zakresu godzin odjazdu. W przypadku
						wybrania analizy wahadłowej, pojawi się możliwość zdefiniowania
						interwału - po jakim czasie pasażer wrócił na początkowy przystanek.
						Domyślnie wybrane jest zakres 0:00 - 24:00.
					</p>
					<h4 id="wybierz-zakres-dat">Wybierz zakres dat</h4>
					<p>
						Ta sekcja umożliwia ustawienie zakresu dat, dla których analiza ma
						zostać przeprowadzona. Domyślnie wybrany jest cały zakres dat, dla
						którego dane są dostępne.
					</p>
					<h4 id="wybierz-dzie-tygodnia">Wybierz dzień tygodnia</h4>
					<p>
						Ta sekcja umożliwia wybranie dni tygodnia, dla których analiza ma
						zostać przeprowadzona. Domyślnie wybrane są wszystkie dni tygodnia.
					</p>
					<h4 id="wybierz-rodzaj-bilet-w">Wybierz rodzaj biletów</h4>
					<p>
						Ta sekcja umożliwia wybranie rodzaju biletów, dla których ma zostać
						przeprowadzona analiza. Domyślnie wszystkie rodzaje biletów są brane
						pod uwagę.
					</p>
					<h2 id="wy-wietlanie-wizualizacji">Wyświetlanie wizualizacji</h2>
					<p>
						Po wybraniu początku, końca oraz filtrów należy te wybory
						zatwierdzić przyciskiem <em>Przetwarzaj dane</em>. Po załadowniu
						wizualizacja zostanie zaktualizowana.
					</p>
					<h2 id="pobieranie-danych">Pobieranie danych</h2>
					<p>
						W celu pozyskania danych (<code>.csv</code>) z aktualnie
						prezentowanej analizy, należy kliknąć przycisk <em>Zapisz dane</em>{" "}
						i wybrać docelowy folder do zapisu.
					</p>
                    </ScrollView>
				</div>
			</Container>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Help);
