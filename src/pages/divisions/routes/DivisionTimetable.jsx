import React from "react";
import { connect } from "react-redux";
import { Grid, IconButton, withStyles } from "@material-ui/core";

import { fetchTimetableDivision } from "redux/timetable/action";
import TimetableCard from "pages/timetable/components/TimetableCard";
import { PlusCircle } from "mdi-material-ui";

const useStyles = (theme) => ({
    flexContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        order: 3,
    },
});

class Timetable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            divisionId: this.props.match.params.divisionid,
        };
    }

    componentDidMount() {
        this.props.fetchTimetableDivision(this.state.divisionId);
    }

    render() {
        const { timetable, classes } = this.props;
        return (
            <Grid container direction="column">
                <Grid container justify="flex-end">
                    <IconButton color="primary" onClick={() => {}} style={{ margin: "1rem" }}>
                        <PlusCircle fontSize="large" />
                    </IconButton>
                </Grid>
                <div className={classes.flexContainer}>
                    {timetable &&
                        Object.keys(timetable).map((key, index) => (
                            <TimetableCard
                                key={index}
                                day={key.charAt(0).toUpperCase() + key.slice(1)}
                                lectures={timetable[key]}
                                editable={true}
                            />
                        ))}
                </div>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    timetable: state.timetable.timetable,
});

export default withStyles(useStyles)(connect(mapStateToProps, { fetchTimetableDivision })(Timetable));
