import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import COLOR, {
  BG_COLOR,
  HEIGHT,
  PADDING_HORIZONTAL,
  PADDING_TOP,
  WIDTH,
} from '../../utilities';

import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { UserContext } from '../../provider/Provider';
interface Report {
  id: number;
  name: string;
  screen: string;
  vector: any;
  description: string;
}

const Report = (props: any) => {
  const { navigation }: NativeStackHeaderProps = props;
  const { addReport } = useContext(UserContext);
  const [inputText, setInputText] = useState('');
  const [selected, setSelected] = React.useState('');

  const [description, setDescription] = useState('');


  const [img, setImg] = useState('');


  const handleReport = async () => {
    try {
      const reference = storage().ref(`${uuid.v4()}.jpg`);
      console.log(img);
      await reference.putFile(img);
      const urlImage = await reference.getDownloadURL();
      console.log(urlImage);
      const response = await addReport({ inputText, selected, urlImage, description });
      if(response){
        navigation.goBack();
      }else{
        console.warn("Request Failed");
        
      }
    } catch (error) {
      console.log(error);

    }
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result: any = await launchCamera({
          mediaType: 'photo',
          cameraType: 'front',
        });
        setImg(result ? result.assets[0].uri : '');
      } else {
        console.log('Từ chối');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Camera

  const requestCameraPermissionPhoto = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera Ok');
        //Mở thư viện ảnh
        const result: any = await launchImageLibrary({ mediaType: 'photo' });
        console.log(result.assets[0].uri);
        setImg(result ? result.assets[0].uri : '');
      } else {
        console.log('Từ chối');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const data = [
    { key: '1', value: 'Cơ sở vật chất' },
    { key: '2', value: 'Thiết bị mạng' },
    { key: '3', value: 'Vệ sinh phòng học' },
    { key: '4', value: 'Góp ý phòng học' },
    { key: '5', value: 'Sự cố khác' },
  ];
  return (
    <ScrollView
      style={{
        backgroundColor: COLOR.white,
        width: WIDTH,
        height: HEIGHT,
        paddingHorizontal: PADDING_HORIZONTAL,
        paddingTop: PADDING_TOP,
      }}>
      {/* <Pressable onPress={() => navigation.goBack()}>
                <Icon name='chevron-back' size={26} />
            </Pressable> */}
      <Text
        style={{
          color: 'red',
          fontSize: 30,
          textAlign: 'center',
          marginTop: 10,
          fontWeight: 'bold',
        }}>
        BÁO CÁO SỰ CỐ
      </Text>

      <View style={styles.text}>
        <TextInput placeholder="Phòng" value={inputText} onChangeText={setInputText} />
      </View>

      <View style={styles.dropdown}>
        <SelectList
          setSelected={(val: any) => setSelected(val)}
          data={data}
          save="value"
          placeholder="Sự cố đang gặp phải"
        />

        <View style={styles.description}>
          <TextInput
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <View style={styles.image}>
            <TouchableOpacity onPress={requestCameraPermission}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../../assets/camera.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.image}>
            <TouchableOpacity onPress={requestCameraPermissionPhoto}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../../assets/image.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          {img != '' ? (
            <Image
              source={{ uri: img }}
              style={{ width: '40%', height: 100, marginTop: 20 }}
            />
          ) : (
            ''
          )}
        </View>
        <View>
          <Button onPress={handleReport} style={styles.button} textColor="white">
            Gửi yêu cầu
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    color: BG_COLOR,
  },
  text: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  dropdown: {
    marginTop: 20,
  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: 350,
    height: 150,
  },
  textArea: {
    paddingVertical: 0,
  },
  description: {
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
    height: HEIGHT * 0.3
  },
  button: {
    backgroundColor: 'orange',
    marginTop: 20,
    borderRadius: 10,
  },
  image: {
    backgroundColor: '#eaeaea',
    width: 170,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
