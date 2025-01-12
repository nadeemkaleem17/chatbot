import React, { useEffect, useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserDropdown from "../Elements/UserDropdown";
import { ChatSidebar } from "../ChatSidebar";
import { useChat } from "../../context/ChatContext";
// import logo from "../../assets/images/logo.jpg";

export const Header = () => {
  const { userId } = useChat();
  const [dropDown, setDropDown] = useState(false);
  // const token = JSON.parse(sessionStorage.getItem("token"));
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    if (token) {
      setDropDown(true);
    }
  }, [userId]);
  return (
    <Navbar className="shadow-sm fixed-top" bg="white" expand="lg">
      <Container>
        {dropDown && <ChatSidebar />}
        <Navbar.Brand className="d-flex align-items-center" as={Link} to="/">
          <span className="text-black font-weight-bold fs-2 fw-semibold">
            ChatBot
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navigation Links */}

        <Navbar.Collapse className="justify-content-end" id="navbar-nav">
          {!dropDown && (
            <div>
              <Link className="btn btn-outline-dark mx-3 px-4 py-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-dark px-3 py-2" to="/signup">
                Signup
              </Link>
            </div>
          )}
          {dropDown && <UserDropdown setDropDown={setDropDown} />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
