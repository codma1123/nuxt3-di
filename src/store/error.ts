import { defineStore } from "pinia";
import DomainError from "src/core/error";
import { ref } from "vue";

export type ErrorContent = {
  code: number | string;
  message: string;
};

export const useErrorStore = defineStore("error", () => {
  const slideErrors = ref<ErrorContent[]>([]);
  const popupErrors = ref<ErrorContent | null>(null);
  const TIMEOUT = 2000;

  const addSlideError = ({ code, message }: DomainError) => {
    slideErrors.value.push({ code, message });
    shiftError();
  };

  const addPopupError = (error: DomainError) => {
    popupErrors.value = error;
    closeError();
  };

  const deleteError = (index: number) => {};

  const shiftError = () => {
    setTimeout(() => {
      slideErrors.value.pop();
    }, TIMEOUT);
  };

  const closeError = () => {
    if (!popupErrors) return;
    setTimeout(() => {
      popupErrors.value = null;
    }, TIMEOUT);
  };

  return {
    slideErrors,
    popupErrors,
    addSlideError,
    addPopupError,
    deleteError,
  };
});

export type ErrorStore = ReturnType<typeof useErrorStore>;
