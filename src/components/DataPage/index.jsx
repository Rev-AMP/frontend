import React from "react";
import { withRouter } from "react-router-dom";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { Grid, IconButton, Typography, withStyles } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

import Loader from "components/Loader";

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
    render() {
        const { classes } = this.props;

        if (this.props.isLoading && !this.props.modalIsOpen) {
            return <Loader />;
        }

        if (this.props.objects) {
            return (
                <Grid item className={classes.fullScreen}>
                    <Grid container justify="space-between" alignItems="center">
                        <Typography color="primary" variant="h3" style={{ margin: 0 }}>
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
                                columns={this.props.columns}
                                components={{
                                    Toolbar: GridToolbar,
                                }}
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
