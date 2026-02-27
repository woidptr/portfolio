<script lang="ts">
  import { t } from '$lib/i18n.svelte';

  const experienceIds = ['dcuk'];
  const educationIds = ['ujep'];
</script>

<div class="h-full w-full p-6 md:p-12 overflow-y-auto">
  <div class="max-w-3xl mx-auto flex flex-col gap-8">
    
    <section>
      <h2 class="text-white font-bold mb-2"># {$t('about.bio.title')}</h2>
      <p class="leading-relaxed">
        {$t('about.bio.description')}
      </p>
    </section>

    <section>
      <h2 class="text-white font-bold mb-4"># {$t('about.experience.title')}</h2>
      <div class="flex flex-col gap-6">
        {#each experienceIds as id}
          <div>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
              <h3 class="text-white font-bold">
                {$t(`about.experience.${id}.role`)} 
                <span class="text-[#a3a3a3] font-normal">@ {$t(`about.experience.${id}.company`)}</span>
              </h3>
              <span class="text-sm text-[#666]">{$t(`about.experience.${id}.period`)}</span>
            </div>
            <p class="text-sm leading-relaxed pl-4 border-l-2 border-[#333]">
              {$t(`about.experience.${id}.description`)}
            </p>
          </div>
        {/each}
      </div>
    </section>

    <section>
      <h2 class="text-white font-bold mb-4"># {$t('about.education.title')}</h2>
      <div class="flex flex-col gap-4">
        {#each educationIds as id}
          <div>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
              <h3 class="text-white font-bold">{$t(`about.education.${id}.degree`)}</h3>
              <span class="text-sm text-[#666]">{$t(`about.education.${id}.period`)}</span>
            </div>
            <p class="text-sm pl-4 border-l-2 border-[#333]">{$t(`about.education.${id}.school`)}</p>
          </div>
        {/each}
      </div>
    </section>

  </div>
</div>