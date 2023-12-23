import { useContext } from 'react';
import { ImgSrcContext } from '../context/imgSrcContext';

export const useImgSrcContext = () => {
	const context = useContext(ImgSrcContext);
	if (!context) {
		throw new Error(
			'useImgSrcContext must be used inside of a ImgSrcContextProvider'
		);
	}
	return context;
};
