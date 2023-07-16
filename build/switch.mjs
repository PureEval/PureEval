import * as P from '../PureEval.js';
import { readFile, writeFile } from 'fs';

P.Task((reject, resolve) => {
	readFile('./package.json', 'utf-8', (err, data) => {
		if (err) reject(err);
		resolve(data);
	});
})
	.map(JSON.parse)
	.map(P.modify('name', P.concatr('-es')))
	.map(JSON.stringify)
	.chain((context) =>
		P.Task((reject, resolve) => {
			writeFile('./package.json', context, (err) => {
				if (err) reject(err);
				resolve('package.json file switch completed');
			});
		})
	)
	.fold(console.err, console.log);
