function mountComponent(component){
  return component.mountComponent();
}

function mountChildren(component){
  return component.mountChildren();
}

function unmountComponent(component) {
  component.unmountComponent()
}

function receiveComponent(component, nextElement) {
  const prevElement = component._element;
  if (prevElement === nextElement)  return

  return component.updateComponent(component._element, nextElement)
}

function updateChildren(prevChildren, nextChildren){

}

export default {
  mountComponent,
  unmountComponent,
  receiveComponent
}