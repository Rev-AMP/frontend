import React from "react";
import { connect } from "react-redux";
import { fetchStudentsForTerm } from "redux/term/action";

import DataPage from "components/DataPage";

class TermDetails extends React.Component {
    columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
            width: 350,
            hide: true,
        },
        {
            field: "full name",
            headerName: "Name",
            headerAlign: "center",
            align: "center",
            width: 200,
            valueFormatter: ({ row }) => `${row.user.full_name}`,
        },
        {
            field: "email",
            headerName: "Email ID",
            headerAlign: "center",
            align: "center",
            width: 250,
            valueFormatter: ({ row }) => `${row.user.email}`,
        },
        {
            field: "school",
            headerName: "School",
            headerAlign: "center",
            align: "center",
            width: 150,
            valueFormatter: ({ row }) => `${row.term.year.school.name}`,
        },
        {
            field: "year",
            headerName: "Year",
            headerAlign: "center",
            align: "center",
            width: 150,
            valueFormatter: ({ row }) => `${row.term.year.name}`,
        },
    ];

    componentDidMount() {
        this.props.fetchStudentsForTerm(this.props.match.params.termid);
    }

    render() {
        const { studentsForTerm, isLoading } = this.props;
        const termName = studentsForTerm[0].term.name;
        return (
            <>
                <DataPage title={termName} isLoading={isLoading} objects={studentsForTerm} columns={this.columns} />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    studentsForTerm: state.term.studentsForTerm,
    isLoading: state.term.isLoading,
});

export default connect(mapStateToProps, { fetchStudentsForTerm })(TermDetails);
