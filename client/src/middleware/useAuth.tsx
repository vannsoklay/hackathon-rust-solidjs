import {
  Component,
  JSXElement,
  Show,
  createContext,
  createSignal,
  useContext,
} from "solid-js";
import Login from "../components/LoginDialog";

export const AuthContext = createContext<{
  isAuthed: () => boolean;
  hide: () => void;
  login: () => void;
  logout: () => void;
}>();

export const AppProvider: Component<{ children: JSXElement }> = (props) => {
  const [isAuthed, setIsAuthed] = createSignal(false);
  const [isHide, setHide] = createSignal(false);
  const authContext = {
    isAuthed,
    hide: () => setHide(true),
    login: () => setIsAuthed(true),
    logout: () => setIsAuthed(false),
  };

  return (
    <AuthContext.Provider value={authContext}>
      <Show when={!isAuthed()} fallback={null}>
        <Login hide={isHide} setHide={setHide} />
      </Show>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
