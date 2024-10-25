import { KeywordData } from '@public/types/KeywordData';

// 날짜 문자열을 Date 객체로 변환
const parseDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
};

// 일주일 전부터 어제까지의 날짜 범위 계산
const getDateRange = (): { start: Date; end: Date } => {
    const today = new Date();
    const end = new Date(today);
    end.setDate(today.getDate() - 1); // 어제

    const start = new Date(today);
    start.setDate(today.getDate() - 8); // 일주일 전

    // 시간 초기화
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return { start, end };
};

// 데이터를 날짜별로 그룹화
const groupDataByDate = (data: KeywordData[]) => {
    return data.reduce((acc: { [key: string]: KeywordData[] }, item) => {
        if (!acc[item.collected_date]) {
            acc[item.collected_date] = [];
        }
        acc[item.collected_date].push(item);
        return acc;
    }, {});
};

// 각 날짜 그룹 내에서 rank에 따라 정렬
const sortDataByRank = (groupedData: { [key: string]: KeywordData[] }) => {
    for (const date in groupedData) {
        groupedData[date].sort((a, b) => a.rank - b.rank);
    }
};

// 전체 데이터 처리 함수
export const processTrendData = (collectedData: KeywordData[]) => {
    const { start, end } = getDateRange();

    // 필터링: 일주일 전부터 어제까지
    const filteredData: KeywordData[] = collectedData.filter(item => {
        const itemDate = parseDate(item.collected_date);
        return itemDate >= start && itemDate <= end;
    });

    // 그룹화
    const groupedData = groupDataByDate(filteredData);

    // 정렬
    sortDataByRank(groupedData);

    // 정렬된 날짜 목록 (오름차순)
    const sortedDates = Object.keys(groupedData).sort((a, b) => {
        return parseDate(a).getTime() - parseDate(b).getTime();
    });

    return { groupedData, sortedDates };
};