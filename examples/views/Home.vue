<template>
  <div class="home">
    <span @click="handleClick">点击调出dialog</span>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    handleClick() {
      this.$dialog({
        content: '你好，页面已经加载完毕，确定执行吗？'
      }, () => {
        console.log('dialog', '回调了')
      })
    }
  }
}
</script>
