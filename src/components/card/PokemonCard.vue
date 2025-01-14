<!-- src/components/card/PokemonCard.vue -->
<script setup>
import PokemonImages from '@/components/card/PokemonImages.vue';
import PokemonJpName from '@/components/card/PokemonJpName.vue';
import Modal from '@/components/modal/ Modal .vue';
import useModal from '@/composables/useModal';

const { isModalOpen, openModal, closeModal } = useModal();

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="bg-white p-2 rounded-lg" @click="openModal()">
    <PokemonJpName :name="props.data.name" :url="props.data.url"/>
    <PokemonImages :name="props.data.name" :url="props.data.url"/>

    <!-- モーダルウィンドウの表示 -->
    <Modal v-if="isModalOpen" :name="props.data.name" :url="props.data.url" @close="closeModal()"/>
  </div>
</template>