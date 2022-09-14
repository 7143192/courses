import React from "react";
import ch1 from "../../assets/jiangzhang1.png";
import ch2 from "../../assets/jiangzhang2.png";
import ch3 from "../../assets/jiangzhang3.png";

export default class FirstBook extends React.Component{
    constructor(props) {
        super(props);
        this.getSrc.bind(this);
    }

    getSrc = () => {
        let src;
        if(this.props.num === 0) src = ch1;
        else{
            if(this.props.num === 1) src = ch2;
            else src = ch3;
        }
        return src;
    }

    render = () => {
        let {info} = this.props;
        return (
            <div className = "AFirstBook">
                <img src = {info.key.image} alt = "firstBookImg" className = "firstBookImg"/>
                <br/>
                <div className = "firstBookInfo">
                    <img src = {this.getSrc()} alt = "ch" height = "30px" width = "30px"/>
                    <span className = "firstBookName">{info.key.bookName}</span>
                    <br/>
                    <span className = "firstBookSold">销量：{info.value}</span>
                </div>
            </div>
        );
    }
}
