const VALIDATOR = require('validator');
const HELPER = require('../utilities/helper');
const HTTP = require('../utilities/HTTP');
const PRODUCT = require('mongoose').model('Product');

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
    addMainPicture: (req, res) => {
        let productId = req.params.productId;
        let picture = req.body;

        PRODUCT.findById(productId).then(product => {
            if (!product) return HTTP.error(res, 'There is no product with the given id in our database.');

            product.defaultImage = picture;
            product.save();

            return HTTP.success(res, product, 'Product image updated successfully.');
        });
    },

    addPicture: (req, res) => {
        let productId = req.params.productId;
        let picture = req.body;

        PRODUCT.findById(productId).then(product => {
            if (!product) return HTTP.error(res, 'There is no product with the given id in our database.');

            if (!product.images) product.images = [];
            product.images.push(picture);
            product.save();

            return HTTP.success(res, product, 'Image added to product successfully.');
        });
    },

    deletePicture: (req, res) => {
        let productId = req.params.productId;
        let index = req.params.index;

        PRODUCT.findById(productId).then(product => {
            if (!product) return HTTP.error(res, 'There is no product with the given id in our database.');

            product.images.splice(index, 1);
            product.save();

            return HTTP.success(res, product, 'Image added to product successfully.');
        });
    },

    deleteMainPicture: (req, res) => {
        let productId = req.params.productId;

        PRODUCT.findById(productId).then(product => {
            if (!product) return HTTP.error(res, 'There is no product with the given id in our database.');

            product.defaultImage = '';
            product.save();

            return HTTP.success(res, product, 'Image added to product successfully.');
        });
    },

    getSingle: (req, res) => {
        let productId = req.params.productId;

        PRODUCT.findById(productId)
            .then((product) => {
                if (!product) return HTTP.error(res, 'There is no product with the given id in our database.');

                return HTTP.success(res, product);
            })
            .catch(err => HTTP.handleError(res, err));
    },

    add: (req, res) => {
        let product = req.body;
        product['createdBy'] = HELPER.getAuthUserId(req);

        PRODUCT.create(product).then((newProduct) => {
            return HTTP.success(res, newProduct, 'Product created successfully.');
        }).catch(err => HTTP.handleError(res, err));
    },

    edit: (req, res) => {
        let productId = req.params.productId;
        let editedProduct = req.body;

        PRODUCT.findById(productId).then((product) => {
            if (!product) return HTTP.error(res, 'There is no product with the given id in our database.');

            product.name = editedProduct.name;
            product.description = editedProduct.description;
            product.save();

            return HTTP.success(res, product, 'Product edited successfully.');
        }).catch(err => HTTP.handleError(res, err));
    },

    delete: (req, res) => {
        let productId = req.params.productId;

        PRODUCT.findByIdAndRemove(productId).then((deletedProduct) => {
            if (!deletedProduct) return HTTP.error(res, 'There is no product with the given id in our database.');

            return HTTP.success(res, deletedProduct, 'Product deleted successfully.');
        }).catch(err => HTTP.handleError(res, err));
    },

    rate: (req, res) => {
        let productId = req.params.productId;
        let rating = req.body.rating;
        let userId = req.user.id;

        let validationResult = validateRatingForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Rating form validation failed!',
                errors: validationResult.errors
            });
        }

        PRODUCT.findById(productId).then((product) => {
            if (!product) return HTTP.error(res, 'There is no product with the given id in our database.');

            let ratedByIds = product.ratedBy.map((id) => id.toString());
            if (ratedByIds.indexOf(userId) !== -1) {
                return res.status(400).json({
                    message: 'You already rated this product'
                });
            }

            product.ratedBy.push(userId);
            product.ratingPoints += rating;
            product.ratedCount += 1;
            product.currentRating = product.ratingPoints / product.ratedCount;
            product.save();

            return HTTP.success(res, product, 'Product rated the product successfully.');
        }).catch(err => HTTP.handleError(res, err));
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
        searchParams.query['createdBy'] = HELPER.getAuthUserId(req);

        PRODUCT
            .find(searchParams.query)
            .count()
            .then((count) => {
                PRODUCT
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
                        return HTTP.error(res, 'Bad Request!');
                    });
            });
    }
}