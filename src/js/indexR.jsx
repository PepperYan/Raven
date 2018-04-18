import routes from './routes'
import stores from './stores'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'mobx-react'

const container = document.getElementById('container');
import React from './raven2'


const el = (
  <div id="container">
    <input value="foo" type="text" />
    <a href="/bar">bar {"hello"}</a>
    <span onClick={e => alert("Hi")}>click me</span>
  </div>
)

React.render( 
  el,
  container
)

if(module.hot){
  module.hot.accept('./routes', () => {
    render(
      <App />,
      container
    )
  });
}
