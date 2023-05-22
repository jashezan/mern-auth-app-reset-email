const err = (status, message) => {
    const er = new Error();
    er.message = message;
    er.status = status;
    return er;
};

export default err;
