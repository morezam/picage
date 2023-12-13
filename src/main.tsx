import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Crop from './Crop.tsx';
import '../node_modules/cropperjs/dist/cropper.css';
import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/crop',
		element: <Crop />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
