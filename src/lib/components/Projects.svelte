<script lang="ts">
  import { t } from '$lib/i18n.svelte';

  interface Project {
    id: string;
    url: string;
  }

  const projects: Project[] = [
    { id: 'loom', url: 'https://github.com/woidptr/Loom' }
  ];
</script>

<div class="h-full w-full p-6 md:p-12 overflow-y-auto">
  <div class="max-w-3xl mx-auto flex flex-col gap-8">
    
    <section>
      <h2 class="text-white font-bold mb-4"># {$t('projectsData.heading')}</h2>
      
      <div class="flex flex-col gap-6">
        {#each projects as proj}
          <div>
            <div class="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
              
              <a 
                href={proj.url} 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-white font-bold hover:text-green-400 hover:underline transition-colors"
              >
                {$t(`projectsData.${proj.id}.name`)}
              </a>
              
              <span class="text-sm text-[#333] hidden sm:inline">---------</span>
              
              <a 
                href={proj.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-sm text-[#666] hover:text-[#a3a3a3] truncate transition-colors"
              >
                [{proj.url.replace('https://', '')}]
              </a>
            </div>
            
            <p class="text-sm leading-relaxed pl-4 border-l-2 border-[#333]">
              {$t(`projectsData.${proj.id}.description`)}
            </p>
            
          </div>
        {/each}
      </div>
    </section>

  </div>
</div>