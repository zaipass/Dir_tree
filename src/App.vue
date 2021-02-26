<template>
  <Dropdown :menuData="menuData" :showList="showList" :topMenu="topMenu" @changeList="changeList" @goto="goto" />
</template>

<script>
import Dropdown from './components/Dropdown.vue'
import { menuData } from './mockdata/data.js'
import f from './utils/find.js'

export default {
  name: 'App',
  components: {
    Dropdown
  },
  data() {
    return {
      menuData: menuData,
      showList: [],
      topMenu: ['首页'],
    }
  },
  created() {
    this.showList = this.initMenu()
  },
  mounted() {
  },
  methods: {
    initMenu() {
      return menuData.filter(item => {
        if (!item.parent) {
          console.log(item.name)
          return true
        }
      })
    },
    getData(item) {
      let promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(f.findChildren(menuData, item))
        }, 200)
      })
      return promise.then(res => {
        if (res.length !== 0) {
          this.showList = res
          return true
        }
        return false
      })
    },
    addMenu(item) {
      this.topMenu.push(item)
    },
    changeList(item, bool) {
      this.getData(item).then(res => {
        if (bool && res) { this.addMenu(item) }
      })
    },
    goto(index, item) {
      this.topMenu.splice(index + 1, this.topMenu.length)
      if (index !== 0) {
        this.changeList(item, false)
      } else {
        this.showList = this.initMenu()
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
