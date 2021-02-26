function findChildren (data, item) {
  let current = data.filter(el => {
    if (el.name === item) return true
  })
  return current.reduce((pre, el) => {
    let inner = data.filter(i => {
      if (el.id === i.parent) return true
    })
    return pre.concat(inner)
  }, [])
}

function findParent (data, item) {
  let current = data.filter(el => {
    if (el.name === item) return true
  })
  return current.reduce((pre, el) => {
    let inner = data.filter(i => {
      if (el.parent === i.id) return true
    })
    return pre.concat(inner)
  }, [])
}

function wrapperFind (data) {
  let allChildrenList = [],
      allParentList = []
  function findAllChildren(item) {
    let children = findChildren.call(this, data, item)
    if (children.length > 0) {
      allChildrenList.push(...children)
      children.forEach(el => {
        findAllChildren(el.name)
      })
    }
  }
  function findAllParent(item) {
    let children = findParent.call(this, data, item)
    if (children.length > 0) {
      allParentList.push(...children)
      children.forEach(el => {
        findAllParent(el.name)
      })
    }
  }
  return {
    fnc: findAllChildren,
    fnp: findAllParent,
    allChildrenList,
    allParentList
  }
}

export default {
  findChildren,
  wrapperFind,
}