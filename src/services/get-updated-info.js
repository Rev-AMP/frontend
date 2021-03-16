export const getUpdatedInfo = (baseObj, submitObj) => {
    const updatedInfo = {};
    for (const key in submitObj) {
        if (baseObj[key] !== submitObj[key]) updatedInfo[key] = submitObj[key];
    }
    return updatedInfo;
};
