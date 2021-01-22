import { HashRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'

import Main from 'pages/main/main.page';
import 'App.css';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		background: {
			default: '#282c34',
			paper: '#51616e'
		},
		primary: {
			main: '#282c34'
		},
		secondary: {
			main: '#61dafb'
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
