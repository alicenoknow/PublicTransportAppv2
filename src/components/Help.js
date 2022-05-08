import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { ScrollView } from "@cantonjs/react-scroll-view";

class Help extends Component {
	render() {
		return (
			<Container fluid className="p-0 bg-dark">
				<ScrollView
					style={{ height: "100vh", paddingTop: "5%", paddingBottom: "5%" }}>
					<div className="help">
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
								<a href="#wyświetlanie-wizualizacji">
									Wyświetlanie wizualizacji
								</a>
							</li>
							<li>
								<a href="#informacje">Informacje</a>
							</li>
						</ol>
						<h2 id="wst-p">Wstęp</h2>
						<p>
							Strona umożliwia przeprowadzanie oraz wizualzację analizy
							jednokierunkowej lub wahadłowej, z uwzględnieniem wybranych
							parametrów.
						</p>
						<h2 id="-adowanie-danych">Ładowanie danych</h2>
						<p>
							W celu przesłania nowych danych do systemu, należy przejść do
							zakładki <em>Dane</em>, która znajdujące się w górnym pasku
							nawigacyjnym. Po załadowaniu strony, pojawi się możliwość wyboru
							arkusza z danymi i przesłania go do bazy danych.
						</p>
						<h2 id="panele-boczne">Panele boczne</h2>
						<p>
							Na stronie głównej, w górnych rogach mapy znajdują się dwa
							przyciski służące do wysuwania i chowania paneli bocznych.
						</p>
						<ul>
							<li>
								<p>
									<strong className="color">Lewy panel</strong> zawiera
									ustawiania parametrów wizualizacji: rodzaju wizualizacji,
									punktów początkowych i końcowych oraz filtrów. Znajduje się
									tam także sekcja zarządzania obszarami i widokiem.
									Poszczególne sekcje są opisane w zakładkach:{" "}
									<a href="#rodzaje-wizualizacji">Rodzaje wizualizacji</a>,{" "}
									<a href="#obszary-i-przystanki">Obszary i przystanki</a> oraz{" "}
									<a href="#filtry">Filtry</a>.
								</p>
							</li>
							<li>
								<p>
									<strong className="color">Prawy panel</strong> jest panelem
									informacyjnym. Możemy tu zobaczyć, jakie parametry
									wizualizacji są obecnie zastosowane. Po kliknięciu na elementy
									wizualizacji, w sekcji <a href="#informacje">Informacje</a>{" "}
									znajdziemy szczegółowe dane na temat wybranego przystanku,
									obszaru lub linii, a także dane dotyczące analizy.
								</p>
							</li>
						</ul>

						<h2 id="rodzaje-wizualizacji">Rodzaje wizualizacji</h2>
						<p>
							W tej sekcji możemy wybrać rodzaj analizy
							(jednokierunkowa/wahadłowa) oraz ustalić początek i koniec trasy.
							Możliwe opcje początku i końca trasy to:
						</p>
						<ul>
							<li>
								<p>
									<strong className="color">Wybrane przystanki</strong> - ta
									opcja umożliwia wybranie 1 lub więcej przystanków poprzez
									kliknięcie na przystanek na mapie. Jeśli przystanek został
									wybrany jako jeden z początkowych/końcowych jego kolor
									zostanie zmieniony na odpowiadający kolor sekcji
									początkowej/końcowej w lewym panelu oraz jegno nazwa wyświetli
									się w odpowiedniej zakładce w prawym panelu informacyjnym. W
									celu odznaczenia przystanku należy ponownie na niego kliknąć.
								</p>
							</li>
							<li>
								<p>
									<strong className="color">Wybrane obszary</strong> - ta opcja
									umożliwia wybranie 1 lub więcej obszarów poprzez kliknięcie na
									obszar na mapie. Jeśli obszar został wybrany jako jeden z
									początkowych/końcowych jego kolor zostanie zmieniony na
									odpowiadający kolor sekcji początkowej/końcowej w lewym panelu
									oraz jegno nazwa wyświetli się w odpowiedniej zakładce w
									prawym panelu informacyjnym. W celu odznaczenia obszaru należy
									ponownie kliknąć na niego na mapie. Definiowanie własnych
									obszarów zostało omówione w sekcji{" "}
									<a href="#obszary-i-przystanki">Obszary i przystanki</a>
								</p>
							</li>
							<li>
								<p>
									<strong className="color">Wszystkie przystanki</strong> - ta
									opcja umożliwia wybranie wszystkich przystanków. Jeśli wybrana
									zostanie ta opcja, wtedy wizualizacja zostanie przedstawiona w
									formie mapy cieplnej, ponieważ analiza za pomocą linii byłaby
									w tym przypadku nieczytelna. Szczegółowe informacje na temat
									połączeń wyświetlą się w prawym panelu, po kliknięciu na
									konkretny przystanek. Więcej informacji w sekcji{" "}
									<a href="#informacje">Informacje</a>
								</p>
							</li>
						</ul>
						<h2 id="obszary-i-przystanki">Obszary i przystanki</h2>
						<h4 id="widok">Widok</h4>
						<p>
							Zakładka umożliwia wyświetlanie oraz chowanie przystanków i
							obszarów na mapie.
						</p>
						<h4 id="zarz-dzaj-obszarami">Zarządzaj obszarami</h4>
						<p>
							Zakładka zawiera listę dostępnych obszarów. Obszary można usuwać
							poprzez kliknięcie przycisku <strong>x</strong> przy nazwie
							obszaru. <br />
							<strong className="color">Uwaga: </strong>usunięcie obszaru
							spowoduje całkowite usunięcie go z bazy danych i nie będzie on już
							dostępny po odświeżeniu strony!{" "}
						</p>
						<h5 id="dodawanie-w-asnego-obszaru">Dodawanie własnego obszaru</h5>
						<p>
							Możemy też dodać własny obszar poprzez kliknięcie przycisku{" "}
							<em className="color">Dodaj nowy obszar</em>. Mapa zostanie
							przełączona w tryb edycji. Zaznaczając punkty na mapie, możemy
							narysować pożądany kształt. Pojedynczy obszar może składać się
							tylko z jednego wielokąta. Po zakończeniu rysowania, należy wpisać
							nazwę nowego obszaru w polu tekstowym na górze mapy oraz
							zatwierdzić przyciskiem <em className="color">Utwórz</em>. Nowy
							obszar zostanie dodany do listy w lewym panelu. Przycisk{" "}
							<em className="color">Anuluj</em> służy do opuszczenia trybu
							rysowania.
						</p>
						<h2 id="filtry">Filtry</h2>
						<ul>
							<li>
								<strong className="color">Wybierz godziny</strong>
								<p>
									Ta sekcja umożliwia ustawienie zakresu godzin odjazdu. W
									przypadku wybrania analizy wahadłowej, pojawi się możliwość
									zdefiniowania interwału, omówionego poniżej. Domyślnie wybrany
									jest zakres 0:00 - 24:00.
									<br />
									<span className="color">Przykład:</span> wybrane godziny
									odjazdu 7:15 - 9:30.
								</p>
							</li>
							<li>
								<strong className="color">Wybierz interwał</strong>
								<p>
									Ta sekcja dostępna jest jedynie dla analizy wahadłowej w
									zakładce <strong className="color">Wybierz godziny</strong>.
									Umożliwia ustawienie po jakim czasie od odjazdu pasażer wróci
									na przystanek początkowy.
									<br />
									<span className="color">Przykład:</span> wybrane godziny
									odjazdu to 9:00 - 12:00, a interwał to 2-3 godzin. Analiza
									będzie zawierać informacje o pasażerach, którzy wsiedli na
									przystanku początkowym między 9:00 a 12:00 oraz po 2-3
									godzinach od momentu swojego odjazdu, ponownie znaleźli się na
									przystanku początkowym.
								</p>
							</li>
							<li>
								<strong className="color">Wybierz zakres dat</strong>
								<p>
									Ta sekcja umożliwia ustawienie zakresu dat, dla których
									analiza ma zostać przeprowadzona. Domyślnie wybrany jest cały
									zakres dat, dla którego dane są dostępne.
									<br />
									<span className="color">Przykład:</span> wybrany zakres dat
									12-05-2021 do 15-07-2021.
								</p>
							</li>
							<li>
								<strong className="color">Wybierz dzień tygodnia</strong>
								<p>
									Ta sekcja umożliwia wybranie dni tygodnia, dla których analiza
									ma zostać przeprowadzona. Domyślnie wybrane są wszystkie dni
									tygodnia.
									<br />
									<span className="color">Przykład:</span> wybrane dni tygodnia:
									poniedziałek, środa, piątek.
								</p>
							</li>
							<li>
								<strong className="color">Wybierz rodzaj biletów</strong>
								<p>
									Ta sekcja umożliwia wybranie rodzaju biletów, dla których ma
									zostać przeprowadzona analiza. Domyślnie wszystkie rodzaje
									biletów są brane pod uwagę.
									<br />
									<span className="color">Przykład:</span> wybrane rodzaje
									bletów: bilety papierowe.
								</p>
							</li>
						</ul>
						<strong>Wyświetlanie wizualizacji</strong>
						<p>
							Po wybraniu początku, końca oraz filtrów należy te wybory
							zatwierdzić przyciskiem{" "}
							<em className="color">Przetwarzaj dane</em>. Po załadowniu danych
							wizualizacja zostanie zaktualizowana.
						</p>
						<h2 id="informacje">Informacje</h2>

						<p>
							Sekcja <span className="color">Informacje</span> zawiera dodatkowe
							dane na temat mapy oraz połączeń, w różnych sytuacjach:
						</p>
						<ul>
							<li>
								W trakcie przeglądania mapy, po kliknięciu na obszar lub
								przystanek wyświetlona zostanie jego nazwa.
							</li>
							<li>
								W trakcie analizy, po kliknięciu na przystanek, wyświetlona
								zostanie lista połączeń ze wskazanego przystanku wraz z liczbą
								podróżujących. Po kliknięciu na połączenie zostanie ono
								podświetlone na mapie.
							</li>
							<li>
								W trakcie analizy, po kliknięciu na linię łączącą przystanki
								wyświetlona zostanie informacja na tematów przystanków oraz
								pasażerów w tym połączeniu.
							</li>
						</ul>
					</div>
				</ScrollView>
			</Container>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Help);
