import net from 'net';
import Ipc from '~/main/class/Ipc';
import parseOption from '~/main/lib/parseOption';

export default function receiveData(ipc, argv) {
  let isReady = false;
  const buffer = [];
  const options = parseOption(...argv);
  const socket = net.connect({
    port: options.p || options.port,
  });
  socket.setEncoding('utf-8');
  socket.on('data', (data) => {
    if (isReady) {
      ipc.send('drip/data', data);
    } else {
      buffer.push(data);
    }
  });
  ipc.on('render/ready', () => {
    while (buffer.length > 0) {
      ipc.send('drip/data', buffer.shift());
    }
    isReady = true;
  });
}
