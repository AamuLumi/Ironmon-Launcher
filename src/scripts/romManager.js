const ROM_LOCATIONS = {
	FRLG: 'frlg',
	HGSS: 'hgss',
	RSE: 'rse',
	ORSA: 'orsa',
	DPP: 'dpp',
	BW: 'bw',
	B2W2: 'b2w2',
	XY: 'xy',
};

function _getRomFromLocalStorage(rom) {
	return window.localStorage.getItem(`rom-${rom}`);
}

function _setRomInLocalStorage(rom, value) {
	return window.localStorage.setItem(`rom-${rom}`, value);
}

const romsLocations = {};

function setRomLabelValue(rom, value) {
	const element = document.querySelector(`label[for="rom-${rom}"]`);

	if (element) {
		element.textContent = value;
	}
}

function _setInitialRomValue(rom, newValue) {
	romsLocations[rom] = newValue;

	setRomLabelValue(rom, newValue);
	updateWizardComponentsStates();
	updateRomButtons();
}

function setRom(rom, e) {
	const newValue = e.files.length ? e.files[0].path : '';

	romsLocations[rom] = newValue;
	setRomLabelValue(rom, newValue);
	window.electronAPI.setRom(rom, newValue);

	updateWizardComponentsStates();
	updateRomButtons();
}

function getRom(rom) {
	return romsLocations[rom];
}

function isOneRomLoaded() {
	return Object.keys(romsLocations).some((key) => !!romsLocations[key]);
}

addEventListener('DOMContentLoaded', (event) => {});
