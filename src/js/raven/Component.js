import instantiateComponent from './instantiateComponent'
import Reconciler from './Reconciler'

function empty(node) {
  [].slice.call(node, node.childNodes).forEach(node.removeChild, node)
}

function replaceNode(prevNode, newNode) {
  const parentNode = prevNode.parentNode
  empty(parentNode)
  parentNode.appendChild(newNode)
}

export default class {

  constructor(props){
    this.props = props;
    this.state = this.state || {};
  }

  mountComponent(){
    const element = this.render();
    this._element = element;
    
    let component = instantiateComponent(element);
    this._renderedComponent = component

    let dom = Reconciler.mountComponent(component);
    //Component的children有可能还是children所以这里不能this._dom = dom, 因为dom可能是另一个Component(object)

    return this._element;
  }

  setState(partialState){
    this._pendingState = Object.assign({}, this.state, partialState);
    this.requestUpdate();
  }

  updateComponent(prevElement, nextElement){
    if(prevElement !== nextElement){

    }

    this._element = nextElement; //表示已经在渲染新element, 若是相同的el传进来不再处理
    this.props = nextElement.props;
    this.state = this._pendingState;
    this._pendingState = null;

    const prevRenderedElement = this._renderedComponent._element;
    const nextRenderedElement = this.render();

    if(prevRenderedElement.type === nextRenderedElement.type){
      Reconciler.receiveComponent(this._renderedComponent,nextRenderedElement);
    }else{
      Reconciler.unmountComponent(this._renderedComponent);

      const nextComponent = instantiateComponent(nextElement);
      const el = Reconciler.mountComponent(nextComponent);
      replaceNode(this._renderedComponent._dom, el._dom);
    }
  }

  requestUpdate(){
    this.updateComponent(this._element, this._element);
  }
  

}