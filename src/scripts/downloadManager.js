const URLS = {
	BIZHAWK:
		'https://github.com/TASEmulators/BizHawk/releases/download/2.9/BizHawk-2.9-win-x64.zip',
	POKEMON_RANDOMIZER:
		'https://github.com/Ajarmar/universal-pokemon-randomizer-zx/releases/download/v4.6.0/PokeRandoZX-v4_6_0.zip',
	TRACKER_3G:
		'https://github.com/besteon/Ironmon-Tracker/releases/download/v7.5.3/Ironmon-Tracker.zip',
	TRACKER_4G:
		'https://github.com/Brian0255/NDS-Ironmon-Tracker/releases/download/5.5.2/NDS-Ironmon-Tracker-5.5.2.zip',
};

function download(key, url) {
	window.electronAPI.download(key, url);
}

function downloadAll() {
	Object.keys(URLS).forEach((key) => {
		download(FILE_LOCATIONS[key], URLS[key]);
	});
}

function setProgressText(key, text) {
	const element = document.querySelector(`#download-text-${key}`);

	if (!element) {
		return;
	}

	element.classList.remove('hidden');
	element.textContent = text;
}

function setProgressBar(key, value) {
	const element = document.querySelector(`#download-bar-${key}`);

	if (!element) {
		return;
	}

	element.classList.remove('hidden');
	element.value = value;
}

function hideProgressBar(key) {
	const element = document.querySelector(`#download-bar-${key}`);

	if (!element) {
		return;
	}

	element.classList.add('hidden');
}

function updateDownloadDetails(eventType, key, axiosProgressEvent) {
	switch (eventType) {
		case 'download-progress':
			setProgressText(
				key,
				`Downloading (${axiosProgressEvent.loaded} / ${axiosProgressEvent.total})`,
			);
			setProgressBar(key, axiosProgressEvent.progress);
			break;
		case 'extracting':
			setProgressText(key, `Extracting files`);
			break;
		case 'tool-ready':
			setProgressText(key, `Tool ready to use`);
			hideProgressBar(key);
			break;
	}
}

window.electronAPI.onDownloadProgress(updateDownloadDetails);
