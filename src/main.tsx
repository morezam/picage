import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/index.tsx';
import { ImgSrcContextProvider } from './context/imgSrcContext.tsx';
import '../node_modules/cropperjs/dist/cropper.css';
import 'react-tabs/style/react-tabs.css';
import './index.css';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ImgSrcContextProvider>
			<RouterProvider router={router} />
		</ImgSrcContextProvider>
	</React.StrictMode>
);
