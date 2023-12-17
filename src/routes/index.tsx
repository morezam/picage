import { RouteObject } from 'react-router-dom';
import Home from '../pages';
import Crop from '../pages/crop';
import Text from '../pages/text';
import Draw from '../pages/draw';
import Square from '../pages/square';

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
	{
		path: '/square',
		element: <Square />,
	},
];
