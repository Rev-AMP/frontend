import React from "react";
import { TextField, Typography, Divider, withStyles } from "@material-ui/core";
import { connect } from "react-redux";

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

class StudentModal extends React.Component {
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

        let { studentIds } = this.state;

        let studentIdList = studentIds.split(",");
        studentIdList.forEach((element, index) => {
            studentIdList[index] = element.trim();
        });

        console.log(studentIdList);
    };

    render() {
        const { isLoading, isOpen, onClose, selectedTerm, classes } = this.props;
        const { errors, studentIds } = this.state;
        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h5">
                        Add students to {selectedTerm.name}
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

const mapStateToProps = (state) => ({
    isLoading: state.term.isLoading,
    selectedTerm: state.term.selectedTerm,
});

export default withStyles(styles)(connect(mapStateToProps)(StudentModal));
