import { Component, JSXElement } from "solid-js";

const Container: Component<{ children: JSXElement }> = (props) => {
  return (
    <div class="w-full flex justify-center">
      <div class="flex container max-auto w-full px-24 mt-24 h-screen">
        {props.children}
      </div>
    </div>
  );
};

export default Container;
