import React from "react";
import { connect } from "react-redux";
import { IconButton, Typography, withStyles } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

import { FetchYears } from "redux/year/action";
import { FetchSchools } from "redux/school/action";
import DataPage from "components/DataPage";
import YearModal from "./components/YearModal";

const styles = (theme) => ({
    centerItem: theme.styles.centerItem,
});

class Years extends React.Component {
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
            headerName: "Name",
            headerAlign: "center",
            align: "center",
            width: 350,
        },
        {
            field: "school",
            headerName: "School",
            headerAlign: "center",
            align: "center",
            width: 350,
            renderCell: (params) => (
                <Typography variant="body2" style={{ width: "100%" }} color={params.value ? "textPrimary" : "error"}>
                    {params.value ?? "No associated school"}
                </Typography>
            ),
        },
        {
            field: "start_year",
            type: "number",
            headerName: "Start Year",
            headerAlign: "center",
            align: "center",
            valueFormatter: (params) => `${params.value}`,
            flex: 1,
        },
        {
            field: "end_year",
            type: "number",
            headerName: "End Year",
            headerAlign: "center",
            align: "center",
            valueFormatter: (params) => `${params.value}`,
            flex: 1,
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
        this.props.FetchYears();
        this.props.FetchSchools();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { years, schools } = this.props;
        if ((prevProps.schools !== schools || prevProps.years !== years) && schools.length && years.length) {
            years.forEach((year, index) => {
                const school = schools.find((school) => school.id === year.school_id);
                years[index].school = school ? school.name : undefined;
            });
            this.setState({ years });
        }
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, yearId: null });
    };

    openModal = () => {
        this.setState({ modalIsOpen: true, yearId: null });
    };

    onEdit = (params) => {
        this.setState({ modalIsOpen: true, yearId: params.row.id });
    };

    render() {
        const { isLoading, years } = this.props;
        const { modalIsOpen, yearId } = this.state;

        return (
            <DataPage
                title="List of Years"
                isLoading={isLoading}
                modalIsOpen={modalIsOpen}
                openModal={this.openModal}
                PopupModal={<YearModal isOpen={modalIsOpen} onClose={this.closeModal} yearId={yearId} />}
                objects={years}
                columns={this.columns}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    years: state.year.years,
    schools: state.school.schools,
    isLoading: state.year.isLoading || state.school.isLoading,
});

export default withStyles(styles)(connect(mapStateToProps, { FetchYears, FetchSchools })(Years));
