import { HashRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'
import { Grid, makeStyles } from '@material-ui/core';

import Main from 'pages/main/main.page';
import 'App.css';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		background: {
			default: '#282d33',
			paper: '#48515B'
		},
		primary: {
			main: '#61dafb'
		},
		secondary: {
			main: '#A5F3EF'
		},
		success: {
			main: '#77dd77'
		},
		error: {
			main: '#ff4081'
		}
	},
	typography: {
		fontSize: 14
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				input: {
					width: "available",
					margin: "1em",
					padding: "0.75em 1em",
					border: "1px solid #ccc",
					borderRadius: "4px",
					backgroundColor: "white"
				}
			}
		}
	}
})

const useStyles = makeStyles(theme => ({
	fullScreen: {
		height: "100vh",
		width: "100vw"
	}
}))

function App() {
	const classes = useStyles();
	return (
		<HashRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Grid container
					alignItems="center"
					justify="center"
					className={classes.fullScreen} id="center">
					<Main />
				</Grid>
			</ThemeProvider>
		</HashRouter>
	);
}

export default App;
