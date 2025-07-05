import {lazy} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthContext.jsx";
import {CartProvider} from "../contexts/CartContext.jsx";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.jsx"));
/***** Pages ****/

const Inventory = lazy(() => import("../views/ui/Inventory.jsx"));
const Store = lazy(() => import("../views/ui/Store.jsx"));
const NotFound = lazy(() => import("../views/ui/NotFound.jsx"));
const AutoPart = lazy(() => import("../views/ui/AutoPart.jsx"));
const Cart = lazy(() => import("../views/ui/Cart.jsx"));
const Login = lazy(() => import("../views/ui/Login.jsx"));
const PrivateRoute = lazy(() => import("./PrivateRoute.jsx"));
const AddInventory = lazy(() => import("../views/ui/AddInventory.jsx"));
const EditInventory = lazy(() => import("../views/ui/EditInventory.jsx"));
/*****Routes******/


const ThemeRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<CartProvider><FullLayout/></CartProvider>}>
                    <Route index element={<Navigate to="/store"/>}/>
                    <Route path="store/:id" element={<AutoPart/>}/>
                    <Route path="store" element={<Store/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path="inventory" element={<Inventory/>}/>
                        <Route path="inventory/add" element={<AddInventory/>}/>
                        <Route path="inventory/edit/:id" element={<EditInventory/>}/>
                    </Route>
                    <Route path="cart" element={<Cart/>}/>
                </Route>

                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AuthProvider>
    );
};
export default ThemeRoutes;
