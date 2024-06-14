import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { launchCamera } from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import { createReview } from '../store/reviewSlice';
import { PermissionsAndroid } from 'react-native';

const AddReviewScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED
      ) 
      {
        Alert.alert('Permissions not granted', 'Please grant all the required permissions in the app settings.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleImagePicker = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else if (response.assets && response.assets.length > 0) {
          setImage(response.assets[0]);
        }
      }
    );
  };

  const handleSave = () => {
    Geolocation.getCurrentPosition(
      position => {
        const location = position.coords;

        dispatch(createReview({
          id: new Date().getTime(),
          title,
          description,
          image,
          location,
          comments: [],
        }));
        navigation.goBack();
      },
      error => console.log(error)
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Pick Image" onPress={handleImagePicker} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
      )}
      <Button title="Save Review" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
});

export default AddReviewScreen;
