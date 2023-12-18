import React from 'react';
import ReactDOM from 'react-dom/client';
import { routes } from './routes/index.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../node_modules/cropperjs/dist/cropper.css';
import 'react-tabs/style/react-tabs.css';
import './index.css';
import { ImgInfoContextProvider } from './context/imgInfoContext.tsx';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ImgInfoContextProvider>
			<RouterProvider router={router} />
		</ImgInfoContextProvider>
	</React.StrictMode>
);
