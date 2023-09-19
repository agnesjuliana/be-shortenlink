const { validationResult } = require('express-validator');
const { buildResponse } = require('../utilities/response');

function validate(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = errors.array().map((err) => (err.msg));
    if (!errors.isEmpty()) {
      return res.status(422).json(buildResponse(null, false, extractedErrors));
    }
}

module.exports = { validate };