import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider, CssBaseline, makeStyles } from "@material-ui/core";

import Main from "pages/main";

const themePalette = {
    type: "dark",
    background: {
        default: "#282d33",
        paper: "#48515B",
    },
    primary: {
        main: "#61dafb",
    },
    secondary: {
        main: "#A5F3EF",
    },
    success: {
        main: "#77dd77",
    },
    error: {
        main: "#ff4081",
    },
};

const theme = createMuiTheme({
    palette: themePalette,
    typography: {
        fontSize: 15,
    },
    overrides: {
        MuiTextField: {
            root: {
                margin: "1rem",
            },
        },
        MuiTypography: {
            h3: {
                margin: "1rem",
            },
            h2: {
                margin: "1rem",
            },
        },
    },
    styles: {
        centerItem: {
            marginLeft: "auto",
            marginRight: "auto",
        },
        avatar: {
            backgroundColor: themePalette.background.paper,
            color: themePalette.primary.main,
            borderColor: themePalette.primary.main,
            border: "solid",
        },
    },
});

const useStyles = makeStyles((theme) => ({
    fullScreen: {
        height: "100vh",
        width: "100vw",
    },
}));

function App() {
    const classes = useStyles();
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={classes.fullScreen}>
                    <Main />
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
