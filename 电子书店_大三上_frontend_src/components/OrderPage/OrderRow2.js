import React from "react";

export default class OrderRow2 extends React.Component{
    constructor(props) {
        super(props);
        this.getBookName.bind(this);
        //const {info1} = this.props;
        this.state = {
            bookName : "",
        };
    }
    componentDidMount = () => {
        const {info1} = this.props;
        let books = JSON.parse(localStorage.getItem("books"));
        Object.keys(books).forEach((key) => {
            //console.log(books[key].storeNum);
            if(books[key].bookId === info1.bookId){
                this.setState({
                    bookName : books[key].bookName,
                });
            }
        });
    }

    getBookName = (id) => {
        console.log(id);
        let book;
        let user = JSON.parse(localStorage.getItem("user"));
        if(user.type !== 1){
            let books = JSON.parse(localStorage.getItem("books"));
            Object.keys(books).forEach((key) => {
                //console.log(books[key].storeNum);
                if(books[key].bookId === id){
                    book = books[key];
                }
            });
            return book;
        }
        else{
            let books = JSON.parse(localStorage.getItem("AdminBooks"));
            Object.keys(books).forEach((key) => {
                //console.log(books[key].storeNum);
                if(books[key].bookId === id){
                    book = books[key];
                }
            });
            return book;
        }
    }

    render = () => {
        const {info1} = this.props;
        return (
            <div className="orderrow2">
                <span className="bookname">
                    {this.getBookName(info1.bookId).bookName}&nbsp;&nbsp;x&nbsp;{info1.buyNum}
                </span>
            </div>
        );
    }
}
