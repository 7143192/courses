import React from 'react';
import {Route, Redirect} from 'react-router-dom'

class LoginRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,
        };
    }

    render() {
        const {component: Component, path="/",exact=false,strict=false} = this.props;
        console.log(this.state.isAuthed);
        /*if (!this.state.hasAuthed) {
            return null;
        }*/
        return <Route path={path} exact={exact} strict={strict} render={props => (
            this.state.isAuthed ? (
                <Redirect to={{
                    pathname: '/',
                    state: {from: props.location, isAuthed:true}
                }}/>
            ) : (
                <Component {...props}/>
            )
        )}/>
    }
}

export default LoginRoute;