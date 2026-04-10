import routeMonitoring from "./route-monitoring"
import match from "./match"
import read from "./read"
import render from "./render"


// 应用列表
let apps = []
let currentApp = null

export function registerMicroApps(options) {
    apps = options
}

export function start(options) {
    window.__POWERED_BY_QIANKUN__ = true

    // 1. 监听路由变化
    routeMonitoring(async () => {
        // 如果之前已经渲染了app，则卸载
        currentApp && currentApp.unmount && await currentApp.unmount({ container: document.querySelector(currentApp.container).shadowRoot })

        // 2. 匹配子应用
        const app = match(apps, location.pathname)
        // 记录当前app
        currentApp = app
        if (!app) return;
        window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry
       
        // 3. 读取子应用
        const htmlTxt = await read(app)
        app.html = htmlTxt

        // 4. 渲染子应用
        const { scripts, mount, unmount } = await render(app)
        app.scripts = scripts
        app.mount = mount
        app.unmount = unmount

        app.mount({ container: document.querySelector(app.container).shadowRoot })
    });
}


