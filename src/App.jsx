import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import fetchGraphQL from "./fetchGraphQL";
function App() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState(null);
	const key = import.meta.env.VITE_REACT_APP_GITHUB_AUTH_TOKEN;
	console.log(key);
	useEffect(() => {
		let isMounted = true;
		fetchGraphQL(`
	  query RepositoryNameQuery {
	    repository(owner: "facebook" name: "relay") {
	      name
	    }
	  }
	`)
			.then((response) => {
				// Avoid updating state if the component unmounted before the fetch completes
				console.log("here2");
				if (!isMounted) {
					return;
				}
				const data = response.data;
				setName(data.repository.name);
			})
			.catch((error) => {
				console.error(error);
			});

		return () => {
			isMounted = false;
		};
	}, []);

	// useEffect(async () => {
	// 	console.log("here");
	// 	let isMounted = true;
	// 	fetchGraphQL(`
	//   query RepositoryNameQuery {
	//     repository(owner: "facebook" name: "relay framework") {
	//       name
	//     }
	//   }
	// `)
	// 		.then((response) => {
	// 			// Avoid updating state if the component unmounted before the fetch completes
	// 			console.log("here2");
	// 			if (!isMounted) {
	// 				return;
	// 			}
	// 			const data = response.data;
	// 			setName(data.repository.name);
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});

	// 	// return () => {
	// 	// 	isMounted = false;
	// 	// };
	// }, []);

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
