import Vue from 'vue'
import base from './dialog.vue'

const ctr = Vue.extend(base)

const LiDialog = (opt, cb) => {
    const inst = new ctr({
        propsData: {...opt}
    })
    inst.vm = inst.$mount()
    document.body.appendChild(inst.vm.$el)
    inst.vm.dialogShow = true
    inst.vm.$on('closed', () => {
        document.body.removeChild(inst.vm.$el)
        inst.vm.$destroy()
    })
    inst.vm.$on('close', () => {
        inst.vm.dialogShow = false
    })
    inst.vm.$on('confirm', () => {
        cb()
        inst.vm.dialogShow = false
    })
    return inst.vm
}

export default LiDialog
