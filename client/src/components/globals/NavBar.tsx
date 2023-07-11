import { A, Link } from "@solidjs/router";
import { createSignal } from "solid-js";

export default function NavBar() {
  const auth = true;
  const [hide, setHide] = createSignal(false);
  return (
    <div class="w-full flex justify-center bg-gray-50 fixed backdrop-blur-sm bg-white/30">
      <nav class="flex h-20 container max-auto px-24 justify-between items-center">
        <ul class="w-full">
          <A href="/" class="normal-case text-xl">
            Brid
          </A>
        </ul>
        <ul class="flex justify-end space-x-4 items-center">
          {auth ? <NavbarPrivate /> : <NavbarPublic setHide={setHide} />}
        </ul>
      </nav>
    </div>
  );
}

function NavbarPrivate() {
  return (
    <>
      <li>
        <A href="/write">Write</A>
      </li>
      <li>
        <A href="/notify">
          <div class="h-10 w-10 cursor-pointer rounded-full border border-gray-600 bg-white relative">
            <label class="flex justify-center items-center h-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </label>
            <span class="absolute -top-2 -right-2 text-sm h-5 w-5 rounded-full bg-red-500 flex justify-center items-center text-white">
              5
            </span>
          </div>
        </A>
      </li>
      <li>
        <A href="/profile">
          <div class="h-10 w-10 cursor-pointer border border-slate-800 rounded-full bg-coffee-2 relative">
            <label class="flex justify-center items-center h-full">
              <img
                src="https://www.tocanvas.net/wp-content/uploads/2022/06/gojo-jjk.jpg"
                alt="soklay.png"
                class="h-full w-full object-cover rounded-full cursor-pointer"
              />
            </label>
          </div>
        </A>
      </li>
    </>
  );
}

function NavbarPublic({ setHide }: any) {
  return (
    <li class="font-semibold text-md" onClick={() => setHide(true)}>
      <div class="h-12 w-12 border cursor-pointer rounded-full relative">
        <label class="flex justify-center items-center h-full">
          {/* <RiLock2Line class="text-xl text-gray-600" /> */}
        </label>
      </div>
    </li>
  );
}
