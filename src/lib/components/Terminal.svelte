<script lang="ts">
  import { tick } from 'svelte';

  interface HistoryLine {
    type: 'command' | 'output';
    text: string;
  }

  let history: HistoryLine[] = $state([
    { type: 'output', text: 'Terminal initialized.' },
    { type: 'output', text: 'Type "help" for commands, or use the top navigation.' }
  ]);

  const commands: Record<string, string> = {
    help: 'Commands: clear, hello, contact',
    hello: 'Hello there! Welcome to my portfolio.',
    contact: 'Email me at: dev@example.com'
  };

  let input: string = $state('');
  let terminalRef: HTMLDivElement | undefined = $state();

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
