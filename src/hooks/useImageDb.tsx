import { useState, useEffect } from 'react';
import { addImage, currentImageSrc } from '../utils/db';

export function useImageIdb() {
	const [src, setStoredValue] = useState<string | undefined>(undefined);

	useEffect(() => {
		currentImageSrc().then(src => setStoredValue(src));
	}, []);

	const setSrc = (value: string) => {
		try {
			setStoredValue(value);
			addImage(value as string);
		} catch (error) {
			console.log(error);
		}
	};

	return { src, setSrc } as const;
}
