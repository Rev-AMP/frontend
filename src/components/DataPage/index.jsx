import React from "react";
import { withRouter } from "react-router-dom";
import { DataGrid, GridOverlay, GridToolbar } from "@material-ui/data-grid";
import { Grid, IconButton, LinearProgress, Typography, withStyles } from "@material-ui/core";
import { PlusCircle } from "mdi-material-ui";

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
        const {
            classes,
            objects,
            columns,
            title,
            openModal,
            isLoading,
            modalIsOpen,
            PopupModal,
            disableCreate,
        } = this.props;

        if (objects) {
            return (
                <Grid item className={classes.fullScreen}>
                    <Grid container justify="space-between" alignItems="center">
                        <Typography color="primary" variant="h4" style={{ margin: 0 }}>
                            {title}
                        </Typography>
                        {!disableCreate && (
                            <IconButton color="primary" onClick={openModal} style={{ margin: "1rem" }}>
                                <PlusCircle fontSize="large" />
                            </IconButton>
                        )}
                    </Grid>

                    <div className={classes.dataGrid}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                disableSelectionOnClick
                                disableColumnMenu
                                rows={objects}
                                rowHeight={80}
                                columns={columns}
                                components={{
                                    Toolbar: GridToolbar,
                                    LoadingOverlay: this.loader,
                                }}
                                loading={isLoading && !modalIsOpen}
                            />
                        </div>
                    </div>

                    {modalIsOpen && PopupModal}
                </Grid>
            );
        }

        return null;
    }
}

export default withRouter(withStyles(styles)(DataPage));
