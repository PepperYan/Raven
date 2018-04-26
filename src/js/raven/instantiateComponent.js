import DOMComponent from './DOMComponent';
import {checkType} from './utils';

export default function(element){
  const elementType = checkType(element.type);
  let instance = null;
  if(typeof element === 'string' || typeof element === 'number'){ //文字节点
    instance = new DOMComponent({
      type:'span',
      _tag: "#text",
      props: {children: element}
    })
  }else if(elementType === 4){ //DOM节点
    instance = new DOMComponent(element);
  }else{ //functional component
    instance = new element.type(element.props);
  }
  return instance;
}