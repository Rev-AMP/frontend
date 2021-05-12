import React from "react";
import { Divider, List, ListItem, Typography, withStyles } from "@material-ui/core";

import PopupModal from "components/PopupModal";

const styles = (theme) => ({
    greenText: {
        color: theme.palette.success.main,
    },
});

function AddStudentsResponseModal(props) {
    const { isOpen, onClose, addStudentsResponse, classes } = props;
    return (
        <PopupModal isOpen={isOpen} onClose={onClose}>
            {addStudentsResponse.success && (
                <div style={{ textAlign: "center" }}>
                    <Typography className={classes.greenText} variant="h5">
                        Success
                    </Typography>
                    <List>
                        {addStudentsResponse.success.map((id) => (
                            <ListItem key={id} component={Typography}>
                                {id}
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}

            <Divider style={{ margin: "1rem" }} />

            {addStudentsResponse.errors && Object.keys(addStudentsResponse.errors).length !== 0 && (
                <div style={{ textAlign: "center" }}>
                    <Typography color="error" variant="h5">
                        Errors
                    </Typography>
                    <List>
                        {Object.keys(addStudentsResponse.errors).map((key) => (
                            <ListItem key={key}>
                                <Typography variant="h6">{key.charAt(0).toUpperCase() + key.slice(1)}:</Typography>
                                <List>
                                    {addStudentsResponse.errors[key].map((id) => (
                                        <ListItem key={id} component={Typography}>
                                            {id}
                                        </ListItem>
                                    ))}
                                </List>
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}
        </PopupModal>
    );
}

export default withStyles(styles)(AddStudentsResponseModal);
