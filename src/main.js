const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const { fs } = require("fs");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        title: 'マイアプリ',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: __dirname + '/preload.js',
        },
    });

    ipcMain.handle('open-dialog', async (_e, _arg) => {
        return dialog
        // ファイル選択ダイアログを表示する
        .showOpenDialog(mainWindow, {
            properties: ['openFile'],
        })
        .then((result) => {
            // キャンセルボタンが押されたとき
            if (result.canceled) return '';
            // 選択されたファイルの絶対パスを返す
            return result.filePaths[0];
        })
        .catch((err) => console.error(err));
    });
    
    //メニューバー内容
    let template = [{
        label: 'Your-App',
        submenu: [{
            label: 'アプリを終了',
            accelerator: 'Cmd+Q',
            click: function(){
                app.quit();
            }
        }]
    }, {
        label: 'Window',
        submenu: [{
            label: '最小化',
            accelerator: 'Cmd+M',
            click: function(){
                mainWindow.minimize();
            }
        }, {
            label: '最大化',
            accelerator: 'Cmd+Ctrl+F',
            click: function(){
                mainWindow.maximize();
            }
        }, {
            type: 'separator'
        }, {
            label: 'リロード',
            accelerator: 'Cmd+R',
            click: function(){
                BrowserWindow.getFocusedWindow().reload();
            }
        }]
    }]

    //メニューバー設置
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.loadFile('src/index.html');
};

app.once('ready', () => {
    createWindow();
});

app.once('window-all-closed', () => app.quit());