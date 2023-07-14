type Popup = {
    hide: Function,
    setHide: Function
}

type GliderInputEvent = InputEvent & {
    currentTarget: HTMLInputElement,
    target: Element
}