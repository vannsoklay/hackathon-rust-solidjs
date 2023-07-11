import { Component } from "solid-js";

type InputType = {
  placeholder: string;
  type: string;
  name: string;
};

const InputField: Component<InputType> = ({
  placeholder,
  type,
  name,
}: InputType) => {
  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        class="text-gray-500 block text-sm appearance-none rounded-sm w-full bg-white border border-grey-light hover:border-grey px-2 py-2 outline-none"
        type={type}
      />
    </div>
  );
};

export { InputField };
