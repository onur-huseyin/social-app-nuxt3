<template>
  <div class="flex items-start justify-start gap-x-4">
    <div>
      <p class="font-semibold text-green-600">Filtere</p>
    </div>
    <div>
      <UTextarea :rows="1" placeholder="Anahtar kelimeler.." />
    </div>
    <div>
      <USelectMenu v-model="selected" :options="date" />
    </div>
  </div>

</template>

<script setup lang="ts">
const date = ['Yeniden eskiye', 'Eskiden yeniye', 'Beğeni en çok', 'Yorum en çok', 'Paylaşım en çok']

const selected = ref(date[0])
</script>