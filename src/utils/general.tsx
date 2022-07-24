export const isJsonString = (value: string) => {
    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }
    return true;
}

export const getRandomValue = () => {
    const array = new Uint32Array(1);
    return window.crypto.getRandomValues(array)[0];
}

export const getRandomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const capitalize = (value: string, lower = false) => {
  return (lower ? value.toLowerCase() : value).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
}

export const getPercentage = (current: number, total: number) => {
    const result = parseFloat(Math.round((current / total) * 100).toFixed(2));
    return result;
}