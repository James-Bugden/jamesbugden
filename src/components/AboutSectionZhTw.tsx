import { Linkedin } from "lucide-react";
import { ThreadsIcon } from "@/components/SocialIcons";
import { motion } from "framer-motion";
import aboutPhoto from "@/assets/james-cake-group.jpg";
import workshopPhoto from "@/assets/james-cake-workshop.jpg";

export default function AboutSectionZhTw() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-6" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="container mx-auto max-w-6xl">

        {/* Gold divider at top */}
        <div className="flex justify-center mb-12">
          <div style={{ width: 60, height: 3, backgroundColor: '#D4930D', borderRadius: 2 }} />
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">

          {/* Left — Photos */}
          <motion.div
            className="w-full md:w-1/2 flex-shrink-0 flex flex-col gap-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={aboutPhoto}
              alt="James Bugden 在台灣 Cake 職涯活動"
              className="w-full h-auto rounded-xl object-cover aspect-[4/3]"
              style={{ border: '2px solid rgba(212,147,13,0.3)' }}
              loading="lazy"
            />
            <motion.img
              src={workshopPhoto}
              alt="James Bugden 在台灣主持職涯工作坊"
              className="w-full h-auto rounded-xl object-cover aspect-[16/9]"
              style={{ border: '2px solid rgba(212,147,13,0.3)' }}
              loading="lazy"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            />
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <span
              className="text-sm font-bold tracking-widest uppercase mb-3 block"
              style={{ color: '#D4930D' }}
            >
              關於我
            </span>

            <h2
              className="font-heading mb-3"
              style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
            >
              James Bugden
            </h2>

            <p className="font-bold text-base md:text-lg mb-5" style={{ color: '#2b4734' }}>
              Uber 台灣資深 HR · 職涯教練 · 講師
            </p>

            <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: '#1A1A1A' }}>
              我是 Uber 台灣的資深 HR。我錄取過 750 位以上的人，審閱過超過 20,000 份履歷。我知道他們怎麼面試、怎麼給薪，還有什麼讓你脫穎而出。
            </p>

            <p className="text-base leading-relaxed mb-4" style={{ color: '#6B6B6B' }}>
              我不教理論，我教真正有用的東西。我在台灣當了好幾年英文老師，後來轉進科技業 HR。
            </p>

            <p className="text-base leading-relaxed mb-8" style={{ color: '#6B6B6B' }}>
              我想幫助更多人透過找到理想工作來實現目標。現在我製作免費工具和指南，讓你擁有大多數人得不到的內部知識。
            </p>

            {/* Social pills */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.linkedin.com/in/james-bugden/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(43,71,52,0.06)',
                  border: '1px solid rgba(43,71,52,0.12)',
                  color: '#1A1A1A',
                }}
              >
                <Linkedin className="w-5 h-5" style={{ color: '#2b4734' }} />
                <span className="text-sm font-semibold">15K 追蹤者</span>
              </a>

              <a
                href="https://www.threads.com/@james.careers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(43,71,52,0.06)',
                  border: '1px solid rgba(43,71,52,0.12)',
                  color: '#1A1A1A',
                }}
              >
                <ThreadsIcon className="w-5 h-5" style={{ color: '#2b4734' }} />
                <span className="text-sm font-semibold">12K 追蹤者</span>
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
