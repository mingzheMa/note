# indexedDB

## 背景

前端本地存储方案有

-   cookie
-   localStorage/sessionStorage
-   indexedDB

一般浏览器会限制 <code>cookie</code>、<code>localStorage/sessionStorage</code> 的存储大小，分别为 4KB、4MB（每个浏览器限制不一样）

indexedDB 具有以下特点

-   键值型数据库：似于 MongoDB，以键值对的形式存储数据
-   异步调用：在事件中处理数据，不会阻塞主线程运行
-   支持事务：处理数据是基于事务的，当一个操作出现问题，整个事务回滚
-   同源限制：和其他本地存储方案一样，不能跨域
-   存储空间：一般不少于 250MB
-   支持二进制数据：可以存储二进制数据

## 概念

[indexedDB api](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

### 仓库 ObjectStore

indexedDB 中没有表的概念，仓库可以理解为表

### 索引 Index

indexedDB 以键值对的形式存储，一般值的类型为对象，例如：<code>{name: 'ma', age: 18}</code>，索引可以帮助我们快速通过某个 key 找到该值，例如：配置了索引 <code>age</code>，那么可以通过 <code>age === 18</code> 找到 <code>{name: 'ma', age: 18}</code>

### 主键

用于查找数据，创建仓库可以指定主键名称，可以指定为某个索引，或者设置为自增组件

### 游标 Cursor

用于查询数据，查询的过程类似迭代，游标可以理解为迭代器的指针，在开始时指针指向数据库中第一条数据，每次调用游标上的方法就会返回后一行数据，以此类推直至后一行数据不存在

### 事务 Transaction

数据的增删改查都基于事务，类似于一系列操作的集合，当某个操作出现错误，可以整体回滚这部分操作

## 使用

我们创建一些全局变量用来存放数据

```ts
// 数据库连接
let DBLink: IDBOpenDBRequest;
// 数据库
let DB: IDBDatabase;
```

### 连接数据库

```ts
// 创建一个数据库连接
// 参数1 为数据库名称，如果不存在则创建
// 参数2 为数据库版本，默认为1
DBLink = window.indexedDB.open('admin', 1);

// 通过事件监听数据库连接状态
// 数据库连接成功
DBLink.addEventListener('success', event => {
    // @ts-expect-error
    DB = (event as IDBVersionChangeEvent).target.result;
});
// 数据库版本更新
DBLink.addEventListener('upgradeneeded', (event: IDBVersionChangeEvent) => {
    DB = event.target.result;
});
// 数据库连接失败
DBLink.addEventListener('error', event => {});
```

### 创建仓库

```ts
/**
 * @description: 初始化数据库
 * @param {*} DB 数据库IDBDatabase实例
 * @return {*}
 */
function initDB(DB: IDBDatabase) {
    // 初始化users仓库，如果users仓库不存在
    if (!DB.objectStoreNames.contains('users')) {
        // 创建仓库
        const store: IDBObjectStore = DB.createObjectStore('users', { autoIncrement: true });
        // 初始化仓库索引，unique为是否重复
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('age', 'age', { unique: false });
        store.createIndex('sex', 'sex', { unique: false });
    }
}

// 数据库版本更新
DBLink.addEventListener('upgradeneeded', (event: IDBVersionChangeEvent) => {
    // @ts-expect-error
    DB = event.target.result;
    // 初始化数据库
    initDB(DB);
});
```

### 增加数据

```ts
/**
 * @description: 添加数据
 * @param {IDBDatabase} DB 数据库
 * @param {string} storeName 仓库名称
 * @param {any} data 数据
 * @return {*}
 */
function addData(DB: IDBDatabase, storeName: string, data: any) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);
    // 添加数据，添加的数据的key尽量和索引一一对应
    store.add(data);
}

DBLink.addEventListener('success', event => {
    // @ts-expect-error
    DB = (event as IDBVersionChangeEvent).target.result;

    // 添加数据
    addData(DB, 'users', {
        name: 'ma',
        age: 18,
        sex: 1
    });

    addData(DB, 'users', {
        name: 'ming',
        age: 19,
        sex: 0
    });
});
```

### 查找数据

以下代码分别使用主键、游标、索引获取数据

```ts
/**
 * @description: 通过主键查找
 * @param {IDBDatabase} DB 数据库
 * @param {string} storeName 仓库名称
 * @param {IDBValidKey} key 主键
 * @return {*}
 */
function findData4Key(DB: IDBDatabase, storeName: string, key: IDBValidKey) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);

    return new Promise((resove, reject) => {
        const res: IDBRequest = store.get(key);

        res.addEventListener('success', event => {
            resove((event.target as IDBRequest).result);
        });
        res.addEventListener('error', reject);
    });
}

/**
 * @description: 通过游标获取所有数据
 * @param {IDBDatabase} DB 数据库
 * @param {string} storeName 仓库名称
 * @return {*}
 */
function findData4All(DB: IDBDatabase, storeName: string) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);
    // 获取游标
    const cursor: IDBRequest<IDBCursorWithValue | null> = store.openCursor();

    return new Promise((resove, reject) => {
        const list: IDBCursorWithValue['value'][] = [];
        cursor.addEventListener('success', event => {
            // @ts-expect-error
            const currentCursor: IDBCursorWithValue = event.target.result;
            if (currentCursor) {
                // 必须要检查
                list.push(currentCursor.value);
                currentCursor.continue();
            } else {
                // 迭代完毕
                resove(list);
            }
        });

        cursor.addEventListener('error', reject);
    });
}

/**
 * @description: 通过索引查找
 * @param {IDBDatabase} DB 数据库
 * @param {string} storeName 仓库名称
 * @param {IDBValidKey} key 主键
 * @return {*}
 */
function findData4Index(DB: IDBDatabase, storeName: string, indexKey: string, indexValue: IDBValidKey | IDBKeyRange) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);

    return new Promise((resove, reject) => {
        const res: IDBRequest = store.index(indexKey).get(indexValue);

        res.addEventListener('success', event => {
            resove((event.target as IDBRequest).result);
        });
        res.addEventListener('error', reject);
    });
}

DBLink.addEventListener('success', async event => {
    // @ts-expect-error
    DB = (event as IDBVersionChangeEvent).target.result;

    // 根据key获取数据
    const findData4KeyRes = await findData4Key(DB, 'users', 1);
    console.log('findData4KeyRes', findData4KeyRes); // {name: 'ma', age: 18, sex: 1}

    // 根据游标获取所有数据
    const findData4AllRes = await findData4All(DB, 'users');
    console.log('findData4AllRes', findData4AllRes); // [...]

    // 根据索引获取数据
    const findData4IndexRes = await findData4Index(DB, 'users', 'name', 'ma');
    console.log('findData4IndexRes', findData4IndexRes); // {name: 'ma', age: 18, sex: 1}
});
```

游标可以获取全部数据，索引可以查找指定数据但只有一个，可以使用**索引 + 游标**的形式查找所有符合的数据

```ts
/**
 * @description: 通过索引+游标获取所有数据
 * @param {IDBDatabase} DB 数据库
 * @param {string} storeName 仓库名称
 * @return {*}
 */
function findData4IndexCursor(
    DB: IDBDatabase,
    storeName: string,
    indexKey: string,
    indexValue: IDBValidKey | IDBKeyRange
) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);
    // 获取游标
    const cursor: IDBRequest<IDBCursorWithValue | null> = store
        .index(indexKey)
        .openCursor(IDBKeyRange.only(indexValue));

    return new Promise((resove, reject) => {
        const list: IDBCursorWithValue['value'][] = [];
        cursor.addEventListener('success', event => {
            // @ts-expect-error
            const currentCursor: IDBCursorWithValue = event.target.result;
            if (currentCursor) {
                // 必须要检查
                list.push(currentCursor.value);
                currentCursor.continue();
            } else {
                // 迭代完毕
                resove(list);
            }
        });

        cursor.addEventListener('error', reject);
    });
}

DBLink.addEventListener('success', async event => {
    // @ts-expect-error
    DB = (event as IDBVersionChangeEvent).target.result;

    // 根据索引+游标获取数据
    const findData4IndexCursorRes = await findData4IndexCursor(DB, 'users', 'name', 'ma');
    console.log('findData4IndexCursorRes', findData4IndexCursorRes);
});
```

## 修改数据

```ts
/**
 * @description: 通过主键修改数据
 * @param {IDBDatabase} DB
 * @param {string} storeName
 * @param {IDBValidKey} key
 * @param {any} data
 * @return {*}
 */
async function updateData4Key(DB: IDBDatabase, storeName: string, key: IDBValidKey, data: any) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);

    // 获取旧数据
    const oldData = (await new Promise((resove, reject) => {
        const res: IDBRequest = store.get(key);

        res.addEventListener('success', event => {
            resove((event.target as IDBRequest).result || {});
        });
        res.addEventListener('error', reject);
    })) as Promise<object>;

    return new Promise((resove, reject) => {
        const res: IDBRequest<IDBValidKey> = store.put(
            {
                ...oldData,
                ...data
            },
            key
        );

        res.addEventListener('success', event => {
            resove((event.target as IDBRequest).result);
        });
        res.addEventListener('error', reject);
    });
}

// 数据库连接成功
DBLink.addEventListener('success', async event => {
    // @ts-expect-error
    DB = (event as IDBVersionChangeEvent).target.result;

    // 修改数据
    await updateData4Key(DB, 'users', 1, { name: 'hhh' });
    console.log('updateData4Key', await findData4Key(DB, 'users', 1)); // {name: 'hhh', age: 18, sex: 1}
});
```

## 删除数据

```ts
/**
 * @description: 根据主键删除数据
 * @param {IDBDatabase} DB
 * @param {string} storeName
 * @param {IDBValidKey} key
 * @return {*}
 */
function removeData4Key(DB: IDBDatabase, storeName: string, key: IDBValidKey) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);

    return new Promise((resove, reject) => {
        const res: IDBRequest = store.delete(key);

        res.addEventListener('success', event => {
            resove((event.target as IDBRequest).result);
        });
        res.addEventListener('error', reject);
    });
}

// 数据库连接成功
DBLink.addEventListener('success', async event => {
    // @ts-expect-error
    DB = (event as IDBVersionChangeEvent).target.result;

    // 删除数据
    await removeData4Key(DB, 'users', 2);
    console.log('removeData4Key', await findData4Key(DB, 'users', 2)); // undefined
});
```

## 全部代码

```ts
// 数据库连接
let DBLink: IDBOpenDBRequest;
// 数据库
let DB: IDBDatabase;

DBLink = window.indexedDB.open('admin', 1);

/**
 * @description: 初始化数据库
 * @param {*} DB 数据库IDBDatabase实例
 * @return {*}
 */
function initDB(DB: IDBDatabase) {
    // 初始化users仓库，如果users仓库不存在
    if (!DB.objectStoreNames.contains('users')) {
        const store: IDBObjectStore = DB.createObjectStore('users', { autoIncrement: true });
        // 初始化仓库索引，unique为是否重复
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('age', 'age', { unique: false });
        store.createIndex('sex', 'sex', { unique: false });
    }
}

/**
 * @description: 添加数据
 * @param {IDBDatabase} DB 数据库
 * @param {string} storeName 仓库名称
 * @param {any} data 数据
 * @return {*}
 */
function addData(DB: IDBDatabase, storeName: string, data: any) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);
    // 添加数据
    store.add(data);
}

/**
 * @description: 通过主键查找
 * @param {IDBDatabase} DB 数据库
 * @param {string} storeName 仓库名称
 * @param {IDBValidKey} key 主键
 * @return {*}
 */
function findData4Key(DB: IDBDatabase, storeName: string, key: IDBValidKey) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);

    return new Promise((resove, reject) => {
        const res: IDBRequest = store.get(key);

        res.addEventListener('success', event => {
            resove((event.target as IDBRequest).result);
        });
        res.addEventListener('error', reject);
    });
}

/**
 * @description: 通过游标获取所有数据
 * @param {IDBDatabase} DB 数据库
 * @param {string} storeName 仓库名称
 * @return {*}
 */
function findData4All(DB: IDBDatabase, storeName: string) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);
    // 获取游标
    const cursor: IDBRequest<IDBCursorWithValue | null> = store.openCursor();

    return new Promise((resove, reject) => {
        const list: IDBCursorWithValue['value'][] = [];
        cursor.addEventListener('success', event => {
            // @ts-expect-error
            const currentCursor: IDBCursorWithValue = event.target.result;
            if (currentCursor) {
                // 必须要检查
                list.push(currentCursor.value);
                currentCursor.continue();
            } else {
                // 迭代完毕
                resove(list);
            }
        });

        cursor.addEventListener('error', reject);
    });
}

/**
 * @description: 通过索引查找
 * @param {IDBDatabase} DB 数据库
 * @param {string} storeName 仓库名称
 * @param {IDBValidKey} key 主键
 * @return {*}
 */
function findData4Index(DB: IDBDatabase, storeName: string, indexKey: string, indexValue: IDBValidKey | IDBKeyRange) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);

    return new Promise((resove, reject) => {
        const res: IDBRequest = store.index(indexKey).get(indexValue);

        res.addEventListener('success', event => {
            resove((event.target as IDBRequest).result);
        });
        res.addEventListener('error', reject);
    });
}

/**
 * @description: 通过索引+游标获取所有数据
 * @param {IDBDatabase} DB 数据库
 * @param {string} storeName 仓库名称
 * @return {*}
 */
function findData4IndexCursor(
    DB: IDBDatabase,
    storeName: string,
    indexKey: string,
    indexValue: IDBValidKey | IDBKeyRange
) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);
    // 获取游标
    const cursor: IDBRequest<IDBCursorWithValue | null> = store
        .index(indexKey)
        .openCursor(IDBKeyRange.only(indexValue));

    return new Promise((resove, reject) => {
        const list: IDBCursorWithValue['value'][] = [];
        cursor.addEventListener('success', event => {
            // @ts-expect-error
            const currentCursor: IDBCursorWithValue = event.target.result;
            if (currentCursor) {
                // 必须要检查
                list.push(currentCursor.value);
                currentCursor.continue();
            } else {
                // 迭代完毕
                resove(list);
            }
        });

        cursor.addEventListener('error', reject);
    });
}

/**
 * @description: 通过主键修改数据
 * @param {IDBDatabase} DB
 * @param {string} storeName
 * @param {IDBValidKey} key
 * @param {any} data
 * @return {*}
 */
async function updateData4Key(DB: IDBDatabase, storeName: string, key: IDBValidKey, data: any) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);

    // 获取旧数据
    const oldData = (await new Promise((resove, reject) => {
        const res: IDBRequest = store.get(key);

        res.addEventListener('success', event => {
            resove((event.target as IDBRequest).result || {});
        });
        res.addEventListener('error', reject);
    })) as Promise<object>;

    return new Promise((resove, reject) => {
        const res: IDBRequest<IDBValidKey> = store.put(
            {
                ...oldData,
                ...data
            },
            key
        );

        res.addEventListener('success', event => {
            resove((event.target as IDBRequest).result);
        });
        res.addEventListener('error', reject);
    });
}

/**
 * @description: 根据主键删除数据
 * @param {IDBDatabase} DB
 * @param {string} storeName
 * @param {IDBValidKey} key
 * @return {*}
 */
function removeData4Key(DB: IDBDatabase, storeName: string, key: IDBValidKey) {
    // 创建一个事务，只针对一个仓库
    const transaction: IDBTransaction = DB.transaction(storeName, 'readwrite');
    // 通过事务获取仓库实例
    const store: IDBObjectStore = transaction.objectStore(storeName);

    return new Promise((resove, reject) => {
        const res: IDBRequest = store.delete(key);

        res.addEventListener('success', event => {
            resove((event.target as IDBRequest).result);
        });
        res.addEventListener('error', reject);
    });
}

// 数据库连接成功
DBLink.addEventListener('success', async event => {
    // @ts-expect-error
    DB = (event as IDBVersionChangeEvent).target.result;

    // 添加数据
    addData(DB, 'users', {
        name: 'ma',
        age: 18,
        sex: 1
    });

    addData(DB, 'users', {
        name: 'ming',
        age: 19,
        sex: 0
    });

    // 根据key获取数据
    const findData4KeyRes = await findData4Key(DB, 'users', 1);
    console.log('findData4KeyRes', findData4KeyRes); // {name: 'ma', age: 18, sex: 1}

    // 根据游标获取所有数据
    const findData4AllRes = await findData4All(DB, 'users');
    console.log('findData4AllRes', findData4AllRes); // [...]

    // 根据索引获取数据
    const findData4IndexRes = await findData4Index(DB, 'users', 'name', 'ma');
    console.log('findData4IndexRes', findData4IndexRes); // {name: 'ma', age: 18, sex: 1}

    // 根据索引+游标获取数据
    const findData4IndexCursorRes = await findData4IndexCursor(DB, 'users', 'name', 'ma');
    console.log('findData4IndexCursorRes', findData4IndexCursorRes); // [...]

    // 修改数据
    await updateData4Key(DB, 'users', 1, { name: 'hhh' });
    console.log('updateData4Key', await findData4Key(DB, 'users', 1)); // {name: 'hhh', age: 18, sex: 1}

    // 删除数据
    await removeData4Key(DB, 'users', 2);
    console.log('removeData4Key', await findData4Key(DB, 'users', 2)); // undefined
});

// 数据库更新
DBLink.addEventListener('upgradeneeded', (event: IDBVersionChangeEvent) => {
    // @ts-expect-error
    DB = event.target.result;

    initDB(DB);
});

DBLink.addEventListener('error', event => {
    console.log(3, event as IDBVersionChangeEvent);
});
```
