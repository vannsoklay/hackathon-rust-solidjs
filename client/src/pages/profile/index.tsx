import { Component, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useAuth } from "../../middleware/useAuth";

const Profile: Component = () => {
  const params = useParams<{ id: string }>();
  const { user, jump } = useAuth();

  return (
    <Show when={jump()} fallback={<div>loading...</div>}>
      <p>
        Name: {user()?.first_name} {user()?.last_name}
      </p>
    </Show>
  );
};

export default Profile;
