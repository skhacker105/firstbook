const VALIDATOR = require('validator');
const HELPER = require('../utilities/helper');
const HTTP = require('../utilities/HTTP');
const PRODUCT = require('mongoose').model('Product');
const IMAGE = require('mongoose').model('Image');
const imageToBase64 = require('image-to-base64');

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
        const productId = req.body.productId;
        const image = req.body.image;
        const name = req.body.name;

        PRODUCT.findById(productId).then(product => {
            if (!product) return HTTP.error(res, 'There is no product with the given id in our database.');
            let resource = {
                resourceType: 'product',
                resourceId: product._id,
                imagePath: __dirname.replace('controllers', '') + 'images\\' + product._id.toString() + '_' + name,
                createdBy: HELPER.getAuthUserId(req)
            }

            HELPER.saveImage(resource.imagePath, image, (error) => {
                if (error) return HTTP.error(res, 'Image Save Error');

                IMAGE.create(resource).then((newImage) => {
                    product.defaultImage = newImage._id
                    product.save();

                    return HTTP.success(res, '', 'Product image updated successfully.');
                }).catch(err => HTTP.handleError(res, err));
            });
        });
    },

    getPicture: (req, res) => {
        let pictureId = req.params.pictureId;

        IMAGE.findById(pictureId).then(picture => {
            if (!picture) return HTTP.error(res, 'There is no picture with the given id in our database.');
            const prefix = 'data:image/jpeg;base64,';

            imageToBase64(picture.imagePath)
                .then(response => HTTP.success(res, {
                    _id: picture.id,
                    name: picture.imagePath.split('\\').pop(),
                    image: prefix + response
                }))

                .catch(err => HTTP.error(res, err));
        }).catch(err => HTTP.handleError(res, err));
    },

    deleteMainPicture: (req, res) => {
        let productId = req.params.productId;

        PRODUCT.findById(productId).then(product => {
            if (!product) return HTTP.error(res, 'There is no product with the given id in our database.');

            IMAGE.findByIdAndRemove(product.defaultImage)
                .then(deletedImage => {
                    product.defaultImage = ''
                    product.save();

                    HELPER.deleteImage(deletedImage.imagePath, error => {
                        if (error) return HTTP.error(res, error);

                        return HTTP.success(res, '', 'Product image deleted successfully.');
                    })
                }).catch(err => HTTP.handleError(res, err));
        }).catch(err => HTTP.handleError(res, err));
    },



    addPictures: (req, res) => {
        const productId = req.body.productId;
        const name = req.body.name;
        const image = req.body.image;

        PRODUCT.findById(productId).then(product => {
            if (!product) return HTTP.error(res, 'There is no product with the given id in our database.');
            let resource = {
                resourceType: 'product',
                resourceId: product._id,
                imagePath: __dirname.replace('controllers', '') + 'images\\' + product._id.toString() + '_' + name,
                createdBy: HELPER.getAuthUserId(req)
            }

            HELPER.saveImage(resource.imagePath, image, (error) => {
                if (error) return HTTP.error(res, 'Image Save Error');

                IMAGE.create(resource).then((newImage) => {
                    if (!product.images) product.images = [];
                    product.images.push(newImage._id);
                    product.save();

                    return HTTP.success(res, '', 'Product image updated successfully.');
                }).catch(err => HTTP.handleError(res, err));
            });
        });
    },

    deletePictures: (req, res) => {
        let pictureId = req.params.pictureId;

        IMAGE.findById(pictureId).then(picture => {
            if (!picture) return HTTP.error(res, 'There is no picture with the given id in our database.');

            PRODUCT.findById(picture.resourceId).then(product => {
                if (!product) return HTTP.error(res, 'There is no product with the given id in our database.');
                const index = product.images.findIndex(img_id => img_id === pictureId);
                product.images.splice(index, 1);
                product.save();

                IMAGE.findByIdAndRemove(pictureId)
                    .then(deletedImage => {

                        HELPER.deleteImage(deletedImage.imagePath, error => {
                            if (error) return HTTP.error(res, error);

                            return HTTP.success(res, '', 'Product image deleted successfully.');
                        })
                    })
                    .catch(err => HTTP.handleError(res, err));

            });
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
                        result = result.map(r => r._id);
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