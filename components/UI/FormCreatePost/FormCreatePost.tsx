import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Paragraph, Portal, Provider, Text, TextInput } from "react-native-paper";
import { FormStore } from "../../../store/FormStore";

const FormCreatePost: React.FC<{ storeForm: FormStore }> = observer(({ storeForm }) => {

  const closeForm = (): void => {
    storeForm.toggleForm()
  }

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={storeForm.isOpen} onDismiss={closeForm}>
            <Dialog.Title>Create new post</Dialog.Title>
            <Dialog.Content>
              <TextInput label="Post title" mode='outlined' />
              <TextInput style={styles.inputBody} label="Post body" mode='outlined' multiline />
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode="contained" >Add post</Button>
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