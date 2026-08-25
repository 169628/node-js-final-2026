
const response = {

    error ( message, statusCode = 400 ) {
        const error = new Error(message);
        error.status = statusCode;
        return error;
    },

    success ( data, statusCode = 200 ) {
        return {
            statusCode,
            body: { status: "success", data },
        };
    },
}

module.exports = response;