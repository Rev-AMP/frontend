import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createMuiTheme, ThemeProvider, CssBaseline, withStyles } from "@material-ui/core";
import { toast } from "react-toastify";

import Main from "pages/main";

toast.configure();

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

const styles = (theme) => ({
    fullScreen: {
        height: "100vh",
        width: "100vw",
    },
});

class App extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        // check if any new error message needs to be displayed
        const errors = new Set(this.props.allErrors);
        for (let elem of prevProps.allErrors) {
            errors.delete(elem);
        }
        errors.forEach((error) => {
            toast.error(`Error 😓: ${error}`, {
                position: toast.POSITION.TOP_CENTER,
            });
        });
    }

    render() {
        const { classes } = this.props;
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
}

const mapStateToProps = (state) => {
    let errorMessage = [];
    for (const module in state) {
        if (state.hasOwnProperty(module) && state[module].errors) {
            errorMessage.push(...state[module].errors);
        }
    }
    return { allErrors: errorMessage.flat() };
};

export default connect(mapStateToProps)(withStyles(styles)(App));
