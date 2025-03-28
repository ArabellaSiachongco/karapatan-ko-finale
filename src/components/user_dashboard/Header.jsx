import { motion } from "framer-motion";
import { styles } from "../../styles";

const Header = () => {
  return (
    <section id="home" className={`relative w-full h-screen mx-auto`}>
      <div className="relative w-full h-full">
        <img
          src="/sunflower.png"
          alt="Sunflower"
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />
        <img
          src="/blindfold_woman.png"
          alt="Blindfold Woman"
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />
      </div>

      <div className="fixed inset-0 bg-slate-800/20" />

      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#ffb42a]" />
          <div className="w-1 sm:h-80 h-40 orange-gradient" />
        </div>
        <div>
          <h1 className={`${styles.headText} text-3d`}>
            KARAPATAN<span className="text-white">&nbsp;KO</span>
          </h1>

          <p className={`${styles.headSubText} mt-2 text-white-100`}>
            Built for Everyone. <br className="sm:block hidden" /> Your Smart
            Guide to Legal Understanding
          </p>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        {/* link for about page */}
        <a href="#features">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white flex justify-center items-start p-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-white mb-1"
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Header;
