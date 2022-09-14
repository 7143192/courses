import React from 'react';
import '../../css/ADMIN.css';
import HeadLine from "../BasicPart/HeadLine";
import SideBar from "../BasicPart/SideBar";
import SearchBar from "../BasicPart/SearchBar";
import {AdminBookList, deleted} from "./AdminBookList";

class AdminMainPart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            filterText:"",
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    handleFilterTextChange(filterText) {
        this.setState({ filterText: filterText });
    };
    render(){
        return (
            <div className = "AdminMainPart">
                <SearchBar filterText={this.state.filterText}
                           onFilterTextChange={this.handleFilterTextChange}/>
                <AdminBookList filterText={this.state.filterText} deleteinfo = {deleted}/>
            </div>
        );
    }
}

class AdminPage extends React.Component{
    render(){
        return (
            <div className = "AdminPage">
                <div className = "AdminHeaderPart">
                    <HeadLine username = "Administer"/>
                </div>
                <div className = "AdminSideBarPart">
                    <SideBar/>
                </div>
                <AdminMainPart/>
            </div>
        );
    }
}

export default AdminPage;
