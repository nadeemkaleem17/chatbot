import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/hero.webp";
import { Container, Row, Col } from "react-bootstrap";

export const Hero = () => {
  return (
    <section className="d-flex align-items-center my-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={7} className="text-center text-lg-start">
            <h1 className="display-4 fw-bold">
              Learn Smarter with AI-Powered Assistance
            </h1>
            <p className="h4 my-4 px-1 fw-light">
              Explore a world of knowledge with our AI chatbot. Get instant
              answers, personalized study plans, and interactive learning
              experiences tailored to your needs.
            </p>
            <Link to="/signup" className="btn btn-dark btn-lg">
              Try Chatbot
            </Link>
          </Col>
          <Col lg={5} className="my-5 text-center">
            <img
              className="img-fluid rounded"
              src={logo}
              alt="CodeBook Hero Section"
              style={{ width: "100%", height: "470px" }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
