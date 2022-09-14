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
      <Text style={styles.titleStyle}>{title}:</Text>
      <ModalDropdown
        disabled={disable}
        style={styles.drop}
        textStyle={styles.dropText}
        dropdownStyle={styles.dropdown}
        dropdownTextStyle={styles.dropdownText}
        dropdownTextHighlightStyle={styles.dropdownTextHighlight}
        renderSeparator={() => <Text style={{height: 0}} />}
        renderRightComponent={() => (
          <Image source={!isIcon ? down : up} style={{width: 20, height: 20}} />
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
    height: 50,
    width: '80%',
    // backgroundColor: 'rgba(100,129,161,0.13)',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: 25,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imgStyle: {
    marginLeft: 40,
    width: 54,
    height: 53,
    resizeMode: 'contain',
  },
  titleStyle: {
    fontSize: 16,
    color: '#050505',
    marginLeft: 30,
    width: 100,
    height: 76,
    textAlignVertical: 'center',
  },
  drop: {
    justifyContent: 'center',
    borderRadius: 10,
    width: '50%',
    height: 40,
    paddingLeft: 13,
    backgroundColor: 'rgba(122,114,128,0.15)',
  },
  dropText: {
    fontSize: 16,
    color: '#343434',
    textAlignVertical: 'center',
  },
  dropdown: {
    width: 120,
    height: 130,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  dropdownText: {
    fontSize: 14,
    // width: 197,
    textAlign: 'center',
    color: '#343434',
    // borderRadius: 5,
    backgroundColor: '#f3f3f3',
  },
  dropdownTextHighlight: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    color: '#343434',
  },
  iconStyle: {
    fontSize: 40,
    marginLeft: 30,
  },
});
