import { Linkedin } from "lucide-react";
import { ThreadsIcon } from "@/components/SocialIcons";
import aboutPhoto from "@/assets/james-cake-group.jpg";
import workshopPhoto from "@/assets/james-cake-workshop.jpg";

export default function AboutSectionZhTw() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-6" style={{ backgroundColor: '#1B3A2F' }}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

          {/* Left — Photos */}
          <div className="w-full md:w-1/2 flex-shrink-0 flex flex-col gap-4">
            <img
              src={aboutPhoto}
              alt="James Bugden 在台灣 Cake 職涯活動"
              className="w-full h-auto rounded-xl object-cover aspect-[4/3]"
              loading="lazy"
            />
            <img
              src={workshopPhoto}
              alt="James Bugden 在台灣主持職涯工作坊"
              className="w-full h-auto rounded-xl object-cover aspect-[16/9]"
              loading="lazy"
            />
          </div>

          {/* Right — Bio */}
          <div className="w-full md:w-1/2">
            <h2
              className="font-heading mb-3"
              style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
            >
              James Bugden
            </h2>

            <p className="font-bold text-base md:text-lg mb-5" style={{ color: '#D4930D' }}>
              Uber 資深招募 · 職涯教練 · 講師
            </p>

            <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: '#E8E8E8' }}>
              幫助超過 750 位來自 Google、Uber、Microsoft 等跨國企業的求職者。免費工具已被 10,000+ 專業人士使用。曾在台灣多場職涯活動擔任講者。
            </p>

            <p className="text-base leading-relaxed mb-4" style={{ color: '#D1D1D1' }}>
              我是英國人，大學畢業後搬到台灣，一待就是 13 年。我曾替全球最大的企業招募人才，我知道什麼有用、什麼沒用。
            </p>

            <p className="text-base leading-relaxed mb-10" style={{ color: '#D1D1D1' }}>
              現在我製作免費工具和指南，讓你擁有大多數人得不到的內部知識。想要個人化的幫助？我也提供 1 對 1 教練服務。
            </p>

            {/* Bottom social row */}
            <div className="flex flex-wrap items-center gap-8">
              <a
                href="https://www.linkedin.com/in/james-bugden/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-100 transition-opacity opacity-80"
              >
                <Linkedin className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                <span className="text-base font-semibold" style={{ color: '#FFFFFF' }}>15K 追蹤者</span>
              </a>

              <a
                href="https://www.threads.com/@james.careers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-100 transition-opacity opacity-80"
              >
                <ThreadsIcon className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                <span className="text-base font-semibold" style={{ color: '#FFFFFF' }}>12K 追蹤者</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
