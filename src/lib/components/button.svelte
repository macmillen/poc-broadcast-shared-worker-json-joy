<script lang="ts">
	let { item, children } = $props<{ item: any; children: any }>();

	console.log({ item, children });
	console.log('aiosdjioasdjio');

	$effect(() => console.log(item));
</script>

<svelte:element this={item.type}>
	{item.text ?? ''}
	{#each item.children ?? [] as child}
		<svelte:self item={child} />
	{/each}
</svelte:element>

{@render children()}
