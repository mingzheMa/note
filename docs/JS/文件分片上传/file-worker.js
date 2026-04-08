import { md5FromArrayBuffer } from './md5.js';

self.onmessage = chunks => {
    const result = chunks.map(item => {
        const sign = md5FromArrayBuffer(item.chunk);
        return {
            chunk: item.chunk,
            index: item.index,
            sign
        };
    });

    self.postMessage(result);
};