<template>
    <div class="li-dialog__wrap" v-show="dialogShow" @click="handleClose">
        <div class="li-dialog__mask"></div>
        <transition name="li-scale" @after-leave="afterLeave">
            <div class="li-dialog__content" v-show="dialogShow">
                <p class="li-dialog__txt pd0 pdl40 pdr40">
                    <span>{{content}}</span>
                </p>
                <div class="li-dialog__btns">
                    <div class="li-dialog__btn li-dialog__btn--cancel" @click="handleClose">取消</div>
                    <div class="li-dialog__btn li-dialog__btn--confirm" @click="handleConfirm">确定</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "LiDialog",
        props: {
            content: {
                type: String,
                default: '确定执行吗？'
            }
        },
        data() {
            return {
                dialogShow: false
            }
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
            handleConfirm() {
                this.$emit('confirm')
            },
            afterLeave () {
                this.$emit('closed')
            }
        }
    }
</script>

