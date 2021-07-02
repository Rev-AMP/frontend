import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Divider, MenuItem, TextField, Typography, withStyles } from "@material-ui/core";

import { fetchFile, uploadFile, updateFile } from "redux/files/action";
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
                submissionId: this.props.submissionId,
            },
            submit: {
                file_type: this.props.type,
                submissionId: this.props.submissionId,
            },
            courses: [],
            meow: "",
        };
    }

    componentDidMount() {
        this.props.fetchProfessorDivisions();
        switch (this.props.type) {
            case "materials":
                this.setState({ meow: "Study Materials" });
                break;

            case "assignment":
                this.setState({ meow: "Assignments" });
                break;

            case "submission":
                this.setState({ meow: "Marks" });
                break;

            default:
                break;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.divisions !== prevProps.divisions && this.props.divisions) {
            this.props.division.forEach((division) => this.state.courses.push(division.course));
        }
        if (this.props.selectedFile !== prevProps.selectedFile && this.props.selectedFile) {
            toast.success(`${this.state.meow} created successfully 🙌`, {
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
            this.props.updateFile(submit);
        }
    };

    render() {
        const { classes, isLoading, isOpen, onClose, type } = this.props;

        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h3">
                        Upload {this.state.meow}
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />

                <form onSubmit={this.handleSubmit} className={classes.form}>
                    {type === "submission" ? (
                        <TextField
                            type="number"
                            name="marks"
                            label="Marks"
                            value={this.state.file.marks ?? ""}
                            onChange={this.handleInputChange}
                            required
                        />
                    ) : (
                        <>
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
                                required
                            />
                            <Button color="primary" component="label">
                                {this.state.file.file ? this.state.file.file.name : "Upload"}
                                <input
                                    type="file"
                                    name="file"
                                    accept="application/pdf"
                                    onChange={this.handleInputChange}
                                    hidden
                                    required
                                />
                            </Button>
                        </>
                    )}
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
    connect(mapStateToProps, { fetchFile, uploadFile, fetchProfessorDivisions, updateFile })(FileModal)
);
