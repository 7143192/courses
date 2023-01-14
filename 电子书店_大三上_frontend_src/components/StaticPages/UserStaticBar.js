import React from 'react';
import '../../css/INDEX.css';
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import {Card} from "antd";

export default class UserStaticBar extends React.Component{
    constructor(props) {
        super(props);
        this.getOption.bind(this);
        this.handleName.bind(this);
    }

    handleName = (name) => {
        let ans = "";
        if(name.length > 4){
            let name1 = name.substring(0, 3);
            name1 += "...";
            ans = name1;
        }
        else ans = name;
        return ans;
    }

    getOption = () => {
        //let {info} = this.props;
        let option = {
            title:{
                text:("用户月度消费信息"),
                x:'center'
            },
            tooltip:{
                trigger:'axis',
            },
            yAxis:{
                data:this.props.info1.map((item, index) => {
                    return this.handleName(item.key.bookName);
                })
            },
            xAxis:{
                type:'value'
            },
            series:[
                {
                    name:("购买量"),
                    type:'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data:this.props.info1.map((item, index) => {
                        return item.value;
                    }),
                }
            ]
        }
        return option;
    }

    render(){
        return(
            <div className = "AdminStaticBar">
                <Card>
                    <ReactEcharts option={this.getOption()} theme="Imooc"
                                  style={{height:'600px'}} className = "UserChart"/>
                </Card>
            </div>
        )
    }
}
