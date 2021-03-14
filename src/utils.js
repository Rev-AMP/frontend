export const getUpdatedInfo = (baseObj, submitObj) => {
    const updatedInfo = {};
    const submitKeys = Object.keys(submitObj);
    submitKeys.forEach((key) => {
        if (baseObj[key] !== submitObj[key]) updatedInfo[key] = submitObj[key];
    });
    return updatedInfo;
};
