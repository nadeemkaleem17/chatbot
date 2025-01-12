import React from "react";
import { Container, Row } from "react-bootstrap";
import { InfoSection } from "./InfoSection";
import { SignupForm } from "./SignupForm";
export const SignUp = () => {
  return (
    <section className="signup-page py-5 ">
      <Container>
        <Row className="align-items-center">
          {/* Left Side */}
          <InfoSection />
          {/* Right Side */}
          <SignupForm />
        </Row>
      </Container>
    </section>
  );
};
