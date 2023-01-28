const ENCRYPTION = require('../utilities/encryption');
const FS = require('fs')

module.exports = {
    getAuthUserId: (req) => {
        return ENCRYPTION.parseJwt(req.headers.authorization).sub.id;
    },

    saveImage: (path, image, cb) => {
        var base64Data = image.replace(/^data:([A-Za-z-+\/]+);base64,/, "");
        let buffer = Buffer.from(base64Data, 'base64');
        FS.writeFile(path, buffer, { encoding: 'base64' }, cb);
    },

    deleteImage: (path, cb) => {
        FS.unlink(path, cb);
    }
};