import React, { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { withStyles } from "@material-ui/core";
import { BookOpen, HammerWrench } from "mdi-material-ui";
import Button from "components/Button";

const useStyles = (theme) => ({
    avatar: {
        width: "60px",
        height: "60px",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        borderRadius: "30px",
        alignSelf: "center",
        backgroundColor: "white",
    },
    listItem: {
        listStyle: "none",
        margin: 0,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "20px",
        overflow: "hidden",
        cursor: "pointer",
        "&:last-child": {
            marginBottom: "0px",
        },
    },
    unorderedList: {
        listStyle: "none",
        margin: "12px 0px",
        width: "320px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(30, 35, 41)",
        padding: "20px",
        borderRadius: "25px",
        color: "black",
    },
    flexContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    divider: {
        width: "100%",
        height: "1px",
        backgroundColor: "black",
        borderRadius: "10px",
        margin: "12px 0px",
    },
    dayOfTheWeek: {
        ...theme.styles.centerItem,
        color: "white",
    },
    joinLecture: {
        width: "100%",
        margin: "12px 0px",
        backgroundColor: "white",
        "&:hover": {
            backgroundColor: "gray",
            color: "white",
        },
    },
});

function TimetableCard(props) {
    const { day, classes, lectures } = props;
    return (
        <AnimateSharedLayout>
            <motion.ul layout initial={{ borderRadius: 25 }} className={classes.unorderedList}>
                <h2 className={classes.dayOfTheWeek}>{day}</h2>
                {lectures.map((key, index) => (
                    <StyledLecture key={index} lecture={key} />
                ))}
            </motion.ul>
        </AnimateSharedLayout>
    );
}

function Lecture(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    const { classes, lecture } = props;

    return (
        <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }} className={classes.listItem}>
            <div className={classes.flexContainer}>
                {lecture.type === "theory" ? (
                    <BookOpen style={{ fontSize: "40px" }} />
                ) : (
                    <HammerWrench style={{ fontSize: "40px" }} />
                )}
                <div>
                    <span>
                        <b>{lecture.subject}</b>
                    </span>
                    <br />
                    <span>{`${lecture.start_time} - ${lecture.end_time}`}</span>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className={classes.divider} />
                        <div className={classes.flexContainer}>
                            <span>
                                <b>{lecture.professor_name}</b>
                            </span>
                            <span style={{ fontSize: "24px", color: lecture.attendance >= 75 ? "green" : "red" }}>
                                {lecture.attendance}%
                            </span>
                        </div>
                        <a href={`${lecture.lecture_link}`} target="_blank" rel="noreferrer">
                            <Button variant="contained" className={classes.joinLecture}>
                                Join Lecture
                            </Button>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.li>
    );
}

const StyledLecture = withStyles(useStyles)(Lecture);

export default withStyles(useStyles)(TimetableCard);
