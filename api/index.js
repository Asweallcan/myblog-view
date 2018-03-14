const express = require("express");
const router = express.Router();

var app = express();

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request);
    Object.setPrototypeOf(res, app.response);
    req.res = res;
    res.req = req;
    next();
});

router.post("/setadminsession", (req, res) => {
    req.session.admin = req.body;
    res.json({ok: true})
});

router.post("/deleteadminsession", (req, res) => {
    delete req.session.admin;
    res.json({ok: true})
});

router.post("/updateadminsession", (req, res) => {
    delete req.session.admin;
    req.session.admin = req.body;
    res.json({ok: true});
});

module.exports = {
    path: "/api",
    handler: router
}