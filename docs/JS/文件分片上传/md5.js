export function md5FromArrayBuffer(buffer) {
    const bytes = new Uint8Array(buffer);

    function rotateLeft(x, n) {
        return (x << n) | (x >>> (32 - n));
    }

    function add(x, y) {
        return (x + y) >>> 0;
    }

    function F(x, y, z) {
        return (x & y) | (~x & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & ~z);
    }

    function H(x, y, z) {
        return x ^ y ^ z;
    }

    function I(x, y, z) {
        return y ^ (x | ~z);
    }

    function toWordArray(bytes) {
        const len = bytes.length;
        const n = (((len + 8) >> 6) + 1) * 16;
        const words = new Uint32Array(n);

        let i;
        for (i = 0; i < len; i++) {
            words[i >> 2] |= bytes[i] << ((i % 4) * 8);
        }

        words[i >> 2] |= 0x80 << ((i % 4) * 8);
        words[n - 2] = len * 8;

        return words;
    }

    function toHex(num) {
        return ("00000000" + num.toString(16)).slice(-8);
    }

    const x = toWordArray(bytes);

    let a = 0x67452301;
    let b = 0xefcdab89;
    let c = 0x98badcfe;
    let d = 0x10325476;

    const S = [7, 12, 17, 22];

    for (let i = 0; i < x.length; i += 16) {
        let AA = a, BB = b, CC = c, DD = d;

        a = add(a, F(b, c, d) + x[i + 0]);
        a = add(rotateLeft(a, S[0]), b);

        d = add(d, F(a, b, c) + x[i + 1]);
        d = add(rotateLeft(d, S[1]), a);

        c = add(c, F(d, a, b) + x[i + 2]);
        c = add(rotateLeft(c, S[2]), d);

        b = add(b, F(c, d, a) + x[i + 3]);
        b = add(rotateLeft(b, S[3]), c);

        a = add(a, AA);
        b = add(b, BB);
        c = add(c, CC);
        d = add(d, DD);
    }

    return (
        toHex(a) +
        toHex(b) +
        toHex(c) +
        toHex(d)
    );
}