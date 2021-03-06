import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IconButton, withStyles } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

import { FetchSchools } from "redux/school/action";
import SchoolModal from "./components/SchoolModal";
import DataPage from "components/DataPage";

const styles = (theme) => ({
    centerItem: theme.styles.centerItem,
});

class Schools extends React.Component {
    columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
            width: 70,
        },
        {
            field: "name",
            headerName: "Full name",
            headerAlign: "center",
            align: "center",
            flex: 2,
        },
        {
            field: "head",
            headerName: "Head",
            headerAlign: "center",
            align: "center",
            flex: 2,
        },
        {
            field: "Edit",
            headerName: "Edit",
            headerAlign: "center",
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <IconButton
                    className={this.props.classes.centerItem}
                    color={"primary"}
                    onClick={() => this.onEdit(params)}
                >
                    <Edit />
                </IconButton>
            ),
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
        };
    }

    componentDidMount() {
        this.props.FetchSchools();
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, schoolId: null });
    };

    openModal = () => {
        this.setState({ modalIsOpen: true, schoolId: null });
    };

    onEdit = (params) => {
        this.setState({ modalIsOpen: true, schoolId: params.row.id });
    };

    render() {
        return (
            <DataPage
                title="List of Schools"
                isLoading={this.props.isLoading}
                modalIsOpen={this.state.modalIsOpen}
                openModal={this.openModal}
                PopupModal={
                    <SchoolModal
                        isOpen={this.state.modalIsOpen}
                        onClose={this.closeModal}
                        schoolId={this.state.schoolId}
                    />
                }
                objects={this.props.schools}
                columns={this.columns}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    schools: state.school.schools,
    isLoading: state.school.isLoading,
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, { FetchSchools })(Schools)));
