import { Component } from "solid-js";
import Popup from "./Dialog";
import { useAuth } from "../middleware/useAuth";
import { createStore } from "solid-js/store";

const Login: Component<Popup> = ({ hide, setHide }: Popup) => {

  const { isAuthed, login } = useAuth();
  const [fields, setFields] = createStore<LoginForm>({
    email: "",
    password: ""
  });

  const handleInput = (event: GliderInputEvent) => {
    const {name, value} = event.currentTarget;
    setFields(name as keyof LoginForm, value);
  }

  const onSubmit = (e: Event) => {
    e.preventDefault();
    login(fields)
  }

  return (
    <Popup
      title="Sigin In"
      hide={hide}
      size="lg"
      onClose={() => setHide(isAuthed())}
    >
      <form onSubmit={onSubmit}>
        <div class="field-block">
          <input
            class="border-2 border-indigo-600"
            name="email"
            type="email"
            placeholder="Email"
            required
            onInput={handleInput}
          />
          {/* {errors.email && <ErrorMessage error={errors.email} />} */}
        </div>
        <div class="field-block">
          <input
            class="border-2 border-indigo-600"
            type="password"
            name="password"
            placeholder="Password"
            required
            onInput={handleInput}
          />
          {/* {errors.password && <ErrorMessage error={errors.password} />} */}
        </div>
        <button type="submit" class="py-2 w-full bg-blue-800 text-white">Login</button>
      </form>
    </Popup>
  );
};

export default Login;
