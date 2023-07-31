import {
  Component,
  JSXElement,
  Show,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import Login from "../components/LoginDialog";
import axios from "axios";

export const AuthContext = createContext<{
  user: () => Profile | undefined;
  isAuthed: () => boolean;
  hide: () => void;
  login: (props: LoginForm) => void;
  logout: () => void;
  jump: () => boolean;
}>();

export const AppProvider: Component<{ children: JSXElement }> = (props) => {
  const [isAuthed, setIsAuthed] = createSignal(false);
  const [user, setUser] = createSignal<Profile | undefined>();
  const [isHide, setHide] = createSignal(false);
  const [isJump, setIsJump] = createSignal(false);

  let refetchUser = () => {
    setIsJump(false);
    axios
      .get("http://localhost:8000/api/me", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setUser(() => res.data.data.user);
        setIsAuthed(true);
      })
      .catch((_e) => {
        setIsAuthed(false);
      });
    setTimeout(() => {
      setIsJump(true);
    }, 500);
  };
  createEffect(() => {refetchUser()});

  const authContext = {
    user: user,
    isAuthed,
    hide: () => setHide(true),
    login: (props: LoginForm) => {
      setIsJump(false);
      axios
        .post(
          "http://localhost:8000/api/signin",
          {
            ...props,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.status === "success") {
            setIsAuthed(true);
            refetchUser()
          }
        })
        .catch((_e) => {
          setIsAuthed(false);
        });
      setTimeout(() => {
        setIsJump(true);
      }, 500);
    },
    logout: () => setIsAuthed(false),
    jump: isJump,
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
