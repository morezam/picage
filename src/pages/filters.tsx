import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import Range from '../components/Range';
import { useImgSrcContext } from '../hooks/useImgSrcContext';
import { MdDownloadDone, MdOutlineCancel } from 'react-icons/md';

const Filters = () => {
	const { src, setSrc } = useImgSrcContext();

	const [can, setCan] = useState<fabric.Canvas | null>(null);
	const [img, setImg] = useState<fabric.Image | null>(null);
	const canvasEl = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current);

		src &&
			fabric.Image.fromURL(src, img => {
				img.selectable = false;
				const windowWidth = window.innerWidth;
				const maxWidth = Math.min(500, windowWidth);
				const width = img.width as number;
				const height = img.height as number;

				const bigger = Math.max(width, height);
				const scale = maxWidth / bigger;

				const oneDecimalScale = scale.toFixed(2);

				const transform = `translate(0,0) rotate(0) skewX(0) skewY(0) scaleX(${oneDecimalScale}) scaleY(${oneDecimalScale})`;

				canvas.setDimensions({ width, height });
				const container = document.querySelector(
					`.${canvas.containerClass}`
				) as HTMLDivElement;
				container.style.width = width + 'px';
				container.style.height = height + 'px';
				container.style.transform = transform;
				container.classList.add(`origin-top`);

				setImg(img);

				canvas.add(img);

				setCan(canvas);
			});

		return () => {
			canvas.dispose();
		};
	}, [src]);

	const onSave = () => {
		if (can) {
			const newSrc = can.toDataURL({ quality: 1 });
			setSrc(newSrc);
		}
	};

	const applyFilter = (filter: fabric.IBaseFilter) => {
		if (img) {
			img.filters = [];
			img.filters?.push(filter);
			img.applyFilters();
			can?.add(img);
		}
	};

	return (
		<>
			<div className="flex flex-col max-h-screen pb-2 items-center pt-5 max-w-3xl mx-auto">
				<div className="flex text-2xl mb-3 flex-row-reverse justify-between w-full px-3 ">
					<button onClick={onSave} title="save">
						<MdDownloadDone />
					</button>
					<button title="cancel">
						<MdOutlineCancel />
					</button>
				</div>
				<canvas ref={canvasEl} />
				<Tabs className="flex flex-col-reverse mr-2">
					<TabList className="flex max-w-sm whitespace-nowrap sm:max-w-md overflow-auto">
						<Tab
							onClick={() => applyFilter(new fabric.Image.filters.Grayscale())}>
							grayscale
						</Tab>
						<Tab>blend color</Tab>
						<Tab
							onClick={() =>
								applyFilter(new fabric.Image.filters.Blur({ blur: 0.5 }))
							}>
							blur
						</Tab>
						<Tab
							onClick={() =>
								applyFilter(new fabric.Image.filters.Contrast({ contrast: 1 }))
							}>
							contrast
						</Tab>
						<Tab
							onClick={() =>
								applyFilter(new fabric.Image.filters.Noise({ noise: 500 }))
							}>
							noise
						</Tab>
						<Tab
							onClick={() =>
								applyFilter(
									new fabric.Image.filters.Pixelate({ blocksize: 20 })
								)
							}>
							pixelate
						</Tab>
						<Tab
							onClick={() =>
								applyFilter(
									new fabric.Image.filters.Saturation({ saturation: 10 })
								)
							}>
							saturation
						</Tab>
						<Tab onClick={() => applyFilter(new fabric.Image.filters.Invert())}>
							invert
						</Tab>
						<Tab onClick={() => applyFilter(new fabric.Image.filters.Sepia())}>
							sepia
						</Tab>
					</TabList>

					<TabPanel></TabPanel>
					<TabPanel className="flex justify-center">
						<ColorPicker
							cb={color =>
								applyFilter(new fabric.Image.filters.BlendColor({ color }))
							}
						/>
					</TabPanel>
					<TabPanel>
						<Range
							min={0}
							max={0.5}
							step={0.01}
							initVal={0.5}
							rangeCb={val =>
								applyFilter(new fabric.Image.filters.Blur({ blur: val }))
							}
						/>
					</TabPanel>
					<TabPanel>
						<Range
							min={0}
							max={1}
							initVal={1}
							step={0.01}
							rangeCb={val =>
								applyFilter(
									new fabric.Image.filters.Contrast({ contrast: val })
								)
							}
						/>
					</TabPanel>
					<TabPanel>
						<Range
							min={50}
							max={500}
							step={50}
							initVal={500}
							rangeCb={val =>
								applyFilter(new fabric.Image.filters.Noise({ noise: val }))
							}
						/>
					</TabPanel>
					<TabPanel>
						<Range
							min={0}
							max={20}
							step={1}
							initVal={20}
							rangeCb={val =>
								applyFilter(
									new fabric.Image.filters.Pixelate({ blocksize: val })
								)
							}
						/>
					</TabPanel>
					<TabPanel>
						<Range
							min={0}
							max={10}
							step={1}
							initVal={10}
							rangeCb={val =>
								applyFilter(
									new fabric.Image.filters.Saturation({ saturation: val })
								)
							}
						/>
					</TabPanel>
					<TabPanel></TabPanel>
					<TabPanel></TabPanel>
				</Tabs>
			</div>
		</>
	);
};

export default Filters;
