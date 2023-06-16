import { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from './Components/Footer/Footer';
import Menu from "./Components/Navs/Menu";
import AdminRoute from './Components/Routes/AdminRoute';
import PrivateRoute from './Components/Routes/PrivateRoute';
import NotFound from './Pages/404Page';
import Category from './Pages/Admin/Category';
import AdminDashboard from './Pages/Admin/Dashboard';
import AdminOrders from './Pages/Admin/Orders';
import Product from './Pages/Admin/Product';
import Products from './Pages/Admin/Products';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Cart from './Pages/Cart';
import CategoryPage from './Pages/CategoryPage';
import Confirmation from './Pages/Confirmation';
import Home from "./Pages/Home";
import ProductView from './Pages/ProductView';
import Search from './Pages/Search';
import Shop from './Pages/Shop';
import UserDashboard from './Pages/User/Dashboard';
import Order from './Pages/User/Order';
import Profile from './Pages/User/Profile';



function App() {

  return <div className="App">
    <Menu></Menu>
   
    <Toaster></Toaster>
  <Routes>
    <Route path="/" element={<Home></Home>}></Route>
    <Route path="/shop" element={<Shop></Shop>}></Route>
    <Route path='/search' element= {<Search></Search>}></Route>
    <Route path='/cart' element={<Cart></Cart>}></Route>
    <Route path='/confirmation' element={<Confirmation></Confirmation>}></Route>
    <Route path='/product/:slug' element= {<ProductView></ProductView>}></Route>
    <Route path='/my-category/:categoryId' element= {<CategoryPage></CategoryPage>}></Route>
    <Route path="/login" element={<Login></Login>}></Route>
    <Route path="/register" element={<Register></Register>}></Route>
    <Route path="/dashboard" element= {<PrivateRoute></PrivateRoute>}>
      <Route path='user' element ={<UserDashboard></UserDashboard>}></Route>
      <Route path='user/profile' element ={<Profile></Profile>}></Route>
      <Route path='user/orders' element ={<Order></Order>}></Route>
    </Route>
    <Route path="/dashboard" element= {<AdminRoute></AdminRoute>}>
      <Route path="admin" element={<AdminDashboard></AdminDashboard>}></Route>
      <Route path="admin/profile" element={<AdminDashboard></AdminDashboard>}></Route>
      <Route path="admin/category" element={<Category></Category>}></Route>
      <Route path="admin/product" element={<Product></Product>}></Route>
      <Route path="admin/orders" element={<AdminOrders></AdminOrders>}></Route>
      <Route path="admin/products" element={<Products></Products>}></Route>
      <Route path="admin/product/update/:slug" element= {<UpdateProduct></UpdateProduct>}></Route>
    </Route>
    <Route path="*" element={<NotFound />} replace />
  </Routes>
  <Footer></Footer>
  </div>;
}

export default App;
