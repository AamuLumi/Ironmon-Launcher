const FILE_LOCATIONS = {
	BIZHAWK: 'bizhawk',
	POKEMON_RANDOMIZER: 'pokemon-randomizer',
	TRACKER_3G: 'tracker-3g',
	TRACKER_4G: 'tracker-4g',
};

function _getLocationFromLocalStorage(location) {
	return window.localStorage.getItem(`location-${location}`);
}

function _setLocationInLocalStorage(location, value) {
	return window.localStorage.setItem(`location-${location}`, value);
}

const filesLocations = {};

function setLocationLabelValue(location, value) {
	const element = document.querySelector(`label[for="location-${location}"]`);

	if (element) {
		element.textContent = value;
	}
}

function _setInitialLocationValue(location, newValue) {
	console.log(location, newValue);
	filesLocations[location] = newValue;

	setLocationLabelValue(location, newValue);
	updateWizardComponentsStates();
}

function setLocation(location, e) {
	const newValue = e.files.length ? e.files[0].path : '';
	filesLocations[location] = newValue;

	setLocationLabelValue(location, newValue);
	window.electronAPI.setLocation(location, newValue);
	updateWizardComponentsStates();
}

function getLocation(location) {
	return filesLocations[location];
}

function areAllNeededLocationsCompleted() {
	return (
		!!filesLocations[FILE_LOCATIONS.BIZHAWK] &&
		!!filesLocations[FILE_LOCATIONS.POKEMON_RANDOMIZER]
	);
}

window.electronAPI.onLocationChange(_setInitialLocationValue);

addEventListener('DOMContentLoaded', (event) => {});
