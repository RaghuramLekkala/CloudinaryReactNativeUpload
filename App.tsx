/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const App: React.FC = () => {
  const [photo, setPhoto] = useState(
    'https://res.cloudinary.com/dhgn9tq4j/image/upload/v1666764536/cld-sample-2.jpg',
  );

  const cloudinaryUpload = photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'CloudUpload');
    data.append('cloud_name', 'dhgn9tq4j');
    fetch('https://api.cloudinary.com/v1_1/dhgn9tq4j/upload', {
      method: 'post',
      body: data,
    })
      .then(res => {
        res.json();
        setPhoto(photo.uri);
      })
      .catch(err => {
        console.log('err.response.data', err);
        Alert.alert('An Error Occured While Uploading', err);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Image source={{uri: photo}} style={[StyleSheet.absoluteFill]} />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.uploadHeaderStyle}>Upload Picture</Text>
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary(
              {mediaType: 'photo', selectionLimit: 1},
              response => {
                console.log('response', response);
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                  console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                  const uri = response?.assets?.[0].uri;
                  const type = response?.assets?.[0].type;
                  const name = response?.assets?.[0].fileName;
                  const source = {
                    uri,
                    type,
                    name,
                  };
                  cloudinaryUpload(source);
                }
              },
            );
          }}
          style={styles.openGalaryStyle}>
          <Text>Open Galary</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  uploadHeaderStyle: {
    fontStyle: 'normal',
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 24,
    fontSize: 16,
  },
  openGalaryStyle: {
    backgroundColor: 'orange',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
});

export default App;
