export default async function read(app){
    return await fetch(app.entry).then(res => res.text())
}