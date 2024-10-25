import express from 'express';
import { collectedData } from '@batch/export/collectedData';
import { processTrendData } from '@init/InitTrendsData';

const router = express.Router();
router.get('/', (req, res) => {
  const currentDate = req.query.date as string | undefined;
  const { groupedData, sortedDates } = processTrendData(collectedData);

  if (sortedDates.length === 0) {
    return res.render('trend', {
      title: 'Trend',
      currentDate: '데이터 없음',
      keywords: [],
      prevDate: null,
      nextDate: null
    });
  }

  // 현재 날짜가 유효한지 확인하고, 유효하지 않으면 최신 날짜로 설정
  let selectedDate = currentDate;
  if (!selectedDate || !groupedData[selectedDate]) {
    selectedDate = sortedDates[sortedDates.length - 1];
  }

  // 현재 날짜의 인덱스 찾기
  const currentIndex = sortedDates.indexOf(selectedDate);

  // 이전 날짜와 다음 날짜 찾기
  const prevDate = currentIndex > 0 ? sortedDates[currentIndex - 1] : null;
  const nextDate = currentIndex < sortedDates.length - 1 ? sortedDates[currentIndex + 1] : null;

  // 현재 날짜의 키워드 데이터 가져오기
  const keywords = groupedData[selectedDate];

  res.render('trend', {
    title: 'Trend',
    currentDate: selectedDate,
    keywords: keywords,
    prevDate: prevDate,
    nextDate: nextDate
  });
});

export default router;