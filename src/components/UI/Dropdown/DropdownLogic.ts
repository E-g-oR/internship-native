import React, { useState } from "react";
import { PostsStore } from "../../../store/store";

const DropdownLogic = (store: PostsStore) => {
  const initialValue = "Please, select the country";
  // const [opened, setOpened] = useState(false);
  // const [value, setValue] = useState(initialValue);
  let opened = false;
  let value = initialValue;

  const selectCountry = (countryName: string) => {
    value = countryName;
    store.setCountryFilter(countryName);
    toggleMenu();
  };

  const toggleMenu = () => {
    opened = !opened;
  };

  return { selectCountry, toggleMenu, opened, value };
};

export default DropdownLogic;
