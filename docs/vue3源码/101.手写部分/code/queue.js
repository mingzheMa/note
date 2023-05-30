// 任务队列
const jobQueue = new Set();
// 任务队列正在执行
let isFlushing = false;

// 执行jobQueue队列
function flushJob() {
    // 如果队列正在执行则返回
    if (isFlushing) return;
    isFlushing = true;

    const p = Promise.resolve();
    p.then(() => {
        // 异步微队列中执行任务列表
        jobQueue.forEach(job => job());
    }).finally(() => {
        // 执行完毕后将任务列表清空
        jobQueue.clear();
        isFlushing = false;
    });
}

module.exports.jobQueue = jobQueue;
module.exports.flushJob = flushJob;
