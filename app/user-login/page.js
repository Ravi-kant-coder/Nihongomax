import CreateAcc from "./CreateAcc";
import Login from "./Login";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TryWithoutLogin from "./TryWithoutLogin";
import ForgotPassword from "./ForgotPassword";

const Page = () => {
  return (
    <div className="min-h-screen dark:bg-[rgb(200,200,200)]">
      {/* -----------------------Nihongomax Logo and Create acc------------------------- */}
      <div className="z-10 w-full py-1">
        <div className="flex justify-start items-center ml-10">
          <Image
            src={"/Nihongomax-transp.png"}
            alt="Nihongomax"
            width={300}
            height={200}
            className="ml-5"
          />
          <div className="fixed top-5 right-80 z-20">
            <CreateAcc />
          </div>
        </div>
        <Login />
      </div>
      {/* ---------------------------------CLOUDS----------------------------- */}
      <div className="w-[90%] absolute overflow-hidden">
        <div className="text-6xl animate-[cloud-left-right_15s_linear_infinite]">
          ☁️
        </div>
        <div className="text-5xl animate-[cloud-left-right_18s_linear_infinite]">
          ☁️
        </div>
      </div>
      <div className="flex">
        {/* --------------------------Learn Japanese And MountFuji--------------------- */}
        <div className="flex flex-col ">
          <div className="flex justify-start items-center">
            <Image
              src={"/nihongomax.png"}
              alt="trans"
              width={800}
              height={400}
              className="rounded"
            />
            <div className="relative">
              <Avatar className="w-70 h-70 rounded-sm">
                <AvatarImage src="/Mount-Fuji.png" className="object-cover" />
                <AvatarFallback
                  className="bg-gray-400 dark:bg-gray-500 w-30 h-20 lg:text-4xl
                          font-semibold rounded mr-2 text-2xl"
                >
                  Nihongomax
                </AvatarFallback>
              </Avatar>
              <Image
                src={"/Branch.png"}
                alt="trans"
                width={500}
                height={200}
                className="absolute left-30 top-30 branch-animate"
              />
            </div>
          </div>

          {/* -------Neela Gola, create Acc, billi, 5000 and TryWLogin----------- */}

          <div className="flex justify-center items-start">
            <div>
              <CreateAcc />
              <Avatar className="w-70 h-70 n5-animate my-2">
                <AvatarImage
                  src="/tsukimi.png"
                  className="object-cover opacity-80"
                />
                <AvatarFallback
                  className="bg-gray-400 dark:bg-gray-500 w-70 h-70 lg:text-4xl
                  font-semibold rounded text-2xl"
                >
                  Nihongomax
                </AvatarFallback>
              </Avatar>

              <Image
                src="/japan_theme_left.png"
                alt="trans"
                width={300}
                height={400}
                className="right-5 top-25 h-full rounded-2xl opacity-80"
              />
            </div>
            <div className="flex justify-center items-center flex-col mx-10">
              <Avatar className="w-175 h-110 rounded-2xl bg-white/90">
                <AvatarImage
                  src={"/learnJapNew.jpeg"}
                  className="object-cover"
                />
                <AvatarFallback
                  className="bg-gray-400 dark:bg-gray-500 w-175 h-110 lg:text-4xl
                font-semibold rounded text-2xl"
                >
                  Nihongomax
                </AvatarFallback>
              </Avatar>
              <Image
                src="/jobs-japan.png"
                alt="trans"
                width={700}
                height={300}
                className="w-180 rounded-2xl"
              />
              <div className="flex justify-center items-center space-x-5 mt-5">
                <Image
                  src="/story.jpg"
                  alt="trans"
                  width={700}
                  height={300}
                  className="w-60 rounded-2xl branch-animate shadow-xl"
                />
              </div>
            </div>
            <TryWithoutLogin />
          </div>
        </div>
      </div>
      {/* -----------------------Features lines---------------------------- */}
      <div className="flex justify-center items-center mx-10">
        <Image
          src="/svgs/japanese_institute.svg"
          alt="trans"
          width={700}
          height={300}
          className="w-60"
        />
        <p className="text-center text-xl text-gray-800  mt-10">
          <b>Why Join an Institute?</b> <br />
          When you can{" "}
          <a
            href="https://learnjapanesedelhi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-800 transition"
          >
            learn Japanese online
          </a>{" "}
          by JLPT N1 Clear Experts. <br />
          Just Create Account and get N5 to N1. <br />
          Also Apply for Jobs, <br />
          Schools in Japan, <br />
          Play Japanese words Games,
          <br />
          Show your profile to Recruiters.
        </p>
      </div>
      <div className="flex justify-center items-center mx-20">
        <div className="text-center text-xl text-gray-800  my-5">
          <p className="font-semibold">
            日本人の方が英語を気楽に学ぶためのアプリです。
          </p>
          <ul className="list-disc list-outside text-left mt-2">
            <li>初級から上級までの内容満喫</li>
            <li>
              英語分を日本語で徹底分析・日本語での説明を聞きながら、英語の理解度を深める
            </li>{" "}
            <li>
              {" "}
              初級から上級までのビジネス英語・英会話・練習・勉強の仕方まで
            </li>
            <li>こちら簡単なサインアップでアカウント作成</li>
          </ul>
        </div>
        <Image
          src="/svgs/japanese_intro.svg"
          alt="japanese_career"
          width={500}
          height={200}
          className="w-60"
        />
      </div>
      <div className="flex justify-center items-center mx-20">
        <div className="text-center text-xl text-gray-800  my-5">
          <Image
            src="/svgs/japanese_career.svg"
            alt="japanese_career"
            width={700}
            height={300}
            className="w-80"
          />
          <p className="font-semibold">Here you will get:</p>
          <ul className="list-disc list-outside text-left mt-2">
            <li>JLPT N5 to N1 classes with explanation in Hindi and English</li>
            <li>JLPT N1 (Advanced) cleared teachers </li>
            <li>
              Post your questions, doubts and queries on wall and get them
              resolved by experts
            </li>{" "}
            <li>
              {" "}
              We have provided you with the best study material for all levels
              of JLPT from N5 to N1
            </li>
            <li>
              Business Japanese course for working professionals and students
            </li>
            <li>
              Salary negotiation Tips and Tricks for working professionals
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center mx-20">
        <div className="text-center text-xl text-gray-800  my-5">
          <Image
            src="/svgs/nihongomax_japan.svg"
            alt="japanese_career"
            width={700}
            height={300}
            className="w-80"
          />
          <p className="font-semibold">日本人の方へ</p>
          <ul className="list-disc list-outside text-left mt-2">
            <li>
              少しでも英語が分かるようになりたい、少しでも英語が話せるようになりたい。
            </li>
            <li>
              普通の英会話も、上級英会話も、ビジネスシーンで使われる英会話も上達したい。
            </li>
            <li>でも</li>
            <li>時間がない。一日に30分しかない。</li>{" "}
            <li>お金はあまり使いたくない。</li>
            <li>出張などで、決まった時間に英語学校へ行くのが難しい。</li>
            <li>英語の発音・言葉に自信がない。</li>
            <li>勉強の仕方が分からない。</li>
            <li>自分がどのレベルにいるのか知らない。</li>
            <li>一日に何をどれくらい勉強すれば良いか分からない。</li>
            <li>同じように、ほかの日本人と英語で会話したい。</li>
            <li>英語教師に相談を受けたい。</li>
            <li>
              そんな日本人の方の不安に応える実用的な教材、それが本アプリの目指すところです。
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center mx-20">
        <div className="text-center text-xl text-gray-800 my-5">
          <Image
            src="/svgs/nihongomax_features.svg"
            alt="japanese_career"
            width={700}
            height={300}
            className="w-80"
          />
          <p className="font-semibold">Some features</p>
          <ul className="list-disc list-outside text-left mt-2">
            <li>
              Complete courses with explanation perfectly divided from JLPT N5
              (Basic) till JLPT N1 (Advanced)
            </li>
            <li>
              Theme based business Japanese in Hindi from Basic to Advanced with
              complete explanation
            </li>
            <li>
              Get explanation about Japanese language certification exam JLPT
              Read About JLPT/NAT (Try without login)
            </li>{" "}
            <li>
              Not only study but motivation and explanation about correct ways
              of study with Tips and Tricks of JLPT/NAT
            </li>
            <li>
              Make notes white studying. It is a very effective and powerful
              activity
            </li>
            <li>Apply for Jobs in Japan and India</li>
            <li>
              Still any problem? Get free doubts solving and replies on wall
            </li>
            <li>
              Apply for Japanese Language Schools in Japan and other courses
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center mx-20">
        <div className="text-center text-xl text-gray-800  my-5">
          <Image
            src="/svgs/nihonjin_eikaiwa.svg"
            alt="japanese_career"
            width={700}
            height={300}
            className="w-80"
          />
          <p className="font-semibold">日本人のために英会話</p>
          <ul className="list-disc list-outside text-left mt-2">
            <li>英会話初級から上級まで</li>
            <li>ビジネス英語コースも初級から上級まで全部</li>
            <li>全部の英語コースは日本語での分析・説明</li>{" "}
            <li>
              {" "}
              英語の発音は、アメリカ人の発音を聞いて練習し、日本語での分・析説明を聞き、シナリオを把握できる。
            </li>
            <li>
              日本語で英語の分析だけじゃなくて、勉強の仕方、改善ポイント、モチベーションもたっぷり。
            </li>
            <li>英会話（上級レベル）はストーリを楽しめながら勉強できる。</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center mx-20">
        <div className="text-center text-xl text-gray-800 my-5">
          <Image
            src="/svgs/nihongo_connections.svg"
            alt="japanese_career"
            width={700}
            height={300}
            className="w-80"
          />
          <p className="font-semibold">Get Connected</p>
          <ul className="list-disc list-outside text-left mt-2">
            <li>
              Connected with Japanese language students <br />
              and to people working in it, Also with Japanese natives
            </li>
            <li>
              After covering Japanese uptill an intermediate level,
              <br /> Listen to how explanation of English is given in Japanese
              language for Japanese natives
            </li>
            <li>
              Post stories, questions, doubts and queries on wall and get them
              solved by experts. <br />
              Also help others by answering their questions.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center mx-20">
        <div className="text-center text-xl text-gray-800  my-5">
          <Image
            src="/svgs/features.svg"
            alt="japanese_career"
            width={500}
            height={200}
            className="w-60"
          />
          <p className="font-semibold">ここでの英語勉強の特徴</p>
          <ul className="list-disc list-outside text-left mt-2">
            <li>
              学校に行って勉強することとどう違うのかと、何回リピートしてもなくならない。
            </li>
            <li>忙しくて時間がない、出張で授業欠席など問題はない。</li>
            <li>
              毎日やる量が分からない方も大丈夫。コンテンツが授業みたいに区別。
            </li>{" "}
            <li>
              勉強しながら、同じような日本人の方と会話・助け合いすることができる。
            </li>
            <li>まだ分からないことがあれば、英語教師からご相談。</li>
            <li>
              日系企業に働きたいインド人材。日本語能力検定試験のN2合格、
              <br />
              あるいはN1を勉強している優秀なインド人のデータベースがあり、
              <br />
              お選びし、面接や募集することができます。
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center mx-20">
        <div className="text-center text-xl text-gray-800  my-5">
          <Image
            src="/svgs/japanese_interview.svg"
            alt="japanese_career"
            width={700}
            height={300}
            className="w-60"
          />
          <p className="font-semibold">Japanese Interview Training</p>
          <ul className="list-disc list-outside text-left mt-2">
            <li>Get the detailed information about Japanese Interview</li>
            <li>
              Get Questions and Answers, Techniques and Tips to clear interview
            </li>
            <li>
              All about Salary negotiation in Automobile industry, IT industry
              and Tourism Industry
            </li>
            <li>
              How to negotiate in Meetings and how to behave in a Japanese
              company
            </li>
            <li>
              How to write a Resume in Japanese and how to prepare for a Job
              interview in Japanese
            </li>
          </ul>
        </div>
      </div>
      {/* --------------------Information about Japanese ------------------- */}
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1 className="text-xl text-center font-semibold mb-2 text-gray-800">
          Learn Japanese online
        </h1>
        <Image
          src="/svgs/learn_japanese.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-60 float-left mr-4 mb-2"
        />
        Among many benefits to learn Japanese Language online, there is a
        benefit of learning Japanese Language faster and in an effective manner.
        Since there are many advantages in Japanese Language study that require
        practicing from Videos and Audios, there is a practice of using online
        devices and applications to make it Japanese Language learning at its
        fullest saving your energy and money. It is a common myth among many
        Japanese Language learners that only offline training is effective. But
        in this modern era when globally students are learning Japanese Language
        online for example from nihongmax.com and Japanese Language online
        classes from Nihongomax, it is very well understood now that any level
        of JLPT be it JLPT N5, JLPT N4, JLPT N3, JLPT N2 or even JLPT N1 can be
        covered through online Japanese classes. Japanese scripts like Hiragana,
        Katakana, Kanji are fundamental steps to start learning Japanese
        language and they form the structure of Japanese. In today’s age, it is
        very well understood by the online Japanese language students and the
        whole world that going online is the future. There is a completely new
        drift towards online Japanese language study all over the world.
        Initially it was considered as only travel time and travel cost savings.
        But in modern era there are much more advantages of studying Japanese
        language or in fact any other course online. The main advantage is with
        the working people who can join the lesson anywhere from their homes to
        their office in free time without going into the hassle of running here
        and there to and fro locating the institute or managing physical
        attendance. Not only this, online training gives them a relaxed and
        flexible management of their schedule and as a result there is a better
        work life balance maintained.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1 className="text-xl text-center font-semibold mb-2 text-gray-800">
          Why Japanese online
        </h1>
        <Image
          src="/svgs/why_japanese.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-60 float-left mr-4 mb-2"
        />
        In the modern times of uncertainty, there is an emerging demand of
        Japanese online so that time and effort is saved. Studying Japanese
        online enhances your language learning capabilities and it is also a
        positive step to maintain the rhythm of study as it was in the
        pre-pandemic times. So to keep the Japanese language study flows
        undisturbed and to remain the sprits high, Nihongomax has Online
        Japanese language courses for the students who were already enrolled in
        classes and for the new ones who want to keep their lives safe and at
        the same time they do not want to waste their time in contemporary era
        where everyone is indulged in making his/her career on the fast track.
        There are the courses that are tailor made for the students who know
        nothing about Japanese language and want to learn it from the very
        beginning. Nihongomax provide very simple structured Japanese language
        online courses that are formed as per the requirement of your time and
        flexibility of the schedule keeping in mind the convenience of learners
        and their conditions of study. The teachers also keep course structure
        and flow so simple that even those who are not keeping up the pace with
        the class, can cover the course and cope up with all the knowledge flow.
        Also the interview questions that are pretty necessary for a Job
        interview are taught in such a simple and straight-forward manner that
        anyone can easily get through with it. Not only this, a FREE online
        Japanese language trial class is conducted for the ease of understand
        and to generate a comfortable environment to make Japanese language
        learning fun.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1 className="text-xl text-center font-semibold mb-2 text-gray-800">
          Advantages and Disadvantages of Learning Japanese Online
        </h1>
        <Image
          src="/svgs/advantages_japanese.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-70 float-left mr-4 mb-2"
        />
        Advantages of learning Japanese language online: No need to commute in
        Buses, trains: That means saving of your time and money Easy to follow:
        That means even sometimes you have lesser energy to follow the classes,
        you can just plug in the earphones and just listen to it Less hassle of
        preparation: This means to save your time and energy of being ready to
        be presentable for class and being in front of people Usually they are
        less expensive Some of the disadvantage of the learning Japanese online
        can be: When there is slow speed of internet or disturbance in the
        signal received while performing a heavy online video session. This can
        be a very annoying experience sometimes where one student is getting
        full advantage of listening to the lecture clearly and the other one is
        not. Nihongomax is committed and know for the high quality services
        providing since past 10 years now. So there are high speed internet
        sessions going through Skype, Zoom, Google Hangouts or Duo from its end.
        However, on the students’ end, to understand and visualize the high
        quality videos and the refined details of Japanese language and cultural
        parts, same high quality of internet is required. However, these days
        due to the rapid growth in the broadband world and various software
        technologies disadvantages have become very minimal. Since the whole
        world is migrating on internet classes in these times, the one who still
        rely on traditional classes should change their prospective and
        participate in the modern technological ecosystem.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1 className="text-xl text-center font-semibold mb-2 text-gray-800">
          Japanese online Course from Nihongomax
        </h1>
        <Image
          src="/svgs/japanese_online_desk.svg"
          alt="japanese_career"
          width={500}
          height={200}
          className="w-40 float-left mr-4 mb-2"
        />
        Nihongomax provides Japanese online course that suits the requirement of
        clearing JLPT as well as they are well fitted for the people who want to
        learn Japanese language at a fast pace sitting on their sofa. In today’s
        modern world, online classes have become a norm and in Japanese language
        study where not only Japanese language but the culture of Japan is also
        necessary to understand, there is a very well designed Japanese language
        course material at Nihongomax Japanese language institute located in
        Delhi to cater the needs of students whether they want to learn Japanese
        language for JLPT or for Japan Study Visa or for Jobs in Japanese
        language or just for fun. All the Japanese language online courses are
        divided in to five levels, just as the JLPT (Japanese language
        proficiency test) exam is divided in five levels namely JLPT N5, JLPT
        N4, JLPT N3, JLPT N2 and JLPT N1. Nihongomax Japanese language online
        courses are formed as per the needs of every individual seeking a course
        that can provide them with a high paying job in MNCs and a long lasting
        career that it fully job oriented and has a high value and reputation in
        the market. Among many other foreign languages, Japanese language has a
        high demand as we consider the job market and also it is growing since
        there is a rising demand of cheap labor force in Japanese factories and
        or production houses not only in Japan but other parts of Asia like
        Thailand, Indonesia, Philippines, China, Korea, Vietnam etc. Another
        area where we can say there is a very high demand and scope of Japanese
        language communication is Tour and Travel. So there is a high paying
        benefit of learning Japanese language which is now available online
        through Nihongomax Japanese language institute.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1 className="text-xl text-center font-semibold mb-2 text-gray-800">
          Online Japanese Language course with certificate
        </h1>
        <Image
          src="/svgs/japanese_certificate.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-60 float-left mr-4 mb-2"
        />
        Both Online and Offline Japanese language classes are also provided by
        Nihongomax Japanese language institute located in Delhi. There are
        classes conducted in the facility on weekends as well as on weekdays. To
        get the complete information about all the JLPT courses with levels
        please click on the courses links to get the details. Not only this,
        nihongomax.com has covered all the complete parts namely Dokkai
        (Japanese language unseen comprehension passage), Chokai (Japanese
        language listening section), Moji-Goi (Japanese language Vocabulary
        section), Bunpo (Japanese language Grammar). All these sections are
        covered and taught as offline classes in institute as well as Online
        Skype sessions or Zoom sessions using high speed internet at Nihongomax.
        There is also an innovative live session streaming directly from the
        classroom of Nihongomax Japanese language institute located in Delhi to
        the students who want to view remote session online sitting far from
        Delhi and who want to get their Japanese language concepts clear so that
        it helps them to clear JLPT in one go. There are students from all over
        the world like Dubai, Japan, China, Europe, Korea, and various parts of
        India like Chennai, Hyderabad, Bangalore, Mumbai, Pune, Punjab,
        Rajasthan etc who take up live sessions form Nihongomax Japanese
        language institute located in Delhi as well as from nihongmax.com and
        solve their queries of Advanced Japanese language or getting full
        knowledge of Japanese language from the very beginning.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1 className="text-xl text-center font-semibold mb-2 text-gray-800">
          Best way to learn Japanese online in 2026
        </h1>
        <Image
          src="/svgs/best_japanese_institute.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-70 float-left mr-4 mb-2"
        />
        The best way to learn Japanese language online in 2026 is to start with
        online Japanese from Nihongomax. When you start your online classes for
        Japanese language from Nihongomax, a defined schedule of course
        curriculum regarding all the Japanese language course contents is given
        to the student. It is necessary to understand that Japanese language is
        studied for the target of JLPT but for the basic Japanese language it is
        started as a normal routine of basic verbs, conjugations, Japanese
        language vocabulary, reading passages, listening practice, grammar
        comprehensions and basic Japanese language sentence formation. For
        details you can contact on 7678461209 or 7805092279 and get all the
        necessary details regarding the timings of online classes JLPT, Fees and
        other necessary details about the new or upcoming online Japanese
        language courses. So the basic Japanese language online classes are a
        very good tarter bundle for the ones who want to complete Japanese
        language for their career purpose or they just want to learn Japanese
        language for fun.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1 className="text-xl text-center font-semibold mb-2 text-gray-800">
          Where is Japanese Language Certificate required?
        </h1>
        <Image
          src="/svgs/japanese_certificate_required.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-60 float-left mr-4 mb-2"
        />
        In some cases, like appearing in an exam for eligibility for Japan study
        visa or may be in an interview where work visa is provided according to
        the Japanese language study hours input by the student, there is
        essentially a proof of study required to show. Nihongomax provides you
        the certificate of your hours of study according to your study period of
        Japanese language online classes. Just like offline classes in the
        institute, there is certificate provided, similarly in case of you
        studying Japanese language online, you get the certificate of hours with
        which you can apply for Japan study Visa or Japan study Visa. All the
        online Japanese language courses from Nihongomax are already priced on a
        lower cost compared to any other institute, there still is a further cut
        in cost so that travel cost savings with discounted course cost gives
        the students a good reason to start studying Japanese language and build
        a strong career in long run. There is a surge in competition since the
        growth of name of Nihongomax, everyone started thinking that it’s so
        easy to make Japanese language student lean anything about Japanese and
        make high amount money out of it by telling any amount of fees to a
        student who is new to the field. After opening Japanese language online
        classes with random material, they find it difficult and realize that it
        takes years’ long experience and knowledge to make a student pass JLPT
        exam. Japanese tutor online.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1 className="text-xl text-center font-semibold mb-2 text-gray-800">
          Japanese Tutor Online
        </h1>
        <Image
          src="/svgs/japanese_tutor.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-50 float-left mr-4 mb-2"
        />
        Japanese tutor online offered by Nihongomax Japanese Language institute,
        are sharp and clear about the targets and timeline. Nihongomax offers
        Japanese Language online courses for JLPT and NAT exam that eventually
        will be helpful in getting Jobs in the field of Japanese Language in
        Japanese MNCs. There is Beginners Japanese (JLPT N5), Basic Japanese
        (JLPT N4), Intermediate Japanese (JLPT N3), Advanced Japanese (JLPT N2),
        Super-Advanced Japanese (JLPT N1) language to be learnt. Mainly students
        start getting jobs from the level of clearing Intermediate Japanese
        (JLPT N3). However, for a High paying Job in Japanese MNC you need to be
        JLPT N2 cleared at least. So these kinds of basics are taught from the
        very first class taken by a student in Nihongomax.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1 className="text-xl font-semibold mb-1 text-gray-800 text-center">
          FREE Japanese Online course
        </h1>{" "}
        FREE Japanese language online classes available at Nihongomax compared
        and the overall fee is very less compared to any other institute in
        India or even if we compare the fees of online Japanese language study
        through various web-portals, nihongomax.com has the most inexpensive
        charges system. Not only this, the quality parameters of all the
        Japanese language courses provided on nihongomax.com have been set high
        for the students who want to learn till advanced Japanese language in
        short time. The fee is set very low as Nihongomax understands the heart
        of students who want to build their career and still do not have enough
        amount to pay. Also it is said by the students who come to Nihongomax
        after studying from other institutes, that the quality of all the
        Japanese language courses in Nihongomax are excellent as compared to any
        other institute.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1
          className="text-xl text-center font-semibold mb-2 text-gray-800
         "
        >
          Study Japanese Online
        </h1>
        <Image
          src="/svgs/study_japanese.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-50 float-left mr-4 mb-2"
        />
        Study Japanese online with nihongomax.com. It provides all the necessary
        courses of Japanese language starting from very basic and going till the
        highest advanced level. When talking about JLPT (Japanese Language
        Proficiency Test) it goes from JLPT N5 level covering all the lessons
        till JLPT N1 level with all the explanations given in Hindi language to
        make the students everything about study Japanese online. Not only this,
        there is separate section for Business Japanese language starting from
        the fundamental and going till the super advanced level all well
        explained in Hindi audios with the necessary sections of sentences
        examples, business Japanese scenes and the conversational training
        required for a Japanese language student to understand and get a whole
        grasp of it, with the help of which, high level Japanese language
        interpretation and translation tasks are performed. After all this you
        can find KAIWA sessions that give you a whole new experience of spoken
        Japanese language to study Japanese online which is very much required
        to clear an interview as well as to start a conversation with a Japanese
        native in Japanese language. nihongomax.com also provides English lesson
        to Japanese natives well explained in Japanese language and those
        courses can be used for Japanese language listening practice for the
        students who already know English language but want to see that how it
        can be taught in Japanese language.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1 className="text-xl text-center font-semibold mb-2 text-gray-800">
          Japanese online classes
        </h1>
        <Image
          src="/svgs/learn_japanese.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-60 float-left mr-4 mb-2"
        />
        All the Japanese online classes are divided in levels of JLPT as
        mentioned earlier. Not only this, every class is divided in to same
        sections as the JLPT exam is divided into sections of Chokai (Japanese
        Listening), Dokkai (Japanese reading comprehension passages), Moji-Goi
        (Japanese Vocabulary) and Bunpo (Grammar). Each section has its own
        valuation and marking system in JLPT exam. You can click JLPT to get the
        details. In the Japanese online classes the trainers are well
        experienced in Japanese language teaching and even they are well versed
        with Japanese interpretation or translation techniques that are also an
        integral part of your study or getting a Job in pertinent Japanese
        language field. Important Points to keep in mind while learning Japanese
        Online are: There is no need to mention that today learning Japanese
        language online is becoming more and more popular since the demand is
        rising and there a speed factor relevant to learning anything online. It
        saves your travel time, your travel cost and more importantly since it
        progresses at a fast pace, it essentially adds a motivation bend to the
        whole learning paradigm. Motivation is necessary to keep the student
        moving forward without stopping or diving in WHYs and WHAT. The main
        point to keep in mind while starting Japanese language course online is
        to be clear with your path and the total time required covering that
        path with some extra space for emergency works. Being regular is another
        essential ingredient which the teaching school should also take part in
        motivating the student. To sum up, only the persistency and clear
        guidance is required while starting an online Japanese language course
        which Nihongomax Japanese language institute is perfect in.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1
          className="text-xl text-center font-semibold mb-2 text-gray-800
         "
        >
          Best website to learn Japanese
        </h1>
        <Image
          src="/svgs/best_website.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-50 float-left mr-4 mb-2"
        />
        As mentioned earlier that nihongomax.com is the best website to learn
        Japanese as it provides all the necessary courses of Japanese language
        starting from very basic and going till the highest advanced level, be
        it KAIWA, JLPT, or Business language, or even the fact that they can
        listen How English can be taught in Japanese language to a Japanese
        native, it gives a wide experience to the students in terms of Japanese
        language vocabulary or grammar data providing or in terms of
        comprehension passages or even the listening practice. The listening is
        divided into parts and each sentence is explained in Hindi after pausing
        the audio track. So there is a total and comprehensive study material
        available on nihongomax.com for the students who will get much more
        guidance and knowledge compared to going for classes in any other
        institute. Not only this they can get their doubts asked though wall
        posting on main page and get answers from Nihongomax as well as from
        similar students who are studying the same courses.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1
          className="text-xl text-center font-semibold mb-2 text-gray-800
         "
        >
          How to start learning Japanese Online
        </h1>
        <Image
          src="/svgs/start_japanese.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-50 float-left mr-4 mb-2"
        />
        As mentioned previously, it is required for a beginner student only to
        grasp the fundamentals of Japanese language but the basic Japanese
        cultural specialties too. It can be a matter of wonder for some students
        who start learning Japanese language that pillars of Japanese language
        are deeply and closely related to Japanese culture peculiarities. There
        are many instances where out Japanese language teacher has to guide the
        students about a particular Japanese cultural behavior to make them
        understood a particular Japanese language expression. That’s why at
        Nihongomax Japanese language institute, all the Japanese language
        courses are designed so carefully that a student unknowingly starts
        understanding and learning all the required Japanese cultural things in
        a step by step manner without any problem. Eventually since all the
        courses target JLPT, it is needless to mention that they get all the
        language and cultural knowledge parallel to the course of learning JLPT.
        When the Japanese language students of Nihongomax actually realize after
        giving JLPT exam, how cultural knowledge was essential to learn along
        with the JLPT tricks, it becomes more and more clear to them the right
        path of learning and becoming successful in clearing all the sections of
        Advanced JLPT exam. On the top of that, the sectional division of
        Japanese language course contents at Nihongomax helps them to implement
        their theoretical knowledge to practice in exam.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1
          className="text-xl text-center font-semibold mb-2 text-gray-800
         "
        >
          Learning Japanese Online for JLPT
        </h1>
        <Image
          src="/svgs/online_japanese.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-50 float-left mr-4 mb-2"
        />
        As JLPT (Japanese Language Proficiency Test) is divided into five
        levels, likewise both Offline and online Japanese language courses from
        Nihongomax are divided into five levels namely N5, N4, N3, N2 and N1.
        Every level provides the same structured study as the JLPT exam is
        structured. The main point here to notice is that the level is so much
        stuffed with examples and practice that Nihongomax can boast on its
        quality standards way higher than any other institute. There is a
        comprehensive practice material for the students who not only want to
        clear JLPT in one attempt but to find a job in Japanese market with
        their JLPT certificate. Online courses are even better in terms of fast
        flow of the course and low cost of every level. Learn Japanese Online
        course Online JLPT courses from Nihongomax gives an ample knowledge of
        clearing not only JLPT but even NAT exam with good percentage of marks
        and that opens the doors for jobs in the field of Japanese language for
        a student to become a professional for example Japanese language
        translator or Japanese language interpreter or Japanese language
        coordinator or even on the higher post of management in Japanese
        companies and Japanese MNCs. Clearing JLPT which is conducted by
        Japanese government, ensures that a Japanese language student has been
        certified on the parameters of Japan foundation in terms of proficiency
        in Japanese language. Nihongomax by giving a comprehensive experience of
        JLPT to the Japanese language students ensures their success and hence
        paves a way of their future growth. By studying online JLPT, a student
        gets the maximum knowledge of Japanese language in a minimum time and
        cost without commutation hassle. Also there is a certificate of
        completion provided after each online JLPT course so that the hours of
        study are certified in case there is a requirement of Japan study visa
        application or a likewise case.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1
          className="text-xl text-center font-semibold mb-2 text-gray-800
         "
        >
          Learning Japanese Online for Japan Study Visa
        </h1>
        <Image
          src="/svgs/study_visa.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-40 float-left mr-4 mb-2"
        />
        There is a requirement of a particular duration of studying Japanese
        language from an institute be it offline or be it online Japanese
        language from an institute. Nihongomax provides tailor made Japanese
        language basic classes for those who want to finish their minimum
        requirement of Japanese language study for Japan Study visa or Japan
        work visa. In these classes all the required Japanese language
        vocabulary and Japanese language grammar expressions are covered to make
        them eligible for the interview or the necessary form filling ability
        with pertinent level of study. Learning Japanese language is an
        essential part for going to Japan on study visa or for Japan work visa.
        There is a lot of information to understand while or before applying to
        Japan for study visa. Similarly, there is a lot of information to
        understand while or before applying for a Job in Japan. To understand
        both, please have look on nihongomax.com or Nihongomax institute
        website. If we talk about advantages of learning Japanese Language
        online from Nihongomax, there are many points that have to be considered
        like Japanese Language online course speed, volume, efficacy, price and
        results. All of the online Japanese Language classes provided by
        Nihongomax are well structured and there is a proper division of course
        as per the JLPT level and as per every section that comes in that
        particular level. There are various categories we can understand the
        division of Japanese Language online course material. Like Japanese
        Vocabulary (Moji-Goi), Japanese Comprehension passages (Dokkai),
        Japanese Listening (Chokai), Kanji or Japanese Grammar (Bunpo) etc. from
        every angle, there is a careful material designing by Nihongomax
        Japanese Language institute in order to cater for JLPT results and
        learning Japanese Language as in general in the best possible way.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1
          className="text-xl text-center font-semibold mb-2 text-gray-800
         "
        >
          Learning Japanese Online for NAT
        </h1>
        <Image
          src="/svgs/study_for_nat.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-60 float-left mr-4 mb-2"
        />
        Online classes for Japanese language or particularly for NAT/JLPT are
        conducted at Nihongomax every weekend and on selected days of weekdays.
        For details you can contact on 7678461209 or 7805092279 and get all the
        necessary details regarding the timings of online classes JLPT, Fees and
        other necessary details about the new or upcoming Online Japanese
        language batches. Not only this, you can now register yourself for a
        FREE trial class and get an experience of how Japanese language is
        formed and how to study and become successful in a shorter time. All
        online Japanese classes from Nihongomax are conducted as per the
        promised schedule and before starting, a brief introduction about the
        flow of the class is given to every student for the clarity about speed
        and length of the course for a particular level of JLPT be it N5, N4,
        N3, N2 or N1.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1
          className="text-xl text-center font-semibold mb-2 text-gray-800
         "
        >
          Online Japanese from Nihongomax
        </h1>
        <Image
          src="/svgs/nihongomax.png"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-100 float-left mr-4 mb-2"
        />
        Nihongomax gives you the best online Japanese language training in the
        shortest time possible with fastest and accurate Japanese language class
        curriculum based on a long experience of more than 7 years of Japanese
        language coaching in Nihongomax Japanese language institute located in
        Delhi as well as online Japanese language training currently conducting
        to over 50 students all over the globe. The students from the level
        starting from JLPT N5 till the Advanced Japanese language level of JLPT
        N2 are getting fully loaded training about the components necessary for
        clearing JLPT or leaning Japanese language in general till the advanced
        level. The main reason of joining Nihongomax for online Japanese
        language coaching is the high guidance and mentoring level of all the
        teachers and the students give a feedback of their being polite and
        helpful till the end of the course. There are many reasons ranging from
        being excellent in JLPT results to motivating and guiding the students
        to get jobs in Japanese language field that drive many people to join
        Nihongomax for online Japanese language training.
      </div>
      <div
        className="p-4 m-10 border border-gray-300 rounded-lg shadow-lg dark:text-black
       bg-gray-100 dark:bg-gray-400"
      >
        <h1
          className="text-xl text-center font-semibold mb-2 text-gray-800
         "
        >
          About Jobs in Japanese Language
        </h1>
        <Image
          src="/svgs/jobs_in_japanese.svg"
          alt="japanese_career"
          width={700}
          height={300}
          className="w-70 float-left mr-4 mb-2"
        />
        The main reason of doing online Japanese language training among many
        students is the fact that after getting proficient in Japanese language
        there are many paths open for them for jobs in the field of Japanese
        language market demanding the persons who are well capable of doing
        Japanese language translation and interpretation with an experience of
        studying Japanese language for at least an year. Now getting jobs and
        building their career in Japanese language have become dream of many
        Japanese language students in the current times, there is a surge in
        demand for Japanese language experts at the same time. Also, many
        Japanese companies have started taking employees for work from home
        model also, there is even more usefulness for Japanese language online
        courses. So to make this dream a possibility, there is now the yeas long
        experience of Nihongomax in the place for the students who wish to
        fulfill their desire of being a Japanese language professional and earn
        a handsome salary and go to Japan and view international business
        markets.
      </div>
      <footer
        className="w-full text-center dark:bg-white bg-gray-100 mx-auto
       dark:text-black"
      >
        <div className="text-gray-800 py-4 ">
          Nihongomax (Formerly Nihonkai) is a Japanese Language Online/Offline
          Institute in North Campus Delhi
          <h1>Mail us: nihongomax@gmail.com</h1>
          <p>
            <a
              href="https://learnjapanesedelhi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black underline"
            >
              www.learnjapanesedelhi.com
            </a>{" "}
          </p>
        </div>
        <p className="text-gray-600 pb-4">
          Copyright &copy; 2025 Nihongomax. All rights reserved.
          <br /> Any unauthorized use, reproduction, or distribution of content
          will lead to legal action.
        </p>
      </footer>
    </div>
  );
};

export default Page;
