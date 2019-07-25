import React from "react";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { IndexPage } from "./index-page/index-page";
import { CreatePage } from "./create-page/create-page";
import { BlogPage } from "./blog-page/blog-page";
import { BlogUpdatePage } from "./blog-update-page/blog-update-page";

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
			</Switch>
		</Router>
	);
};
