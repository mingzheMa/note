export default function routeMonitoring(callback) {
    window.addEventListener('popstate', () => {
        callback()
    });


    const pushState = history.pushState
    const replaceState = history.replaceState

    history.pushState = function (...args) {
        pushState.apply(this, args)
        callback()
    }

    history.replaceState = function (...args) {
        replaceState.apply(this, args)
        callback()
    }
}