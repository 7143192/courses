import React from "react";

export default class BuyDetail extends React.Component{
    constructor(props) {
        super(props);
        //this.updateBuyNum.bind(this);
        this.state = {
            id : 0,
            bookName : "",
            bookAuthor : "",
            image : "",
            nowPrice : 0.0,
            buyNum : 0,
        };
    }

    componentDidMount = () => {
        const {info} = this.props;
        let books = JSON.parse(localStorage.getItem("books"));
        Object.keys(books).forEach((key) => {
            if(info.bookId === books[key].bookId){
                this.setState({
                    id: info.itemId,
                    bookName : books[key].bookName,
                    bookAuthor : books[key].bookAuthor,
                    image : books[key].image,
                    nowPrice : books[key].nowPrice,
                    buyNum : info.buyNum,
                })
            }
        });
    }

    updateBuyNum = (e) => {
        console.log("begin to update the buy Num!");
        this.setState({buyNum: e.target.value}); //记得要更新当前输入框中的数值
        /*console.log("input val:", e.target.value);
        let url = "http://localhost:8080/updateItemNum?id=" + this.state.id.toString()
            + "&num=" + e.target.value;
        fetch(url)
            .then(response => response.json());
        this.setState({buyNum : e.target.value});*/
        this.props.updateBuyNum(e.target.value, this.state.id, this.state.buyNum);
    }

    render = () => {
        let {info} = this.props;
        return (
            <div className="detailpart">
                <img alt="imgofproduct" src={this.state.image}
                     className="buyproductimg" height="125px" width="100px"/>
                <div className="productinfo">
                    <div className="buydetailinfo">
                        <a href={'/detail'} className="nametobuy">
                            <b>{this.state.bookName}</b>
                        </a>
                        <br/>
                        作者：{this.state.bookAuthor}
                    </div>
                    <div className="buynumandprice">
                        <div className = "buyprice">
                            价格：￥{info.price}
                        </div>
                    </div>
                    <div className = "buynums">
                        x
                        <input type="text" placeholder={this.state.buyNum} className="buynum"
                               onBlur = {(e) => this.updateBuyNum(e)}/>
                    </div>
                </div>
            </div>
        );
    }
}
