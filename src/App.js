import Main from './pages/main/main.page';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './App.css';

function App() {
	return (
		<CookiesProvider>
			<BrowserRouter>
				<div className="App" id="center">
					<Main />
				</div>
			</BrowserRouter>
		</CookiesProvider>
	);
}

export default App;
