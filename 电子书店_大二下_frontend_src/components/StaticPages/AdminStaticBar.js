import React from 'react'
import '../../css/INDEX.css'
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import {Card} from "antd";

class AdminStaticBar extends React.Component{
    getOption =()=> {
        let {info} = this.props;
        let option = {
            title:{
                text:(this.props.type === 1 ? '月热销榜-柱状图' : "月度用户消费榜-柱状图"),
                x:'center'
            },
            tooltip:{
                trigger:'axis',
            },
            xAxis:{
                data:["第一名","第二名", "第三名", "第四名", "第五名", "第六名"],
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:(this.props.type === 1 ? '销售量' : "消费金额"),
                    type:'bar',   //这块要定义type类型，柱形图是bar,饼图是pie
                    data:info.map((item, index) => {
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
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:'400px'}}/>
                </Card>
            </div>
        )
    }
}

export default AdminStaticBar;
