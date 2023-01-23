const ENCRYPTION = require('../utilities/encryption');

module.exports = {
    getAuthUserId: (req) => {
        return ENCRYPTION.parseJwt(req.headers.authorization).sub.id;
    }
};