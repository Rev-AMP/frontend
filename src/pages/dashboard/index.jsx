import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Switch } from "react-router-dom";
import { withStyles, Grid } from "@material-ui/core";
import { toast } from "react-toastify";

import SideBar from "components/SideBar";
import Header from "components/Header";
import AuthenticatedRoute from "components/AuthenticatedRoute";
import Users from "pages/users";

toast.configure();

const useStyles = (theme) => ({
    content: {
        padding: theme.spacing(3),
        flex: 2,
        flexGrow: 1,
        height: "valuemax",
    },
    offset: theme.mixins.toolbar,
    fullScreen: {
        display: "flex",
        height: "100%",
        width: "100%",
    },
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.errorMessage !== this.props.errorMessage && this.props.errorMessage !== "") {
            toast.error(`Error 😓: ${this.props.errorMessage}`, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    switchDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.fullScreen}>
                <Header handleMenuButtonClick={this.switchDrawer} />
                <SideBar drawerOpen={this.state.drawerOpen} />
                <Grid container direction="column" style={{ height: "100%" }}>
                    <div className={classes.offset} />
                    <Grid item className={classes.content}>
                        <Switch>
                            <AuthenticatedRoute exact path={`${this.props.match.url}/users`} component={Users} />
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    errorMessage: state.user.errorMessage,
});

export default withRouter(connect(mapStateToProps)(withStyles(useStyles)(Dashboard)));
