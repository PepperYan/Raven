import createElement from './createElement'

function render(element, parentDOM){
  const {type, props} = element;
  const children = props.children || [];

  const isTextElement = type && (type == 'TEXT_ELEMENT');
  const dom = isTextElement ? document.createTextNode('') : document.createElement(type);

  //绑定事件到dom
  const isListener = name => name.startsWith('on')
  Object.keys(props).filter(isListener).forEach((name) => {
    const eventType = name.toLocaleLowerCase().slice(2);
    dom.addEventListener(eventType, props[name]);
  }) 

  const isAttribute = name => !isListener(name) && name != 'children'
  Object.keys(props).filter(isAttribute).forEach(name => {
    dom[name] = props[name]
  })

  children.forEach(child => {
    render(child, dom);
  });
  
  if(!parentDOM.lastChild){
    parentDOM.appendChild(dom);
  }else{
    parentDOM.replaceChild(dom, parentDOM.lastChild);
  }
}




export default {
  render,
  createElement
}