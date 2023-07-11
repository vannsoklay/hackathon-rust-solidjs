export const stories = [
  {
    id: 1,
    user: {
      fullname: "Anthony Oleinik",
      email: "soklayvann@gmail.com",
      avatar: "avatar.png",
    },
    read: { time: 212132, date: "Nov 27, 2020" },
    stories: {
      thumail:
        "https://miro.medium.com/v2/resize:fit:720/format:webp/1*iml33VlJ5CbqobIoujj_0g.png",
      title: "WebSockets in Actix Web Full Tutorial — WebSockets & Actors",
      des: "This tutorial will walk you through each step of writing a blazingly fast WebSocket client in Actix Web, in-depth, and with a working repository as reference. We'll be building a simple chatroom that echos messages to everyone in a room, and include private messages. I'll also explain every step, so you can extend this example and write your own WebSocket server in Actix Web.",
      editor:
        "Step One: The setup First, run cargo init or something similar. then, go to your Cargo.toml and make sure you depend on these packages",
    },
  },
  {
    id: 2,
    user: {
      fullname: "Chris Kay",
      email: "soklayvann@gmail.com",
      avatar: "avatar.png",
    },
    read: { time: 212132, date: "Nov 27, 2022" },
    stories: {
      thumail:
        "https://miro.medium.com/v2/resize:fit:640/format:webp/1*AC43j3uRHNKo8Pjndd1_AQ.png",
      title:
        "How ExpressJS may be Faster than Actix Web ( Rust ) in some cases.",
      des: "Recently I posted an article where I compared 5 frameworks from 5 different languages and found out that Express handles static file serving 20x faster than any other framework ( rust, c++ included ). This amazed me, so I decided to dig deeper and perform multiple load tests and present you with the results in the form of magnificent graphs.",
      editor:
        "What I had found  While other frameworks took about 43ms to respond Express took ~2ms. Note that the load tests were performed in Rust. The index route only serves static files, meaning no heavy computation is done by the language, although, this time I also challenged the language speed by performing some intense stuff let’s say. You can find more about the research here with the Github repo at the bottom.",
    },
  },
  {
    id: 3,
    user: {
      fullname: "Liron Hazan",
      email: "soklayvann@gmail.com",
      avatar: "avatar.png",
    },
    read: { time: 212132, date: "Nov 27, 2023" },
    stories: {
      thumail:
        "https://miro.medium.com/v2/resize:fit:720/format:webp/1*BLUi-i5QOkLsSBVf1w5pJw.png",
      title: "A recipe for start using Rust actix-web and launch chrome 🚀",
      des: "A few weeks ago I started to develop a CLI tool in Rust under the name tsttgen which stands for Typescript Test Templates Generator.  In short on tsttgen — my initial motivation was, of course, improving my Rust skills, but the idea behind the tool is to automate the boilerplate creation part in generating typescript files which contain tests format that is used when developing e2e in typescript with TestCafe.",
      editor:
        " few weeks ago I started to develop a CLI tool in Rust under the name tsttgen which stands for Typescript Test Templates Generator.  In short on tsttgen — my initial motivation was, of course, improving my Rust skills, but the idea behind the tool is to automate the boilerplate creation part in generating typescript files which contain tests format that is used when developing e2e in typescript with TestCafe.  As the time passed and I wanted to keep developing tsttgen, I thought it would be really nice to serve a static report of tsttgen run and in future even run a web interface that could do more operations.  The tsttgen struct (TGenerator) implementation contains methods for generating the test files — each file represents a suite and can contain multiple tests.  The TGenerator struct also contains the new() associated function which plays an important part for this post cause it is responsible for building the TGenerator with the suites_map that in future will be passed to our server as an initial shared state 🎁.",
    },
  },
  {
    id: 3,
    user: {
      fullname: "Liron Hazan",
      email: "soklayvann@gmail.com",
      avatar: "avatar.png",
    },
    read: { time: 212132, date: "Nov 27, 2023" },
    stories: {
      thumail:
        "https://miro.medium.com/v2/resize:fit:720/format:webp/1*BLUi-i5QOkLsSBVf1w5pJw.png",
      title: "A recipe for start using Rust actix-web and launch chrome 🚀",
      des: "A few weeks ago I started to develop a CLI tool in Rust under the name tsttgen which stands for Typescript Test Templates Generator.  In short on tsttgen — my initial motivation was, of course, improving my Rust skills, but the idea behind the tool is to automate the boilerplate creation part in generating typescript files which contain tests format that is used when developing e2e in typescript with TestCafe.",
      editor:
        " few weeks ago I started to develop a CLI tool in Rust under the name tsttgen which stands for Typescript Test Templates Generator.  In short on tsttgen — my initial motivation was, of course, improving my Rust skills, but the idea behind the tool is to automate the boilerplate creation part in generating typescript files which contain tests format that is used when developing e2e in typescript with TestCafe.  As the time passed and I wanted to keep developing tsttgen, I thought it would be really nice to serve a static report of tsttgen run and in future even run a web interface that could do more operations.  The tsttgen struct (TGenerator) implementation contains methods for generating the test files — each file represents a suite and can contain multiple tests.  The TGenerator struct also contains the new() associated function which plays an important part for this post cause it is responsible for building the TGenerator with the suites_map that in future will be passed to our server as an initial shared state 🎁.",
    },
  },
];
