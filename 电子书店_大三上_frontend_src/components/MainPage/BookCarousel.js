import React from 'react';
import '../../css/INDEX.css';
import book1 from "../../assets/carousel/book1.jpg";
import book2 from "../../assets/carousel/book2.jpg";
import book3 from "../../assets/carousel/book3.jpg";
import book4 from "../../assets/carousel/book4.jpg";
import {Link} from "react-router-dom";

const CarouselImgs = [book1, book2, book3, book4];
let num = 0;
class BookCarousel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Src:book1,
        };
    }

    ActiveCarousel = () => {
        let MyDate = new Date();
        let sec = MyDate.getSeconds();
        let type = sec % 12;
        if(type === 0 || type === 1 || type === 2){
            num = 1;
            this.setState({
                Src:CarouselImgs[0],
            })
        }
        else{
            if(type === 3 || type === 4 || type === 5){
                num = 15;
                this.setState({

                   Src:CarouselImgs[1],
                });
            }
            else{
                if(type === 6 || type === 7 || type === 8){
                    num = 13;
                    this.setState({
                        Src:CarouselImgs[2],
                    });
                }
                else{
                    num = 14;
                    this.setState({
                        Src:CarouselImgs[3],
                    });
                }
            }
        }
    }

    render(){
        this.ActiveCarousel = this.ActiveCarousel.bind(this);
        setInterval(this.ActiveCarousel,1000);//设置调用的时间间隔
        //const {info} = this.props;
        return(
            <Link to = {{pathname:"/detail", search : "?id=" + num}}>
                <div className="Carousel">
                    <img alt="CarouselImg" className="carousel" src={this.state.Src}/>
                </div>
            </Link>
        );
    }
}

export default BookCarousel;
