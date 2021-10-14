import { observer } from "mobx-react";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Paragraph, Portal, Provider, Text, TextInput } from "react-native-paper";
import { FormStore } from "../../../store/FormStore";
import { PostsStore } from "../../../store/store";
import { IPost } from "../Card/Card";

type FormData = {
  title: string,
  body: string
}

const createPost = (formData: FormData) => {
  const date = Date.now()
  const userId = 0
  return {
    ...formData,
    id: date,
    userId: userId,
    isFavorite: false
  }
}

const FormCreatePost: React.FC<{ storeForm: FormStore, store: PostsStore }> = observer(({ storeForm, store }) => {

  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const closeForm = (): void => {
    storeForm.toggleForm()
    reset()
  }

  const submit = (data: FormData) => {
    console.log(createPost(data));
    store.addNewPost(createPost(data))
    closeForm()
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