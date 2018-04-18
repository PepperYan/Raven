import Node from './Node'

function createElement(type, config, ...children){
  let props = {},
      key = null,
      ref = null,
      tag = null,
      childrenLength = children.length;

  if(type && type.call){
    tag = type.prototype && type.prototype.render ? 2 : 1;
  }

  if(config != null){
    for(let k in config){
      const v = config[k];
      if(k === 'key'){
        if(v !== void 0) key = v + '';
      }else if(k === 'ref'){
        if(v !== void 0) ref = v;
      }else{
        props[k] = v;
      }
    }
  }
  
  if(children.length < 2){
    props.children = children[0];
  }else{
    props.children = children;
  }

  let defaultProps = type.defaultProps;
  if(defaultProps){
    for(let k in defaultProps){
      if(props[k] === void 0){
        props[k] = defaultProps[k]
      }
    }
  }

  return new Node(type, tag, props, key, ref);
}

function createVirtualNode(node){
  let type = node.nodeName,
      vnode;
  if(node.nodeType === 1){
    vnode = new Node(type, 5);
  }else{
    vnode = createTextNode(type, node.nodeValue);
  }
  vnode.domNode = node;
  return vnode;
}

function createTextNode(type, nodeValue){
  const textNode = new Node('#text', 3, "", null, null);
  textNode.text = nodeValue;
  return textNode;
}


export default createElement;