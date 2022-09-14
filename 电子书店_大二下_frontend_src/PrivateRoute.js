import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom'
import {history} from "./utils/history";

class PrivateRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthed:props.location.state ? props.location.state.isAuthed : false,
            //hasAuthed:false,
        };
    }

    /*Reset = () => {
        console.log("before reset:", this.props.location.state.isAuthed);
        this.setState({
                isAuthed: this.props.location.state.isAuthed,
            }
        );
    };*/

    componentDidMount = () => {
        if(this.props.location.state){
            console.log("In the did func:", this.props.location.state.isAuthed);
            this.setState({
                isAuthed:this.props.location.state.isAuthed,
            })
        }
        //this.Reset.bind(this);
        //document.addEventListener("load", this.Reset.bind(this));
        //document.addEventListener("hashchange", this.Reset.bind(this));
        //this.Reset.bind(this);
        //if(this.props.location.state) console.log(this.props.location.state.isAuthed);
        /*this.setState({
                isAuthed: this.props.location.state ? this.props.location.state.isAuthed : false,
                hasAuthed: this.props.location.state ? this.props.location.state.hasAuthed : false,
            }
        );*/
        /*history.listen(location => {
            // 判断当前路由地址 和 发生变化后的 路由地址 是否一致
            console.log(this.props.location.pathname);
            console.log(location.pathname);
            if (this.props.location.pathname !== location.pathname) {
                console.log("IsAuthed:", this.props.location.state.isAuthed);
                this.setState({
                        isAuthed: this.props.location.state ? this.props.location.state.isAuthed : false,
                    }
                );
            }
        });*/
    }

    componentWillUnmount() {

    }

    render() {
        const {component: Component, path="/",exact=false,strict=false} = this.props;
        console.log("In the render function:", this.state.isAuthed);
        return <Route path={path} exact={exact} strict={strict} render={props => (
            this.state.isAuthed ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname:'/login',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    }
}
export default withRouter(PrivateRoute);
