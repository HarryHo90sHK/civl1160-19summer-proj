import React from "react";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { IndexPage } from "./index-page/index-page";
import { CreatePage } from "./create-page/create-page";
import { BlogPage } from "./blog-page/blog-page";
import { BlogUpdatePage } from "./blog-update-page/blog-update-page";
import { ExtraPage } from "./extra-page/extra-page"
import { CategoryPage } from "./category-page/category-page";
import { AllCategoriesPage } from "./allcategories-page/allcategories-page";

const history = createBrowserHistory();

export const Navigator = () => {
	return (
		<Router
			history={history}
		>
			<Switch>
				<Route
					exact
					path="/"
					component={IndexPage}
				/>
				<Route
					exact
					path="/blogs/new"
					component={CreatePage}
				/>
				<Route
					exact
					path="/blogs/view/:_id"
					component={BlogPage}
				/>
				<Route
					exact
					path="/blogs/edit/:_id"
					component={BlogUpdatePage}
				/>
				<Route
					exact
					path="/categories/:category"
					component={CategoryPage}
				/>
				<Route
					exact
					path="/categories"
					component={AllCategoriesPage}
				/>
				<Route
					exact
					path="/extra"
					component={ExtraPage}
				/>
			</Switch>
		</Router>
	);
};
