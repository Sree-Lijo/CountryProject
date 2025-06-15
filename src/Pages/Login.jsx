import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Button, Container } from 'react-bootstrap';
import './Login.css';
import { LuLinkedin } from "react-icons/lu";
import { SlSocialGoogle, SlSocialFacebook, SlSocialTwitter } from "react-icons/sl";
import pic from "../assets/Image.png";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid.';
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (!passwordRegex.test(password)) {
            newErrors.password =
                'Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 symbol.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        setSubmitted(Object.keys(validationErrors).length === 0);
        if (Object.keys(validationErrors).length === 0) {
            navigate('/home');
        }

    };


    return (
        <Container>
            <Row className="vh-100">
                <Col md={5}>
                    <div className="h-100 d-flex flex-column justify-content-center">
                        <h2>Sign In</h2>
                        <p className="mb-4">New User?
                            <a href="#" className="ms-2">Create an account</a>
                        </p>

                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 " controlId="formBasicEmail" >
                                <Form.Control
                                    type="email"
                                    placeholder="Username or email"
                                    className={` rounded-0 border-dark ${errors.email ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <Form.Text className="text-danger">{errors.email}</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3 " controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    className={` rounded-0 border-dark ${errors.password ? 'is-invalid' : ''}`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                {errors.password && (
                                    <Form.Text className="text-danger">{errors.password}</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Keep me signed in" />
                            </Form.Group>

                            <Button className="w-100" variant="dark" type="submit">
                                Sign In
                            </Button>
                        </Form>
                        {submitted && (
                            <Alert className="mt-3" variant="success">
                                Form submitted successfully!
                            </Alert>
                        )}
                        <p className="orSignIN">
                            <span>Or Sign In With</span>
                        </p>
                        <div className="social-icons">
                            <span>
                                <SlSocialGoogle />
                            </span>
                            <span>
                                <SlSocialFacebook />
                            </span>
                            <span>
                                <LuLinkedin />
                            </span>
                            <span>
                                <SlSocialTwitter />
                            </span>
                        </div>
                    </div>

                </Col>
                <Col md={7} className="d-none d-md-block">
                <img
                            src={pic}
                            alt="Illustration"
                            className="login-illustration"
                        />
                </Col>

            </Row>

        </Container>
    )

}

export default Login;