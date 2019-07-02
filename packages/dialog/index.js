import LiDialog from './src/dialog.js'

LiDialog.install = Vue => {
    Vue.component(LiDialog.name, LiDialog)
    Vue.prototype.$dialog = LiDialog
}

export default LiDialog