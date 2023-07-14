import type { Component } from "solid-js";
import { useParams } from "@solidjs/router";
import { useAuth } from "../../middleware/useAuth";

const Profile: Component = () => {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  
  return (
    <div>
      <p>Name: {user()?.first_name} {user()?.last_name}</p>
    </div>
  );
};

export default Profile;
