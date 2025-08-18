import { motion } from 'framer-motion';
import { FiZap } from 'react-icons/fi';

const newsItems = [
  "SolarCrowd platform migration to BEP-20 mainnet is complete! Enjoy lower fees and faster transactions.",
  "New strategic partnership with a leading solar panel manufacturer announced. Details to follow.",
  "Our first community-funded solar project in Nigeria is now fully operational and generating clean energy.",
  "The CCO2 token audit by CertiK has been successfully completed. Read the full report on our website.",
  "Q3 revenue sharing for stakers has been distributed. Check your wallet for your rewards.",
];

const BreakingNews = () => {
  const marqueeVariants = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 90,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div className="fixed top-16 w-full z-30 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-2 flex items-center">
      <span className="flex-shrink-0 mx-4 flex items-center z-10">
          <FiZap className="mr-2"/>
          BREAKING NEWS
      </span>
      <div className="flex-1 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          variants={marqueeVariants}
          animate="animate"
        >
          {newsItems.map((item, index) => (
            <span key={index} className="mx-8">
              {item}
            </span>
          ))}
           {newsItems.map((item, index) => (
            <span key={`duplicate-${index}`} className="mx-8">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BreakingNews;
