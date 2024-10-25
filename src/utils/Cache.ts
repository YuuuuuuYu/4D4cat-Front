interface CacheData<T> {
    data: T | null;
    lastFetchedTime: number;
    cacheDuration: number;  // 밀리초 단위
}

export class Cache<T> {
    private cache: CacheData<T>;

    constructor(cacheDuration: number) {
        this.cache = {
            data: null,
            lastFetchedTime: 0,
            cacheDuration: cacheDuration,
        };
    }

    // 캐시 데이터가 유효한지 확인하는 메서드
    private isCacheValid(): boolean {
        const currentTime = Date.now();
        return this.cache.data !== null && (currentTime - this.cache.lastFetchedTime) < this.cache.cacheDuration;
    }

    // 캐시된 데이터 가져오기
    getCache(): T | null {
        if (this.isCacheValid()) {
            return this.cache.data;
        }
        return null;
    }

    // 캐시된 데이터 저장하기
    setCache(data: T): void {
        this.cache.data = data;
        this.cache.lastFetchedTime = Date.now();
    }
}
