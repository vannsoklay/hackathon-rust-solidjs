import { Show, type Component, For } from "solid-js";
import Card from "../components/Card";
import { stories } from "../api/stories";

const Home: Component = () => {
  return (
    <div class="divide-y">
      <Show when={stories} fallback={<div>loading...</div>}>
        <For each={stories}>
          {(story, i) => (
            <div class={`pb-12 ${i() >= 1 && "pt-8"}`}>
              <Card url={`/read/${story.id}`} story={story} />
            </div>
          )}
        </For>
      </Show>
    </div>
  );
};

export default Home;
