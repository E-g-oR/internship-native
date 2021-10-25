import React, { useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { FormStore } from '../../../store/FormStore';
import { decodeLocation, PostsStore } from '../../../store/store';
import { IPost } from '../Card/CardLogic';
import { FormData } from './FormCreatePost';

const FormCreatePostLogic = (storeForm: FormStore, store: PostsStore) => {

	const [errLatitude, seterrLatitude] = useState('');
	const [errLongtitude, seterrLongtitude] = useState('');
	const [CustomLocation, setCustomLocation] = useState('');
	const [IsButtonDisabled, setIsButtonDisabled] = useState(true);

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
			const countryName = await decodeLocation({ latitude: Number(data.latitude), longtitude: Number(data.longitude) });
			console.log(countryName);

			if (countryName) {
				location = countryName;
				setIsButtonDisabled(false);
			} else setIsButtonDisabled(true);
		}
		setCustomLocation(location);
		return location;
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

	const closeForm = (reset: any): void => {   // TODO change 'reset' type
		setIsButtonDisabled(true);
		setCustomLocation('');
		storeForm.toggleForm();
		reset();
	}


	return { errLatitude, errLongtitude, CustomLocation, IsButtonDisabled, validateCoordinates, checkLocation, createPost, closeForm };
}

export default FormCreatePostLogic;
