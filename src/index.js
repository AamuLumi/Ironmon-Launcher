const axios = require('axios');
const decompress = require('decompress');
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const configFilePath = path.join(__dirname, 'config.json');
const dataFolderPath = path.join(__dirname, 'data');
let memory = {
	locations: {},
	roms: {},
};
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
			ignore: ['src/config.json', 'src/data/*'],
		});
	} catch {}
}

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.setMenuBarVisibility(false);
	mainWindow.loadFile('index.html');
	//mainWindow.webContents.openDevTools();
};

function saveConfiguration() {
	fs.writeFileSync(configFilePath, JSON.stringify(memory));
}

async function download(event, key, url) {
	const filePath = path.join(dataFolderPath, url.substring(url.lastIndexOf('/') + 1));
	const fileStream = fs.createWriteStream(filePath);

	fileStream.on('close', async () => {
		mainWindow.webContents.send('extracting', key);

		await decompress(filePath, path.join(dataFolderPath, key));

		console.log(key);

		switch (key) {
			case 'pokemon-randomizer':
				const jarFile = path.join(dataFolderPath, key, 'PokemonRandoZX.jar');

				setLocation(null, key, jarFile);
				mainWindow.webContents.send('location-change', key, jarFile);
				break;
			case 'bizhawk':
				const exeFile = path.join(dataFolderPath, key, 'EmuHawk.exe');

				setLocation(null, key, exeFile);
				mainWindow.webContents.send('location-change', key, exeFile);
				break;
			case 'tracker-3g':
				const lua3GFile = path.join(dataFolderPath, key, 'Ironmon-Tracker.lua');

				setLocation(null, key, lua3GFile);
				mainWindow.webContents.send('location-change', key, lua3GFile);
				break;
			case 'tracker-4g':
				const lua4GFile = path.join(dataFolderPath, key, 'Ironmon-Tracker.lua');

				setLocation(null, key, lua4GFile);
				mainWindow.webContents.send('location-change', key, lua4GFile);
				break;
		}

		mainWindow.webContents.send('tool-ready', key);
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

function setLocation(event, key, value) {
	memory.locations[key] = value;
	saveConfiguration();
}

function setRom(event, key, value) {
	console.log(key, value);
	memory.roms[key] = value;
	saveConfiguration();
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	ipcMain.on('started', (event) => {
		event.reply('setup-configuration', memoryString);
	});
	ipcMain.on('set-location', setLocation);
	ipcMain.on('set-rom', setRom);
	ipcMain.on('download', download);
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
