import React, { useEffect, useState } from "react";
import { Container, Nav, Row, Navbar, Col, Carousel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import './Home.css';
import {
    fetchCountries,
    filterByRegion,
    loadMore,
} from "../Redux/Slices/CountriesSlice";

function Home() {

    const dispatch = useDispatch();
    const { filtered, region, visibleCount, loading } = useSelector(
        (state) => state.countries
    );

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <Navbar expand="lg" className="">
                <Container>
                    <Navbar.Brand href="/">
                        <h4>Countries</h4>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                        </Nav>
                        <div className={`region-tabs ${menuOpen ? "show" : ""}`}>
                            {["All", "Asia", "Europe"].map((r) => (
                                <button
                                    key={r}
                                    className={`${r === region ? "countryActive" : ""} buttonCss`}
                                    onClick={() => {
                                        dispatch(filterByRegion(r));
                                        setMenuOpen(false);
                                    }}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <h1 className="welcomeSty">Welcome</h1>
                {loading ? (
                    <div className="spinner-container text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <Row className="mt-5">
                            <Col xs={12} lg={9} className="order-2 order-lg-1">

                                <Carousel indicators controls className="carouuselsty">
                                    {filtered.slice(0, 5).map((country, idx) => (
                                        <Carousel.Item key={idx}>
                                            <div>
                                                <img
                                                    src={country.flag}
                                                    alt={country.name}
                                                    style={{ height: "400px" }}
                                                />
                                            </div>
                                            <Carousel.Caption>
                                                <h5>{country.name}</h5>
                                                <p>{country.region}</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>

                            </Col>

                            <Col xs={12} lg={3} className="order-1 order-lg-2 mb-3">

                                <div>
                                    <img
                                        src={filtered[1]?.flag}
                                        alt={filtered[1]?.name}
                                        className="d-block"
                                        style={{
                                            maxHeight: "100%",
                                            maxWidth: "100%",
                                        }}
                                    />
                                </div>

                            </Col>
                        </Row>


                        <Row>
                            {filtered.slice(0, visibleCount).map((country, i) => (
                                <Col xs={12} md={6} key={i}>
                                    <div className="country-card my-3 px-2">
                                        <img
                                            src={country.flag}
                                            alt={country.name}
                                            className="flag-img"
                                        />
                                        <div className="ms-3">
                                            <strong>{country.name}</strong>
                                            <br />
                                            <span>{country.region}</span>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>

                        {visibleCount < filtered.length && (
                            <div className="text-center mt-4">
                                <Button
                                    onClick={() => dispatch(loadMore())}
                                    className="load-more-btn"
                                >
                                    Load more
                                </Button>
                            </div>
                        )}
                    </>
                )}

                <footer className="footer-section mt-5 text-center">
                    <div className="social-icons mb-3">
                        <i className="bi bi-facebook"></i>
                        <i className="bi bi-twitter"></i>
                        <i className="bi bi-linkedin"></i>
                        <i className="bi bi-youtube"></i>
                    </div>
                    <div className="footer-text">
                        <div>Example@email.com</div>
                        <p>Copyright © 2020 Name. All rights reserved.</p>
                    </div>
                </footer>
            </Container>



        </>
    )

}

export default Home;