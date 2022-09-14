import React, {useState} from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import down from '../res/downArrow.png';
import up from '../res/upArrow.png';
import {Image, Text, View, StyleSheet} from 'react-native';

export default function Down({
  title,
  imgSource,
  data,
  onChoosed = () => {},
  dataInit = () => {},
  disable = false,
  defValue = '请选择',
}) {
  const [isIcon, setIsIcon] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <ModalDropdown
        disabled={disable}
        style={styles.drop}
        textStyle={styles.dropText}
        dropdownStyle={styles.dropdown}
        dropdownTextStyle={styles.dropdownText}
        dropdownTextHighlightStyle={styles.dropdownTextHighlight}
        renderSeparator={() => <Text style={{height: 0}} />}
        renderRightComponent={() => (
          <Image
            source={!isIcon ? down : up}
            style={{width: 12, height: 15}}
          />
        )}
        options={data}
        defaultValue={defValue}
        onSelect={onChoosed}
        onDropdownWillShow={() => {
          setIsIcon(true);
          dataInit && dataInit();
        }}
        onDropdownWillHide={() => setIsIcon(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '30%',
    // backgroundColor: 'rgba(122,114,128,0.15)',
    marginBottom: 15,
    flexDirection: 'column',
    alignItems: 'center',
    // borderRadius: 10,
    alignSelf: 'center',
    marginLeft: '3%',
  },
  imgStyle: {
    marginLeft: 0,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  titleStyle: {
    fontSize: 16,
    fontWeight:'500',
    color: '#343434',
    // marginLeft: 0,
    // width: 100,
    height: 30,
    textAlign:'center',
    textAlignVertical: 'center',
  },
  drop: {
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#999',
    width: '70%',
    height: 28,
    // backgroundColor: '#ffffff',
  },
  dropText: {
    fontSize: 16,
    color: '#000000',
    // width: 130,
    // height: 72,
    marginLeft:5,
    textAlignVertical: 'center',
  },
  dropdown: {
    width: 80,
    // height: 100,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  dropdownText: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    color: '#343434',
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
  },
  dropdownTextHighlight: {
    flex: 1,
    // backgroundColor: '#fff',
    color: '#7a7280',
  },
  iconStyle: {
    fontSize: 40,
    marginLeft: 30,
  },
});
