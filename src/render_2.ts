import './render.css'
import a from "./a.ts"
export function render() {
    a();
    const el = document.createElement('div')
    el.classList.add('text')
    const textNode = document.createTextNode("Hello world from render_2.ts!")
    el.appendChild(textNode)
    document.getElementsByTagName('body')[0].appendChild(el)
}