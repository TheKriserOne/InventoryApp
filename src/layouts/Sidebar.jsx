import {Collapse, Nav, NavItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useState} from "react";
import {useAuth} from "../contexts/AuthContext.jsx";

const Sidebar = () => {
    let location = useLocation();
    const [collapse, setCollapse] = useState(location.pathname.includes("/inventory"));
    const toggle = () => setCollapse(!collapse);
    const {currentUser} = useAuth()

    return (
            <div className="p-3 mt-2 h-100">
                <Nav vertical>
                    {currentUser && <NavItem className="sidenav-bg">
                        <Link onClick={toggle} className={collapse ? "dropdown nav-link py-3"
                            : "nav-link text-secondary py-3"}>
                            <i className={"bi bi-suitcase-lg"}></i>
                            <span className="ms-3 d-inline-block">Inventory</span>
                        </Link>
                        <Collapse isOpen={collapse}>
                            <NavItem className="sidenav-bg">
                                <Link
                                    to={"/inventory"}
                                    className={"nav-link text-secondary py-3"
                                    }>
                                    <i className={"bi bi-box"}></i>
                                    <span className="ms-3 d-inline-block">Inventory</span>
                                </Link>
                            </NavItem>
                            <NavItem className="sidenav-bg">
                                <Link
                                    to={"/inventory/add"}
                                    className={
                                        location.pathname === "/inventory/add"
                                            ? "active nav-link py-3"
                                            : "nav-link text-secondary py-3"
                                    }
                                >
                                    <i className={"bi bi-box-arrow-in-down"}></i>
                                    <span className="ms-3 d-inline-block">Add Inventory</span>
                                </Link>
                            </NavItem>
                        </Collapse>
                    </NavItem>}

                    <NavItem className="sidenav-bg">
                        <Link to={"/store"} className={location.pathname === "/store" ? "active nav-link py-3"
                            : "nav-link text-secondary py-3"}>
                            <i className={"bi bi-shop"}></i>
                            <span className="ms-3 d-inline-block">Store</span>
                        </Link>
                    </NavItem>
                </Nav>
            </div>
    );
};

export default Sidebar;
