// src/composables/useModal.ts
export default function useModal() {
  const isModalOpen = ref(false)

  const openModal = () => {
    isModalOpen.value = true;
    console.log('ok', isModalOpen.value);
  }

  const closeModal = () => {
    isModalOpen.value = false;
    console.log('false', isModalOpen.value);
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
  }
}