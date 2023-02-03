const CHATROOM = require('mongoose').model('Chatroom');
const USER = require('mongoose').model('User');
const HTTP = require('../utilities/http');
const HELPER = require('../utilities/helper');


module.exports = {

    add: (req, res) => {
        let room = req.body;
        let room_localuser = JSON.parse(JSON.stringify(room));
        room_localuser.user = HELPER.getAuthUserId();

        // let validationResult = validateBookForm(book);

        // if (!validationResult.success) {
        //     return res.status(400).json({
        //         message: 'Book form validation failed!',
        //         errors: validationResult.errors
        //     });
        // }

        USER.findById(room.user)
            .then(user => {
                if (!user) return HTTP.error(res, 'Cannot find selected user to create chat room');

                CHATROOM.create(room).then((newRoom) => {
                    CHATROOM.create(room_localuser).then((newRoom1) => {
                        return HTTP.success(res, newRoom1, 'Chat room created successfully!');

                    }).catch(err => HTTP.handleError(res, err));;
                }).catch(err => HTTP.handleError(res, err));
            }).catch(err => HTTP.handleError(res, err));

    },

    edit: (req, res) => {
        let roomId = req.params.roomId;
        let editedRoom = req.body;

        // let validationResult = validateBookForm(editedBook);

        // if (!validationResult.success) {
        //     return res.status(400).json({
        //         message: 'Book form validation failed!',
        //         errors: validationResult.errors
        //     });
        // }

        CHATROOM.findById(roomId).then((room) => {
            if (!room) return HTTP.error(res, 'There is no book with the given id in our database.');
            let filter = { roomKey: room.roomKey };
            let query = { name: editedRoom.name };

            CHATROOM.updateMany(filter, { $set: query })
            .then(updatedRooms => {
                if (!updatedRooms) return HTTP.error(res, 'Updating room information failed.')

                return HTTP.success(res, updatedRooms, 'Book edited successfully!');
            })
            .catch(err => HTTP.handleError(res, err));
        }).catch(err => HTTP.handleError(res, err));
    },

    delete: (req, res) => {
        let roomId = req.params.roomId;

        CHATROOM.findByIdAndRemove(bookId).then((deletedRoom) => {
            if (!deletedRoom) return HTTP.error(res, 'There is no book with the given id in our database.');

            return HTTP.success(res, deletedRoom, 'Chat room deleted successfully.');
        }).catch(err => HTTP.handleError(res, err));
    },

    getAllUserRooms: (req, res) => {
        let userId = HELPER.getAuthUserId();

        CHATROOM.find({ user: userId })
            .then(rooms => {
                if (!rooms) return HTTP.success(res, []);

                return HTTP.success(res, rooms);
            })
            .catch(err => HTTP.handleError(res, err));
    }
}
