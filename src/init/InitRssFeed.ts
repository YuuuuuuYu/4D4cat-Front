import { callAPIGet } from '@utils/ApiCallback';
import { Cache } from '@utils/Cache';
import { DOMParser } from 'xmldom';

// RSS 피드 항목을 나타내는 인터페이스
interface RSSItem {
    title: string;
    link: string;
}
// RSS 피드 호출할 개수
const feedCnt: number = 5;
// 캐시 객체 생성 (캐시 유효기간: 5분)
const rssCache = new Cache<RSSItem[]>(5 * 60 * 1000);

// RSS 피드를 파싱하여 포스트 정보를 반환하는 함수
export async function parseRssFeedToIntro(): Promise<RSSItem[]> {
    const cachedData = rssCache.getCache();
    if (cachedData) {
        return cachedData;
    }

    const feedUrl = 'https://yuuuuuuyu.github.io/feed.xml';
    const resultXml = await callAPIGet<string>(feedUrl);

    if (!resultXml.data) {
        throw new Error('RSS 피드를 가져오는데 실패했습니다.');
    }

    // xmldom의 DOMParser 사용하여 XML 파싱
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(resultXml.data, "text/xml");
    const result: RSSItem[] = [];

    const entries = Array.from(xmlDoc.getElementsByTagName("entry"));
    entries.slice(0, feedCnt).forEach(entry => {
        const titleElement = entry.getElementsByTagName("title")[0];
        const linkElement = entry.getElementsByTagName("link")[0];

        if (titleElement && linkElement) {
            const title = titleElement.textContent?.trim() || '제목 없음';
            const link = linkElement.getAttribute("href") || '#';

            result.push({ title, link });
        }
    });

    rssCache.setCache(result);
    return result;
}
