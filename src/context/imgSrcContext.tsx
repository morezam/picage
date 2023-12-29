import { createContext, useMemo, ReactNode } from 'react';
import { useImageIdb } from '../hooks/useImageDb';

interface ContextImgSrc {
	src: string | undefined;
	setSrc: (imgSrc: string) => void;
	undo: () => void;
	redo: () => void;
	clear: () => void;
}

export const ImgSrcContext = createContext<ContextImgSrc>({
	src: '',
	setSrc: () => {},
	undo: () => {},
	redo: () => {},
	clear: () => {},
});

export const ImgSrcContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { src, setSrc, undo, redo, clear } = useImageIdb();

	const contextValue = useMemo(() => {
		return { src, setSrc, undo, redo, clear };
	}, [src, setSrc, undo, redo, clear]);

	return (
		<ImgSrcContext.Provider value={contextValue}>
			{children}
		</ImgSrcContext.Provider>
	);
};
