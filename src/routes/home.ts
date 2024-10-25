import express from 'express';
import { parseRssFeedToIntro } from '@init/InitRssFeed';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const rssData = await parseRssFeedToIntro();
        res.render('home', { rssData });
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        res.render('home', { rssData: [] }); // 에러가 난 경우 빈 데이터 전달
    }
});

export default router;