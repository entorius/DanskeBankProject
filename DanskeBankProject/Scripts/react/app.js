import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter, Route } from 'react-router-dom'
import Home from './components/Home';

class App extends React.Component {
    render() {
        const name = "Will";
        return (
            <h1> It's my name {(function () { return name })()}</h1>
        );
    }
}

class Routes extends React.Component {
    render() {
        return (
            <HashRouter>
                <Route exact path="/" component={Home} />

            </HashRouter>
        );
    }
}


const x = <div>You are genius</div>;

ReactDOM.render(
    <Routes/>,
    document.getElementById('root')
);