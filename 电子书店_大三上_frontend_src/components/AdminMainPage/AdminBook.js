import React from 'react';
import '../../css/INDEX.css';
import book1 from '../../assets/book1.png';
import book2 from '../../assets/book2.png';
import book3 from '../../assets/book3.png';
import book4 from '../../assets/book4.png';
import book5 from '../../assets/book5.png';
import book6 from '../../assets/book6.png';
import book7 from '../../assets/book7.png';
import book8 from '../../assets/book8.png';
import book9 from '../../assets/book9.png';
import book10 from '../../assets/book10.png';
import book11 from '../../assets/book11.png';
import book12 from '../../assets/book12.png';
import book13 from '../../assets/book13.png';
import book14 from '../../assets/book14.png';
import book15 from '../../assets/book15.png';
import {BaseUrl} from "../../utils/constants";

let srcs = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12,
book13,book14,book15];
let books  =
    [["Java核心技术卷II","凯.S.霍斯特曼","50",".30","68",".30","9787111561279","100"],["ICS","计算机专家","88",".80","128",".00","9787111561279","100"]
        ,["Effective C++","侯捷","88",".00","100",".80","9787111561279","100"],["小王子","圣.埃克苏佩里","28",".88","38",".00","9787111561279","100"],
        ["Java编程思想","外国人","100",".33","120",".88","9787111561279","100"],["魔兽世界","暴雪","128",".00","150",".88","9787111561279","100"],
        ["三体","刘慈欣","68",".00","88",".88","9787111561279","100"],["悲惨世界","雨果","68",".00","88",".33","9787111561279","100"],
        ["魔力的胎动","东野圭吾","38",".80","55",".88","9787111561279","100"],["我不怕这漫长黑夜","苑子豪","38",".80","55",".88","9787111561279","100"],
        ["永久记录","斯诺登","55",".80","80",".88","9787111561279","100"],["纳尼亚传奇","刘易斯","129",".00","158",".88","9787111561279","100"],
    ["红楼梦","曹雪芹","55",".00","68",".66","9787111561279","100"],["机器学习","周志华","66",".66","88",".00","9787111561279","100"],
    ["老人与海","海明威","25",".88","38",".66","9787111561279","100"]];
//let chosen = [false,false,false,false,false,false,false,false,false,false,false,false];
let deleted = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
let buttoninfo = ["删除本书","添加本书"];
class Rob extends React.Component{
    constructor(props) {
        super(props);
        //const {info1} = this.props;
        this.updatePrice.bind(this);
        this.saveNowPriceChange.bind(this);
        this.state = {
            Editing:false,
            EditVal:0,
        };
    }

    componentDidMount = () =>{
        this.setState({
            //num:books[this.props.i][2],
            //tail:books[this.props.i][3],
        });
    }

    updatePrice = () => {
        //const{info1} = this.props;
        let price = this.props.rob.toString();
        let pos = 0;
        if((pos = price.indexOf(".")) < 0){
            price += ".00";
            return price;
        }
        else{
            let len = price.length;
            if(pos === len - 2){
                price += "0";
                return price;
            }
        }
    }

    ShowEditor = () => {    //显示输入框
        this.setState({
            EditVal : 1,
        });
    };

    saveNowPriceChange = (e) => {
        const {info1} = this.props;
        e.preventDefault();
        let inputVal = e.target.firstChild;
        let s = inputVal.value.toString();
        let id = info1.bookId;
        /*let url = "http://localhost:8080/updateNowPrice?id=" + id + "&price=" + s;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("修改成功！");
                this.setState({EditVal : 0});
            })*/
        this.props.changeRob(id, s);
        this.setState({EditVal : 0});
    }

    render = () =>{
        const {info1} = this.props;
        if(this.state.EditVal !== 0){
            return (
                <form onSubmit = {this.saveNowPriceChange}>
                    <input type = "text" defaultValue={this.props.rob}/>
                </form>
            );
        }
        //const {info1} = this.props;
        return (
            <span className="rob" onDoubleClick={this.ShowEditor}>
                <span className="sign">￥</span>
                <span className="usernum">
                    {this.updatePrice()}
                </span>
            </span>
        );
    }
}

class Pricer extends React.Component{
    constructor(props) {
        super(props);
        //const {info2} = this.props;
        this.updatePricer.bind(this);
        this.savePrevPriceChange.bind(this);
        this.state = {
            Editing:false,
            EditVal:0,
        };
    }

    componentDidMount = () =>{
    }

    updatePricer = () => {
        //const {info2} = this.props;
        let price = this.props.prev.toString();
        let pos = 0;
        if((pos = price.indexOf(".")) < 0){
            price += ".00";
            return price;
        }
        else{
            let len = price.length;
            if(pos === len - 2){
                price += "0";
                return price;
            }
            else return price;
        }
    }

    ShowEditor = () => {    //显示输入框
        this.setState({
            EditVal:1,
        });
    };

    savePrevPriceChange = (e) => {
        const {info2} = this.props;
        e.preventDefault();
        let inputVal = e.target.firstChild;
        let s = inputVal.value.toString();
        let id = info2.bookId;
        /*let url = "http://localhost:8080/updatePrevPrice?id=" + id + "&price=" + s;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("修改成功！");
                this.setState({EditVal : 0});
            })*/
        this.props.changePrev(id, s);
        this.setState({EditVal : 0});
    }

    render = () =>{
        const {info2} = this.props;
        if(this.state.EditVal !== 0){
            return (
                <form onSubmit = {this.savePrevPriceChange}>
                    <input type = "text" defaultValue={this.props.prev}/>
                </form>
            );
        }

        return (
            <span className="price_r" onDoubleClick={this.ShowEditor}>
                <span className="sign">￥</span>
                <span className="usernum">
                    {this.updatePricer()}
                </span>
            </span>
        );
    }
}

class Price extends React.Component{
    render=()=>{
        const {priceInfo} = this.props;
        return(
            <p className="price">
                <Rob info1 = {priceInfo}/>
                <Pricer info2 = {priceInfo}/>
            </p>
        );
    }
}

class Img extends React.Component{
    constructor(props) {
        super(props);
        const {imageInfo} = this.props;
        this.state = {
            Editing : false,
            EditVal : 0,
            src : imageInfo.image,
            //Src:this.props.i,//代表对应图片在路径数组里面的下标值
        };
    }
    ShowEditor = () => {    //显示输入框
        this.setState({
            EditVal : 1,
        });
    };

    SaveChange = (e) => {
        e.preventDefault();
        let inputVal = e.target.firstChild;
        let input = inputVal.value;
        const {imageInfo} = this.props;
        let bookId = imageInfo.bookId;
        /*let url = "http://localhost:8080/updateImage?id=" + bookId + "&image=" + input;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("修改成功！");
                this.setState({EditVal : 0});
            })*/
        this.props.changeImage(bookId, input);
        this.setState({EditVal : 0});
    }
    render(){
        const {imageInfo} = this.props;
        if(this.state.EditVal !== 0){
            return (
                <form onSubmit = {this.SaveChange}>
                    <input type = "text" defaultValue={imageInfo.image}/>
                </form>
            );
        }

        return (
            <img src={this.props.image} alt="book1" className="BookImg"
                 onDoubleClick={this.ShowEditor}/>
        );
    }
}

class Name extends React.Component{
    constructor(props) {
        super(props);
        const {nameInfo} = this.props;
        this.state = {
            Editing : false,
            EditVal : 0,
            name : nameInfo.bookName,
            //name:books[this.props.i][0],
        };
    }

    ShowEditor = () => {    //显示输入框
        this.setState({
            EditVal : 1,
        });
    };

    SaveChange = (e) => {
        e.preventDefault();
        let inputVal = e.target.firstChild;
        let name = inputVal.value;
        const {nameInfo} = this.props;
        let id=  nameInfo.bookId;
        /*let url = "http://localhost:8080/updateName?id=" + id + "&name=" + name;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("修改成功！");
                this.setState({EditVal : 0});
            })*/
        this.props.changeName(id, name);
        this.setState({EditVal : 0});
    }

    render = () => {
        //const {nameInfo} = this.props;
        if(this.state.EditVal !== 0){
            return (
                <form onSubmit = {this.SaveChange}>
                    <input type = "text" defaultValue = {this.props.bookName}/>
                </form>
            );
        }
        //console.log(this.state.name);

        return (
            <p className = "name" onDoubleClick = {this.ShowEditor}>
                {this.props.bookName}
            </p>
        );
    }
}

class Author extends React.Component{
    constructor(props) {
        super(props);
        const {authorInfo} = this.props;
        this.state = {
            Editing:false,
            EditVal:0,
            author : authorInfo.bookAuthor,
            //author:books[this.props.i][1],
        };
    }
    ShowEditor = () => {    //显示输入框
        this.setState({
            EditVal:1,
        });
    };

    SaveChange = (e) => {
        e.preventDefault();
        let inputVal = e.target.firstChild;
        let author = inputVal.value;
        const {authorInfo} = this.props;
        let id=  authorInfo.bookId;
        /*let url = "http://localhost:8080/updateAuthor?id=" + id + "&author=" + author;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("修改成功！");
                this.setState({EditVal : 0});
            })*/
        this.props.changeAuthor(id, author);
        this.setState({EditVal : 0});
    }
    render = () => {
        //const {authorInfo} = this.props;
        if(this.state.EditVal !== 0){
            return (
                <form onSubmit = {this.SaveChange}>
                    <input type = "text" defaultValue={this.props.bookAuthor}/>
                </form>
            );
        }
        //const {authorInfo} = this.props;
        return (
            <p className="author" onDoubleClick={this.ShowEditor}>
                {this.props.bookAuthor}
            </p>
        );
    }
}

class ISBN extends React.Component{
    constructor(props) {
        super(props);
        const {isbnInfo} = this.props;
        this.state = {
            Editing : false,
            EditVal : 0,
            isbn : isbnInfo.isbnNum,
            //ISBN:books[this.props.i][6],
        };
    }
    ShowEditor = () => {    //显示输入框
        this.setState({
            EditVal : 1,
        });
    };

    SaveChange = (e) => {
        e.preventDefault();
        let inputVal = e.target.firstChild;
        let isbn = inputVal.value;
        const {isbnInfo} = this.props;
        let id=  isbnInfo.bookId;
        /*let url = "http://localhost:8080/updateISBN?id=" + id + "&isbn=" + isbn;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("修改成功！");
                this.setState({EditVal : 0});
            })*/
        this.props.changeISBN(id, isbn);
        this.setState({EditVal : 0});
    }
    render = () => {
        const {isbnInfo} = this.props;
        if(this.state.EditVal !== 0){
            return (
                <form onSubmit = {this.SaveChange}>
                    <input type = "text" defaultValue={this.props.isbn}/>
                </form>
            );
        }
        return (
            <p className="ISBN" onDoubleClick={this.ShowEditor}>
                ISBN:{this.props.isbn}
            </p>
        );
    }
}

class StoreNum extends React.Component{
    constructor(props) {
        super(props);
        const {storeNumInfo} = this.props;
        this.state = {
            Editing : false,
            EditVal : 0,
            num : storeNumInfo.storeNum,
            //storenum:books[this.props.i][7],
        };
    }
    ShowEditor = () => {    //显示输入框
        this.setState({
            EditVal : 1,
        });
    };

    SaveChange = (e) => {
        e.preventDefault();
        let inputVal = e.target.firstChild;
        let num = inputVal.value;
        const {storeNumInfo} = this.props;
        let id=  storeNumInfo.bookId;
        /*let url = "http://localhost:8080/updateStoreNum?id=" + id + "&num=" + num;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("修改成功！");
                this.setState({EditVal : 0});
            })*/
        this.props.changeStoreNum(id, num);
        this.setState({EditVal : 0});
    }

    render = () => {
        const {storeNumInfo} = this.props;
        if(this.state.EditVal !== 0){
            return (
                <form onSubmit = {this.SaveChange}>
                    <input type = "text" defaultValue={this.props.storeNum}/>
                </form>
            );
        }
        //const {storeNumInfo} = this.props;
        return (
            <p className="StoreNum" onDoubleClick={this.ShowEditor}>
                库存:{this.props.storeNum}件
            </p>
        );
    }
}

class InfoButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            IsDeleted:false,
            ButtonInfo:0,
        }
        //this.ChangeState = this.ChangeState.bind(this);
        this.DeleteBook = this.DeleteBook.bind(this);
    };

    /*ChangeState = () => {
        deleted[this.props.i] = (!deleted[this.props.i]);
        this.setState({
            IsDeleted:(!this.state.IsDeleted),
            ButtonInfo:(1 - this.state.ButtonInfo),
        })
    };*/

    DeleteBook = () => {
        const{infoButtonInfo} = this.props;
        let bookId = infoButtonInfo.bookId;
        let url = "http://localhost:8080/delBook?id=" + bookId.toString();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("删除书籍成功！");
            })
    }

    render(){
        return(
            <button className = "InfoButton" onClick = {this.DeleteBook}>
                {buttoninfo[this.state.ButtonInfo]}
            </button>
        );
    }
}

class AdminBook extends React.Component{
    constructor(props) {
        super(props);
        //this.deleteBook.bind(this);
        this.state = {
            IsDeleted:false,
            ButtonInfo:0,
            bookName : "",
            bookAuthor : "",
            isbn : -1,
            storeNum : 0,
            rob : 0,
            prev : 0,
            image : "",
        }
        //this.ChangeState = this.ChangeState.bind(this);
        this.DeleteBook = this.DeleteBook.bind(this);
    }

    componentDidMount = () => {
        const{info} = this.props;
        let bookId = info.bookId;
        //let url = "http://localhost:8080/getBook?id=" + bookId.toString();
        let url = BaseUrl + "getBook?id=" + bookId.toString();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    ButtonInfo : 0,
                    bookName : data.bookName,
                    bookAuthor : data.bookAuthor,
                    isbn : data.isbnNum,
                    storeNum : data.storeNum,
                    rob : data.nowPrice,
                    prev : data.prevPrice,
                    image : data.image,
                })
            })
    }

    DeleteBook = () => {
        const{info} = this.props;
        let bookId = info.bookId;
        this.props.DelOne(bookId);
    }

    changeName = (id, name) => {
        //let url = "http://localhost:8080/updateName?id=" + id + "&name=" + name;
        let url = BaseUrl + "updateName?id=" + id + "&name=" + name;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let url1 = "http://localhost:8080/getBook?id=" + id;
                fetch(url1)
                    .then(response => response.json())
                    .then(data1 => {
                        this.setState({bookName : data1.bookName});
                    })
            })
    }

    changeAuthor = (id, author) => {
        //let url = "http://localhost:8080/updateAuthor?id=" + id + "&author=" + author;
        let url = BaseUrl + "updateAuthor?id=" + id + "&author=" + author;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //let url1 = "http://localhost:8080/getBook?id=" + id;
                let url1 = BaseUrl + "getBook?id=" + id;
                fetch(url1)
                    .then(response => response.json())
                    .then(data1 => {
                        this.setState({bookAuthor : data1.bookAuthor});
                    })
            })
    }

    changeISBN = (id, isbn) => {
        //let url = "http://localhost:8080/updateISBN?id=" + id + "&isbn=" + isbn;
        let url = BaseUrl + "updateISBN?id=" + id + "&isbn=" + isbn;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //let url1 = "http://localhost:8080/getBook?id=" + id;
                let url1 = BaseUrl + "getBook?id=" + id;
                fetch(url1)
                    .then(response => response.json())
                    .then(data1 => {
                        this.setState({isbn : data1.isbnNum});
                    })
            })
    }

    changeStoreNum = (id, num) => {
        //let url = "http://localhost:8080/updateStoreNum?id=" + id + "&num=" + num;
        let url = BaseUrl + "updateStoreNum?id=" + id + "&num=" + num;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //let url1 = "http://localhost:8080/getBook?id=" + id;
                let url1 = BaseUrl + "getBook?id=" + id;
                fetch(url1)
                    .then(response => response.json())
                    .then(data1 => {
                        this.setState({storeNum : data1.storeNum});
                    })
            })
    }

    changeRob = (id, rob) => {
        //let url = "http://localhost:8080/updateNowPrice?id=" + id + "&price=" + rob;
        let url = BaseUrl + "updateNowPrice?id=" + id + "&price=" + rob;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //let url1 = "http://localhost:8080/getBook?id=" + id;
                let url1 = BaseUrl + "getBook?id=" + id;
                fetch(url1)
                    .then(response => response.json())
                    .then(data1 => {
                        this.setState({rob : data1.nowPrice});
                    })
            })
    }

    changePrev = (id, prev) => {
        //let url = "http://localhost:8080/updatePrevPrice?id=" + id + "&price=" + prev;
        let url = BaseUrl + "updatePrevPrice?id=" + id + "&price=" + prev;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //let url1 = "http://localhost:8080/getBook?id=" + id;
                let url1 = BaseUrl + "getBook?id=" + id;
                fetch(url1)
                    .then(response => response.json())
                    .then(data1 => {
                        this.setState({prev : data1.prevPrice});
                    })
            })
    }

    changeImage = (id, image) => {
        //let url = "http://localhost:8080/updateImage?id=" + id + "&image=" + image;
        let url = BaseUrl + "updateImage?id=" + id + "&image=" + image;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //let url1 = "http://localhost:8080/getBook?id=" + id;
                let url1 = BaseUrl + "getBook?id=" + id;
                fetch(url1)
                    .then(response => response.json())
                    .then(data1 => {
                        this.setState({image : data1.image});
                    })
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {//父组件传过来的
        //(接上一行)props改变，要重新绘制
        if(this.props !== prevProps){
            const{info} = this.props;
            let bookId = info.bookId;
            //let url = "http://localhost:8080/getBook?id=" + bookId.toString();
            let url = BaseUrl + "getBook?id=" + bookId.toString();
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        bookName : data.bookName,
                        bookAuthor : data.bookAuthor,
                        isbn : data.isbnNum,
                        storeNum : data.storeNum,
                        rob : data.nowPrice,
                        prev : data.prevPrice,
                        image : data.image,
                    })
                })
        }
    }

    render(){
        const {info} = this.props;
        if(info.isShown === 1) return null;//未显示则不展示这本书
        return(
            <div className = "Book">
                <Img imageInfo = {info} image = {this.state.image}
                changeImage = {this.changeImage.bind(this)}/>
                <ISBN isbnInfo = {info} isbn = {this.state.isbn}
                changeISBN = {this.changeISBN.bind(this)}/>
                <Name nameInfo = {info} bookName = {this.state.bookName}
                      changeName = {this.changeName.bind(this)}/>
                <Author authorInfo = {info} bookAuthor = {this.state.bookAuthor}
                        changeAuthor = {this.changeAuthor.bind(this)}/>
                <p className="price">
                    <Rob info1 = {info} rob = {this.state.rob}
                    changeRob = {this.changeRob.bind(this)}/>
                    <Pricer info2 = {info} prev = {this.state.prev}
                    changePrev = {this.changePrev.bind(this)}/>
                </p>
                <StoreNum storeNumInfo = {info} storeNum = {this.state.storeNum}
                changeStoreNum = {this.changeStoreNum.bind(this)}/>
                <button className = "InfoButton" onClick = {this.DeleteBook}>
                    {buttoninfo[this.state.ButtonInfo]}
                </button>
                <div className="icon_pop"/>
            </div>
        );
    }
}

export {AdminBook, books, srcs, deleted};
