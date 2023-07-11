import { Transition } from "solid-headless";
import { Toaster, ToastIcon, resolveValue } from "react-hot-toast";

export const Notify = () => {
  return (
    <Toaster>
      {(t: any) => (
        <Transition
          appear
          show={t.visible}
          class="transform p-4 flex bg-white rounded shadow-lg"
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <ToastIcon toast={t} />
          <p class="px-2">{resolveValue(t.message, t)}</p>
        </Transition>
      )}
    </Toaster>
  );
};
