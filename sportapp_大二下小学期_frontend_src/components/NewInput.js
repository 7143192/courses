import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class NewInput extends Component {
  static propTypes = {
    inputStyle: TextInput.propTypes.style,
    labelTextStyle: TextInput.propTypes.style,
    placeholderTextColor: PropTypes.string,
    isUpdate: PropTypes.bool,
    readonly: PropTypes.bool,
    textInputStyle: TextInput.propTypes.style,
    autoCapitalize: PropTypes.oneOf([
      'characters',
      'words',
      'sentences',
      'none',
    ]),
    label: PropTypes.string,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholderTextColor: '#ccc8c4',
    autoCapitalize: 'none',
    isUpdate: true,
    readonly: false,
    label: '文本输入框',
    placeholder: '请输入',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      textAlign: 'right',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value});
    }
  }

  _onChangeText = val => {
    this.setState({value: val});
    this.props.onChange &&
      this.props.onChange(val.replace(/(^\s*)|(\s*$)/g, ''));
  };

  _onBlur = e => {
    const {onBlur} = this.props;
    onBlur && onBlur(e);
    this.setState({
      textAlign: 'right',
    });
  };

  _onFocus = e => {
    const {onFocus} = this.props;
    onFocus && onFocus(e);
    this.setState({
      textAlign: 'left',
    });
  };

  _renderInputContent = () => {
    const {
      textInputStyle,
      placeholderTextColor,
      autoCapitalize,
      isUpdate,
      suffix,
      secureTextEntry,
    } = this.props;
    return isUpdate ? (
      <View
        style={[
          {flexDirection: 'row', flex: 1, height: '100%'},
          styles.center,
        ]}>
        <TextInput
          {...this.props}
          onChangeText={this._onChangeText}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          style={[
            {
              textAlign:
                this.state.value === 0 || this.state.value
                  ? this.state.textAlign
                  : 'left',
              flex: 1,
              fontSize: 14,
              color: '#332f2b',
            },
            textInputStyle,
          ]}
          placeholderTextColor={placeholderTextColor}
          value={String(this.state.value)}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          underlineColorAndroid="transparent"
        />
        <Text style={{marginRight: 10}}>
          {suffix && suffix.length > 3 ? '' : suffix}
        </Text>
      </View>
    ) : (
      <View
        style={[
          {
            flexDirection: 'row',
            flex: 1,
            height: '100%',
            backgroundColor: '#f7f6f5',
          },
          styles.center,
        ]}>
        <Text
          style={{
            textAlign: this.state.value ? this.state.textAlign : 'left',
            flex: 1,
          }}>
          {this.state.value}
        </Text>
        <Text style={{marginRight: 10}}>
          {suffix && suffix.length > 3 ? '' : suffix}
        </Text>
      </View>
    );
  };

  _renderTextAreaContent = () => {
    const {textInputStyle, placeholderTextColor, autoCapitalize, isUpdate} =
      this.props;
    return isUpdate ? (
      <TextInput
        numberOfLines={4}
        {...this.props}
        multiline={true}
        onChangeText={this._onChangeText}
        onBlur={this._onBlur}
        onFocus={this._onFocus}
        style={[
          {
            marginVertical: 5,
            height: 60,
            marginHorizontal: 10,
            textAlign: 'left',
            flex: 1,
          },
          textInputStyle,
        ]}
        placeholderTextColor={placeholderTextColor}
        value={String(this.state.value)}
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        underlineColorAndroid="transparent"
      />
    ) : (
      <Text
        style={[
          {
            marginVertical: 5,
            height: 60,
            marginHorizontal: 10,
            textAlign: 'left',
            flex: 1,
            backgroundColor: '#f7f6f5',
          },
          textInputStyle,
        ]}>
        {this.state.value}
      </Text>
    );
  };

  render() {
    const {label, labelTextStyle, required, mode} = this.props;
    if (mode === 'TextArea') {
      return (
        <View
          style={{
            height: 108,
            width: '100%',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderColor: '#eae6e4',
            marginVertical: 5,
            borderBottomWidth: 0.5,
            backgroundColor: '#fff',
          }}>
          <Text style={[{fontSize: 15}, labelTextStyle]}>
            {label}
            {required ? (
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#F00'}}>
                *
              </Text>
            ) : null}
          </Text>
          {this._renderTextAreaContent()}
        </View>
      );
    }
    return (
      <View
        style={[
          {
            height: 36,
            width: '100%',
            backgroundColor: '#fff',
            flexDirection: 'row',
            borderColor: '#eae6e4',
            borderBottomWidth: 0.5,
          },
          styles.center,
        ]}>
        <Text
          style={[
            {
              width: 100,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginLeft: 15,
              fontSize: 14,
              color: '#514b46',
            },
            labelTextStyle,
          ]}>
          {label}
          {required ? (
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#F00'}}>
              *
            </Text>
          ) : null}
        </Text>
        {this._renderInputContent()}
      </View>
    );
  }
}

export default NewInput;
