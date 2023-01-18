const VALIDATOR = require('validator');
const CONTACT = require('mongoose').model('Contact');
const USER = require('mongoose').model('User');
const ENCRYPTION = require('../utilities/encryption');

const PAGE_LIMIT = 15;

function validateRatingForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (
        !payload
        || isNaN(Number(payload.rating))
        || !VALIDATOR.isInt(payload.rating.toString())
        || Number(payload.rating) < 1
        || Number(payload.rating) > 5
    ) {
        isFormValid = false;
        errors.price = 'Rating must be a integer number between 1 and 5.';
    }

    return {
        success: isFormValid,
        errors
    };
}

module.exports = {
    getSingle: (req, res) => {
        let contactId = req.params.contactId;

        CONTACT.findById(contactId)
            .then((contact) => {
                if (!contact) {
                    return res.status(400).json({
                        message: 'There is no contact with the given id in our database.'
                    });
                }

                return res.status(200).json({
                    message: '',
                    data: contact
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({
                    message: 'Something went wrong, please try again.'
                });
            });
    },

    add: (req, res) => {
        let contact = req.body;

        // let validationResult = validateBookForm(book);

        // if (!validationResult.success) {
        //     return res.status(400).json({
        //         message: 'Book form validation failed!',
        //         errors: validationResult.errors
        //     });
        // }

        CONTACT.create(contact).then((newContact) => {
            return res.status(200).json({
                message: 'Contact created successfully!',
                data: newContact
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    edit: (req, res) => {
        let contactId = req.params.contactId;
        let editedContact = req.body;

        // let validationResult = validateBookForm(editedBook);

        // if (!validationResult.success) {
        //     return res.status(400).json({
        //         message: 'Book form validation failed!',
        //         errors: validationResult.errors
        //     });
        // }

        CONTACT.findById(contactId).then((contact) => {
            if (!contact) {
                return res.status(400).json({
                    message: 'There is no contact with the given id in our database.'
                });
            }

            contact.title = editedContact.title;
            contact.firstName = editedContact.firstName;
            contact.lastName = editedContact.lastName;
            contact.type = editedContact.type;
            contact.contact1 = editedContact.contact1;
            contact.contact2 = editedContact.contact2;
            contact.address = editedContact.address;
            contact.save();

            return res.status(200).json({
                message: 'Contact edited successfully!',
                data: contact
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    delete: (req, res) => {
        let contactId = req.params.contactId;

        CONTACT.findByIdAndRemove(contactId).then((deletedContact) => {
            if (!deletedContact) {
                return res.status(400).json({
                    message: 'There is no contact with the given id in our database.'
                });
            }

            return res.status(200).json({
                message: 'Contact deleted successfully.',
                data: deletedContact
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    rate: (req, res) => {
        let contactId = req.params.contactId;
        let rating = req.body.rating;
        let userId = req.user.id;

        let validationResult = validateRatingForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Rating form validation failed!',
                errors: validationResult.errors
            });
        }

        CONTACT.findById(contactId).then((contact) => {
            if (!contact) {
                return res.status(400).json({
                    message: 'There is no contact with the given id in our database.'
                });
            }

            let ratedByIds = contact.ratedBy.map((id) => id.toString());
            if (ratedByIds.indexOf(userId) !== -1) {
                return res.status(400).json({
                    message: 'You already rated this contact'
                });
            }

            contact.ratedBy.push(userId);
            contact.ratingPoints += rating;
            contact.ratedCount += 1;
            contact.currentRating = contact.ratingPoints / contact.ratedCount;
            contact.save();

            return res.status(200).json({
                message: 'You rated the contact successfully.',
                data: contact
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    addToFavorites: (req, res) => {
        let contactId = req.params.contactId;

        CONTACT.findById(contactId).then((contact) => {
            if (!contact) {
                return res.status(400).json({
                    message: 'There is no contact with the given id in our database.'
                });
            }

            USER.findById(req.user.id).then((user) => {

                let contactsIds = user.favoriteContacts.map((b) => b.toString());
                if (contactsIds.indexOf(contactId) !== -1) {
                    return res.status(400).json({
                        message: 'You already have this contact in your favorites list'
                    });
                }

                user.favoriteContacts.push(contact._id);
                user.save();

                return res.status(200).json({
                    message: 'Successfully added the contact to your favorites list.'
                });
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    search: (req, res) => {
        let params = req.query;
        let searchParams = {
            query: {},
            sort: { creationDate: -1 },
            skip: null,
            limit: PAGE_LIMIT,
        };

        if (params.query || typeof params.query === 'string') {
            let query = JSON.parse(params.query);
            searchParams.query = { $text: { $search: query['searchTerm'], $language: 'en' } };
        }

        if (params.sort) {
            searchParams.sort = JSON.parse(params.sort);
        }

        if (params.skip) {
            searchParams.skip = JSON.parse(params.skip);
        }

        if (params.limit) {
            searchParams.limit = JSON.parse(params.limit);
        }
        searchParams.query['createdBy'] = ENCRYPTION.parseJwt(req.headers.authorization).sub.id;

        CONTACT
            .find(searchParams.query)
            .count()
            .then((count) => {
                CONTACT
                    .find(searchParams.query)
                    .sort(searchParams.sort)
                    .skip(searchParams.skip)
                    .limit(searchParams.limit)
                    .then((result) => {
                        return res.status(200).json({
                            message: '',
                            data: result,
                            query: searchParams,
                            itemsCount: count
                        });
                    })
                    .catch(() => {
                        return res.status(400).json({
                            message: 'Bad Request!'
                        });
                    });
            });
    }
};