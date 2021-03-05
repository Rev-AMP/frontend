import React from "react";
import { withRouter } from "react-router-dom";
import { DataGrid, GridToolbar, GridOverlay } from "@material-ui/data-grid";
import { Grid, IconButton, Typography, withStyles, LinearProgress } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

const styles = (theme) => ({
    fullScreen: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    dataGrid: {
        display: "flex",
        height: "100%",
    },
});

class DataPage extends React.Component {
    loader = () => (
        <GridOverlay>
            <div style={{ position: "absolute", top: 0, width: "100%" }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    );

    render() {
        const { classes } = this.props;

        if (this.props.objects) {
            return (
                <Grid item className={classes.fullScreen}>
                    <Grid container justify="space-between" alignItems="center">
                        <Typography color="primary" variant="h4" style={{ margin: 0 }}>
                            {this.props.title}
                        </Typography>
                        <IconButton color="primary" onClick={this.props.openModal} style={{ margin: "1rem" }}>
                            <AddCircle fontSize="large" />
                        </IconButton>
                    </Grid>

                    <div className={classes.dataGrid}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                disableSelectionOnClick={true}
                                rows={this.props.objects}
                                rowHeight={80}
                                columns={this.props.columns}
                                components={{
                                    Toolbar: GridToolbar,
                                    LoadingOverlay: this.loader,
                                }}
                                loading={this.props.isLoading && !this.props.modalIsOpen}
                            />
                        </div>
                    </div>

                    {this.props.modalIsOpen && this.props.PopupModal}
                </Grid>
            );
        }

        return null;
    }
}

export default withRouter(withStyles(styles)(DataPage));
