import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('labs', { title: 'Labs' });
});

export default router;