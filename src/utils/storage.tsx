import { isJsonString } from "./general";

export const storage = {
    set: (key: any, value: any, ttl?: number) => {
        if (typeof value === 'object') value = JSON.stringify(value);
        localStorage.setItem(key, value);
    },
    get: (key: any) => {
        let data = localStorage.getItem(key) as any;
        if (isJsonString(data)) data = JSON.parse(data);
        return data;
    },
    remove: (key: any) => localStorage.removeItem(key),
    clear: () => localStorage.clear()
}