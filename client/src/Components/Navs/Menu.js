import { Badge } from "antd";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import "../../Assets/Css/menu.css"; // import custom CSS
import { useAuth } from "../../Context/Auth";
import { useCart } from "../../Context/Cart";
import useCategory from "../../hooks/useCategory";
import SearchForm from "../Forms/SearchForm";

function Menu() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="container-fluid px-0"> {/* Remove unnecessary padding */}
      <Navbar bg="light" variant="light" className="shadow-sm primary-menu">
        <Navbar.Brand className="w-25">Ecommerce</Navbar.Brand>
        <Nav className="w-75 d-flex justify-content-between main-menu">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/shop">
              Shop
            </NavLink>
          </li>
          <li className="nav-item">
            <Badge count={cart?.length >= 1 ? cart.length : 0}>
              <NavLink className="nav-link" to="/cart">
                Cart
              </NavLink>
            </Badge>
          </li>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <NavLink className="nav-link" to="/categories">
                All Categories
              </NavLink>
            </NavDropdown.Item>

            {categories.map((c) => {
              return (
                <NavDropdown.Item key={c._id}> {/* Add unique key */}
                  <NavLink
                    className="nav-link"
                    to={`/my-category/${c._id}`}
                  >
                    {c.name}
                  </NavLink>
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>

          <SearchForm />

          {!auth?.user ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <DropdownButton
              id="dropdown-basic-button"
              title={auth?.user?.name}
              alignRight // right-align the dropdown
            >
              <Dropdown.Item>
                <NavLink
                  className="nav-link"
                  to={`/dashboard/${
                    auth?.user?.role === 1 ? "admin" : "user"
                  }`}
                >
                  Dashboard
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </DropdownButton>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default Menu;
