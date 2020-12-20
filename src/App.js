import Main from './pages/main/main.page';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<div className="App" id="center">
				<Main />
			</div>
		</BrowserRouter>
	);
}

export default App;
