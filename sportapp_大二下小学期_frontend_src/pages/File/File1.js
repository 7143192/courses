import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  ImageBackgroundComponent,
  ScrollView,
} from 'react-native';
import SAButton from '../../components/SAButton';
export default class File1 extends React.Component {
  render() {
    return (
      <ScrollView style={{flex: 1, flexDirection: 'column'}}>
        <Text style={styles.title}>用户协议</Text>
        <View>
          <Text style={styles.wordStyle}>
            欢迎阅读《APP用户服务协议》(以下简称“本协议”)。本协议阐述之条款和条件适用于您（以下简称“用户”）使用APP的各种产品和服务。
          </Text>
          <Text style={styles.wordStyle}> 1. 服务协议的确认 .</Text>
          <Text style={styles.wordStyle}>2. 服务内容 .</Text>
          <Text style={styles.wordStyle}>3. 服务变更、中断或终止 .</Text>
          <Text style={styles.wordStyle}>4. 使用规则 .</Text>
          <Text style={styles.wordStyle}>5. 知识产权 .</Text>
          <Text style={styles.wordStyle}>6. 隐私保护 .</Text>
          <Text style={styles.wordStyle}>7. 免责声明 .</Text>
          <Text style={styles.wordStyle}>8. 其他条款 .</Text>
          <Text style={styles.wordStyle}>
            本协议的版权以及解释权归酷跑APP官方所有。
          </Text>
        </View>
        <SAButton
          style={{
            width: '60%',
            height: 50,
            marginLeft: '17%',
            marginTop: '5%',
          }}
          onPress={() => {
            this.props.navigation.navigate('PwdLogIn');
          }}>
          同意并继续
        </SAButton>
        <Text style={{color: '#d71313', marginLeft: '25%'}}>
          不同意并提出意见
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginLeft: '30%',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  wordStyle: {
    color: '#050505',
    fontSize: 14,
    marginTop: '2%',
  },
});
