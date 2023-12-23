import { openDB } from 'idb';

export const dbPromise = openDB('ImageDb', 1, {
	upgrade(db, _oldVersion, _newVersion, transaction) {
		initializeDb();

		function initializeDb() {
			db.createObjectStore('img', {
				keyPath: 'id',
				autoIncrement: true,
			});

			transaction.objectStore('img').add({ history: [], index: undefined });
		}
	},
});

export async function currentImageSrc() {
	const db = await dbPromise;
	const img = await db.get('img', 1);

	return img.history[img.index];
}

export async function addImage(imgSrc: string) {
	const db = await dbPromise;
	const transaction = db.transaction('img', 'readwrite');
	const objectStore = transaction.objectStore('img');

	const img = await objectStore.get(1);

	const index = img.index;
	const history = img.history;

	if (index === history.length - 1 || index === undefined) {
		const newHistory = [...img.history, imgSrc];

		await objectStore.put({
			id: 1,
			history: newHistory,
			index: newHistory.length - 1,
		});
	} else if (index < history.length - 1) {
		history.splice(index + 1);
		const newHistory = [...img.history, imgSrc];

		await objectStore.put({
			id: 1,
			history: newHistory,
			index: newHistory.length - 1,
		});
	}
}

export async function imgUndo() {
	const db = await dbPromise;
	const transaction = db.transaction('img', 'readwrite');
	const objectStore = transaction.objectStore('img');

	const img = await objectStore.get(1);

	const index = img.index;
	const history = img.history;

	await objectStore.put({
		id: 1,
		history,
		index: index - 1,
	});
}

export async function imgRedo() {
	const db = await dbPromise;
	const transaction = db.transaction('img', 'readwrite');
	const objectStore = transaction.objectStore('img');

	const img = await objectStore.get(1);

	const index = img.index;
	const history = img.history;

	await objectStore.put({
		id: 1,
		history,
		index: index + 1,
	});
}

export async function undoPossible() {
	const db = await dbPromise;
	const { index } = await db.get('img', 1);

	if (index === undefined || index === 0) {
		return false;
	} else {
		return true;
	}
}

export async function redoPossible() {
	const db = await dbPromise;
	const { history, index } = await db.get('img', 1);

	if (index === undefined || index === history.length - 1) {
		return false;
	} else {
		return true;
	}
}
