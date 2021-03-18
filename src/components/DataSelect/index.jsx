import React from "react";
import { LinearProgress, MenuItem, TextField } from "@material-ui/core";

const DataSelect = ({ isLoading, data, ...otherProps }) => {
    if (isLoading) {
        return <LinearProgress />;
    }

    return (
        <TextField select {...otherProps}>
            {data.map((term) => (
                <MenuItem key={term.id} value={term.id}>
                    {term.name}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default DataSelect;
