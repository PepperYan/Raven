import {checkType} from './utils';
import instantiateComponent from './instantiateComponent'
import Reconciler from './Reconciler';
import { debug } from 'util';

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
        if(!componentInstance) continue;
        const el = componentInstance.mountComponent();
        elements.push(el);
        renderedComponents.push(componentInstance);
      }
    }
    this._renderChildren = children;
    this._renderElements = elements;
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
        Reconciler.unmountComponent(this._renderedComponents[i],this._dom);
      }else if(prevElementInstance.type !== nextElement.type){ //rewrite
        if(prevElementInstance) Reconciler.unmountComponent(prevElementInstance,this._dom);
        const nextComponent = instantiateComponent(nextElement);
        Reconciler.mountComponent(nextComponent);
      }else{ //update
        Reconciler.receiveComponent(this._renderedComponents[i],nextElement);
      }
    }
  }
}