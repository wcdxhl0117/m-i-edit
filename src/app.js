const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./components/app');

// ReactDOM.render(<App />, document.getElementById('root'));
// myComponent = ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<App ref={(appComponent) => {window.appComponent = appComponent}} />, document.getElementById('root'));
