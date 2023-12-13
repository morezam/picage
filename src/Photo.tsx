import { useState } from 'react';
// import { useParams } from 'react-router-dom';

const Photo = () => {
	// const params = useParams();
	// const src = params['*'];

	const [imgSrc] = useState(() => {
		const src = localStorage.getItem('img');
		return src ? src : '';
	});

	// useEffect(()=>{
	// 	const src = localStorage.getItem('src') as string;
	// 	console.log(src);

	// }, [])

	return <img src={imgSrc} alt="" />;
};

export default Photo;
