import { Linkedin } from "lucide-react";
import { ThreadsIcon } from "@/components/SocialIcons";
import { motion } from "framer-motion";
import aboutPhoto from "@/assets/james-cake-group.jpg";
import workshopPhoto from "@/assets/james-cake-workshop.jpg";

export default function AboutSectionZhTw() {
  return (
    <section className="py-14 md:py-24 px-5 md:px-6 bg-paper">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

          {/* Left — Photos in hairline frames */}
          <motion.div
            className="w-full md:w-1/2 flex-shrink-0 flex flex-col gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="card-hairline overflow-hidden">
              <img
                src={aboutPhoto}
                alt="James Bugden 在台灣 Cake 職涯活動"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
            <motion.div
              className="card-hairline overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <img
                src={workshopPhoto}
                alt="James Bugden 在台灣主持職涯工作坊"
                className="w-full h-auto object-cover aspect-[16/9]"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <h2
              className="font-heading mb-3 text-foreground tracking-[-0.025em]"
              style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, lineHeight: 1.1 }}
            >
              James Bugden
            </h2>

            <p className="text-[1.0625rem] mb-6" style={{ color: 'hsl(var(--executive-green))', fontWeight: 500 }}>
              Uber 台灣資深 Recruiter · 職涯教練 · 講師
            </p>

            <p className="text-[1.0625rem] mb-5 leading-relaxed text-foreground">
              <span className="tnum-geist text-foreground" style={{ fontWeight: 600 }}>10,000+</span> 位 Google、Uber、Microsoft 等公司的求職者正在使用我做的免費工具。
            </p>

            <p className="text-[15px] leading-relaxed mb-4 text-muted-foreground">
              我是英國人。大學畢業後搬到台灣，就再也沒離開。
              13 年來，我在台灣為全世界最大的幾家公司招募過人才。
              我知道什麼有用，什麼沒用。
            </p>

            <p className="text-[15px] leading-relaxed mb-8 text-muted-foreground">
              我的使命很簡單：別的求職網站要收費的工具 — 履歷健檢、薪資資料庫、面試題庫、Offer 計算機 — 我全部 <span className="text-foreground font-semibold">免費提供給所有人</span>。內部知識不應該被付費牆擋住，因為這往往是錄取與否的關鍵。
            </p>

            {/* Social pills — hairline */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.linkedin.com/in/james-bugden/"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hairline inline-flex items-center gap-2.5 px-4 py-2.5 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4 text-executive-green" />
                <span className="text-foreground text-[13px] font-semibold">
                  <span className="tnum-geist">15K</span> 追蹤者
                </span>
              </a>

              <a
                href="https://www.threads.com/@james.careers"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hairline inline-flex items-center gap-2.5 px-4 py-2.5 transition-all duration-200"
              >
                <ThreadsIcon className="w-4 h-4 text-executive-green" />
                <span className="text-foreground text-[13px] font-semibold">
                  <span className="tnum-geist">12K</span> 追蹤者
                </span>
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
