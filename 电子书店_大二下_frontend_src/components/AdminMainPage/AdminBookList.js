import React from 'react';
import '../../css/INDEX.css';
import {AdminBook, books, srcs, deleted} from './AdminBook';
import {BaseUrl} from "../../utils/constants";
let Chosen = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
let Add = 0; //用于计数添加的书的个数
class AdminBookList extends React.Component{
    constructor(props) {
        super(props);
        this.LoadBooks = this.LoadBooks.bind(this);
        this.SearchForBooks = this.SearchForBooks.bind(this);
        this.AddBook = this.AddBook.bind(this);
        this.AddNewBook.bind(this);
        this.state = {
            List:[],
            PrevList:[],
        }
    }

    LoadBooks = () => {
        /*for(let j = 0;j < 15;++j){
            //let book = React.createElement("li",{className:"line1"}, <Book i = {j}
            //                                                               name = {books[j][0]}/>)
            if(deleted[j] === false){
                this.state.List.push(<AdminBook i = {j}/>);
                Chosen[j] = true;
            }
        }
        this.setState({List:this.state.List,PrevList:this.state.List});*/
        //let url = "http://localhost:8080/getBooks";
        let url = BaseUrl + "getBooks";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("AdminBooks", JSON.stringify(data));
                this.setState({List : data, PrevList : data});
            });
    }

    componentDidMount=() =>{
        /*for(let j = 0;j < deleted.length;++j) this.props.deleteinfo[j] = deleted[j];
        this.LoadBooks();
        document.addEventListener('click', this.CheckDelete.bind(this));*/
        this.LoadBooks();
    }

    componentWillUnmount() {
        //document.removeEventListener('click', this.CheckDelete.bind(this));
    }

    SearchForBooks = () => {//进行管理员的搜索
        /*let url = "http://localhost:8080/searchBook?info=" + this.props.filterText;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach((key) => {
                    console.log(data[key].bookName);
                });
                this.setState({List : data});
            });*/
        let info = this.props.filterText.toString().toLowerCase();
        let ans = [];
        //let books = JSON.parse(localStorage.getItem("AdminBooks"));
        Object.keys(this.state.PrevList).forEach((key) => {
            if(this.state.PrevList[key].bookName.toString().toLowerCase().indexOf(info) >= 0){
                ans.push(this.state.PrevList[key]);
            }
        });
        this.setState({List : ans});
    }

    componentDidUpdate(preProps) {
        if(preProps.filterText !== this.props.filterText){
            this.SearchForBooks();
        }
    }

    CheckDelete = (e) => {
        console.log("delete");
        let newlist = [];
        //let pos = this.state.List.indexOf(e.target);
        //let pos = this.state.PrevList.indexOf(e.target);
        //deleted[pos] = true;
        for(let j = 0;j < deleted.length;++j){
            if(deleted[j] === false){
                newlist.push(this.state.PrevList[j]);
            }
        }
        this.setState({
            List:newlist,
        });
    };

    AddBook = () => {
        console.log("Add One");
        for(let j = 0;j < 3;++j){
            this.state.List.push(<AdminBook i = {12 + (Add % 3)}/>);
            Add++;
        }
        this.setState({
            List:this.state.List,
            PrevList:this.state.List,
        });
    };

    DelOne = (bookId) => {
        //let url = "http://localhost:8080/delBook?id=" + bookId.toString();
        let url = BaseUrl + "delBook?id=" + bookId.toString();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //let url1 = "http://localhost:8080/getBooks";
                let url1 = BaseUrl + "getBooks";
                fetch(url1)
                    .then(response => response.json())
                    .then(data1 => {
                        alert("删除成功！");
                        localStorage.removeItem("AdminBooks");
                        localStorage.setItem("AdminBooks", JSON.stringify(data1));
                        this.setState({List : data1, PrevList : data1});
                    })
            })
    }

    AddNewBook = () => {
        //let url = "http://localhost:8080/bookShown";
        let url = BaseUrl + "bookShown";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.bookId === -1){
                    alert("数据库中书籍已全部显示！");
                }
                else{
                    alert("添加成功！");
                    /*let books = JSON.parse(localStorage.getItem("AdminBooks"));
                    books.push(data);
                    localStorage.removeItem("AdminBooks");
                    localStorage.setItem("AdminBooks", JSON.stringify(books));
                    this.setState({List : books, PrevList : books});*/
                    //let url1 = "http://localhost:8080/getBooks";
                    let url1 = BaseUrl + "getBooks";
                    fetch(url1)
                        .then(response => response.json())
                        .then(data1 => {
                            this.setState({List : data1, PrevList : data1});
                        })
                }
            })

    }

    render=()=>{
        return(
            <div className = "BookList">
                <button className = "AdminAdd" onClick = {this.AddNewBook}>
                    添加一本书
                </button>
                <ul className = "books" id = "books">
                    {
                        this.state.List.map((item, index)=>{
                            return <li key ={index}>
                                <AdminBook info = {item} DelOne = {this.DelOne.bind(this)}/>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export {AdminBookList, deleted};
