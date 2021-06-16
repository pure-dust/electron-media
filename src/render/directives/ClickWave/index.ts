/*
 * @Author: Lixiao2
 * @Date: 2021-06-03 09:15:24
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-16 09:51:39
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { ObjectDirective, DirectiveBinding } from "vue"

type clickHandler = <T extends MouseEvent>(
  mouseup: T,
  mouseDown: T,
  domList: Array<HTMLElement>,
) => void

type DomMap = Map<
  HTMLElement,
  {
    domList: Array<HTMLElement>
    clickHandler: clickHandler
  }
>

interface bindValue {
  color: string
  duration: number
}

let nodeList: DomMap = new Map()
let startClick: MouseEvent

document.addEventListener("mousedown", (e: MouseEvent) => (startClick = e))
document.addEventListener("mouseup", (e: MouseEvent) => {
  for (const { clickHandler, domList } of nodeList.values()) {
    clickHandler(e, startClick, domList)
  }
})

function createClickHandler(
  el: HTMLElement,
  binding: DirectiveBinding,
  domList: Array<HTMLElement>,
): clickHandler {
  return function (mouseup, mousedown) {
    const mouseUpTarget = mouseup.target as Node
    const mouseDownTarget = mousedown?.target as Node
    const isTargetExists = !mouseUpTarget || !mouseDownTarget

    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
    const isSelf = el === mouseUpTarget

    if (!(isContainedByEl || isSelf || isTargetExists)) {
      return
    }
    const { clientWidth, clientHeight } = el
    const { offsetX: x, offsetY: y } = mousedown
    const value: bindValue = binding.value
      ? binding.value
      : {
          color: "#FFFFFF",
          duration: 1500,
        }

    let className = el.className.split(" ")
    if (!className.some((name) => name == "click-wave")) {
      className.push("click-wave")
      el.setAttribute("class", className.join(" "))
    }
    let dom: HTMLElement

    dom = document.createElement("div")
    domList.push(dom)
    dom.setAttribute(
      "style",
      ` position: absolute;
        background: ${value.color + "66"};
        transition: all ${value.duration / 1000}s cubic-bezier(.23,.81,.92,.95);
        transform: translate(-50%,-50%);
        pointer-events: none;
        top: ${y}px;
        left: ${x}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        z-index: 999`,
    )
    el.appendChild(dom)
    setTimeout(() => {
      dom.style.width = 2 * Math.sqrt(clientWidth ** 2 + clientHeight ** 2) + "px"
      dom.style.height = 2 * Math.sqrt(clientWidth ** 2 + clientHeight ** 2) + "px"
      dom.style.opacity = "0"
    }, 0)
    setTimeout(() => {
      domList.shift()?.remove()
      if (domList.length == 0) el.setAttribute("class", el.className.replace(" click-wave", ""))
    }, value.duration)
  }
}

export default <ObjectDirective>{
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    let domList = new Array<HTMLElement>()
    nodeList.set(el, {
      domList: domList,
      clickHandler: createClickHandler(el, binding, domList),
    })
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    let domList = nodeList.get(el)?.domList || new Array<HTMLElement>()
    while (domList.length > 0) {
      domList.pop()?.remove()
    }
    nodeList.set(el, {
      domList: domList,
      clickHandler: createClickHandler(el, binding, domList),
    })
  },
  unmounted(el: HTMLElement) {
    nodeList.delete(el)
  },
}
