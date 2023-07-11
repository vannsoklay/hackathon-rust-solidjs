import type { Component } from "solid-js";
import { useParams } from "@solidjs/router";

const History: Component = () => {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <button class="btn">History</button>
    </div>
  );
};

export default History;
