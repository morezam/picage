/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useMemo, ReactNode } from 'react';
import { useImageIdb } from '../hooks/useImageDb';

interface ContextImgSrc {
	src: string | undefined;
	setSrc: (imgSrc: string) => void;
	undo: () => void;
	redo: () => void;
}

export const ImgSrcContext = createContext<ContextImgSrc>({
	src: '',
	setSrc: () => {},
	undo: () => {},
	redo: () => {},
});

export const ImgSrcContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { src, setSrc, undo, redo } = useImageIdb();

	const contextValue = useMemo(() => {
		return { src, setSrc, undo, redo };
	}, [src, setSrc, undo, redo]);

	return (
		<ImgSrcContext.Provider value={contextValue}>
			{children}
		</ImgSrcContext.Provider>
	);
};
