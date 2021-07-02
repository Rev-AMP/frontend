import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

import { fetchFiles } from "redux/files/action";
import FileModal from "../components/FileModal";
import DataPage from "components/DataPage";

const styles = (theme) => ({
    centerItem: theme.styles.centerItem,
});

class Materials extends React.Component {
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
            flex: 2.5,
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            files: [],
        };
    }

    componentDidMount() {
        this.props.fetchFiles();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.files && this.props.files !== prevProps.files) {
            this.props.files.forEach((file) => {
                if (file.type === "material") this.state.files.push(file);
            });
        }
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, userId: null });
    };

    openModal = () => {
        this.setState({ modalIsOpen: true, userId: null });
    };

    onEdit = (params) => {
        this.setState({ modalIsOpen: true, userId: params.row.id });
    };

    render() {
        return (
            <DataPage
                title="List of Study Material"
                isLoading={this.props.isLoading}
                modalIsOpen={this.state.modalIsOpen}
                openModal={this.openModal}
                PopupModal={<FileModal isOpen={this.state.modalIsOpen} onClose={this.closeModal} type="material" />}
                objects={this.state.files}
                columns={this.columns}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    files: state.file.files,
    isLoading: state.file.isLoading,
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, { fetchFiles })(Materials)));
