import React from 'react';
import '../../css/INDEX.css';
class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.handleFilterTextChange =
            this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render(){
        return(
            <div className = "Search">
                <div className="SearchBar">
                    <input type="text" className="searchbar" name="key" id="key_S" autoComplete="off"
                           placeholder="请输入要查找的内容" value = {this.props.filterText}
                           onChange={this.handleFilterTextChange}/>
                </div>
                <div className="SearchButton">
                    <input type="button" className="searchbutton" name="搜索按钮"/>
                </div>
            </div>
        );
    }
}

export default SearchBar;
