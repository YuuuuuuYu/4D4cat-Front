import axios, { AxiosResponse } from 'axios';

// HTTP 메서드 타입 정의
type HTTPMethod = 'GET' | 'POST';

// API 호출 결과를 나타내는 인터페이스
interface APIResult<T> {
    data: T | undefined
    time: string
}
interface APIRequestConfig {
    method: HTTPMethod
    url: string
    params?: string
}

// 일반적인 API 호출 함수
async function callAPI<T>(method: HTTPMethod, url: string, params: any): Promise<APIResult<T>> {
    const result: APIResult<T> = {
        data: undefined,
        time: ''
    };
    const startTime = Date.now();
    const options: APIRequestConfig = {method, url, params};

    try {
        const response: AxiosResponse<T> = await axios(options);
        const endTime = Date.now();
        result.time = ((endTime - startTime) / 1000).toFixed(2) + 's';

        if (response.status === 200) {
            result.data = response.data;
        } else {
            console.error(`Error: Received status code ${response.status}`);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }

    return result;
}

// GET 요청을 위한 API 호출 함수
export async function callAPIGet<T>(url: string, params?: any): Promise<APIResult<T>> {
    return await callAPI<T>('GET', url, params);
}

// POST 요청을 위한 API 호출 함수
export async function callAPIPost<T>(url: string, params?: any): Promise<APIResult<T>> {
    return await callAPI<T>('POST', url, params);
}