<template>
  <div class="dropdown">
    <div class="top-menu">
      <span v-for="(item, index) in topMenu" :key="`menu-${index}`" @click="goto(index, item)">
        <img v-if="index !== 0" src="../assets/arrow.png" alt="" width="12" height="12" class="menu-arrow">{{ item }}
      </span>
    </div>
    <ul>
      <li
        v-for="(item, index) in showList"
        :key="index"
      >
        <label class="label-list">
          <input type="checkbox" :id="item.id" :value="item" v-model="checkedList" @change="findCP(item)">
          <span @click.stop.prevent="into(item.name)">{{ item.name }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import f from '../utils/find.js'
export default {
  name: 'Dropdown',
  props: {
    menuData: {
      type: Array,
      required: true
    },
    showList: {
      type: Array,
      default() {
        return [1, 2, 3]
      }
    },
    topMenu: {
      type: Array,
    },
  },
  data() {
    return {
      checkedList: []
    }
  },
  methods: {
    into(item) {
      this.$emit('changeList', item, true)
    },
    goto(index, item) {
      this.$emit('goto', index, item)
    },
    findCP(item) {
      let find = f.wrapperFind(this.menuData)
      find.fnc(item.name)
      find.fnp(item.name)
      if (this.checkedList.includes(item)) {
        this.checkedList.push(...find.allChildrenList, ...find.allParentList)
      } else {
        this.checkedList = this.checkedList.filter(el => {
          if (find.allChildrenList.includes(el) || find.allParentList.includes(el)) {
            return false
          }
          return true
        })
      }
    },
  }
}
</script>

<style scoped>
  * {box-sizing: border-box;}
  .top-menu {
    width: 100%;
    height: 30px;
    overflow: hidden;
    display: flex;
    place-items: center;
  }
  .top-menu span {
    display: flex;
    place-items: center;
  }
  .top-menu span:hover {
    cursor: pointer;
    color: #000;
    text-shadow:
      0px -2px 2px #ccc,
      0px 2px 2px #ccc;
  }
  .top-menu .menu-arrow {
    pointer-events: none;
    margin: 3px;
  }
  li, ul {
    margin: 0px;
    padding: 0px;
  }
  .dropdown {
    width: 30%;
    margin: 0 auto;
    height: auto;
    background: #eee;
  }
  .dropdown ul{
    list-style: none;
    overflow: hidden;
    padding: 0px 10px;
  }
  .dropdown ul li {
    overflow: hidden;
  }
  .label-list {
    border-radius: 5px;
    display: flex;
    background: #ccc;
    margin: 5px 0px;
    padding: 10px;
  }
</style>
