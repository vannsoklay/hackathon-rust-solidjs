import { Component } from "solid-js";
import Link from "../Link";

export const LeftBar: Component = () => {

  return (
    <nav class="space-y-5 fixed">
      <ul>
        <Link to="/" text="home" />
      </ul>
      <ul>
        <Link to="/room" text="room" />
      </ul>
      <ul>
        <Link to="/setting" text="setting" />
      </ul>
    </nav>
  );
};
