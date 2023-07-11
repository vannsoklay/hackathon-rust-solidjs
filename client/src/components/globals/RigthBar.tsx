import { Component, Show, createMemo } from "solid-js";
import { useAuth } from "../../middleware/useAuth";
import { useLocation } from "@solidjs/router";

const RightBar: Component = () => {
  const { isAuthed, hide } = useAuth();
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  return (
    <div class="space-y-5">
      <div class="w-full bg-[#F7F9F9] rounded-2xl">
        <article class="space-y-2">
          <header class="px-4 pt-3">
            <label class="text-xl font-bold">Top Writers</label>
          </header>
          <ul>
            <li class="flex justify-between hover:bg-gray-100 px-4 py-3">
              <div class="flex space-x-3">
                <img
                  class="h-12 w-12 rounded-full border-2 border-primary-900"
                  src="https://i.pinimg.com/736x/8f/8e/44/8f8e44ecfbf420342935f936a5b16f96.jpg"
                />
                <div>
                  <div class="font-bold text-md">Nitin Sharma</div>
                  <div class="text-sm font-semibold text-gray-600">
                    @SharmaReader
                  </div>
                </div>
              </div>
              <div class="flex items-center">
                <button
                  onClick={() => {
                    isAuthed() ? console.log("follower") : hide();
                  }}
                  class="px-5 pt-1.5 pb-2 rounded-full bg-black text-white font-semibold"
                >
                  Follow
                </button>
              </div>
            </li>
            <li class="flex justify-between hover:bg-gray-100 px-4 py-3">
              <div class="flex space-x-3">
                <img
                  class="h-12 w-12 rounded-full border-2 border-primary-900"
                  src="https://i.pinimg.com/736x/8f/8e/44/8f8e44ecfbf420342935f936a5b16f96.jpg"
                />
                <div>
                  <div class="font-bold text-md">Tim Denning</div>
                  <div class="text-sm font-semibold text-gray-600">
                    @DENNwriter
                  </div>
                </div>
              </div>
              <div class="flex items-center">
                <button
                  onClick={() => {
                    isAuthed() ? console.log("follower") : hide();
                  }}
                  class="px-5 pt-1.5 pb-2 rounded-full bg-black text-white font-semibold"
                >
                  Follow
                </button>
              </div>
            </li>
            <li class="flex justify-between hover:bg-gray-100 px-4 py-4 rounded-b-2xl">
              <button class="bg-red -mt-1 font-semibold text-blue-400">
                Show more
              </button>
            </li>
          </ul>
        </article>
      </div>

      <Show
        when={pathname().split("/")[1] == "read" ? true : false}
        fallback={null}
      >
        <div class="w-full bg-[#F7F9F9] rounded-2xl">
          <article class="space-y-2">
            <header class="px-4 pt-3">
              <label class="text-xl font-bold">Suggestion Stories</label>
            </header>
            <ul>
              <li class="flex justify-between hover:bg-gray-100 px-4 py-3">
                <div class="flex space-x-3">
                  <img
                    class="h-12 w-12 rounded-full border-2 border-primary-900"
                    src="https://i.pinimg.com/736x/8f/8e/44/8f8e44ecfbf420342935f936a5b16f96.jpg"
                  />
                  <div>
                    <div class="font-bold text-md">Nitin Sharma</div>
                    <div class="text-sm font-semibold text-gray-600">
                      @SharmaReader
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <button
                    onClick={() => {
                      isAuthed() ? console.log("follower") : hide();
                    }}
                    class="px-5 pt-1.5 pb-2 rounded-full bg-black text-white font-semibold"
                  >
                    Follow
                  </button>
                </div>
              </li>
              <li class="flex justify-between hover:bg-gray-100 px-4 py-3">
                <div class="flex space-x-3">
                  <img
                    class="h-12 w-12 rounded-full border-2 border-primary-900"
                    src="https://i.pinimg.com/736x/8f/8e/44/8f8e44ecfbf420342935f936a5b16f96.jpg"
                  />
                  <div>
                    <div class="font-bold text-md">Tim Denning</div>
                    <div class="text-sm font-semibold text-gray-600">
                      @DENNwriter
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <button
                    onClick={() => {
                      isAuthed() ? console.log("follower") : hide();
                    }}
                    class="px-5 pt-1.5 pb-2 rounded-full bg-black text-white font-semibold"
                  >
                    Follow
                  </button>
                </div>
              </li>
              <li class="flex justify-between hover:bg-gray-100 px-4 py-4 rounded-b-2xl">
                <button class="bg-red -mt-1 font-semibold text-blue-400">
                  Show stories
                </button>
              </li>
            </ul>
          </article>
        </div>
      </Show>
    </div>
  );
};

export default RightBar;
