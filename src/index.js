const axios = require('axios');
const decompress = require('decompress');
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const configFilePath = path.join(__dirname, 'config.json');
const dataFolderPath = path.join(__dirname, 'data');
let memory = {};
let memoryString;
let mainWindow;

if (fs.existsSync(configFilePath)) {
	memoryString = fs.readFileSync(configFilePath).toString();
	memory = JSON.parse(memoryString);
}

if (!fs.existsSync(dataFolderPath)) {
	fs.mkdirSync(dataFolderPath);
}

if (env === 'development') {
	try {
		require('electron-reloader')(module, {
			ignore: ['src/config.json', 'src/data/**', 'src/app/**'],
		});
	} catch {}
}

const createWindow = async () => {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		backgroundColor: '#164e63',
		show: false,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.setMenuBarVisibility(false);
	await mainWindow.loadURL('http://localhost:1234');
	mainWindow.show();
	//mainWindow.webContents.openDevTools();
};

function saveConfiguration() {
	fs.writeFileSync(configFilePath, JSON.stringify(memory));
}

async function extractToolContent(filePath, key) {
	mainWindow.webContents.send('extracting', key);

	await decompress(filePath, path.join(dataFolderPath, key));

	switch (key) {
		case 'pokemon-randomizer':
			const jarFile = path.join(dataFolderPath, key, 'PokemonRandoZX.jar');

			mainWindow.webContents.send('location-change', key, jarFile);
			break;
		case 'bizhawk':
			const exeFile = path.join(dataFolderPath, key, 'EmuHawk.exe');

			mainWindow.webContents.send('location-change', key, exeFile);
			break;
		case 'tracker-3g':
			const lua3GFile = path.join(dataFolderPath, key, 'Ironmon-Tracker.lua');

			mainWindow.webContents.send('location-change', key, lua3GFile);
			break;
		case 'tracker-4g':
			const lua4GFile = path.join(dataFolderPath, key, 'Ironmon-Tracker.lua');

			mainWindow.webContents.send('location-change', key, lua4GFile);
			break;
		case 'java':
			const javaFiles = fs.readdirSync(path.join(dataFolderPath, key));

			if (javaFiles.length < 1) {
				throw new Error("Java archive has an error : there's no folders in it.");
			}

			const javaExeFile = path.join(dataFolderPath, key, javaFiles[0], 'bin', 'java.exe');

			mainWindow.webContents.send('location-change', key, javaExeFile);
			break;
	}

	mainWindow.webContents.send('tool-ready', key);
}

async function download(event, key, url) {
	const filePath = path.join(dataFolderPath, url.substring(url.lastIndexOf('/') + 1));

	if (fs.existsSync(filePath) && memory.tools[key].downloadLink === url) {
		return extractToolContent(filePath, key);
	}

	const fileStream = fs.createWriteStream(filePath);

	fileStream.on('close', () => {
		extractToolContent(filePath, key);
	});

	await axios
		.get(url, {
			onDownloadProgress: (axiosProgressEvent) => {
				mainWindow.webContents.send(
					'download-progress',
					key,
					JSON.stringify(axiosProgressEvent),
				);
			},
			responseType: 'stream',
		})
		.then((res) => {
			res.data.pipe(fileStream);
		});
}

function openExternalURL(event, url) {
	shell.openExternal(url);
}

function setMemory(event, newMemory) {
	memory = newMemory;
	saveConfiguration();
}

function openInAnotherWindowURL(event, url) {
	const subModal = new BrowserWindow({
		parent: app,
		width: 1024,
		height: 768,
		backgroundColor: '#164e63',
	});

	subModal.setMenuBarVisibility(false);
	subModal.loadURL(url);
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	ipcMain.on('started', (event) => {
		event.reply('setup-configuration', memory);
	});
	ipcMain.on('download', download);
	ipcMain.on('set-memory', setMemory);
	ipcMain.on('open-external-url', openExternalURL);
	ipcMain.on('open-another-window-url', openInAnotherWindowURL);
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
