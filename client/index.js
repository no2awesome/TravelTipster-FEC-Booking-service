import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App.jsx';

class App extends React.Component {
    render () {
        return <h1> Hello World.</h1>;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
