import type { Component } from "solid-js";
import { useParams } from "@solidjs/router";

const About: Component = () => {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <button class="btn">Detail</button>
    </div>
  );
};

export default About;
