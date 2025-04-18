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
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color="primary" dark expand="md" className={"sticky-top"} style={{zIndex: 1030}}>
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Logo />
        </div>
        <NavbarBrand href="/"/>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>
  <div className={"d-flex justify-content-endd"}>
      <Button onClick={() => navigate("/cart")} color={"transparent"} className={"fs-2 bi-cart-check"}/>
    {currentUser ? <Collapse navbar isOpen={isOpen}>
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
        </Dropdown>
      </Collapse> : <Button onClick={() => navigate("/login")} color={"transparent"} className={"fs-2 bi-person-circle"}/>}
  </div>
    </Navbar>
  );
};

export default Header;
