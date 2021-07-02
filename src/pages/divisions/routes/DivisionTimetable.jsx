import React from "react";
import { connect } from "react-redux";
import { Grid, IconButton, withStyles } from "@material-ui/core";

import { fetchDivision } from "redux/division/action";
import { fetchTimetableDivision } from "redux/timetable/action";
import TimetableCard from "pages/timetable/components/TimetableCard";
import { PlusCircle } from "mdi-material-ui";
import Loader from "../../../components/Loader";
import LectureModal from "../components/LectureModal";

const useStyles = (theme) => ({
    flexContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        order: 3,
    },
});

class Timetable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            divisionId: this.props.match.params.divisionid,
            modalIsOpen: false,
            lectureId: null,
        };
    }

    componentDidMount() {
        this.props.fetchDivision(this.state.divisionId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.selectedDivision && this.props.selectedDivision) {
            this.props.fetchTimetableDivision();
        }
    }

    closeModal = () => this.setState({ modalIsOpen: false, lectureId: null });

    openModal = () => this.setState({ modalIsOpen: true, lectureId: null });

    onEdit = (id) => this.setState({ modalIsOpen: true, lectureId: id });

    render() {
        const { timetable, classes } = this.props;
        return (
            <Grid container direction="column">
                <Grid container justify="flex-end">
                    <IconButton color="primary" onClick={this.openModal} style={{ margin: "1rem" }}>
                        <PlusCircle fontSize="large" />
                    </IconButton>
                </Grid>
                <div className={classes.flexContainer}>
                    {timetable ? (
                        Object.keys(timetable).map((key, index) => (
                            <TimetableCard
                                key={index}
                                day={key.charAt(0).toUpperCase() + key.slice(1)}
                                lectures={timetable[key]}
                                editable={true}
                                onEdit={this.onEdit}
                            />
                        ))
                    ) : (
                        <Loader />
                    )}
                </div>

                {this.state.modalIsOpen && (
                    <LectureModal
                        isOpen={this.state.modalIsOpen}
                        onClose={this.closeModal}
                        lectureId={this.state.lectureId}
                        divisionId={this.state.divisionId}
                    />
                )}
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    timetable: state.timetable.timetable,
    selectedDivision: state.division.selectedDivision,
});

export default withStyles(useStyles)(connect(mapStateToProps, { fetchTimetableDivision, fetchDivision })(Timetable));
