<template>
  <div class="about">
    <li-picker
      title="选择日期"
      placeholder="点击选择日期"
      v-model="nowDate"
      type="date"
    >
    </li-picker>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        nowDate: null // new Date().getTime()/1000
      }
    },
    methods: {
    }
  }
</script>

