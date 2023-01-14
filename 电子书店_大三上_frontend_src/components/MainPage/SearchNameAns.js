import React from 'react';
import '../../css/INDEX.css';
import Book from './ABook';
import {BaseUrl, MicroUrl} from "../../utils/constants";

class SearchNameAns extends React.Component {
    constructor(props) {
        super();
        this.state = {
            shown: false,
        }
    }

    render() {
        if(this.props.shown === false) return null;
        return (
            <div>
                <p style={{marginLeft:20, fontSize:18, color:"blue"}}>
                    找到了书籍{this.props.bookName},作者名：{this.props.name}
                </p>
            </div>
        );
    }
}

export default SearchNameAns;
