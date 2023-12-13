import { RouteObject } from 'react-router-dom';
import Home from '../pages';
import Crop from '../pages/crop';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/crop',
		element: <Crop />,
	},
];
