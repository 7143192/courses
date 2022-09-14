import {View, StyleSheet} from 'react-native';
import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
export default class WeekCalendar extends React.Component {
  handleDateSelected = (e) => {
    console.log('进入子组件函数！');
    console.log(e);
    let time = e.toString().substring(8, 10);
    console.log('time=', time);
    this.props.handleDateSelected(time);
  };
  render() {
    return (
      <View style={styles.container}>
        <CalendarStrip
          scrollable
          style={{height: 90, paddingTop: 20, paddingBottom: 10, flex: 2}}
          calendarColor={'#3343CE'}
          calendarHeaderStyle={{color: 'white'}}
          dateNumberStyle={{color: 'white'}}
          dateNameStyle={{color: 'white'}}
          iconContainer={{flex: 0.1}}
          onDateSelected={this.handleDateSelected}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
