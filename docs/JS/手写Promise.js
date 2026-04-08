class MyPromise {
    static PENDING = 'pending'
    static RESOLVE = 'resolve'
    static REJECT = 'reject'

    constructor(fn) {
        this.status = MyPromise.PENDING
        this.payload = null
        this.resCallback = null
        this.rejCallback = null

        this.#init(fn)
    }

    #init(fn) {
        fn(this.#resolve.bind(this), this.#reject.bind(this))
    }

    #resolve(res) {
        if (this.status === MyPromise.PENDING) {
            this.payload = res
            this.status = MyPromise.RESOLVE

            if (this.resCallback) {
                this.resCallback(res)
            }
        }
    }

    #reject(res) {
        if (this.status === MyPromise.PENDING) {
            this.payload = res
            this.status = MyPromise.REJECT
            if (this.rejCallback) {
                this.rejCallback(res)
            }
        }
    }

    then(resFn = null, rejFn = null) {
        return new MyPromise((resove, reject) => {
            switch (this.status) {
                case MyPromise.RESOLVE:
                    setTimeout(() => {
                        const result = resFn(this.payload)
                        resove(result)
                    })
                    break;

                case MyPromise.REJECT:
                    setTimeout(() => {
                        const result = rejFn(this.payload)
                        resove(result)
                    })
                    break;

                default:
                    if (resFn) {
                        this.resCallback = (res) => {
                            resove(resFn(res))
                        }
                    }
                    if (rejFn) {
                        this.rejCallback = (res) => {
                            resove(rejFn(res))
                        }
                    }
                    break;
            }

        })
    }

    static resolve(res){
        return new MyPromise(resolve => resolve(res))
    }

    static reject(res){
        return new MyPromise((_resolve, reject) => reject(res))
    }

    static all(promiseArr) {
        return new MyPromise((resove, reject) => {
            const resArr = []
            promiseArr.forEach((promiseFn, i) => {
                promiseFn.then(res => {
                    resArr.push(res)
                    if (resArr.length === promiseArr.length) {
                        resove(resArr)
                    }
                }, rej => reject(rej))
            })
        })

    }
}

// case 1
// console.log(1)
// const test = new MyPromise((res, rej) => {
//     console.log(2)
//     setTimeout(() => {
//         res('true promise'); 
//     },1000);
//     console.log(3)

// })
// console.log(4)
// test.then((res) => {
//     console.log(res)
//     return 'true promise2'
// }).then((res) => {
//     console.log(res)
// })
// console.log(5)

// case 2
const promiseArr = []
for (let i = 0; i < 10; i++) {
    const res = new MyPromise((res, rej) => {
        setTimeout(() => {
            if (i === 9) {
                rej(i)
            } else {
                res(i)
            }
        }, i * 100)
    })

    promiseArr.push(res)
}

MyPromise.all(promiseArr).then(res => {
    console.log(res)
}, rej => {
    console.log('rej', rej)
})

