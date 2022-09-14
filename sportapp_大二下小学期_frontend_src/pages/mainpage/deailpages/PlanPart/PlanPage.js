import * as React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import plan from '../../../../res/plan.png';
import WeekCalendar from '../../../../components/WeekCalendar';
import sportClass from '../../../../res/sportClass1.png';
import star from '../../../../res/star.png';
import Stars from '../../../../components/Stars';
let data = [
  ['训练计划1', 5],
  ['训练计划2', 4],
  ['训练计划3', 3],
  ['训练计划4', 2],
  ['训练计划5', 1],
  ['训练计划6', 5],
];
class SportPlanInfo extends React.Component {
  handleNav = e => {
    this.props.handleNav(e);
  };
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.handleNav('CourseDetail');
        }}
        activeOpacity={0.6}>
        <ImageBackground
          source={this.props.img}
          style={{
            width: 350,
            height: 120,
            marginBottom: '2%',
            marginLeft: '1.5%',
          }}
          imageStyle={{opacity: 0.7, borderRadius: 20}}>
          <View>
            <Text style={styles.sportName}>{this.props.sportName}</Text>
            <View style={{flexDirection: 'column', marginTop: '6%'}}>
              <Text style={{marginLeft: 8, color: '#ffffff', fontSize: 14}}>
                推荐指数:&nbsp;
                <Stars nums={this.props.stars} />
              </Text>
              <Text style={{color: '#ffffff', marginLeft: 8}}>
                持续时间:&nbsp;<Text style={{color: '#050505'}}>2</Text>&nbsp;周
              </Text>
              <Text style={{marginLeft: 8, color: '#ffffff'}}>
                已有&nbsp;
                <Text style={{fontSize: 16, color: '#050505'}}>10</Text>&nbsp;
                万人正在练!
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default class PlanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: '',
      selectedMonth: '',
    };
  }
  componentDidMount = () => {
    let date = new Date();
    //date = date.format('YYYY-MM-DD');
    console.log('date=', date);
    this.setState({selectedDay: date.toString().substring(8, 10)});
  };

  handleDateSelected = date => {
    this.setState({
      selectedDay: date,
    });
    console.log(this.state.selectedMonth);
  };
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <WeekCalendar handleDateSelected={this.handleDateSelected} />
        <View style={{flex: 8}}>
          <Text style={styles.title}>{this.state.selectedDay}日计划</Text>
          <View style={styles.part1}>
            <Text style={{marginLeft: '10%'}}>
              计划目标:<Text style={styles.details}>从xxx斤到yyy斤</Text>
            </Text>
            <Text style={{marginLeft: '10%'}}>
              计划类型:<Text style={styles.details}>减脂计划</Text>
            </Text>
          </View>
          <View style={styles.part2}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                marginLeft: '3%',
                marginTop: '2%',
              }}>
              <Text style={styles.InfoTitle}>今日运动消耗:</Text>
              <Text style={styles.detailInfo}>
                <Text style={styles.current}>0</Text>&nbsp;/&nbsp;
                <Text style={styles.total}>200千卡</Text>
              </Text>
              <Text style={styles.InfoTitle}>运动时长:</Text>
              <Text style={styles.detailInfo}>
                <Text style={styles.current}>0</Text>&nbsp;/&nbsp;
                <Text style={styles.total}>60分钟</Text>
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'column', marginTop: '2%'}}>
              <Text style={styles.InfoTitle}>今日得分:</Text>
              <Text style={styles.total}>0&nbsp;/&nbsp;10</Text>
              <Text style={styles.otherInfo}>今日训练计划&nbsp;>></Text>
              <Text style={styles.otherInfo}>今日饮食安排&nbsp;>></Text>
            </View>
          </View>
          <View style={{flex: 10, flexDirection: 'column'}}>
            <Text style={styles.IntroTitle}>推荐训练计划</Text>
            <ScrollView>
              {data.map((item, index) => {
                return (
                  <SportPlanInfo
                    img={sportClass}
                    sportName={item[0]}
                    stars={item[1]}
                    key={index}
                    handleNav={this.props.handleNav}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#050505',
    fontSize: 20,
    marginLeft: '35%',
  },
  part1: {
    flex: 2,
    flexDirection: 'column',
    width: '80%',
    height: '10%',
    marginLeft: '9%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#e1b4f3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  details: {
    color: '#dc1313',
    fontSize: 16,
  },
  part2: {
    flex: 5,
    flexDirection: 'row',
    marginLeft: '4%',
    width: '90%',
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 20,
  },
  InfoTitle: {
    marginBottom: '2%',
    color: '#050505',
  },
  detailInfo: {
    marginBottom: '1%',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#050505',
  },
  current: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1528f1',
  },
  otherInfo: {
    marginTop: '3%',
    fontSize: 16,
    color: '#1528f1',
  },
  IntroTitle: {
    marginLeft: '30%',
    fontSize: 20,
    color: '#050505',
  },
  classView: {
    marginLeft: '1.5%',
    marginTop: '2%',
  },
  sportName: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
