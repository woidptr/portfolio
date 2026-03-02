<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Terminal Portfolio</title>
	<meta name="description" content="My protfolio">
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}
