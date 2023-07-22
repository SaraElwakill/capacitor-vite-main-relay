import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import "./index.css";
import RelayEnvironment from "./RelayEnvironment";
import { RelayEnvironmentProvider } from "react-relay/hooks";

/* Core Ionic framework styles */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import { Suspense } from "react";

setupIonicReact();
console.log(RelayEnvironment);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RelayEnvironmentProvider environment={RelayEnvironment}>
			<Suspense fallback={"Loading..."}>
				<IonApp>
					<IonReactRouter>
						<IonRouterOutlet>
							<Route path="/" component={App}>
								{/* <App /> */}
							</Route>
						</IonRouterOutlet>
					</IonReactRouter>
				</IonApp>
			</Suspense>
		</RelayEnvironmentProvider>
	</React.StrictMode>
);
