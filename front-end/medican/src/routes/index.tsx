import { default as React, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { MainLayout } from "../layouts";

const HomePage = React.lazy(() => import("../page/home"));
const LoginPage = React.lazy(() => import("../page/login"));
const LogoutPage = React.lazy(() => import("../page/logout"));
const RegisterPage = React.lazy(() => import("../page/register"));
const ProductDetail = React.lazy(() => import("../page/products/detail"));
const QuotePage = React.lazy(() => import("../page/quote"));
const ProfilePage = React.lazy(() => import("../page/admin"));
const EmailPage = React.lazy(() => import("./../page/admin/profile/index"));
const NewsPage = React.lazy(() => import("./../page/news/list-news"));
const DetailNewsPage = React.lazy(() => import("./../page/news/detail-news"));
const InformationPage = React.lazy(() => import("./../page/admin/information"));
const CheckoutPage = React.lazy(() => import("./../page/checkout"));
const SubCategoryPage = React.lazy(() => import("./../page/sub-category"));

export function MainRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <MainLayout>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/products/:slug/:id" component={ProductDetail} />
          <Route exact path="/quote" component={QuotePage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/profile/login" component={EmailPage} />
          <Route exact path="/profile/personal" component={InformationPage} />
          <Route exact path='/sub-categories/:slug/:id' component={SubCategoryPage} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/news/:id" component={DetailNewsPage} />
        </MainLayout>
        {/* <Route path='*' exact component={ErrorPage} /> */}
      </Switch>
    </Suspense>
  );
}
