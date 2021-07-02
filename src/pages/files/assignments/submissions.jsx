import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";

import { fetchFilesSubmissionId } from "redux/files/action";
import FileModal from "../components/FileModal";
import DataPage from "components/DataPage";
import { Download, Check } from "mdi-material-ui";

const styles = (theme) => ({
    centerItem: theme.styles.centerItem,
});

class Submissions extends React.Component {
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
            valueGetter: (params) => params.value.course.name,
            hide: true,
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
            valueGetter: (params) => params.value.owner.name,
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
                    <Tooltip title="Mark Submission">
                        <IconButton color={"primary"} onClick={() => this.openModal(params.row.id)}>
                            <Check />
                        </IconButton>
                    </Tooltip>
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
        };
    }

    componentDidMount() {
        this.props.fetchFilesSubmissionId(this.props.match.params.submissionId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.files && this.props.files !== prevProps.files) {
            this.props.files.forEach((file) => {
                this.state.files.push(file);
            });
        }
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    openModal = (id) => {
        this.setState({ modalIsOpen: true, submissionId: id });
    };

    render() {
        return (
            <DataPage
                title="List of Submissions"
                isLoading={this.props.isLoading}
                modalIsOpen={this.state.modalIsOpen}
                openModal={this.openModal}
                PopupModal={
                    <FileModal
                        isOpen={this.state.modalIsOpen}
                        onClose={this.closeModal}
                        type="submission"
                        submissionId={this.state.submissionId}
                    />
                }
                objects={this.state.files}
                columns={this.columns}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    files: state.file.files,
    isLoading: state.file.isLoading,
    currentUser: state.user.currentUser,
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, { fetchFilesSubmissionId })(Submissions)));
