import { type Component } from "solid-js";
import { useParams } from "@solidjs/router";
import { useAuth } from "../../middleware/useAuth";

const Detail: Component = () => {
  const { isAuthed, hide } = useAuth();
  const params = useParams<{ id: string }>();

  return (
    <>
      <div class="space-x-5 flex">
        <ul class="-left-14 top-0 space-y-3">
          <li class="h-10 w-10 rounded-full bg-blue-500">
            <button
              class="rounded-full h-10 w-10 flex justify-center items-center tooltip tooltip-bottom"
              data-tip="Reaction"
              onClick={() => (isAuthed() ? console.log("like") : hide())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width={1.5}
                stroke="currentColor"
                class="w-5 h-5 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
            </button>
          </li>
          <li class="h-10 w-10 rounded-full bg-blue-500">
            <button
              class="rounded-full h-10 w-10 flex justify-center items-center tooltip tooltip-bottom"
              data-tip="Comments"
              onClick={() => (isAuthed() ? console.log("like") : hide())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width={1.5}
                stroke="currentColor"
                class="w-5 h-5 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </button>
          </li>
          <li class="h-10 w-10 rounded-full bg-blue-500">
            <button
              class="rounded-full h-10 w-10 flex justify-center items-center tooltip tooltip-bottom"
              data-tip="Save"
              onClick={() => (isAuthed() ? console.log("like") : hide())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width={1.5}
                stroke="currentColor"
                class="w-5 h-5 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
          </li>
          <li class="h-10 w-10 rounded-full bg-blue-500">
            <button
              class="rounded-full h-10 w-10 flex justify-center items-center tooltip tooltip-bottom"
              data-tip="Links"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width={1.5}
                stroke="currentColor"
                class="w-5 h-5 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </button>
          </li>
        </ul>
        <div class="inline-block">
          <div class="w-full">
            <figure>
              <img
                src="https://news.xbox.com/en-us/wp-content/uploads/sites/2/2021/05/RustCE_LaunchTrailer_1920Thumb_JPG.jpg"
                alt="car!"
              />
            </figure>
          </div>
          <nav class="py-4 flex items-center space-x-2">
            <div class="avatar">
              <div class="w-12 rounded-full">
                <img src="https://hips.hearstapps.com/hmg-prod/images/wolf-dog-breeds-siberian-husky-1570411330.jpg?crop=1xw:0.84375xh;center,top" />
              </div>
            </div>
            <ul>
              <li class="font-semibold">Vann Soklay</li>
              <li class="flex items-center space-x-3">
                <div>1-Jan-2023</div>
                <div class="h-1 w-1 rounded-full bg-black"></div>
                <div>Read 23 min</div>
              </li>
            </ul>
          </nav>
          <div class="whitespace-normal text-lg break-all">
            The electrical telegraph systems, developed in the early 19th
            century, used electrical signals to send text messages. In the late
            19th century, the wireless telegraphy was developed using radio
            waves. In 1933, the German Reichspost (Reich postal service)
            introduced the first "telex" service.[2][3] The University of Hawaii
            began using radio to send digital information as early as 1971,
            using ALOHAnet.[citation needed] Friedhelm Hillebrand conceptualised
            SMS in 1984 while working for Deutsche Telekom. Sitting at a
            typewriter at home, Hillebrand typed out random sentences and
            counted every letter, number, punctuation, and space. Almost every
            time, the messages contained fewer than 160 characters, thus giving
            the basis for the limit one could type via text messaging.[4] With
            Bernard Ghillebaert of France Télécom, he developed a proposal for
            the GSM (Groupe Spécial Mobile) meeting in February 1985 in Oslo.[5]
            The first technical solution evolved in a GSM subgroup under the
            leadership of Finn Trosby. It was further developed under the
            leadership of Kevin Holley and Ian Harris (see Short Message
            Service).[6] SMS forms an integral part of Signalling System No. 7
            (SS7).[7] Under SS7, it is a "state" with a 160 character data,
            coded in the ITU-T "T.56" text format, that has a "sequence lead in"
            to determine different language codes and may have special character
            codes that permit, for example, sending simple graphs as text. This
            was part of ISDN (Integrated Services Digital Network) and since GSM
            is based on this, it made its way to the mobile phone. Messages
            could be sent and received on ISDN phones, and these can send SMS to
            any GSM phone. The possibility of doing something is one thing,
            implementing it another, but systems existed from 1988 that sent SMS
            messages to mobile phones[citation needed] (compare ND-NOTIS). SMS
            messaging was used for the first time on 3 December 1992,[8] at the
            Three Tuns Public House in Reading, Berkshire[9] when Neil Papworth,
            a 22-year-old test engineer for Sema Group in the UK[10] (now
            Airwide Solutions),[11] used a personal computer to send the text
            message "Merry Christmas" via the Vodafone network to the phone of
            Richard Jarvis,[12][13] who was at a party in Newbury, Berkshire,
            which had been organized to celebrate the event. Modern SMS text
            messaging is usually messaging from one mobile phone to another.
            Finnish Radiolinja became the first network to offer a commercial
            person-to-person SMS text messaging service in 1994. When
            Radiolinja's domestic competitor, Telecom Finland (now part of
            TeliaSonera) also launched SMS text messaging in 1995 and the two
            networks offered cross-network SMS functionality, Finland became the
            first nation where SMS text messaging was offered on a competitive
            as well as on a commercial basis. GSM was allowed[by whom?] in the
            United States and the radio frequencies were blocked and awarded to
            US "Carriers" to use US technology. Hence there is no "development"
            in the US in mobile messaging service. The GSM in the US had to use
            a frequency allocated for private communication services (PCS) –
            what the ITU frequency régime had blocked for DECT – Digital
            Enhanced Cordless Telecommunications – 1000-feet range picocell, but
            survived. American Personal Communications (APC), the first GSM
            carrier in America, provided the first text-messaging service in the
            United States. Sprint Telecommunications Venture, a partnership of
            Sprint Corp. and three large cable-TV companies, owned 49 percent of
            APC. The Sprint venture was the largest single buyer at a
            government-run spectrum auction that raised $7.7 billion in 2005 for
            PCS licenses. APC operated under the brand name of Sprint Spectrum
            and launched its service on 15 November 1995, in Washington, D.C.
            and in Baltimore, Maryland. Vice President Al Gore in Washington,
            D.C. made the initial phone-call to launch the network, calling
            Mayor Kurt Schmoke in Baltimore.[14] Initial growth of text
            messaging worldwide was slow, with customers in 1995 sending on
            average only 0.4 messages per GSM customer per month.[15] One factor
            in the slow take-up of SMS was that operators were slow to set up
            charging systems, especially for prepaid subscribers, and to
            eliminate billing fraud, which was possible by changing SMSC
            settings on individual handsets to use the SMSCs of other
            operators.[citation needed] Over time, this issue was eliminated by
            switch billing instead of billing at the SMSC and by new features
            within SMSCs to allow blocking of foreign mobile users sending
            messages through it.[citation needed] SMS is available on a wide
            range of networks, including 3G networks. However, not all
            text-messaging systems use SMS; some notable alternate
            implementations of the concept include J-Phone's SkyMail and NTT
            Docomo's Short Mail, both in Japan. E-mail messaging from phones, as
            popularized by NTT Docomo's i-mode and the RIM BlackBerry, also
            typically use standard mail protocols such as SMTP over TCP/IP.[16]
            As of 2007 text messaging was the most widely used mobile data
            service, with 74% of all mobile phone users worldwide, or 2.4
            billion out of 3.3 billion phone subscribers, at the end of 2007
            being active users of the Short Message Service. In countries such
            as Finland, Sweden, and Norway, over 85% of the population use SMS.
            The European average is about 80%, and North America is rapidly
            catching up with over 60% active users of SMS by end of
            2008.[citation needed] The largest average usage of the service by
            mobile phone subscribers occurs in the Philippines, with an average
            of 27 texts sent per day per subscriber.
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
