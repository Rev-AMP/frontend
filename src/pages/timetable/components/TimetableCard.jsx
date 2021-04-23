import React, { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
    avatar: {
        width: "60px",
        height: "60px",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        borderRadius: "30px",
        alignSelf: "center",
        background: "#FFFFFF",
    },
    listItem: {
        listStyle: "none",
        margin: 0,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "20px",
        overflow: "hidden",
        cursor: "pointer",
        "&:last-child": {
            marginBottom: "0px",
        }
    },
    unorderedList: {
        listStyle: "none",
        margin: 0,
        width: "400px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(30, 35, 41)",
        padding: "20px",
        borderRadius: "25px",
    },
});

function TimetableCard({ classes }) {
    return (
        <AnimateSharedLayout>
            <motion.ul layout initial={{ borderRadius: 25 }} className={classes.unorderedList}>
                <StyledLecture />
                <StyledLecture />
                <StyledLecture />
            </motion.ul>
        </AnimateSharedLayout>
    );
}

function Lecture({ classes }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }} className={classes.listItem}>
            <motion.div className={classes.avatar} layout />
            <AnimatePresence>{isOpen && <p>Dummy Text!</p>}</AnimatePresence>
        </motion.li>
    );
}

const StyledLecture = withStyles(useStyles)(Lecture);

export default withStyles(useStyles)(TimetableCard);
