export async function performanceTimerAsync(cb: Function, logString: string, ...args: any[]) {
    const start = performance.now();
    const result = await cb(...args);
    console.log(logString, `${performance.now() - start}ms`);
    return result;
}

export async function performanceTimer(cb: Function, logString: string, ...args: any[]) {
    const start = performance.now();
    const result = cb(...args);
    console.log(logString, `${performance.now() - start}ms`);
    return result;
}
