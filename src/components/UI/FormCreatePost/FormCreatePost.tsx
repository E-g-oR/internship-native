import { observer } from "mobx-react";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Paragraph, Portal, Provider, Text, TextInput, Title } from "react-native-paper";
import { FormStore } from "../../../store/FormStore";
import { decodeLocation, PostsStore } from "../../../store/store";
import { IPost } from "../Card/Card";

type FormData = {
  title: string,
  body: string,
  latitude: string,
  longitude: string,
}

const createPost = (formData: FormData, country: string): IPost => {
  const date = Date.now()
  const userId = 0
  return {
    title: formData.title,
    body: formData.body,
    location: {
      latitude: Number(formData.latitude),
      longtitude: Number(formData.longitude),
    },
    country,
    id: date,
    userId: userId,
    isFavorite: false
  }
}



const FormCreatePost: React.FC<{ storeForm: FormStore, store: PostsStore }> = observer(({ storeForm, store }) => {

  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const [errLatitude, seterrLatitude] = useState('');
  const [errLongtitude, seterrLongtitude] = useState('');
  const [CustomLocation, setCustomLocation] = useState('')
  const [IsButtonDisabled, setIsButtonDisabled] = useState(true);

  const closeForm = (): void => {
    setIsButtonDisabled(true);
    setCustomLocation('');
    storeForm.toggleForm();
    reset();
  }

  const validateCoordinates = (lat: any, long: any) => {
    let errCount = 0;
    if (isNaN(lat)) {
      errCount++;
      seterrLatitude('Must be a number')
    } else {
      if (lat < -90 || lat > 90) {
        errCount++;
        seterrLatitude('Must be -90 <= latitude <= 90')
      } else seterrLatitude('')
    }

    if (isNaN(long)) {
      errCount++;
      seterrLongtitude('Must be a number')
    } else {
      if (long < -180 || long > 180) {
        errCount++;
        seterrLongtitude('Must be between -180 <= longitude <= 180')
      } else seterrLongtitude('')
    }
    console.log(errCount);
    if (errCount === 0) {
      return true
    }

    return false
  }

  const checkLocation = async (data: FormData) => {
    const isValid = validateCoordinates(data.latitude, data.longitude)
    let location = '';
    if (isValid) {
      const countryName = await decodeLocation({ latitude: Number(data.latitude), longtitude: Number(data.longitude) })
      console.log(countryName);

      if (countryName) {
        location = countryName
        setIsButtonDisabled(false)
      } else setIsButtonDisabled(true)
    }
    setCustomLocation(location)
    return location
  }

  const submit = (data: FormData) => {
    const isValid = validateCoordinates(data.latitude, data.longitude)
    if (isValid) {
      const newPost = createPost(data, CustomLocation);
      store.addNewPost(newPost);
      closeForm();
    }
  }

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={storeForm.isOpen} onDismiss={closeForm}>
            <Dialog.Title>Create new post</Dialog.Title>
            <Dialog.Content>
              <Controller
                name="title"
                control={control}
                rules={{ required: { value: true, message: 'Please fill this' } }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    error={!!errors.title}
                    label="Post title"
                    mode='outlined'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                name="body"
                control={control}
                rules={{ required: { value: true, message: 'Please fill this' } }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    error={!!errors.body}
                    style={styles.inputBody}
                    label="Post body"
                    mode='outlined'
                    multiline
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                name="latitude"
                control={control}
                rules={{ required: { value: true, message: 'Please fill this' } }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    keyboardType="numeric"
                    error={!!errors.latitude}
                    style={styles.inputBody}
                    label="latitude"
                    mode='outlined'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Text>{errLatitude}</Text>
              <Controller
                name="longitude"
                control={control}
                rules={{ required: { value: true, message: 'Please fill this' } }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    keyboardType="numeric"
                    error={!!errors.longitude}
                    style={styles.inputBody}
                    label="longitude"
                    mode='outlined'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Text>{errLongtitude}</Text>
              <Title>{CustomLocation}</Title>
              <Button mode="contained" onPress={handleSubmit(checkLocation)}>Check</Button>
            </Dialog.Content>
            <Dialog.Actions>
              <Button disabled={IsButtonDisabled} mode="contained" onPress={handleSubmit(submit)} >Add post</Button>
              <Button mode="outlined" onPress={closeForm} >Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  )
})

export default FormCreatePost;

const styles = StyleSheet.create({
  popup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  inputBody: {
    paddingVertical: 15
  }
})