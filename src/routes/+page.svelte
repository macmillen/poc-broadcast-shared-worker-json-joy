<script lang="ts">
	import { BROADCAST_CHANNEL_NAME } from '$lib/shared-worker/constants';
	import SharedWorker from '$lib/shared-worker/shared-worker?sharedworker';
	import type { PostMessage } from '$lib/shared-worker/types';
	import { onMount } from 'svelte';

	const bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);

	let worker: MessagePort;

	let tree = $state([]);

	onMount(() => {
		worker = new SharedWorker().port;
		worker.start();

		bc.onmessage = (e) => {
			tree = e.data;
		};
	});

	const setText = (text: string) => {
		worker.postMessage({
			type: 'set_text',
			data: { text }
		} satisfies PostMessage);
	};
</script>

<textarea
	oninput={(e) => {
		setText(e.target.value);
	}}
	cols="30"
	rows="10"
></textarea>

<iframe src="/workspace" title="" frameborder="1" width="1000" height="500"></iframe>

<pre>
  {JSON.stringify(tree, null, 2)}
</pre>
