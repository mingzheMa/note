export default async function render(app) {
    // 渲染html
    // 这里有个问题，浏览器并不会请求和执行js，这是因为浏览器的安全策略，因此js需要特殊处理
    const container = document.querySelector(app.container)
    // shadow dom不能重复创建，这里判断一下如果有就直接赋值，没有在创建一个
    if (container.shadowRoot) {
        container.shadowRoot.innerHTML = app.html
    } else {
        const containerShadow = container.attachShadow({ mode: 'open' })
        containerShadow.innerHTML = app.html
    }

    // 处理js部分
    // 创建一个容器，获取script标签
    const box = document.createElement("div")
    box.innerHTML = app.html
    const scripts = Array.from(box.querySelectorAll("script"))

    // 获取脚本内容
    const scriptsTxt = await Promise.all(scripts.map(script => {
        let src = script.getAttribute("src");

        // src有值则是外部脚本
        // src没值则是内联脚本
        if (src) {
            // src如果是http开头则是跨域请求脚本
            // 反之则需要拼上子应用域名
            const reqPath = src.startsWith('http') ? src : `${app.entry}${src}`
            return fetch(reqPath).then(res => res.text())
        } else {
            return Promise.resolve(script.innerHTML)
        }
    }))

    let mount = null
    let unmount = null

    // 执行脚本
    scriptsTxt.forEach(scriptTxt => {
        // 这里需要获取子应用定义的生命周期钩子bootstrap、mount、unmount，目的是为了挂载和卸载

        // 因为子应用是通过umd方式打包，因此可以伪造exports和module接受包导出的内容
        const exports = {}
        const module = { exports }

        // 内部代码是可以访问exports和module属性的
        eval(scriptTxt)

        if (Object.keys(module.exports).length) {
            mount = module.exports.mount
            unmount = module.exports.unmount
        }
    })

    return {
        mount,
        unmount,
        scripts: scriptsTxt
    }
}