import ChildrenRenderer from './ChildRenderer'
import {checkType} from './utils'

export default class DOMComponent extends ChildrenRenderer{

  constructor(element){
    super();
    this._element = element;
    this._dom = null;
  }

  mountComponent(){
    const dom = document.createElement(this._element.type);
    this._dom = dom;
    this._element._dom = dom;
    
    this._updateProps({}, this._element.props);
    this._mountDOMChildren(this._element.props);

    return this._element;
  }

  updateComponent(prevElement, nextElement){
    this._element = nextElement;
    this._updateProps(prevElement.props, nextElement.props);
    if(checkType(nextElement) === 3 || checkType(nextElement) === 4){ //当节点为text节点时, 没有props属性, nextElement本身也是string||number
      this._updateDOMChildren(prevElement.props, nextElement);
    }else{
      this._updateDOMChildren(prevElement.props, nextElement.props);
    }
  }

  unmountComponent(parentDOM){
    parentDOM.removeChild(this._dom);
  }

  _mountDOMChildren(props){
    const childrenType = checkType(props.children)
    if(childrenType === 3 || childrenType === 4){
      const textNode = document.createTextNode(props.children);
      this._dom.appendChild(textNode);
    }else{
      const childrenEls = this.mountChildren(props.children);
      const self = this;
      if(checkType(childrenEls) === 7){ // list
        childrenEls.forEach(childEl => {
          //文字节点也会保存到_dom
          self._dom.appendChild(childEl._dom);
        })
      // }else if(children){ //object
      //   this._dom.appendChild(children);
      }
    }
  }

  _updateProps(prevProps, nextProps){
    let styleUpdates = {}
    const self = this
    if(nextProps === void 0) return;

    //移除所有props
    Object.keys(prevProps).forEach(propName => {
      let prevValue = prevProps[propName];
      if(propName === 'styles'){
        Object.keys(prevProps['style']).forEach((styleName) => {
          styleUpdates[styleName] = ''
        })
      }else if(propName.startsWith('on')){ //TODO remove event 
        const eventName = propName.slice(2).toLocaleLowerCase();
        self._dom.removeEventListener(eventName, prevValue);
      }else{
        self._dom.removeAttribute(propName);
      }
    })

    //add props
    Object.keys(nextProps).forEach(propName => {
      let prevValue = prevProps[propName];
      let nextValue = nextProps[propName];
      if(prevValue === nextValue) return;

      if(propName === 'styles'){
        Object.keys(nextProps['style']).forEach((styleName) => {
          styleUpdates[styleName] = nextValue[styleName];
        })
      }else if( propName.startsWith('on')){//event  此处与React事件设计不符, React实现事件只在document绑定一次, 接收事件后,再在内部分发, 暂时直接绑定到dom上
        const eventName = propName.slice(2).toLocaleLowerCase();
        self._dom.addEventListener(eventName, nextValue);
      }else{
        if (propName === 'children')  return
        self._dom.setAttribute(propName, nextValue);
      }
    })

    //更新css
    Object.keys(styleUpdates).forEach((styleName) => {
      self._dom.style[styleName] = styleUpdates[styleName]
    });
  }

  _updateDOMChildren(prevProps, nextProps){
    const prevType = typeof prevProps;
    const nextType = typeof nextProps;
    if(nextProps === void 0) return;
    
    if(nextType === 'string' || nextType === 'number'){//文字节点
      this._dom.innerHTML = nextProps;
    }else{  // Node
      this.updateChildren(nextProps.children);
    }
  }
}