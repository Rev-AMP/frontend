import React from "react";
import { Divider, TextField, Typography, withStyles } from "@material-ui/core";

import PopupModal from "components/PopupModal";
import Button from "components/Button";

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
    centerItem: theme.styles.centerItem,
});

class AddStudentsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentIds: null,
            errors: {
                studentIds: "",
            },
        };
    }

    handleInputChange = (event) => {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onClose();

        let { studentIds } = this.state;

        let studentIdsList = studentIds.split(",");
        studentIdsList.forEach((element, index) => {
            studentIdsList[index] = element.trim();
        });
        console.log(this.props);
        this.props.addStudentsAction(studentIdsList);
    };

    render() {
        const { isLoading, isOpen, onClose, selectedElement, classes } = this.props;
        const { errors, studentIds } = this.state;
        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h5">
                        Add students: {selectedElement.name ?? `Division Code: ${selectedElement.division_code}`}
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />
                <form className={classes.form} onSubmit={this.handleSubmit}>
                    <TextField
                        name="studentIds"
                        label="Student IDs (separated by commas)"
                        value={studentIds ?? ""}
                        onChange={this.handleInputChange}
                        error={!!errors.studentIds}
                        helperText={errors.studentIds}
                        multiline
                        required
                    />
                    <Button type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                </form>
            </PopupModal>
        );
    }
}

export default withStyles(styles)(AddStudentsModal);
