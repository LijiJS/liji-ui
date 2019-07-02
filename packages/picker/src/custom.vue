<template>
  <div>
    <div class="li-picker__bg-mask" v-show="show" @click.stop="close"></div>
    <div class="li-picker__main" :class="show ? 'li-picker--active' : ''">
      <div class="li-picker__head">
        <a href="javascript:;" @click.stop="close">取消</a>
        <span class="li-picker__title">{{ title || '' }}</span>
        <a href="javascript:;" @click.stop="setValue">确定</a>
      </div>
      <div class="li-picker__content">
        <div class="li-picker__item" v-for="(column,index) in columns" :key="index">
          <div class="li-picker__item-box" :ref="'Component_' + column">
            <div class="li-picker__item-content" :ref="'Content_' + column">
              <span v-for="(item,index) in items[column]" :data-value="item.value" v-html="item.name" :key="index"></span>
            </div>
          </div>
        </div>
        <div class="li-picker__mask"></div>
        <div class="li-picker__indicator">
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroller from '../../common/scroller'

export default {
  data () {
    return {
      value: '',
      show: false,
      parentEL: null,
      columns: [],
      scroller: [],
      type: '',
      title: '',
      items: {
        Custom: []
      },
      scrolling: {
        Custom: false
      },
      readonly: false,
      currentValue: [],
      currentName: '',
      currentCustom: '',
      startYear: 0,
      endYear: 0,
      startHour: 0,
      endHour: 23,
      startMinute: 0,
      endMinute: 59,
      isShowHolder: false,
      selectData: []
    }
  },
  watch: {
    default () {
      this.updateDate()
    }
  },
  methods: {
    updateDate () {
      if (this.items.Custom) {
        setTimeout(() => {
          this.items.Custom.forEach((item) => {
            if (item.default && !this.default) {
              this.$emit('pickerConfirm', +item.value, false, item.name)
              this.close()
            }
            if (this.default === item.value) {
              this.$emit('pickerConfirm', +item.value, false, item.name)
              this.close()
            }
          })
        }, 10)
      }
    },
    init () {
      if (this.selectData) {
        this.currentValue = this.items.Custom = this.selectData
      } else {
        this.currentValue = this.items.Custom = this.value
      }
      this.columns = ['Custom'] // 判断是否Pay类型以detatime类推，今后可优化
      this.isShowHolder = true // 显示选择按钮
    },
    render () {
      const self = this
      self.columns.forEach((item) => {
        const component = self.$refs[`Component_${item}`][0]
        const content = self.$refs[`Content_${item}`][0]
        self.scroller[item] = new Scroller(component, content, {
          itemHeight: 38,
          onSelect (value) {
            self[`current${item}`] = value
            self.scrolling[item] = false
          },
          callback (top, isDragging) {
            if (isDragging) {
              self.scrolling[item] = true
            }
            content.style.webkitTransform = `translate3d(0, ${-top}px, 0)`
          }
        })
        self.scroller[item].setDimensions(component.clientHeight, content.offsetHeight, self.items[item].length)
        self.scroller[item].select(self[`current${item}`], false)
        self.scrolling[item] = false
      })

      if (this.currentCustom === '') {
        this.updateDate()
      }
    },
    setValue (e) {
      const val = this.currentCustom === '' ? this.items.Custom[0].value : this.currentCustom
      this.currentValue = val
      if (e) {
        this.isShowHolder = false
      }

      setTimeout(() => {
        this.items.Custom.forEach((item) => {
          if (item.value === parseInt(val, 10)) {
            this.currentName = item.name
          }
        })
        this.$emit('pickerConfirm', +val, this.isShowHolder, this.currentName)
        this.close()
      }, 10)
    },
    inDatas (items, key) {
      let b = false
      items.forEach((item) => {
        if (item.value === key) b = true
      })
      return b
    },
    open () {
      if (this.readonly) return
      this.show = true
    },
    close () {
      this.show = false
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.scrollView = ''

    this.$nextTick(this.render)
  },
  beforeDestroy () {
    this.columns.forEach((item) => {
      this.scroller[item] = null
    })
  }
}
</script>
