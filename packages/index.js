import LiDialog from './dialog'
import LiPicker from './picker'

const components = [
    LiPicker
]

const install = Vue => {
    if(install.installed) return
    install.installed = true
    components.map(com => {Vue.component(com.name, com)})
    Vue.prototype.$dialog = LiDialog
}

if(typeof window !=='undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    ...components
}

export const Dialog = LiDialog
export const Picker = LiPicker
