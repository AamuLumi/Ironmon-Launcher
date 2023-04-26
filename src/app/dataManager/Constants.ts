export const TOOLS = {
	BIZHAWK: 'bizhawk',
	JAVA: 'java',
	POKEMON_RANDOMIZER: 'pokemon-randomizer',
	TRACKER_3G: 'tracker-3g',
	TRACKER_4G: 'tracker-4g',
};

const ToolKeys = Object.values(TOOLS).filter((x) => !(parseInt(x, 10) >= 0)) as Array<
	(typeof TOOLS)[keyof typeof TOOLS]
>;

export type ToolKey = (typeof ToolKeys)[number];

export const ROMS = {
	FRLG: 'frlg',
	HGSS: 'hgss',
	RSE: 'rse',
	ORSA: 'orsa',
	DPP: 'dpp',
	BW: 'bw',
	B2W2: 'b2w2',
	XY: 'xy',
};

const RomKeys = Object.values(ROMS).filter((x) => !(parseInt(x, 10) >= 0)) as Array<
	(typeof ROMS)[keyof typeof ROMS]
>;

export type RomKey = (typeof RomKeys)[number];

export const URLS = {
	[TOOLS.BIZHAWK]:
		'https://github.com/TASEmulators/BizHawk/releases/download/2.9/BizHawk-2.9-win-x64.zip',
	[TOOLS.JAVA]: 'https://download.oracle.com/java/20/latest/jdk-20_windows-x64_bin.zip',
	[TOOLS.POKEMON_RANDOMIZER]:
		'https://github.com/Ajarmar/universal-pokemon-randomizer-zx/releases/download/v4.6.0/PokeRandoZX-v4_6_0.zip',
	[TOOLS.TRACKER_3G]:
		'https://github.com/besteon/Ironmon-Tracker/releases/download/v7.5.3/Ironmon-Tracker.zip',
	[TOOLS.TRACKER_4G]:
		'https://github.com/Brian0255/NDS-Ironmon-Tracker/releases/download/5.5.2/NDS-Ironmon-Tracker-5.5.2.zip',

	IRONMON_DISCORD: 'https://discord.gg/jFPYsZAhjX',
	IRONMON_RULES: 'https://gist.github.com/valiant-code/adb18d248fa0fae7da6b639e2ee8f9c1',
	LAUNCHER_GITHUB_REPOSITORY: 'https://github.com/AamuLumi/Ironmon-Launcher/',

	[ROMS.FRLG]: {
		HIDDEN_ITEMS: 'https://imgur.com/a/vw7y5mp',
		MAP: 'https://kelseyyoung.github.io/FRLGIronmonMap/',
		TRAINER_GUIDE:
			'https://docs.google.com/spreadsheets/d/1RVD032S92iKz9JGq3E4TrNHz_slrFMvdzxaO1MsWnio/edit?usp=sharing',
		WALKTHROUGH:
			'https://docs.google.com/document/d/1QvS0VQcgsh0Mos3XTDKanagsJeNVjMneqEwpgHGWMyw/',
	},
	[ROMS.HGSS]: {
		HIDDEN_ITEMS: 'https://imgur.com/a/ohFwS3O',
		TRAINER_GUIDE:
			'https://docs.google.com/spreadsheets/d/1eKixgsOxucM9M7kdA7QKsxqPhyO4CUtGbFgKjysCxxI/',
		WALKTHROUGH: 'https://pastebin.com/96w3XMe6',
	},
	[ROMS.RSE]: {
		HIDDEN_ITEMS: 'https://imgur.com/gallery/sdVDY2N',
		MAP: 'https://kelseyyoung.github.io/EmeraldIronmonMap/',
		TRAINER_GUIDE:
			'https://docs.google.com/spreadsheets/d/11U5RhPA2FqoUx6RaBtAhX2qdPjCUQA01ocqBaNi9p-0/edit#gid=0',
		WALKTHROUGH:
			'https://docs.google.com/document/d/14IN2ztAvwwqtQkRX9AOEHm2YGQqKK2y2TL95VkXSrtI/edit?usp=sharing',
	},
	[ROMS.ORSA]: {
		HIDDEN_ITEMS: 'https://imgur.com/a/IWEsphK',
		WALKTHROUGH:
			'https://docs.google.com/document/d/1doLKzcwVA2vfhVyevlSzjEPF4ekBP-S8/edit?usp=sharing&ouid=102169368299648564763&rtpof=true&sd=true',
	},
	[ROMS.DPP]: {
		HIDDEN_ITEMS: 'https://imgur.com/a/ivnph0A',
		WALKTHROUGH:
			'https://docs.google.com/document/d/1Qd4mbwQxreLnbRLA5tWRjsZPlCUlWVMjBvNjI9tu7gs',
	},
	[ROMS.BW]: {
		HIDDEN_ITEMS: 'https://imgur.com/a/8bSz4fz',
		TRAINER_GUIDE: 'https://cleartonic.net/pkmn_bw1/',
		WALKTHROUGH:
			'https://drive.google.com/file/d/10h8RZ-3GYllsNrz5X5OTsDL_UL6gpP7r/view?usp=sharing',
	},
	[ROMS.B2W2]: {
		HIDDEN_ITEMS:
			'https://dochub.com/markdean2012/eOLPG9YKj2jW4lWKZpXz6y/black-2-hidden-item-guide-revision-6-pdf',
		WALKTHROUGH:
			'https://docs.google.com/document/d/1lVOW1qzkiDAsTd4aDsqd8_ODOr8MUSZbyC2OvaHiwro',
	},
	[ROMS.XY]: {
		HIDDEN_ITEMS: 'https://imgur.com/a/p7D3YhZ',
		WALKTHROUGH:
			'https://docs.google.com/document/d/122t6RAfAOrR1-iq-zIVuMgInc8WHpoPEAPjw1PaSzJg/edit?usp=sharing',
	},
};

export const PAGES = {
	DASHBOARD: 'dashboard',
	INITIAL_SETUP: 'initial-setup',
	ROMS_LOCATION: 'roms-location',
	SETTINGS: 'settings',
	TOOLS_LOCATION: 'tools-location',
};

const PageKeys = Object.values(PAGES).filter((x) => !(parseInt(x, 10) >= 0)) as Array<
	(typeof PAGES)[keyof typeof PAGES]
>;

export type PageKey = (typeof PageKeys)[number];

export const LISTENER_KEYS = {
	PAGES: 'pages' as 'pages',
	ROMS: 'roms' as 'roms',
	TOOLS: 'tools' as 'tools',
};

const ListenerKeys = Object.values(LISTENER_KEYS).filter((x) => !(parseInt(x, 10) >= 0)) as Array<
	(typeof LISTENER_KEYS)[keyof typeof LISTENER_KEYS]
>;

export type ListenerKey = (typeof ListenerKeys)[number];

export const TOOL_STATUS = {
	NOT_FOUND: 'not-found',
	DOWNLOAD: 'download',
	EXTRACT: 'extract',
	READY: 'ready',
};

const ToolStatusKeys = Object.values(TOOL_STATUS).filter((x) => !(parseInt(x, 10) >= 0)) as Array<
	(typeof TOOL_STATUS)[keyof typeof TOOL_STATUS]
>;

export type ToolStatusKey = (typeof ToolStatusKeys)[number];
