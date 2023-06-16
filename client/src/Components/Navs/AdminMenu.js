// import Nav from 'react-bootstrap/Nav';
// import { NavLink } from 'react-router-dom';

// function AdminMenu() {
//   return (
//   <div>
  
//   <Nav className="flex-column">
//     <NavLink className="nav-link" to="/dashboard/admin">Dashboard</NavLink>
//     <NavLink className="nav-link" to="/dashboard/admin/category">Create category</NavLink>
//     <NavLink className="nav-link" to="/dashboard/admin/product">Create Product</NavLink>
//     <NavLink className="nav-link" to="/dashboard/admin/products">Products</NavLink>
//   </Nav>
// </div>
//   );
// }

// export default AdminMenu;


import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

function AdminMenu() {
  return (
    <div className="admin-menu">
      <Nav className="flex-column">
        <NavLink className="nav-link admin-nav-link" activeClassName="active" to="/dashboard/admin/profile">
          Dashboard
        </NavLink>
        <NavLink className="nav-link admin-nav-link" activeClassName="active" to="/dashboard/admin/category">
          Create category
        </NavLink>
        <NavLink className="nav-link admin-nav-link" activeClassName="active" to="/dashboard/admin/product">
          Create Product
        </NavLink>
        <NavLink className="nav-link admin-nav-link" activeClassName="active" to="/dashboard/admin/products">
          Products
        </NavLink>
        <NavLink className="nav-link admin-nav-link" activeClassName="active" to="/dashboard/admin/orders">
          Orders
        </NavLink>
      </Nav>
    </div>
  );
}

export default AdminMenu;
