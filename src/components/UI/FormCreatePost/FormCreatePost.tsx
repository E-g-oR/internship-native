import React from "react";
import { observer } from "mobx-react";
import { Controller, useForm } from "react-hook-form";
import { PostsStore } from "../../../store/store";
import { FormStore } from "../../../store/FormStore";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Provider, Text, TextInput, Title } from "react-native-paper";
import FormCreatePostLogic from "./FormCreatePostLogic";

export type FormData = {
  title: string,
  body: string,
  latitude: string,
  longitude: string,
}

const FormCreatePost: React.FC<{ storeForm: FormStore, store: PostsStore }> = observer(({ storeForm, store }) => {

  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const { errLatitude, errLongtitude,
    CustomLocation, IsButtonDisabled,
    checkLocation, closeForm,
    createPost, validateCoordinates
  } = FormCreatePostLogic(storeForm, store);

  const submit = (data: FormData) => {
    const isValid = validateCoordinates(data.latitude, data.longitude)
    if (isValid) {
      const newPost = createPost(data, CustomLocation);
      store.addNewPost(newPost);
      closeForm(reset);
    }
  }

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={storeForm.isOpen} onDismiss={() => { closeForm(reset) }}>
            <Dialog.Title>Create new post</Dialog.Title>
            <Dialog.Content>
              <Controller
                name="title"
                control={control}
                rules={{ required: { value: true, message: "Please fill this" } }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    error={!!errors.title}
                    label="Post title"
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                name="body"
                control={control}
                rules={{ required: { value: true, message: "Please fill this" } }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    error={!!errors.body}
                    style={styles.inputBody}
                    label="Post body"
                    mode="outlined"
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
                rules={{ required: { value: true, message: "Please fill this" } }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    keyboardType="numeric"
                    error={!!errors.latitude}
                    style={styles.inputBody}
                    label="latitude"
                    mode="outlined"
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
                rules={{ required: { value: true, message: "Please fill this" } }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    keyboardType="numeric"
                    error={!!errors.longitude}
                    style={styles.inputBody}
                    label="longitude"
                    mode="outlined"
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
              <Button mode="outlined" onPress={() => { closeForm(reset) }} >Cancel</Button>
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
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  inputBody: {
    paddingVertical: 15
  }
})