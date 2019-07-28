import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Navigator } from "./pages/navigator";
import React from "react";
import WebMetaHeader from "./components/meta-component/meta-component";

export const App = () => {
	return (
		<Provider
			store={store}
		>
			<Navigator/>
		</Provider>
	);
};
