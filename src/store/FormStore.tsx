import { makeAutoObservable } from "mobx";

export class FormStore {

  isOpen: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  toggleForm() {
    this.isOpen = !this.isOpen
  }
}

const storeForm: FormStore = new FormStore()

export default storeForm