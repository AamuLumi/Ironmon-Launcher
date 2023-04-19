const elements = {};

function select(romKey) {
	Object.keys(ROM_LOCATIONS).forEach((key) => {
		if (romKey === ROM_LOCATIONS[key]) {
			elements[ROM_LOCATIONS[key]].classList.add('bg-green-600');
			elements[ROM_LOCATIONS[key]].classList.add('border-green-600');
			elements[ROM_LOCATIONS[key]].classList.remove('bg-slate-900');
			elements[ROM_LOCATIONS[key]].classList.remove('border-indigo-500');
		} else {
			elements[ROM_LOCATIONS[key]].classList.remove('bg-green-600');
			elements[ROM_LOCATIONS[key]].classList.remove('border-green-600');
			elements[ROM_LOCATIONS[key]].classList.add('bg-slate-900');
			elements[ROM_LOCATIONS[key]].classList.add('border-indigo-500');
		}
	});
}

function selectFirstRomButton() {
	const key = Object.keys(ROM_LOCATIONS).find((key) => elements[ROM_LOCATIONS[key]]);

	if (key) {
		select(ROM_LOCATIONS[key]);
	}
}

function updateRomButtons() {
	Object.keys(ROM_LOCATIONS).forEach((key) => {
		if (romsLocations[ROM_LOCATIONS[key]]) {
			elements[ROM_LOCATIONS[key]].classList.remove('hidden');
		} else {
			elements[ROM_LOCATIONS[key]].classList.add('hidden');
		}
	});
}

addEventListener('DOMContentLoaded', (event) => {
	Object.keys(ROM_LOCATIONS).forEach((key) => {
		elements[ROM_LOCATIONS[key]] = document.querySelector(`#rom-button-${ROM_LOCATIONS[key]}`);
	});
	updateRomButtons();
	selectFirstRomButton();
});
