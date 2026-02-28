<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { onMount } from 'svelte';

  onMount(() => {
    if (browser) {
      goto(resolve('/'));
    }
  });
</script>

<div class="bg-[#0c0c0c] text-white font-mono h-screen w-full flex items-center justify-center selection:bg-white selection:text-black">
  <p> ERR_BAD_PATH ... rerouting to root ...<span class="animate-pulse">_</span></p>
</div>