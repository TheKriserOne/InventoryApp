import React from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import user1 from "../assets/images/users/user4.jpg";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { currentUser, logout } = useAuth();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
    setIsOpen(!isOpen);
  };
  return (
    <Navbar color="primary" dark>
      <div className="d-flex">
        <div className="d-block">
          <Logo />
        </div>
        <NavbarBrand href="/"/>
        <Button
          color="primary"
          onClick={showMobilemenu}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
  <div className={"d-flex justify-content-end"}>
      <Button onClick={() => navigate("/cart")} color={"transparent"} className={"fs-2 bi-cart-check"}/>
    {currentUser ?
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="40"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown> : <Button onClick={() => navigate("/login")} color={"transparent"} className={"fs-2 bi-person-circle"}/>}
  </div>
    </Navbar>
  );
};

export default Header;
