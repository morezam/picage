/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useMemo, ReactNode } from 'react';
import { useImageIdb } from '../hooks/useImageDb';

interface ContextImgSrc {
	src: string | undefined;
	setSrc: (imgSrc: string) => void;
}

export const ImgSrcContext = createContext<ContextImgSrc>({
	src: '',
	setSrc: () => {},
});

export const ImgSrcContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { src, setSrc } = useImageIdb();

	const contextValue = useMemo(() => {
		return { src, setSrc };
	}, [src, setSrc]);

	return (
		<ImgSrcContext.Provider value={contextValue}>
			{children}
		</ImgSrcContext.Provider>
	);
};

// export const useImgSrcContext = () => {
// 	const context = useContext(ImgSrcContext);
// 	if (!context) {
// 		throw new Error(
// 			'useImgSrcContext must be used inside of a ImgSrcContextProvider'
// 		);
// 	}
// 	return context;
// };
