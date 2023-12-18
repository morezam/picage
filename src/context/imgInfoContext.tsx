/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useMemo, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ImagInfo {
	src: string;
	name: string;
}

interface ContextImgInfo {
	imgInfo: ImagInfo;
	setImgInfo: (imgInfo: ImagInfo) => void;
}

interface ImgInfoContextProviderProps {
	children: ReactNode;
}

const initialState = {
	src: '',
	name: '',
};

const ImgInfoContext = createContext<ContextImgInfo>({
	imgInfo: initialState,
	setImgInfo: () => {},
});

export const ImgInfoContextProvider = ({
	children,
}: ImgInfoContextProviderProps) => {
	const [imgInfo, setImgInfo] = useLocalStorage('imgInfo', initialState);

	const contextValue = useMemo(() => {
		return { imgInfo, setImgInfo };
	}, [imgInfo, setImgInfo]);

	return (
		<ImgInfoContext.Provider value={contextValue}>
			{children}
		</ImgInfoContext.Provider>
	);
};

export const useImgInfoContext = () => {
	const context = useContext(ImgInfoContext);
	if (!context) {
		throw new Error(
			'useImgInfoContext must be used inside of a ImgInfoContextProvider'
		);
	}
	return context;
};
