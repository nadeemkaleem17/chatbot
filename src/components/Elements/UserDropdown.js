import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";
import { HideDownArrow } from "./HideDownArrow";
import { getUser, logout } from "../../services/chatService";
import { toast } from "react-toastify";

export const UserDropdown = ({ setDropDown }) => {
  // const user = { firstName: "Asad", email: "hello" };
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    // getUser()
    async function fetchData() {
      try {
        const data = await getUser();
        data.email ? setUser(data) : handleLogOut();
      } catch (error) {
        toast.error(error.message, {
          colseButton: true,
          position: "bottom-center",
        });
      }
    }
    fetchData();
  }, []);
  function handleLogOut() {
    logout();
    setDropDown(false);
    setUser({});
    navigate("/");
    // navigate("/");
  }
  return (
    <>
      <HideDownArrow />
      <Dropdown align="end" className="position-relative">
        <Dropdown.Toggle
          style={{ display: "inline-block" }}
          as="div"
          className="d-flex align-items-center"
          id="dropdownUserAvatarButton"
        >
          <UserAvatar userName={user.firstName} />
        </Dropdown.Toggle>

        <Dropdown.Menu className="bg-white shadow rounded-3">
          <Dropdown.Item as={Link}>Hi! {user.firstName}</Dropdown.Item>
          <Dropdown.Item as={Link}>Hi! {user.email}</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogOut} className="text-danger">
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default UserDropdown;
