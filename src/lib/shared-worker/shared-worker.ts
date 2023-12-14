import { Model, s } from 'json-joy/es2020/json-crdt';
import { BROADCAST_CHANNEL_NAME } from './constants';
import type { PostMessage } from './types';

const schema = s.arr([
	s.obj({
		__id: s.con('1'),
		blockType: s.str('html'),
		type: s.str('div'),
		children: s.arr([
			s.obj({
				__id: s.con('2'),
				blockType: s.str('html'),
				type: s.str('p'),
				text: s.str('hello')
			})
		])
	})
]);

const model = Model.withLogicalClock().setSchema(schema);
const bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);

model.api.onChange.listen(() => {
	bc.postMessage(model.view());
});

const setText = ({ text }: { text: string }) => {
	const str = model.api.str(['0', 'children', '0', 'text']);
	str.del(0, 100);
	str.ins(0, text);
};

const ports = new Set<MessagePort>();

onconnect = (event: MessageEvent<PostMessage>) => {
	const port = event.ports[0];
	ports.add(port);
	port.onmessage = (msg: MessageEvent<PostMessage>) => {
		const { type, data } = msg.data;

		switch (type) {
			case 'set_text':
				setText(data);
				break;

			default:
				break;
		}
	};
	bc.postMessage(model.view());
};
