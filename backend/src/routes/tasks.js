const router = require('express').Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    const tasks = await Task.find({ user: req.userId });
    res.json({ tasks });
});

router.post('/', async (req, res) => {
    const task = await Task.create({
        user: req.userId,
        title: req.body.title,
        description: req.body.description
    });
    res.json({ task });
});

router.put('/:id', async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        req.body,
        { new: true }
    );
    res.json({ task });
});

router.delete('/:id', async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ success: true });
});

module.exports = router;
