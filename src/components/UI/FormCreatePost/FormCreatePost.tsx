import { observer } from "mobx-react";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Paragraph, Portal, Provider, Text, TextInput, Title } from "react-native-paper";
import { FormStore } from "../../../store/FormStore";
import { PostsStore } from "../../../store/store";
import { IPost } from "../Card/Card";

type FormData = {
  title: string,
  body: string,
  latitude: number,
  longitude: number
}

const createPost = (formData: FormData): IPost => {
  const date = Date.now()
  const country = 'any'
  const userId = 0
  return {
    title: formData.title,
    body: formData.body,
    location: {
      latitude: formData.latitude,
      longtitude: formData.longitude,
    },
    country: country,
    id: date,
    userId: userId,
    isFavorite: false
  }
}



const FormCreatePost: React.FC<{ storeForm: FormStore, store: PostsStore }> = observer(({ storeForm, store }) => {

  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const [errLatitude, seterrLatitude] = useState('')
  const [errLongtitude, seterrLongtitude] = useState('')

  const closeForm = (): void => {
    storeForm.toggleForm()
    reset()
  }

  const validateCoordinates = (lat: any, long: any) => {
    if (isNaN(lat)) {
      seterrLatitude(' must be number')
    } else seterrLatitude('')

    if (isNaN(long)) {
      seterrLongtitude(' must be number')
    } else seterrLongtitude('')

    if (!isNaN(lat) && !isNaN(long)) {

      if (lat < -90 && lat > 90) {
        seterrLatitude('Must be between -90 & 90')
      } else seterrLatitude('')

      if (long < -180 && long > 180) {
        seterrLongtitude('Must be between -180 & 180')
      } else seterrLongtitude('')

      if ((lat >= -90 && lat <= 90) && (long >= -180 && long <= 180)) {
        return true
      }
    }
    return false
  }

  const submit = (data: FormData) => {
    const isValid = validateCoordinates(data.latitude, data.longitude)
    if (!isValid) {
      return
    } else {
      console.log(createPost(data));
      store.addNewPost(createPost(data))
      closeForm()
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
              <Title>London, UK</Title>
              <Button onPress={() => { }}>Check</Button>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode="contained" onPress={handleSubmit(submit)} >Add post</Button>
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