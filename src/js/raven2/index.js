import createElement from './createElement';
import instantiateComponent from './instantiateComponent'
import Reconciler from './Reconciler';
import {checkType} from './utils';
import Component from './Component';

function render(element, root){
  mount(element,root)
}

function mount(element, root) {
  let component = instantiateComponent(element)
  let componentELs = Reconciler.mountComponent(component)
  
  Array.slice.call(root, root.childNodes).forEach(root.removeChild, root)
  if(checkType(componentELs) === 7){ // list
    componentELs.forEach(el =>{
      root.appendChild(el._dom);
    })
  }else if(componentELs !== void 0){ //object
    root.appendChild(componentELs._dom);
  }
}

export default {
  createElement,
  Component,
  render
}