import reconcile from "./reconciler";

export default class {
  constructor(props){
    this.props = props;
    this.state = this.state || {};
  }

  setState(partialState){
    this.state = Object.assign({}, this.state, partialState);
    update(this._instance)
  }
}

function update(instance){
  const parentDOM = instance.dom.parentNode;
  const element = instance.element;
  reconcile(parentDOM, instance, element);
}