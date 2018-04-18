
/**
 * Babel会把jsx编译成React.createElement
 * 如<div id="d" /> -> React.createElement('div', { id: "d"}, null);
 * 然后该方法会把 jsx输出成 render的渲染格式:
 * {
 *    type:"div",
 *    props:{
 *      id: "d"
 *    }
 * }
 * @param {*} type 
 * @param {*} config 
 * @param {*} args 
 */
export default function createElement(type, config, ...args){
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0 ? true : false;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  
  props.children = rawChildren
  .filter(c => { 
    return c != null & c != false
  })
  .map(c => {
    return c instanceof Object ? c : createTextElement(c);
  });

  return {type, props}
}

function createTextElement(text){
  return createElement("TEXT_ELEMENT", {nodeValue: text})
}
