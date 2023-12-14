<script lang="ts">
	let { item } = $props<{ item: any }>();
</script>

<svelte:element this={item.type}>
	{item.text ?? ''}
	<input type="text" />
	{#each item.children ?? [] as child}
		<svelte:self item={child} />
	{/each}
</svelte:element>
