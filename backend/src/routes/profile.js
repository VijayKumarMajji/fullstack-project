const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ user: req.user });
});

router.put('/', async (req, res) => {
    try {
        req.user.name = req.body.name || req.user.name;
        await req.user.save();
        res.json({ user: req.user });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
