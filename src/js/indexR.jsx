import routes from './routes'
import stores from './stores'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'mobx-react'

const container = document.getElementById('container');
import React from './raven'

const stories = [
  { name: "hello1", url: "http://bit.ly/2pX7HNn" },
  { name: "hello2", url: "http://bit.ly/2qCOejH" },
  { name: "hello3", url: "http://bit.ly/2qGbw8S" },
  { name: "hello4", url: "http://bit.ly/2q4A746" },
  { name: "hello5", url: "http://bit.ly/2rE16nh" }
];

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>My React</h1>
        <ul>
          {this.props.stories.map(story => {
            return <Story name={story.name} url={story.url} />;
          })}
        </ul>
      </div>
    );
  }
}

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = { likes: Math.ceil(Math.random() * 100) };
  }
  like() {
    console.log("click")
    this.setState({
      likes: this.state.likes + 1
    });
  }
  render() {
    const { name, url } = this.props;
    const { likes } = this.state;
    const likesElement = <span />;
    return (
      <li>
        <button onClick={e => this.like()}>{likes}<b>❤️</b></button>
        <a href={url}>{name}</a>
      </li>
    );
  }
}

React.render( 
  <App stories={stories}/>,
  container
)

// const el = (
//   <div id="container">
//     <input value="foo" type="text" />
//     <a href="/bar">bar {"hello"}</a>
//     <span onClick={e => alert("Hi")}>click me</span>
//   </div>
// )

// React.render( 
//   el,
//   container
// )

if(module.hot){
  module.hot.accept('./routes', () => {
    render(
      <App />,
      container
    )
  });
}
