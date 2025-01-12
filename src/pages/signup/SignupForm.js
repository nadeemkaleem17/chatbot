import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import google_logo from "../../assets/images/google_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services";
import { toast } from "react-toastify";
import { useChat } from "../../context/ChatContext";
import "./SignupForm.css";
export const SignupForm = () => {
  const { setUserId } = useChat();
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const userAuth = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        password: event.target.password.value,
      };
      const data = await register(userAuth);
      const userId = JSON.parse(sessionStorage.getItem("cbid"));

      setUserId(userId);
      data.accessToken ? navigate("/chat") : toast.error(data);
    } catch (error) {
      // toast.error(error.message, {
      //   colseButton: true,
      //   position: "bottom-center",
      // });
    }
  }

  return (
    <Col
      lg={5}
      className="mt-4 p-4 rounded-1 border border-secondary-subtle"
      style={{
        height: "650px", // Fixed height for the form
      }}
    >
      <Button className="sign-up-button-google btn btn-primary my-3 w-100 py-3">
        <img
          className="goole-image bg-white rounded-1"
          src={google_logo}
          alt="Google Logo"
        />
        <span className="fw-bold fs-5 text-white ">Sign up with Google</span>
      </Button>
      <div className="d-flex align-items-center my-4">
        <hr className="flex-grow-1 border-secondary" />
        <span className="mx-3 text-muted fw-bold">OR</span>
        <hr className="flex-grow-1 border-secondary" />
      </div>
      <p className="asterisk-text">* indicates a required field.</p>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label style={{ textAlign: "left", display: "block" }}>
                First Name
              </Form.Label>
              <Form.Control
                className="form-control-lg rounded-1"
                type="text"
                name="firstName"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label className="form-text-style">Last Name</Form.Label>
              <Form.Control
                className="form-control-lg rounded-1"
                type="text"
                name="lastName"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="form-text-style me-3">* Work Email</Form.Label>
          <Form.Control
            className="form-control-lg rounded-1"
            type="email"
            required
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="form-text-style fw-bold">
            * Password
          </Form.Label>
          <Form.Control
            className="form-control-lg rounded-1"
            type="password"
            required
            name="password"
          />
        </Form.Group>

        <Button
          className="submit-button btn btn-primary rounded-5 my-3 py-3 w-100"
          type="submit"
        >
          <h1 className="fw-bold fs-5">Get Started</h1>
        </Button>
      </Form>
      <p className="mt-3 text-center">
        Already have an account?{" "}
        <Link className="login-link" to="/login">
          Log In
        </Link>
      </p>
    </Col>
  );
};
