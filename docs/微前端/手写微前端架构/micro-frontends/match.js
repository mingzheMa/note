export default function match(apps, path){
    return apps.find(app => app.activeRule === path)
}