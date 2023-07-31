import { Show, type Component, For } from "solid-js";
import Card from "../components/Card";
import { stories } from "../api/stories";
import { useAuth } from "../middleware/useAuth";
import { createQuery } from "solid-urql";
// import { gql, createQuery } from '@merged/solid-apollo'

const QUERY = `
  query{
    getStories{
        id
        title
    }
  }
`;

const Home: Component = () => {
  const [items, itemsState] = createQuery({
    query: QUERY,
    context: {
      url: "http://localhost:8000/public",
    },
  });

  return (
    <div class="divide-y">
      <Show when={!itemsState().fetching} fallback={<p>Loading...</p>}>
        <p>
          Items are:{" "}
          {items()
            .getStories.map((item: any) => item.title)
            .join(", ")}
        </p>
      </Show>
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
