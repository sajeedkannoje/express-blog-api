// lib/index.js

function respondWithResource(resource, message = null, statusCode = 200, headers = {}) {
    return apiResponse({ success: true, data: resource, message }, statusCode, headers);
}

function parseGivenData(data = {}, statusCode = 200, headers = {}) {
    const responseStructure = {
        success: data.success,
        message: data.message || null,
        data: data.data || null,
    };

    if (data.errors) {
        responseStructure.errors = data.errors;
    }
    if (data.status) {
        statusCode = data.status;
    }

    if (data.exception && (data.exception instanceof Error)) {
        if (process.env.NODE_ENV !== 'production') {
            responseStructure.exception = {
                message: data.exception.message,
                file: data.exception.fileName,
                line: data.exception.lineNumber,
                code: data.exception.code,
                trace: data.exception.stack
            };
        }

        if (statusCode === 200) {
            statusCode = 500;
        }
    }

    if (data.success === false) {
        responseStructure.error_code = data.error_code || 1;
    }

    return { content: responseStructure, statusCode, headers };
}

function respondWithCompressedResponse(data, statusCode = 200, headers = {}) {
    return apiResponse({ success: true, data, message: null }, statusCode, headers);
}

function apiResponse(data = {}, statusCode = 200, headers = {}) {

    console.log(this);
    const result = parseGivenData(data, statusCode, headers);
    return {
        status: result.statusCode,
        json: function() {
            return this;
        },
        send: function() {
            return this.response.status(this.status).json(result.content);
        }
    };
}

function respondWithResourceCollection(resourceCollection, message = null, statusCode = 200, headers = {}) {
    const data = { success: true, data: resourceCollection.response().getData(true) };
    return apiResponse(data, statusCode, headers);
}

function respondWithArray(data, statusCode = 200, headers = {}) {
    return apiResponse({ success: true, data }, statusCode, headers);
}

function respondSuccess(message = '') {
    return apiResponse({ success: true, message });
}

function respondCreated(data) {
    return apiResponse(data, 201);
}

function respondNoContent(message = 'No Content Found') {
    return apiResponse({ success: false, message }, 200);
}

function respondUnAuthorized(message = 'You are not authorized to perform this action') {
    return respondError(message, 403);
}

function respondUnAuthenticated(message = 'Please provide a valid token to authenticate') {
    return respondError(message, 401);
}

function respondError(message, statusCode = 400, exception = null, errorCode = 1) {
    return apiResponse({ success: false, message }, statusCode);
}

function respondForbidden(message = 'Forbidden') {
    return respondError(message, 403);
}

function respondNotFound(message = 'Not Found') {
    return respondError(message, 404);
}

function respondFailedLogin() {
    return apiResponse({ success: false, message: 'Email or password is invalid' }, 422);
}

function respondInternalError(message = 'Internal Error') {
    return respondError(message, 500);
}

function respondValidationErrors(exception) {
    return apiResponse({
        success: false,
        message: exception.message,
        errors: exception.errors,
    }, 422);
}

module.exports = {
    respondWithResource,
    parseGivenData,
    respondWithCompressedResponse,
    apiResponse,
    respondWithResourceCollection,
    respondWithArray,
    respondSuccess,
    respondCreated,
    respondNoContent,
    respondUnAuthorized,
    respondUnAuthenticated,
    respondError,
    respondForbidden,
    respondNotFound,
    respondFailedLogin,
    respondInternalError,
    respondValidationErrors
};
