export const getMax = (events: number[]) => Math.max(...events);

export const getMin = (events: number[]) => Math.min(...events);

export const getSum = (events: number[]) => events.reduce((a, b) => a + b, 0);

export const getAverage = (events: number[]) => getSum(events) / events.length;
