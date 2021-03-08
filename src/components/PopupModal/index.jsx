import React from "react";
import clsx from "clsx";
import { Modal, Paper, Grid, CircularProgress, withStyles } from "@material-ui/core";

import CenterContent from "components/CenterContent";

const styles = (theme) => ({
    modalBody: {
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%,-50%)",
        display: "flex",
        flexDirection: "column",
        padding: 30,
        maxHeight: "90vh",
        overflowY: "scroll",
        scrollbarWidth: "thin",
        scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
    },
    fullModal: {
        width: "80vw",
    },
});

class PopupModal extends React.Component {
    render() {
        const { classes } = this.props;

        if (this.props.isLoading) {
            return (
                <Modal open={this.props.isOpen} onClose={this.props.onClose}>
                    <Paper className={classes.modalBody}>
                        <CenterContent>
                            <CircularProgress size="3rem" />
                        </CenterContent>
                    </Paper>
                </Modal>
            );
        }

        return (
            <Modal open={this.props.isOpen} onClose={this.props.onClose}>
                <Paper className={clsx(classes.modalBody, classes.fullModal)} component={Grid} item xs={11} md={4}>
                    {this.props.children}
                </Paper>
            </Modal>
        );
    }
}

export default withStyles(styles)(PopupModal);
