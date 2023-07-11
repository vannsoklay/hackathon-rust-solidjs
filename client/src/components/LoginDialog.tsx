import { Component } from "solid-js";
import Popup from "./Dialog";
import { useAuth } from "../middleware/useAuth";

const Login: Component<Popup> = ({ hide, setHide }: Popup) => {
  const { isAuthed, login } = useAuth();
  return (
    <Popup
      title="Sigin In"
      hide={hide}
      size="lg"
      onClose={() => setHide(isAuthed())}
    >
      <button
        type="button"
        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        onClick={() => login()}
      >
        Login
      </button>
    </Popup>
  );
};


export default Login;