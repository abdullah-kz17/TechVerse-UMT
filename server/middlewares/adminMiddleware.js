const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({
            message: "Access denied. Admins only.",
            success: false,
        });
    }
};

module.exports = adminMiddleware;
