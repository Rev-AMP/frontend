import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";

import { fetchFiles, fetchFilesCourse } from "redux/files/action";
import FileModal from "../components/FileModal";
import DataPage from "components/DataPage";
import { Download, Eye, Upload } from "mdi-material-ui";

const styles = (theme) => ({
    centerItem: theme.styles.centerItem,
});

class Assignments extends React.Component {
    columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
            flex: 1,
            type: "number",
            hide: true,
        },
        {
            field: "course_name",
            headerName: "Course",
            headerAlign: "center",
            align: "center",
            flex: 1,
            valueGetter: (params) => params.row.course.name,
        },
        {
            field: "course_id",
            headerName: "Course ID",
            headerAlign: "center",
            align: "center",
            flex: 1,
            hide: true,
        },
        {
            field: "owner_name",
            headerName: "Uploaded By",
            headerAlign: "center",
            align: "center",
            flex: 1,
            valueGetter: (params) => params.row.owner.full_name,
        },
        {
            field: "owner_id",
            headerName: "Owner ID",
            headerAlign: "center",
            align: "center",
            flex: 1,
            hide: true,
        },
        {
            field: "description",
            headerName: "Description",
            headerAlign: "center",
            align: "center",
            flex: 2,
        },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <div className={this.props.classes.centerItem}>
                    <Tooltip title="View Submissions">
                        <Link to={`${this.props.match.url}/${params.row.id}`}>
                            <IconButton color={"primary"}>
                                <Eye />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    {this.props.currentUser.type === "student" && (
                        <Tooltip title="Upload Submission">
                            <IconButton color={"primary"} onClick={() => this.uploadSubmission(params.row.id)}>
                                <Upload />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Download">
                        <a href={params.row.url} target="_blank" rel="noreferrer noopener">
                            <IconButton color={"primary"}>
                                <Download />
                            </IconButton>
                        </a>
                    </Tooltip>
                </div>
            ),
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            files: [],
            submissionId: null,
            type: "assignment",
        };
    }

    componentDidMount() {
        if (this.props.currentUser.type === "professor") {
            this.props.fetchFiles();
        } else {
            this.props.fetchFilesCourse();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.files !== this.props.files && this.props.files.length !== 0) {
            let assignments = [];
            this.props.files.forEach((file) => {
                if (file.file_type === "assignment") assignments.push(file);
            });
            this.setState({ files: assignments });
        }
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    uploadSubmission = (params) => {
        this.setState({
            modalIsOpen: true,
            type: "submission",
            submissionId: params.row.id,
            courseId: params.row.course_id,
        });
    };

    render() {
        return (
            <DataPage
                title="List of Assignments"
                isLoading={this.props.isLoading}
                modalIsOpen={this.state.modalIsOpen}
                openModal={this.openModal}
                PopupModal={
                    <FileModal
                        isOpen={this.state.modalIsOpen}
                        onClose={this.closeModal}
                        type={this.state.type}
                        submissionId={this.state.submissionId}
                        courseId={this.state.courseId}
                    />
                }
                objects={this.state.files}
                columns={this.columns}
                disableCreate={this.props.currentUser.type === "student"}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    files: state.file.files,
    isLoading: state.file.isLoading,
    currentUser: state.user.currentUser,
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, { fetchFiles, fetchFilesCourse })(Assignments)));
