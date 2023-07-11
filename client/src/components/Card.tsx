import { Component } from "solid-js";
import Tag from "./Tag";
import { A } from "@solidjs/router";

const Card: Component<CardType> = ({ story, url }: CardType) => {
  return (
    <div>
      <h2 class="card-title">
        <div class="avatar placeholder">
          <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
            <img src="https://images.theconversation.com/files/500899/original/file-20221214-461-22jr1l.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop" />
          </div>
        </div>
        <ul>
          <li class="text-sm font-semibold text-slate-800">
            {story.user.fullname}
          </li>
          <li class="text-xs font-semibold text-slate-600">១​ ម៉ោង</li>
        </ul>
      </h2>
      <main class="flex">
        <div class="pr-6">
          <div class="flex items-center">
            <div>
              <h2 class="card-title font-bold text-2xl">
                <A href={url}>{story.stories.title}</A>
              </h2>
              <p class="text-lg font-medium">
                {story.stories.des.length > 128
                  ? story.stories.des.slice(0, 128) + "..."
                  : story.stories.des}
              </p>
            </div>
          </div>
          <div class="card-actions flex justify-between mt-6 items-center">
            <div class="justify-start flex space-x-4 items-center">
              <div>
                <Tag name="SolidJS" />
              </div>
              <div>
                <span>5 min read</span>
              </div>
            </div>
            <div class="justify-end flex space-x-4 mr-4">
              <ul>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </ul>
              <ul>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </ul>
            </div>
          </div>
        </div>
        <div class="avatar h-full">
          <figure class="w-36 h-32 rounded-xl">
            <img src="https://qbdgroup.com/wp-content/uploads/image-tech-transfer.jpg" />
          </figure>
        </div>
      </main>
    </div>
  );
};

export default Card;
