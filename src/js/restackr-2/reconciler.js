function createComponentInstance(element, innerInstance){
  const {type, props} = element;
  const componentInstance = new type(props);
  componentInstance._instance = innerInstance;
  return componentInstance;
}

// 只处理dom 标签的reconcile方法
// function reconcile(parentDOM, instance, element){
//   if(instance == null){
//     const newInstance = instantiate(element);
//     parentDOM.appendChild(newInstance.dom);
//     return newInstance;
//   }else if(element == null){
//     parentDOM.removeChild(instance.dom);
//     return null;
//   }else if(instance.element.type == element.type){
//     updateDOMProperties(instance.dom, instance.element.props, element.props);
//     //对子组件进行递归
//     instance.childInstances = reconcileChildren(instance, element);
//     instance.element = element;
//     return instance;
//   }else{
//     const newInstance = instantiate(element);
//     parentDOM.replaceChild(newInstance.dom, instance.dom);
//     return newInstance;
//   }
// }

/**
 * 其实就是新旧两个树进行对比
 * instance.element是老的树
 * element是新的树
 * @param {*} parentDOM 
 * @param {*} instance 
 * @param {*} element 
 */
function reconcile(parentDOM, instance, element){
  if(instance == null){// 第一次渲染dom
    const newInstance = instantiate(element);
    parentDOM.appendChild(newInstance.dom);
    return newInstance;
  }else if(element == null){ //该对象被移除
    parentDOM.removeChild(instance.dom);
    return null;
  }else if(instance.element.type !== element.type){ //这里以type为单位, 若type不一样了, 就把整个child.dom替换了
    const newInstance = instantiate(element);
    parentDOM.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  }else if(typeof element.type === 'string'){ // 浏览器原生标签, 例如:div, span
    updateDOMProperties(instance.dom, instance.element.props, element.props);
    //对子组件进行递归
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  }else{ // type为func, 即自定义标签
    instance.componentInstance.props = element.props;
    const childElement = instance.componentInstance.render();
    const oldChildInstance = instance.childInstance;
    const childInstance = reconcile(parentDOM, oldChildInstance, childElement);
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
    return instance;
  }
}

function instantiate(element){
  const {type, props} = element;
  const isDOM = typeof type === 'string';

  let instance = null;
  if(isDOM){
    const isTextElement = type && (type == 'TEXT_ELEMENT');
    const dom = isTextElement ? document.createTextNode('') : document.createElement(type);
    updateDOMProperties(dom, [], props);
    const children = props.children || [];
    const childInstances = children.map(instantiate);
    const childrenDOM = childInstances.map(childInstance => childInstance.dom);
    childrenDOM.forEach(childDOM => dom.appendChild(childDOM));
    instance = { dom, element, childInstances };
    return instance;
  }else{
    instance = {};
    const componentInstance = createComponentInstance(element, instance);
    const childElement = componentInstance.render();
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;

    Object.assign(instance, {dom, element, childInstance, componentInstance})
    return instance;
  }
  
}


function updateDOMProperties(dom, prevProps, nextProps){
  const isListener = name => name.startsWith('on')
  const isAttribute = name => !isListener(name) && name != 'children'

  //解绑老事件
  Object.keys(prevProps).filter(isListener).forEach((name) => {
    const eventType = name.toLowerCase().slice(2);
    dom.removeEventListener(eventType, prevProps[name]);
  }) 
  //解绑老props
  Object.keys(prevProps).filter(isAttribute).forEach(name => {
    dom[name] = null
  })
  //绑定新事件
  Object.keys(nextProps).filter(isListener).forEach((name) => {
    const eventType = name.toLowerCase().slice(2);
    dom.addEventListener(eventType, nextProps[name]);
  }) 
  //绑定新props
  Object.keys(nextProps).filter(isAttribute).forEach(name => {
    dom[name] = nextProps[name]
  })
}

/**
 * 对
 * @param {*} instance 
 * @param {*} element 
 */
function reconcileChildren(instance, element){

  const dom = instance.dom;
  const childInstances = instance.childInstances;
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);

  for(let i = 0; i < count; i++){
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances;
}

export default reconcile;