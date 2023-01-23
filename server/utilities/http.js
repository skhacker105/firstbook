module.exports = {
    handleError: (res, err) => {
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong, please try again.'
        });
    },

    error: (res, message) => {
        return res.status(400).json({
            message
        });
    },

    success: (res, data, message = '') => {
        return res.status(200).json({
            message, data
        });
    }
};