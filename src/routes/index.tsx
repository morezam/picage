import { RouteObject } from 'react-router-dom';
import Home from '../pages';
import Crop from '../pages/crop';
import Text from '../pages/text';
import Draw from '../pages/draw';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/crop',
		element: <Crop />,
	},
	{
		path: '/text',
		element: <Text />,
	},
	{
		path: '/draw',
		element: <Draw />,
	},
];
