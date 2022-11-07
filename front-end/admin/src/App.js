import Cookies from "js-cookie";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import ListCategory from "./pages/category/list-category";
import AddCategoriesPage from "./pages/category/new-category";
import EditCategoriesPage from "./pages/category/update-category";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login";
import CreateNew from "./pages/news/new-create";
import NewsList from "./pages/news/new-list";
import UpdateNew from "./pages/news/new-update/index";
import NewProduct from "./pages/product/newProduct/NewProduct";
import Product from "./pages/product/Product";
import ProductList from "./pages/product/productList/ProductList";
import AddSubCategoriesPage from "./pages/sub-category/add-sub-category";
import EditSubCategoriesPage from "./pages/sub-category/edit-sub-category";
import ListSubCategory from "./pages/sub-category/list-sub-category";
import NewUser from "./pages/user/newUser/NewUser";
import User from "./pages/user/User";
import UserList from "./pages/user/userList/UserList";

function App() {
    // const getRole = Cookies.get("admin");
    // console.log(getRole)
    // return getRole === 'ROLE_ADMIN' ?  <MainRoute /> : <MainLogin />;
    const [state, setState] = useState({ checking: true, authorized: false });
    const getRole = Cookies.get("admin");
    console.log(getRole);

    useEffect(() => {
        const checkLogin = () => {
            getRole === "ROLE_ADMIN"
                ? setState({ checking: false, authorized: false })
                : setState({ checking: false, authorized: true });
        };

        checkLogin();
    }, []);
    console.log(state);
    if (state.checking) return <div>Loading...</div>;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {getRole === "ROLE_ADMIN" ? <MainRoute /> : <MainLogin />}
        </Suspense>
    );
}

export default App;
function MainRoute() {
    return (
        <Router>
            <Topbar />
            <div className="container">
                <Sidebar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/users">
                        <UserList />
                    </Route>
                    <Route path="/user/:userId">
                        <User />
                    </Route>
                    <Route path="/newUser">
                        <NewUser />
                    </Route>
                    <Route path="/products">
                        <ProductList />
                    </Route>
                    <Route path="/product/:id">
                        <Product />
                    </Route>
                    <Route path="/new-product">
                        <NewProduct />
                    </Route>
                    <Route path="/news">
                        <NewsList />
                    </Route>
                    <Route path="/create-news">
                        <CreateNew />
                    </Route>
                    <Route path="/new/:id">
                        <UpdateNew />
                    </Route>
                    <Route path="/categories">
                        <ListCategory />
                    </Route>
                    <Route path="/new-category">
                        <AddCategoriesPage />
                    </Route>
                    <Route path="/category/:id">
                        <EditCategoriesPage />
                    </Route>
                    <Route path="/sub-categories">
                        <ListSubCategory />
                    </Route>
                    <Route path="/add-sub-category">
                        <AddSubCategoriesPage />
                    </Route>
                    <Route path="/sub-category/:id">
                        <EditSubCategoriesPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function MainLogin() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LoginPage />
                </Route>
            </Switch>
        </Router>
    );
}
