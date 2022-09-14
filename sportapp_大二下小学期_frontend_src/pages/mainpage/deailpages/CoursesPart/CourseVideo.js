import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Modal,
    StyleSheet,
    TouchableWithoutFeedbackBase,
    Image,
    Alert,
} from 'react-native';
import {ParallelPicker} from 'react-native-slidepicker';
import SAButton from '../../../../components/SAButton';
import VideoPlayer from 'react-native-video-controls';
import BaseUrl from '../../../../utils/constants';
import left from '../../../../res/leftArrow1.png';
import SyncStorage from "../../../../utils/syncStorage";

let time = [
    [
        {name: 5, id: 1},
        {name: 10, id: 2},
        {name: 15, id: 3},
        {name: 20, id: 4},
        {name: 25, id: 5},
        {name: 30, id: 6},
        {name: 35, id: 7},
        {name: 40, id: 8},
        {name: 45, id: 9},
    ],
];

class BackTitle extends Component {
    render() {
        // goBack
        return (
            <View>
                {/*<StatusBar*/}
                {/*  backgroundColor="transparent"*/}
                {/*  translucent={true}*/}
                {/*/>*/}
                <ImageBackground
                    source={require('../../../../res/headbg.png')}
                    style={{
                        height: 70,
                        flexDirection: 'row',
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                        onPress={this.props.handleBack}
                        style={{width: 80, flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            source={left}
                            style={{
                                width: 40,
                                height: 40,
                            }}
                        />
                    </TouchableOpacity>

                    <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                        {this.props.title}
                    </Text>

                    <Text
                        onPress={this.props.onRightPress || function () {}}
                        style={{width: 80, color: '#fff', textAlign: 'right'}}>
                        {this.props.rightText}
                    </Text>
                </ImageBackground>
            </View>
        );
    }
}

class CourseVideo extends Component {


    handleBack = () => {
            this.props.navigation.goBack(); //若已经结束，则可以直接返回
     };

    render() {

        console.log(this.props.route.params);
        return (
            <View
                style={{
                    height: '100%',
                }}>
                <BackTitle
                    title={this.props.route.params.info.name}
                    handleBack={this.handleBack}
                />
                <View
                    style={{
                        height: '100%',
                        alignItems: 'center',
                        backgroundColor:'#000'
                    }}>
                    <View
                        style={{
                            height: '60%',
                            width: '100%',
                            backgroundColor: '#666',
                        }}>
                        <VideoPlayer
                            disableBack={true}
                            repeat={true}
                            source={{uri: this.props.route.params.info.url}}
                        />
                    </View>
                    <View
                        style={{
                            height: '10%',
                            padding: 10,
                            width: '100%',
                        }}>
                        <Text style={styles.text1}>
                            {this.props.route.params.info.name}
                        </Text>
                    </View>


                </View>
            </View>
        );
    }
}

export default CourseVideo;

const styles = StyleSheet.create({
    backgroundVideo: {
        width: '100%',
        height: '100%',
    },
    text1: {
        color: '#666',
        fontSize: 20,
        fontWeight: 'bold',
    },
    text2: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
    },
    countDown: {
        color: '#fff',
        fontSize: 110,
        fontWeight: 'bold',
    },
    page: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        // zIndex: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#eee',
    },
    head: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
});
