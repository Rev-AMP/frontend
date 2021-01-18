import Main from './pages/main/main.page';
import { HashRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './App.css';

function App() {
	return (
		<CookiesProvider>
			<HashRouter>
				<div className="App" id="center">
					<Main />
				</div>
			</HashRouter>
		</CookiesProvider>
	);
}

export default App;
