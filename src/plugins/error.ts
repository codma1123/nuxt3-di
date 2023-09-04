import { AxiosError } from "axios";
import DomainError from "src/core/error";
import { useErrorStore } from "src/store/error";

export default defineNuxtPlugin((nuxtApp) => {
  const { addSlideError, addPopupError } = useErrorStore();

  const errorMap: Record<string, (error: any) => void> = {
    "11": addSlideError,
    "12": addPopupError,
    "": () => {
      throw new Error();
    },
  };

  nuxtApp.vueApp.config.errorHandler = (error) => {
    console.log(error);
    if (error instanceof DomainError) {
      const code = error.code.toString().slice(0, 2);
      errorMap[code](error);
    }

    if (error instanceof AxiosError) {
      errorMap["11"]({ code: 0, message: error.message });
    }
  };
});
