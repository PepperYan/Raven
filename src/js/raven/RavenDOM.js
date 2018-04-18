import { checkType } from "./utils";

let mountIndex = 0 //全局变量
function mountIndexAdd() {
  return mountIndex++
}

function hasChildren(node){
  const {props} = node;
  // if(props.children && checkType(props.children) === 7) return true;
  if(props.children) return true;
  return false
}

function mountTextComponent(text, domNode){
  let textDomNode = document.createTextNode(text);
  return textDomNode;
}


function mountComponent(node, container, parentContext){
  const {type, props, ref, key} = node;

  let instance = new type(props, parentContext);
  node._instance = instance;

  const nodeType = checkType(node)
  let renderedNode = null;
  if(nodeType === 3 || nodeType === 4){
    renderedNode = new Node(type, 5, node, null, null);
  }

  renderedNode = renderedNode ? renderedNode : new Node(type, 5, '', null, null);
  renderedNode.key = key || null;
  instance.vnode = renderedNode;
  instance._mountIndex = mountIndexAdd();

  //render dom 
  let dom = null;
  if(nodeType !== 7){
    
  }else{
    dom = renderedNode[0]._dom;
  }

  node._dom = dom;
  instance.vnode._dom = dom;

  if(hasChildren(node)){
    mountChildren(props.children, node)
  }

  return instance;
}

function mountChildren(node, parentDOMNode, parentContext){
  const children = node.props.children;
  for(let i = 0, len = children.length; i < len; i++){
    var cNode = reconcile(children[i], node._dom, parentContext);
  }
}

/**
 * 替代ReactDOM.render方法
 * @param {*} Node 该参数是通过Babel生成的虚拟jsx的DOM树
 * @param {*} container 这是真实的dom节点, 将此作为跟渲染整个view
 */
function render(node, container){
  return renderByRaven(node, container);
}

function renderByRaven(node, container, context){
  const {
    type,
    props
  } = node;
  reconcile(node, container, context);
}

/**
 * 对virtual dom进行渲染, 最后mount到container上
 * @param {*} node 
 * @param {*} container 
 * @param {*} context 
 */
function reconcile(node, container, context){
  const { type, props } = node;
  let domNode = null;
  if(typeof type === 'function'){//原生标签
    const instance = mountComponent(node, container, context);
    domNode = instance._dom;
    //把dom保存到Node节点里
    node._dom = domNode;
    node._mountIndex = mountIndexAdd()
  } else if (typeof node === 'string') {
    domNode = mountTextComponent(node, container);
  }else{
    domNode = document.createElement(type);
    //把dom保存到Node节点里
    node._dom = domNode;
    node._mountIndex = mountIndexAdd()
    if(hasChildren(node)){
      mountChildren(node, domNode, context);
    }
  }
  
  if(checkType(domNode) === 7){
    domNode.forEach(eachNode => {
      container.appendChild(eachNode);
    });
  }
  
  container.appendChild(domNode); 
  return node;
}

export default render;