import { Component, JSXElement } from "solid-js";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
  DialogOverlay,
} from "solid-headless";

import { createSignal, JSX } from "solid-js";

type DialogType = {
  children: JSXElement;
  title: string;
  onClose: Function;
  hide: Function;
  size: "sm" | "md" | "lg" | "xl";
};

const Popup: Component<DialogType> = ({
  children,
  title,
  hide,
  onClose,
  size,
}: DialogType) => {
  return (
    <Transition appear show={hide()}>
      <Dialog
        isOpen={true}
        class="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => onClose}
      >
        <div class="min-h-screen px-4 flex items-center justify-center">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-gray-800 bg-opacity-40" />
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              class={`w-full ${
                (!size && "max-w-md") ||
                (size == "md" && "max-w-md") ||
                (size == "lg" && "max-w-lg") ||
                (size == "xl" && "max-w-2xl") ||
                (size == "md" && "max-w-2xl")
              } transform bg-white p-5 text-left align-middle shadow-xl transition-all`}
            >
              <DialogTitle
                as="h3"
                class="text-lg font-bold leading-6 text-slate-900/[.90] mb-4 flex justify-center"
              >
                {title}
              </DialogTitle>
              <div class="m-4">{children}</div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Popup;
