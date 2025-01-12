import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import { useChat } from "../context/ChatContext";
import "./Login.css";
export const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const { setUserId } = useChat();
  async function handleLoginSumbit(event) {
    event.preventDefault();
    try {
      const userAuth = {
        email: event.target.email.value,
        password: event.target.password.value,
      };
      console.log("userAuth", userAuth);
      const data = await login(userAuth);
      if (data.id) {
        setUserId(data.id);
        data.id ? navigate("/chat") : toast.error(data);
      }
    } catch (error) {
      // toast.error(error.message, {
      //   colseButton: true,
      //   position: "bottom-center",
      // });
    }
  }
  return (
    <div className="login-main d-flex justify-content-center align-items-center">
      <Col
        lg={5}
        className="login-column mt-4 p-4 rounded-3 border border-secondary-subtle"
      >
        <Form onSubmit={handleLoginSumbit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="form-label me-3">Work Email</Form.Label>
            <Form.Control
              className="form-control-lg rounded-1"
              type="email"
              required
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="form-label fw-bold">Password</Form.Label>
            <Form.Control
              className="form-control-lg rounded-1"
              type="password"
              name="password"
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="btn btn-primary rounded-5 my-3 py-3 w-100"
          >
            <h1 className="fw-bold fs-5">Log In</h1>
          </Button>
        </Form>
        <p className="mt-3 text-center">
          Don't have Chatbot account?{" "}
          <Link className="sign-up-text" to="/signup">
            Sign Up
          </Link>
        </p>
      </Col>
    </div>
  );
};
