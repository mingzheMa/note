# 手写Promise

我们先看下要如何调用Promise

```js
const promise = new Promise((resolve, reject) => {
    resolve("成功")
})
```

## 构建实例

可以看到这是一个类接收一个函数，我们来搞下

```js
class OPromise {
    static PENDING = "pending"
    static RESOLVED = "resolved"
    static REJECTED = "rejected"

    constructor(executor) {
        this.state = OPromise.PENDING
        this.payload = null

        executor(this._resolve.bind(this), this._reject.bind(this))
    }

    _resolve(payload){
        if (this.state === OPromise.PENDING) {
            this.state = OPromise.RESOLVED
            this.payload = payload
        }
    }

    _reject(payload){
        if (this.state === OPromise.PENDING) {
            this.state = OPromise.REJECTED
            this.payload = payload
        }
    }
}
```

- 我们知道Promise内置了状态这里我们设置了三种状态分别对应Promise内置的状态，并在初始化的时候设置为<code>pending</code>状态
- 在构建实例的时候直接调用传入的函数，这里注意传入的函数需要修改this指向Promise实例，因为传入的<code>resolve</code>和<code>reject</code>参数并不是在实例中调用
- 创建类中<code>_resolve</code>和<code>_reject</code>用来修改Promise实例的状态，因为状态修改是不可逆的，所以这里判断如果不是PENDING则不修改
- 因为在调用<code>resolve</code>和<code>reject</code>函数可以传递一个参数（payload），这个参数会在之后then中作为函数参数返回，这里暂时将payload缓存起来

## 实例then方法

接下来我们知道Promise实例会提供一个then方法，用来接收构建Promise实例时调用resolve或reject函数传入的payload

```js
const promise = new Promise((resolve, reject) => {
    resolve("成功")
})
promise.then(res => {console.log(res)})
```

我们实现下then方法

```js
class OPromise {
    // ...
    // 跟之前一样这里省略

    then(onResolved, onRejected){
        switch (this.state) {
            case OPromise.RESOLVED:{
                onResolved(this.payload)
                break;
            }
            case OPromise.REJECTED:{
                onRejected(this.payload)
                break;
            }   

            default:
                break;
        }
    }
}

console.log("1")
const promise = new OPromise(res => {
    console.log("2")
    res("成功")
    console.log("3")
})
promise.then(res => console.log("成功"))
console.log("4")

// 打印
// 1
// 2
// 3
// 成功
// 4
```

看打印结果“成功”这个应该在最后，then函数应该是异步执行，但是我们这里并没有异步呀。。。

```js
class OPromise {
    // ...
    // 跟之前一样这里省略

    then(onResolved, onRejected){
        switch (this.state) {
            case OPromise.RESOLVED:{
                setTimeout(() => {
                    onResolved(this.payload)
                })
                break;
            }
            case OPromise.REJECTED:{
                setTimeout(() => {
                    onRejected(this.payload)
                })
                break;
            }   

            default:
                break;
        }
    }
}

console.log("1")
const promise = new OPromise(res => {
    console.log("2")
    res("成功")
    console.log("3")
})
promise.then(res => console.log("成功"))
console.log("4")

// 打印
// 1
// 2
// 3
// 4
// 成功
```

## 构建报错

我们知道构建Promise的时候是可以直接报错的，错误会通过.then的第二个函数参数捕捉

```js
const promise = new Promise((resolve, reject) => {
    throw Error("错误")
})
promise.then(undefined, (err) => {
    console.log(err.message)
})

// 错误
```

我们修改下代码

```js
class OPromise {
    static PENDING = "pending"
    static RESOLVED = "resolved"
    static REJECTED = "rejected"

    constructor(executor) {
        this.state = OPromise.PENDING
        this.payload = null

        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            this._reject(error)
        }
    }

    // 没改所以省略
}
```

我们只要捕获executor函数的报错并触发_reject即可

## 构建时异步触发resolve或reject

二话不说我们先看代码

```js
console.log("1")
const promise = new Promise((resolve, reject) => {
    console.log("2")
    setTimeout(() => {
        console.log("3")
        resolve("成功")
        console.log("4")
    })
})
promise.then((res) => {
    console.log(res)
})

console.log("5")

// 打印
// 1
// 2
// 5
// 3
// 4
// 成功
```

我们使用自己的<code>OPromise</code>看打印结果为1、2、5、3、4，可以看到并没有输出成功

我们来分析下代码就能发现，因为<code>resolve</code>是在异步调用，所以会先触发<code>promise.then</code>，因为此时还没有触发<code>resolve</code>所以promise的状态为pending，<code>promise.then</code>方法并没有对pending状态做额外处理，所以这里就不会触发then函数回调

接下来我们改进下then方法

```js
class OPromise {
    // ...

    constructor(executor) {
        this.state = OPromise.PENDING
        this.payload = null
        this.onResolvedCallback = []
        this.onRejectedCallback = []

        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            this._reject(error)
        }
    }

    _resolve(payload) {
        if (this.state === OPromise.PENDING) {
            this.state = OPromise.RESOLVED
            this.payload = payload
            this.onResolvedCallback.forEach(callback => callback(payload))
        }
    }

    _reject(payload) {
        if (this.state === OPromise.PENDING) {
            this.state = OPromise.REJECTED
            this.payload = payload
            this.onRejectedCallback.forEach(callback => callback(payload))
        }
    }

    then(onResolved, onRejected) {
        switch (this.state) {
            case OPromise.RESOLVED: {
                setTimeout(() => {
                    onResolved(this.payload)
                })
                break;
            }
            case OPromise.REJECTED: {
                setTimeout(() => {
                    onRejected(this.payload)
                })
                break;
            }
            case OPromise.PENDING:{
                onResolved && this.onResolvedCallback.push(onResolved)
                onRejected && this.onRejectedCallback.push(onRejected)
                break;
            }

            default:
                break;
        }
    }
}
```

- 在构建时创建成功失败回调函数队列（onResolvedCallback、onRejectedCallback）
- 在then方法执行的时候如果promise是pending状态则将传入函数参数插入队列
- 在promise构建时调用resolve或reject函数时遍历执行对应队列中保存的回调
  
我们执行看下最终结果：1、2、5、3、成功、4

这里"成功"到是打印出来了，但是顺序还是不对

```js
class OPromise {
    // ...

    _resolve(payload) {
        setTimeout(() => {
            if (this.state === OPromise.PENDING) {
                this.state = OPromise.RESOLVED
                this.payload = payload
                this.onResolvedCallback.forEach(callback => callback(payload))
            }
        })
    }

    _reject(payload) {
        setTimeout(() => {
            if (this.state === OPromise.PENDING) {
                this.state = OPromise.REJECTED
                this.payload = payload
                this.onRejectedCallback.forEach(callback => callback(payload))
            }
        })

    }

    // ...
}
```

在promise构建时调用resolve或reject函数时我们将函数改为异步，再次查看打印结果：1、2、5、3、4、成功

这样看来就没问题了，到这里可能会发现，不论在构建在promise构建时是否调用resolve或reject函数该函数都已经成异步函数，我们对then函数进行简化（顺手做了个容错）

```js
class OPromise {
    // ...

   then(onResolved, onRejected) {
        if(onResolved instanceof Function){
            this.onResolvedCallback.push(onResolved)
        }
        if(onRejected instanceof Function){
            this.onRejectedCallback.push(onRejected)
        }
    }

    // ...
}
```

## 链式调用

我们看下promise链式调用使用

```js
console.log("1")
const promise = new Promise((resolve, reject) => {
    console.log("2")
    resolve("成功")
})
promise.then((res) => {
    console.log(res)
    return "成功1"
}).then((res) => {
    console.log(res)
    return new Promise((resolve) => {
        resolve("成功2")
    })
}).then((res) => {
    console.log(res)
    throw Error("失败")
}).then(undefined, (err) => {
    console.log(err.message)
    return new Promise((resolve, reject) => {
        reject("失败1")
    })
}).then(undefined, (err) => {
    console.log(err)
})

console.log("5")

// 打印
// 1
// 2
// 5
// 成功
// 成功1
// 成功2
// 失败
// 失败1
```

- promise实例上的then方法最终会返回一个promise对象
- then中返回字符串则认为返回一个状态为resolved的promise
- then中代码报错返回状态为rejected的promise
- then中可以返回一个promise

注意：如果上述代码在then中返回promise变量则会报错（如果这么做则会无限循环）

```js
class OPromise {
    // ...

    static _handlerThenReturn(res, OPromise2, resolve, reject) {
        if (res === OPromise2) throw Error("检测到Promise无限循环");

        if (res instanceof OPromise) {
            res.then(resolve, reject)
        } else {
            resolve(res)
        };
    }

    then(onResolved, onRejected) {
        const OPromise2 = new OPromise((resolve, reject) => {
            if (onResolved instanceof Function) {
                this.onResolvedCallback.push(() => {
                    try {
                        OPromise._handlerThenReturn(onResolved(this.payload), OPromise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (onRejected instanceof Function) {
                this.onRejectedCallback.push(() => {
                    try {
                        OPromise._handlerThenReturn(onRejected(this.payload), OPromise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        })

        return OPromise2
    }
}
```

我们先看下then方法的改动：
- 首先返回一个promise并存入OPromise2变量（判断是否返回原promise实例）
- 将回调函数插入对应的回调列表，插入时需要对回调函数返回结果做一些处理，我们这里使用_handlerThenReturn方法
- 在触发回调列表的时候如果回调函数报错则触发返回OPromise2的reject函数将该promise改为rejected状态
  
接下来分析_handlerThenReturn方法实现：
- 方法需要传入回调函数的返回结果、OPromise2变量、OPromise2修改成功状态函数（resolve）、OPromise2修改失败状态函数（reject）
- 方法内部首先判断回调函数的返回结果是否和then方法返回的promise一致，如果一致会造成无限循环，这里给个报错
- 判断回调函数返回是否为promise，如果是则触发promise的then方法并将OPromise2的成功失败回调传入，让其promise构建的时候触发
- 其他情况均考虑为成功状态，触发OPromise2的成功方法（resolve），并将结果传入

链式调用的处理是比较复杂的，我们这里简单梳理一下，首先在调用then方法的时候需要返回一个promise，方便链式调用，之后在构建回调队列的时候需要对回调函数包装，在触发回调队列的时候需要对回调函数的结果进行判断并分类处理

## catch 实例方法

看下调用

```js
console.log("1")
const promise = new Promise((resolve, reject) => {
    resolve("成功")
})
promise.then((res) => {
    console.log(res)
    throw Error("失败")
}).catch((err) => {
    console.log(err.message)
    return "成功1"
}).then((res) => {
    console.log(res)
})
console.log("2")

// 打印
// 1
// 2
// 成功
// 失败
// 成功1
```

我们可以理解为catch方法就是then方法只传第二个参数

```js
class OPromise {
    // ...

    catch(onRejected){
        return this.then(undefined, onRejected)
    }
}
```

## finally 实例方法

看下代码

```js
console.log("1")
const promise = new Promise((resolve, reject) => {
    resolve("成功")
})
promise.finally(() => {
    console.log("执行完毕")
}).finally(() => {
    console.log("执行完毕1")
    return "成功1"
}).then((res) => {
    console.log(res)
})
console.log("2")

// 打印
// 1
// 2
// 执行完毕
// 执行完毕1
// 成功
```

finally方法是在promise已决状态触发，如果有一段逻辑只需要在promise已决之后触发，不需要关系promise状态是否成功失败，则可以使用这个方法

```js
class OPromise {
    // ...

    finally(callback){
        return this.then(() => callback(), () => callback())

    }
}
```

- 既然不用区分是否成功失败这里直接调用then方法并将函数参数传递
- 在调用then方法传参时给callback包装了一层函数，是因为finally方法的函数参数是没有参数的

## Promise.resolve & Promise.reject API

看下代码

```js
console.log("1")
const p1 = new Promise((resolve, reject) => {
    reject("成功")
})

const p2 = Promise.resolve(p1)

p2.then((res) => {
    console.log("success:", res)
}, (err) => {
    console.log("error:", err)
})
console.log("2")

// 打印
// 1
// 2
// error:成功
```

Promise.resolve方法可以传入任何数据类型，如果传入一个promise则会根据该promise的结果返回，其余数据类型都返回一个resolved状态的promise实例

```js
class OPromise {
    // ...

    static resolve(val) {
        return new OPromise((resolve, reject) => {
            if (val instanceof OPromise) {
                val.then(resolve, reject)
            } else {
                resolve(val)
            }
        })
    }

    static reject(val) {
        return new OPromise((resolve, reject) => {
            if (val instanceof OPromise) {
                val.then(resolve, reject)
            } else {
                reject(val)
            }
        })
    }
}
```

这里逻辑比较简单，直接返回一个OPromise实例，判断如果传入是OPromise实例则调用其then方法，让then方法去决定返回的promise状态，其余的情况都当做resolve或者reject状态返回（根据调用不同的方法）

## Promise.all API

看下代码

```js
console.log("1")
const p2 = OPromise.all([
    new OPromise((resolve, reject) => {
        resolve("1")
    }),
    new OPromise((resolve, reject) => {
        setTimeout(() => {
            reject("2")
        }, 1000)
    })
])

p2.then((res) => {
    console.log("success:", res)
}, (err) => {
    console.log("error:", err)
})
console.log("2")

// 打印
// 1
// 2
// error:2（等大约1s）
```

我们知道正常Promise.all会将传入可迭代的promise对象都解决后按照对应位置返回结果，如果某一个有错则直接返回错误

```js
class OPromise {
    // ...

    static all(val) {
        return new OPromise((resolve, reject) => {
            const promiseList = []
            let num = 0

            for (let key in val) {
                val[key].then((res) => {
                    promiseList[key] = res
                    num++

                    if (num === val.length) {
                        resolve(promiseList)
                    }
                }, (err) => {
                    reject(err)
                })
            }
        })

    }
}
```

- all方法返回一个OPromise实例
- 创建一个放置OPromise的列表和一个计数器
- 遍历传入的可迭代对象（因为可迭代对象没法获取index，这里就假设是数组or对象）
- 如果当前OPromise实例结果成功则在回调中存入当前实例并增加计数，当每个OPromise实例状态都为成功时触发返回实例的resolve方法
- 如果遍历过程中有失败则调用返回实例的reject方法

## Promise.any API

看下代码

```js
console.log("1")
const p2 = Promise.any([
    new Promise((resolve, reject) => {
        reject("1")
    }),
    new Promise((resolve, reject) => {
        resolve("2")
    })
])

p2.then((res) => {
    console.log("success:", res)
}, (err) => {
    console.log("error:", err)
})
console.log("2")

// 打印
// 1
// 2
// success:2
```

Promise.any目前还是实验阶段，部分浏览器支持（反正node环境不支持），该函数传入一个可迭代对象，当可迭代对象中的其中一个promise成功时则Promise.any返回的promise状态为成功，如果全部失败则Promise.any返回的promise状态为失败，值为：“AggregateError: All promises were rejected”

```js
class OPromise {
    // ...

    static any(val) {
        return new OPromise((resolve, reject) => {
            let hasSuccess = false
            let num = 0

            for (let key in val) {
                val[key].then((res) => {
                    num++

                    if (!hasSuccess) {
                        hasSuccess = true
                        resolve(res)
                    }
                }, (err) => {
                    num++

                    if (num === val.length) {
                        reject("AggregateError: All promises were rejected")
                    }
                })
            }
        })
    } 
}
```

- 首先返回一个OPromise
- 设置一个开关（hasSuccess）和一个计数器（num）
- 遍历传入的迭代对象，并使用then查看返回状态
- 只要解决将计数器加一
- 如果状态成功则将开关关闭，并将返回的OPromise状态改为成功
- 如果失败判断是否全部执行完毕，并返回报错

## Promise.race API

看下代码

```js
console.log("1")

const p2 = Promise.race([
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("我比较快")
        }, 2000)
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("我更快")
        }, 1000)
    })
])

p2.then((res) => {
    console.log("success:", res)
}, (err) => {
    console.log("error:", err)
})
console.log("2")

// 打印
// 1
// 2
// error:我更快
```

Promise.race传入一个可迭代对象，只要该对象中其中一个promise解决，则视为Promise.race返回的promise状态以及返回结果

```js
class OPromise {
    // ...

    static race(val) {
        return new OPromise((resolve, reject) => {
            let isSolve = false

            for (const key in val) {
                val[key].then((res) => {
                    if (!isSolve) {
                        isSolve = true
                        resolve(res)
                    }
                }, (err) => {
                    if (!isSolve) {
                        isSolve = true
                        reject(err)
                    }
                })
            }
        })
    } 
}
```

- 返回一个OPromise实例
- 声明一个开关（isSolve）
- 遍历传入的迭代对象，并触发then方法
- 在成功或者失败函数中将开关关闭，并修改OPromise实例的状态

## Promise.allSettled API

看下代码

```js
console.log("1")

const p2 = Promise.allSettled([
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("1")
        }, 2000)
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("2")
        }, 1000)
    })
])

p2.then((res) => {
    console.log("success:", res)
}, (err) => {
    console.log("error:", err)
})
console.log("2")

// 打印
// 1
// 2
// success:[
//   { status: 'fulfilled', value: '1' },
//   { status: 'rejected', reason: '2' }
// ]
```

Promise.allSettled等到传入的可迭代对象都解决后，将返回的Promise实例状态更改为成功，并且返回每个可迭代对象的处理结果（结果和传递的顺序一一对应）

```js
class OPromise {
    // ...

    static allSettled(val){
        return new OPromise((resolve, reject) => {
            const promiseList = []
            let num = 0

            for (let key in val) {
                val[key].then((res) => {
                    promiseList[key] = {
                        status: OPromise.RESOLVED,
                        value: res
                    }
                    num++

                    if (num === val.length) {
                        resolve(promiseList)
                    }
                }, (err) => {
                    promiseList[key] = {
                        status: OPromise.REJECTED,
                        reason: err
                    }
                    num++

                    if (num === val.length) {
                        resolve(promiseList)
                    }
                })
            }
        })
    }
}
```

- 返回OPromise实例
- 声明一个存数据列表，用来存储返回结果（promiseList）。声明一个计数器，用来判断是否解决完毕
- 遍历可迭代对象并使用then查看状态，不论结果成功或失败都将结果记录下来，并判断可迭代对象是否解决完毕，并修改OPromise实例状态为成功，返回promiseList

# 最后代码

```js
class OPromise {
    static PENDING = "pending"
    static RESOLVED = "resolved"
    static REJECTED = "rejected"

    constructor(executor) {
        this.state = OPromise.PENDING
        this.payload = null
        this.onResolvedCallback = []
        this.onRejectedCallback = []

        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            this._reject(error)
        }
    }

    _resolve(payload) {
        setTimeout(() => {
            if (this.state === OPromise.PENDING) {
                this.state = OPromise.RESOLVED
                this.payload = payload
                this.onResolvedCallback.forEach(callback => callback())
            }
        })
    }

    _reject(payload) {
        setTimeout(() => {
            if (this.state === OPromise.PENDING) {
                this.state = OPromise.REJECTED
                this.payload = payload
                this.onRejectedCallback.forEach(callback => callback())
            }
        })

    }

    static _handlerThenReturn(res, OPromise2, resolve, reject) {
        if (res === OPromise2) throw Error("检测到Promise无限循环");

        if (res instanceof OPromise) {
            res.then(resolve, reject)
        } else {
            resolve(res)
        };
    }

    then(onResolved, onRejected) {
        const OPromise2 = new OPromise((resolve, reject) => {
            if (onResolved instanceof Function) {
                this.onResolvedCallback.push(() => {
                    try {
                        OPromise._handlerThenReturn(onResolved(this.payload), OPromise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (onRejected instanceof Function) {
                this.onRejectedCallback.push(() => {
                    try {
                        OPromise._handlerThenReturn(onRejected(this.payload), OPromise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        })

        return OPromise2
    }

    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    finally(callback) {
        return this.then(() => callback(), () => callback())
    }

    static resolve(val) {
        return new OPromise((resolve, reject) => {
            if (val instanceof OPromise) {
                val.then(resolve, reject)
            } else {
                resolve(val)
            }
        })
    }

    static reject(val) {
        return new OPromise((resolve, reject) => {
            if (val instanceof OPromise) {
                val.then(resolve, reject)
            } else {
                reject(val)
            }
        })
    }

    static all(val) {
        return new OPromise((resolve, reject) => {
            const promiseList = []
            let num = 0

            for (let key in val) {
                val[key].then((res) => {
                    promiseList[key] = res
                    num++

                    if (num === val.length) {
                        resolve(promiseList)
                    }
                }, (err) => {
                    reject(err)
                })
            }
        })
    }

    static any(val) {
        return new OPromise((resolve, reject) => {
            let hasSuccess = false
            let num = 0

            for (let key in val) {
                val[key].then((res) => {
                    num++
                    if (!hasSuccess) {
                        hasSuccess = true
                        resolve(res)
                    }
                }, (err) => {
                    num++

                    if (num === val.length) {
                        reject("AggregateError: All promises were rejected")
                    }
                })
            }
        })
    }

    static race(val) {
        return new OPromise((resolve, reject) => {
            let isSolve = false

            for (const key in val) {
                val[key].then((res) => {
                    if (!isSolve) {
                        isSolve = true
                        resolve(res)
                    }
                }, (err) => {
                    if (!isSolve) {
                        isSolve = true
                        reject(err)
                    }
                })
            }
        })
    }

    static allSettled(val){
        return new OPromise((resolve, reject) => {
            const promiseList = []
            let num = 0

            for (let key in val) {
                val[key].then((res) => {
                    promiseList[key] = {
                        status: OPromise.RESOLVED,
                        value: res
                    }
                    num++

                    if (num === val.length) {
                        resolve(promiseList)
                    }
                }, (err) => {
                    promiseList[key] = {
                        status: OPromise.REJECTED,
                        reason: err
                    }
                    num++

                    if (num === val.length) {
                        resolve(promiseList)
                    }
                })
            }
        })
    }
}
```