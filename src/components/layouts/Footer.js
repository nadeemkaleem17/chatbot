import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
export const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center">
            <p className="m-0 text-muted">
              Chatbot AI can make mistakes. Check important info.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
