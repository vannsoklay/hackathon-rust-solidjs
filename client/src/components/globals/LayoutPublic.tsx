import { Outlet } from "@solidjs/router";
import NavBar from "./NavBar";
import { LeftBar } from "./LeftBar";
import RightBar from "./RigthBar";
import Container from "./Container";

const PublicLayout = () => {
  return (
    <div class="overscroll-contain">
      <NavBar />
      <Container>
        <div class={`w-2/12`}>
          <LeftBar />
        </div>
        <div class={`w-7/12 pr-6`}>
          <Outlet />
        </div>
        <div class="w-3/12">
          <RightBar />
        </div>
      </Container>
    </div>
  );
};

export default PublicLayout;
