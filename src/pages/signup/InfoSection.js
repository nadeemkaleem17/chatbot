import React from "react";
import { Col } from "react-bootstrap";

export const InfoSection = () => {
  const element = (
    <i
      className="fa-sharp fa-solid fa-circle-check"
      style={{ color: "#33cc33", marginRight: "10px" }}
    ></i>
  );
  return (
    <Col lg={7} className="text-center text-lg-start">
      <h1 className="display-5 fw-bold mb-4">
        Join Us and Unlock a World of Possibilities
      </h1>
      <p className="h4 mb-4">
        Sign up now to experience the future of AI-powered conversations.
        Whether you're here to enhance productivity, learn, or connect, we've
        got you covered.
      </p>
      <ul className="list-unstyled ">
        <li className="h5 mb-4">
          {element}
          24/7 AI Assistance
        </li>
        <li className="mb-4 h5">
          {element}
          Secure and Reliable Platform
        </li>
        <li className="mb-4 h5">
          {element}
          Personalized Chat Experiences
        </li>
      </ul>
    </Col>
  );
};
