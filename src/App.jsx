import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { graphql, loadQuery, usePreloadedQuery } from "react-relay";
// import { AppQuery } from "./__generated__/AppQuery.graphql";
import RelayEnvironment from "./RelayEnvironment";

console.log(import.meta.env.VITE_REACT_APP_GITHUB_AUTH_TOKEN);

const RepositoryNameQuery = graphql`
	query AppRepositoryNameQuery {
		repository(owner: "facebook", name: "relay") {
			name
		}
	}
`;
const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {
	/* query variables */
});

function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState(null);

	const data = usePreloadedQuery(RepositoryNameQuery, preloadedQuery);
	console.log(data);
	useEffect(() => {
		setName(data.repository.name);
	}, [data]);

	return (
		<IonPage>
			<IonContent>
				<div className="App">
					<div>
						<a href="https://vitejs.dev" target="_blank">
							<img src="/vite.svg" className="logo" alt="Vite logo" />
						</a>
						<a href="https://reactjs.org" target="_blank">
							<img src={reactLogo} className="logo react" alt="React logo" />
						</a>
					</div>
					<h1>Vite + React + Ionic</h1>
					<div className="card">
						<IonButton onClick={() => setCount((count) => count + 1)}>
							count is {count}
						</IonButton>
						<p>
							Edit <code>src/App.tsx</code> and save to test HMR
						</p>
					</div>
					<p>{name != null ? `Repository: ${name}` : "Loading"}</p>
				</div>
			</IonContent>
		</IonPage>
	);
}

export default App;
