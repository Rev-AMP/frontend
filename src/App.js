import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'
import { Grid, makeStyles } from '@material-ui/core';

import Main from 'pages/main/main.page';

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
		fontSize: 15
	},
	overrides: {
		MuiTextField: {
			root: {
				margin: "1em"
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
	console.log(process.env)
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Grid container alignItems="center" justify="center" className={classes.fullScreen}>
					<Main />
				</Grid>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
