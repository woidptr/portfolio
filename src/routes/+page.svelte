<script lang="ts">
  import { t, locale } from '$lib/i18n.svelte';
  
  import Terminal from '$lib/components/Terminal.svelte';
  import About from '$lib/components/About.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Skills from '$lib/components/Skills.svelte';
	import { onMount } from 'svelte';

  let modifierText = $state('');

  onMount(() => {
    const isMac = navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;

    if (isMac) {
      modifierText = 'option ⌥';
    } else {
      modifierText = 'alt';
    }
  });

  type TabId = 'terminal' | 'projects' | 'skills' | 'about';

  interface Tab {
    id: TabId;
    key: string;
    label: string;
  }

  const tabs: Tab[] = [
    { id: 'terminal', key: 't', label: $t("nav.terminal") },
    { id: 'projects', key: 'p', label: $t("nav.projects") },
    { id: 'skills', key: 's', label: $t("nav.skills") },
    { id: 'about', key: 'a', label: $t("nav.about") }
  ];

  let activeTab: TabId = $state('terminal');

  function cycleLanguage() {
    const langs = ['en', 'cs', 'uk'];
    const currentLang = $locale || 'en';
    const nextIndex = (langs.indexOf(currentLang) + 1) % langs.length;
    $locale = langs[nextIndex];
  }

  function handleGlobalKeydown(event: KeyboardEvent) {
    const isInput = (event.target as HTMLElement).tagName === 'INPUT';

    if (isInput && !event.altKey) return;

    const code = event.code;
    const validShortcutCodes = ["KeyT", "KeyP", "KeyS", "KeyA", "KeyL"];

    if (event.altKey && validShortcutCodes.includes(code)) {
      event.preventDefault();

      if (code === "KeyL") {
        cycleLanguage();
        return;
      }

      const targetTabKey = code.replace("Key", "").toLowerCase();
      const targetTab = tabs.find(t => t.key.toLowerCase() === targetTabKey);

      if (targetTab) activeTab = targetTab.id as TabId;
    }
  }
</script>

<svelte:window on:keydown={handleGlobalKeydown} />

<div class="bg-[#0c0c0c] text-[#a3a3a3] font-mono h-screen w-full flex flex-col selection:bg-white selection:text-black">
  
  <div class="flex border-b border-[#333]">
    {#each tabs as tab}
      <button
        type="button" 
        class="flex-1 py-2 text-center border-r border-[#333] last:border-r-0 cursor-pointer hover:bg-[#1a1a1a] transition-colors"
        onclick={() => activeTab = tab.id}
      >
        {#if activeTab === tab.id}
          <span class="font-bold text-white">{tab.label}</span>
        {:else}
          <span class="font-bold text-white">{modifierText} + {tab.key}</span> {tab.label}
        {/if}
      </button>
    {/each}
  </div>

  <div class="px-4 py-2 border-b border-[#333] text-sm">
    <span class="font-bold text-white">portfolio</span> / {activeTab}
  </div>

  <div class="flex-grow overflow-hidden flex flex-col relative">
    
    {#if activeTab === 'terminal'}
      <Terminal />

    {:else if activeTab === 'projects'}
      <Projects />

    {:else if activeTab === 'skills'}
      <Skills />

    {:else if activeTab === 'about'}
      <About />
    {/if}

  </div>

  <div class="border-t border-[#333] py-2 px-4 flex justify-between items-center text-sm shrink-0">
    
    <div class="flex gap-4 sm:gap-8">
      <span><span class="font-bold text-white">{modifierText} + t/p/s/a</span> {$t('footer.navigate')}</span>
      <span><span class="font-bold text-white">{modifierText} + l</span> {$t('footer.language')}</span> 
    </div>
    
    <div class="flex items-center gap-4">
      <span class="text-center text-[#666] hidden sm:block">v1.0.0</span>
      
      <button 
        class="font-bold text-white hover:text-green-400 transition-colors border border-[#333] px-2 py-0.5 rounded cursor-pointer uppercase"
        onclick={cycleLanguage}
      >
        [{$locale || 'EN'}]
      </button>
    </div>
    
  </div>

</div>