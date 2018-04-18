// import React,{Component} from 'react'
// import { render } from 'react-dom'
import routes from './routes'
import stores from './stores'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'mobx-react'


function App(){
  return (
    <BrowserRouter>
      <Provider {...stores}>
        {routes}
      </Provider>
    </BrowserRouter>
  )
}

// import Test from './test'
// import React from './restackr'
import React from './restackr-1'

const container = document.getElementById('container');
// render(
//   <App />,
//   container
// )

// jsx编译出来的结构
// const ell = React.createElement(
//   'div',
//   { id: 'container' },
//   React.createElement('input', { value: 'foo', type: 'text' }),
//   React.createElement(
//     'a',
//     { href: '/bar' },
//     'bar'
//   ),
//   React.createElement(
//     'span',
//     { onClick: function onClick(e) {
//         return alert("Hi");
//       } },
//     'click me'
//   )
// );

// const el = (
//   <div id="container">
//     <input value="foo" type="text" />
//     <a href="/bar">bar</a>
//     <span onClick={e => alert("Hi")}>click me</span>
//   </div>
// )

// React.render( 
//   el,
//   container
// )

function tick(){
  const time = new Date().toLocaleTimeString();
  const clockEl = <span>{time}</span>
  React.render(clockEl,container)
}

tick();
setInterval(tick, 1000);

if(module.hot){
  module.hot.accept('./routes', () => {
    render(
      <App />,
      container
    )
  });
}
