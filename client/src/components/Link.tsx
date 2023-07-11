import { A, useMatch, useResolvedPath } from "@solidjs/router";
import { Component } from "solid-js";

type Match = {
  to: string;
  text: string;
};

const Link: Component<Match> = ({ to, text }: Match) => {
  let match = useMatch(() => to);

  return (
    <A
      href={to}
      class={`text-xl cursor-pointer hover:text-primary-900 capitalize ${
        match() && "text-primary-900"
      }`}
    >
      <li class={`${match() ? "font-semibold" : "font-medium"}`}>{text}</li>
    </A>
  );
};

export default Link;
