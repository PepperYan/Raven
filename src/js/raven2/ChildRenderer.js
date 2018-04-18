import {checkType} from './utils';
import instantiateComponent from './instantiateComponent'

export default class ChildrenRenderer{

  constructor(){
    this._renderChildren = null;
  }

  mountChildren(children){
    if(!children) return null;
    const childrenType = checkType(children),
          elements = [];

    if(childrenType === 7){
      for(let i = 0, len = children.length; i < len; i++){
        let componentInstance = instantiateComponent(children[i]);
        const el = componentInstance.mountComponent();
        elements.push(el);
      }
    }
    this._renderChildren = children;

    return elements;
  }
}