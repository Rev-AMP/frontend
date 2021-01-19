import Main from './pages/main/main.page';
import { HashRouter } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<HashRouter>
			<div className="App" id="center">
				<Main />
			</div>
		</HashRouter>
	);
}

export default App;
