const STEP_1_STATES = {
	MISSING_FILES: 'missing-files',
	VALID: 'step-valid',
};

const STEP_2_STATES = {
	MISSING_FILES: 'missing-files',
	VALID: 'step-valid',
};

let step1Component;
let step2Component;
let validateButton;

function setStep1State(state) {
	switch (state) {
		case STEP_1_STATES.VALID:
			step1Component.classList.remove(STEP_1_STATES.MISSING_FILES);
			step1Component.classList.add(STEP_1_STATES.VALID);
			break;
		case STEP_1_STATES.MISSING_FILES:
			step1Component.classList.remove(STEP_1_STATES.VALID);
			step1Component.classList.add(STEP_1_STATES.MISSING_FILES);
			break;
	}
}

function setStep2State(state) {
	switch (state) {
		case STEP_2_STATES.VALID:
			step2Component.classList.remove(STEP_2_STATES.MISSING_FILES);
			step2Component.classList.add(STEP_2_STATES.VALID);
			break;
		case STEP_2_STATES.MISSING_FILES:
			step2Component.classList.remove(STEP_2_STATES.VALID);
			step2Component.classList.add(STEP_2_STATES.MISSING_FILES);
			break;
	}
}

function disableValidationButton() {
	validateButton.disabled = true;
}

function enableValidationButton() {
	validateButton.disabled = false;
}

function updateWizardComponentsStates() {
	let minimalConfigurationCompleted = true;

	if (areAllNeededLocationsCompleted()) {
		setStep1State(STEP_1_STATES.VALID);
	} else {
		setStep1State(STEP_1_STATES.MISSING_FILES);
		minimalConfigurationCompleted = false;
	}

	if (isOneRomLoaded()) {
		setStep2State(STEP_2_STATES.VALID);
	} else {
		setStep2State(STEP_2_STATES.MISSING_FILES);
		minimalConfigurationCompleted = false;
	}

	if (minimalConfigurationCompleted) {
		enableValidationButton();
	} else {
		disableValidationButton();
	}
}

addEventListener('DOMContentLoaded', () => {
	step1Component = document.querySelector('#step-1');
	step2Component = document.querySelector('#step-2');
	validateButton = document.querySelector('#validate-wizard-button');
});
