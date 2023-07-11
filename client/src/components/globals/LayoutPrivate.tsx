import { Outlet, useLocation } from "@solidjs/router";
import { Show, createSignal, createMemo } from "solid-js";
import { useAuth } from "../../middleware/useAuth";
import NavBar from "./NavBar";
import { LeftBar } from "./LeftBar";
import Login from "../LoginDialog";
import Container from "./Container";

const PrivateLayout = () => {
  const { isAuthed } = useAuth();
  const location = useLocation();
  const [hide, setHide] = createSignal(!isAuthed());
  const pathname = createMemo(() => location.pathname);
  
  return (
    <div>
      <NavBar />
      <Show
        when={isAuthed()}
        fallback={<Login hide={hide} setHide={setHide} />}
      >
        <Container>
          {pathname().split("/")[1] == "write" ? (
            <Outlet />
          ) : (
            <>
              <div class="w-2/12">
                <LeftBar />
              </div>
              <div class="w-10/12">
                <Outlet />
              </div>
            </>
          )}
        </Container>
      </Show>
    </div>
  );
};

export default PrivateLayout;
