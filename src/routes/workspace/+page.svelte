<script lang="ts">
	import DynamicElement from '$lib/components/dynamic-element.svelte';
	import { BROADCAST_CHANNEL_NAME } from '$lib/shared-worker/constants';
	import SharedWorker from '$lib/shared-worker/shared-worker?sharedworker';
	import { onMount } from 'svelte';

	let worker: MessagePort;
	let tree = $state([]);

	const bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);

	onMount(() => {
		worker = new SharedWorker().port;
		worker.start();

		bc.onmessage = (e) => {
			tree = e.data;
		};
	});
</script>

{#each tree as item (item.__id)}
	<DynamicElement {item}></DynamicElement>
{/each}

<pre>
  {JSON.stringify(tree, null, 2)}
</pre>
