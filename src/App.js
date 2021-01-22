import { HashRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'
import {  Grid, makeStyles } from '@material-ui/core';

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
		},
		success:{
			main:"#77dd77"
		}
	},
	typography:{
		fontSize:14
	}

})
const useStyles= makeStyles(theme => ({
	fullScreen:{
		height:"100vh",
		width:"100vw"
	}
}))
function App() {
	const classes=useStyles();
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
