<script lang="ts">
  import { tick } from 'svelte';

  import { t, locale } from '$lib/i18n.svelte';
  
  import About from '$lib/components/About.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Skills from '$lib/components/Skills.svelte';

  type TabId = 'terminal' | 'projects' | 'skills' | 'about';

  interface Tab {
    id: TabId;
    key: string;
    label: string;
  }

  interface HistoryLine {
    type: 'command' | 'output';
    text: string;
  }

  const tabs: Tab[] = [
    { id: $t("nav.terminal"), key: 't', label: 'terminal' },
    { id: $t("nav.projects"), key: 'p', label: 'projects' },
    { id: $t("nav.skills"), key: 's', label: 'skills' },
    { id: $t("nav.about"), key: 'a', label: 'about' }
  ];

  const commands: Record<string, string> = {
    help: 'Commands: clear, hello, contact',
    hello: 'Hello there! Welcome to my portfolio.',
    contact: 'Email me at: dev@example.com'
  };

  let activeTab: TabId = $state('terminal');
  let input: string = $state('');
  let terminalRef: HTMLDivElement | undefined = $state();
  
  let history: HistoryLine[] = $state([
    { type: 'output', text: 'Terminal initialized.' },
    { type: 'output', text: 'Type "help" for commands, or use the top navigation.' }
  ]);

  function cycleLanguage() {
    const langs = ['en', 'cs', 'uk'];
    const currentLang = $locale || 'en';
    const nextIndex = (langs.indexOf(currentLang) + 1) % langs.length;
    $locale = langs[nextIndex];
  }

  function handleGlobalKeydown(event: KeyboardEvent) {
    if ((event.target as HTMLElement).tagName === 'INPUT') return;

    const pressedKey = event.key.toLowerCase();
    const targetTab = tabs.find(t => t.key === pressedKey);
    
    if (targetTab) {
      activeTab = targetTab.id;
    }
  }

  async function handleTerminalSubmit(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      
      history.push({ type: 'command', text: `> ${input}` });

      if (cmd === 'clear') {
        history = [];
      } else if (cmd !== '') {
        const response = commands[cmd] || `command not found: ${cmd}`;
        history.push({ type: 'output', text: response });
      }

      input = ''; 
      await tick();
      if (terminalRef) terminalRef.scrollTop = terminalRef.scrollHeight;
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
          <span class="font-bold text-white">{tab.key}</span> {tab.label}
        {/if}
      </button>
    {/each}
  </div>

  <div class="px-4 py-2 border-b border-[#333] text-sm">
    <span class="font-bold text-white">portfolio</span> / {activeTab}
  </div>

  <div class="flex-grow overflow-hidden flex flex-col relative">
    
    {#if activeTab === 'terminal'}
      <div class="h-full w-full p-4 overflow-y-auto" bind:this={terminalRef}>
        <div class="max-w-3xl flex flex-col gap-1">
          {#each history as line}
            {#if line.type === 'command'}
              <div class="text-white mt-2">{line.text}</div>
            {:else}
              <div class="whitespace-pre-line">{line.text}</div>
            {/if}
          {/each}

          <div class="flex items-center mt-2">
            <span class="text-white mr-2 shrink-0">&gt;</span>
            <!-- svelte-ignore a11y_autofocus -->
            <input
              type="text"
              bind:value={input}
              onkeydown={handleTerminalSubmit}
              autocomplete="off"
              spellcheck="false"
              autofocus
              class="bg-transparent border-none outline-none text-[#a3a3a3] flex-grow w-full font-inherit"
            />
          </div>
        </div>
      </div>

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
      <span><span class="font-bold text-white">t/p/s/a</span> {$t('footer.navigate')}</span>
      <span><span class="font-bold text-white">l</span> {$t('footer.language')}</span> 
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