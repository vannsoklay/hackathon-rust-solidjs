import type { Component } from "solid-js";
import { useParams } from "@solidjs/router";

const Profile: Component = () => {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <button class="btn">Profile</button>
    </div>
  );
};

export default Profile;
