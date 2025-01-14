export default function useModal() {
  const isModalOpen = ref(false)

  const openModal = () => {
    console.log('ok');
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
    console.log('false');
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
  }
}