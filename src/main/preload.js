import path from 'path';
import fs from 'fs';
import { contextBridge, } from 'electron';
import receiveData from '~/main/lib/receiveData';
import Ipc from '~/main/class/Ipc';

const message = JSON.parse(fs.readFileSync(path.join(__dirname, 'message')));
const { argv, } = message;
const ipc = new Ipc();
receiveData(ipc, argv);

contextBridge.exposeInMainWorld(
  'ipc', {
    on: ipc.on.bind(ipc),
    send: ipc.send.bind(ipc),
  }
);
