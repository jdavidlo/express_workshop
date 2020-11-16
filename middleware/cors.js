module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
    )
    if(req.method == 'OPTIONS'){
        res.header("Access-Control-Allow-Mehtods", "PUT POST PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
}