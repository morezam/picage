import { useState, useEffect } from 'react';
import {
	addImage,
	currentImageSrc,
	imgRedo,
	imgUndo,
	clearAll,
} from '../utils/db';

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

	const undo = () => {
		imgUndo();
		currentImageSrc().then(src => setStoredValue(src));
	};

	const redo = () => {
		imgRedo();
		currentImageSrc().then(src => setStoredValue(src));
	};

	const clear = () => {
		clearAll();
		currentImageSrc().then(src => setStoredValue(src));
	};

	return { src, setSrc, undo, redo, clear } as const;
}
