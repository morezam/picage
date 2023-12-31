import { MdDownloadDone, MdOutlineCancel } from 'react-icons/md';

type MainLayoutProps = {
	onSave: () => void;
	onCancel: () => void;
	children: React.ReactNode;
};

const MainLayout = ({ onSave, onCancel, children }: MainLayoutProps) => {
	return (
		<div className="flex flex-col max-h-screen pb-2 items-center pt-5 max-w-3xl mx-auto">
			<div className="flex text-2xl mb-3 flex-row-reverse justify-between w-full px-3 ">
				<button onClick={() => onSave()} title="save">
					<MdDownloadDone />
				</button>
				<button title="cancel" onClick={() => onCancel()}>
					<MdOutlineCancel />
				</button>
			</div>
			{children}
		</div>
	);
};

export default MainLayout;
