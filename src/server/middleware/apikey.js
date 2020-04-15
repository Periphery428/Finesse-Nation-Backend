const apiToken = process.env.API_TOKEN

module.exports = function(req, res, next) {
    if(req.headers.api_token !== apiToken) {
        return res.status(401).json({
            message: "Request is not authorized."
        });
    }
    next();
};
