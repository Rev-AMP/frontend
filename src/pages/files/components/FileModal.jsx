import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Divider, MenuItem, TextField, Typography, withStyles } from "@material-ui/core";

import { fetchFile, uploadFile } from "redux/files/action";
import { fetchProfessorDivisions } from "redux/user/action";
import Button from "components/Button";
import PopupModal from "components/PopupModal";

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
    centerItem: theme.styles.centerItem,
    image: {
        ...theme.styles.centerItem,
        ...theme.styles.avatar,
        height: "9rem",
        width: "9rem",
        fontSize: "4rem",
    },
});

class FileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {
                file_type: this.props.type,
            },
            submit: {
                file_type: this.props.type,
            },
            courses: [],
        };
    }

    componentDidMount() {
        this.props.fetchProfessorDivisions();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.divisions !== prevProps.divisions && this.props.divisions) {
            this.props.division.forEach((division) => this.state.courses.push(division.course));
        }
        if (this.props.selectedFile !== prevProps.selectedFile && this.props.selectedFile) {
            const meow = this.props.type === "material" ? "Study Material" : "Assignment";
            toast.success(`${meow} created successfully 🙌`, {
                position: toast.POSITION.TOP_CENTER,
            });
            this.props.onClose();
        }
    }

    handleInputChange = (event) => {
        let { file, submit } = this.state;
        const { name, type, files } = event.target;

        switch (type) {
            case "file":
                file[name] = submit[name] = files[0];
                break;

            default:
                file[name] = submit[name] = event.target.value;
                break;
        }

        this.setState({ file, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { submit } = this.state;
        if (["course_id", "file_type", "description", "file"].every((key) => submit[key])) {
            this.props.uploadFile(submit);
        } else {
            toast.error("Please add email, type and password 😓", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    render() {
        const { classes, isLoading, isOpen, onClose, type } = this.props;
        const meow = type === "material" ? "Study Material" : "Assignment";

        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h3">
                        Upload {meow}
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />

                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField
                        select
                        name="course_id"
                        label="Course"
                        value={this.state.file.course_id ?? ""}
                        onChange={this.handleInputChange}
                        required
                    >
                        {this.state.courses.map((course) => (
                            <MenuItem value={course.id}>{course.name}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        type="text"
                        name="description"
                        label="Description"
                        value={this.state.file.description ?? ""}
                        onChange={this.handleInputChange}
                    />
                    <Button color="primary" component="label">
                        {this.state.file.file ? this.state.file.file.name : "Upload"}
                        <input
                            type="file"
                            name="file"
                            accept="application/pdf"
                            onChange={this.handleInputChange}
                            hidden
                        />
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                </form>
            </PopupModal>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedFile: state.file.selectedFile,
    divisions: state.user.professorDivisions,
    isLoading: state.file.isLoading || state.user.isLoading,
});

export default withStyles(styles)(
    connect(mapStateToProps, { fetchFile, uploadFile, fetchProfessorDivisions })(FileModal)
);
