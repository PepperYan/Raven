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

  _mountDOMChildren(props){
    const childrenType = checkType(props.children)
    if(childrenType === 3 || childrenType === 4){
      const textNode = document.createTextNode(props.children);
      this._dom.appendChild(textNode);
    }else{
      const childrenEls = this.mountChildren(props.children);
      if(checkType(childrenEls) === 7){ // list
        childrenEls.forEach(childEl => {
          if(childEl._tag && childEl._tag === "#text"){//文字节点
            this._dom.insertAdjacentHTML('beforeend', childEl.props.children);
          }else{
          this._dom.appendChild(childEl._dom);
          }
        })
      // }else if(children){ //object
      //   this._dom.appendChild(children);
      }
    }
  }

  _updateProps(prevProps, nextProps){
    let styleUpdates = {}

    //移除所有
    Object.keys(prevProps).forEach(propName => {
      if(propName === 'styles'){
        Object.keys(prevProps['style']).forEach((styleName) => {
          styleUpdates[styleName] = ''
        })
      }else if(propName.startsWith('on')){ //TODO remove event

      }else{
        this._dom.removeAttribute(propsName);
      }
    })

    Object.keys(nextProps).forEach(propName => {
      let prevValue = prevProps[propName];
      let nextValue = nextProps[propName];
      if(prevValue === nextValue) return;

      if(propName === 'styles'){
        Object.keys(nextProps['style']).forEach((styleName) => {
          styleUpdates[styleName] = nextValue[styleName];
        })
      }else if( propName.startsWith('on')){//event

      }else{
        if (propName === 'children')  return
        this._dom.setAttribute(propName, nextValue);
      }
    })

    //更新css
    Object.keys(styleUpdates).forEach((styleName) => {
      this._dom.style[styleName] = styleUpdates[styleName]
    });
  }
}