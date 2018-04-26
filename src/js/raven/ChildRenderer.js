import {checkType} from './utils';
import instantiateComponent from './instantiateComponent'
import Reconciler from './Reconciler';

export default class ChildrenRenderer{

  constructor(){
    this._renderedComponents = [];
    this._renderChildren = null;
  }

  mountChildren(children){
    if(!children) return null;
    const childrenType = checkType(children),
          elements = [],
          renderedComponents = [];
    if(childrenType === 7){
      for(let i = 0, len = children.length; i < len; i++){
        let componentInstance = instantiateComponent(children[i]);
        const el = componentInstance.mountComponent();
        elements.push(el);
        renderedComponents.push(componentInstance);
      }
    }
    this._renderChildren = children;
    this._renderedComponents = renderedComponents;
    
    return elements;
  }

  updateChildren(nextChildren){ // element tree
    //instance tree
    const prevChildren = this._renderChildren;
    
    if(!prevChildren){//可能是个textnode
      return;
    } 
    const count = Math.max(prevChildren.length, nextChildren.length);

    for(let i = 0; i < count; i++){
      const prevElementInstance = prevChildren[i];
      const nextElement = nextChildren[i];
      if(prevElementInstance && !nextElement){//removed
       return Reconciler.unmountComponent(prevElement);
      }else if(prevElementInstance.type !== nextElement.type){ //rewrite
        Reconciler.unmountComponent(prevElementInstance);
        const nextComponent = instantiateComponent(nextElement);
        return Reconciler.mountComponent(nextComponent);
      }else{ //update
        return Reconciler.receiveComponent(this._renderedComponents[i],nextElement);
      }
    }
  }
}