import Main from './pages/main/main.page';
import { HashRouter } from 'react-router-dom';
import './App.css';
import { createMuiTheme, ThemeProvider, CssBaseline, Paper } from '@material-ui/core'

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		background: {
			default: '#282c34',
			paper: '#51616e'
		}
	},

})

function App() {
	return (
		<HashRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="App" id="center">
					<Main />
				</div>
			</ThemeProvider>
		</HashRouter>
	);
}

export default App;
