const express = require("express");
const router = express.Router();

router.get('/', (req, res) => res.render("pages/home"));
router.get('/lich-truc-tiep', (req, res) => res.render("pages/livestreamSchedule"));
router.get('/highlights', (req, res) => res.render("pages/highlights"));
router.get('/admin/login', (req, res) => res.render("pages/login-admin"));
router.get('/chat', (req, res) => res.render("chat"));

module.exports = router;