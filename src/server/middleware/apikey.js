const apiToken = process.env.API_TOKEN

/**
 * Authenticates certain paths to require api key for security.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = function(req, res, next) {
    if(req.originalUrl.startsWith('/admin') || req.originalUrl.startsWith('/static') ||
        req.originalUrl.startsWith('/favicon.ico') || req.originalUrl.startsWith('/api-docs')) {
        next();
    } else {
        if(req.headers.api_token !== apiToken) {
            return res.status(401).json({
                message: "Request is not authorized."
            });
        }
        next();
    }
};
