import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { withRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import configureStore, { history } from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import initialState from "./redux/initialState";

const store = configureStore(initialState);
const AppWithRouter = withRouter(App);

ReactDOM.render(
	<ReduxProvider store={store}>
		<ConnectedRouter history={history}>
			<AppWithRouter />
		</ConnectedRouter>
	</ReduxProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
