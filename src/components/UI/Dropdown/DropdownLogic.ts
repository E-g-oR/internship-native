import React, { useState } from 'react';
import { PostsStore } from '../../../store/store';

const DropdownLogic = (store: PostsStore) => {

	const initialValue = 'Please, select the country';
	const [opened, setOpened] = useState(false);
	const [value, setValue] = useState(initialValue);

	const selectCountry = (countryName: string) => {
		setValue(countryName);
		store.setCountryFilter(countryName);
		toggleMenu();
	}

	const toggleMenu = () => {
		setOpened(prev => !prev);
	}

	return { selectCountry, toggleMenu, opened, value }
}

export default DropdownLogic;
