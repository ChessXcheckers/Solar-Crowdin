import { motion } from 'framer-motion';
import { FiZap } from 'react-icons/fi';

const newsItems = [
  "SolarCrowd platform migration to BSC mainnet is complete! Enjoy lower fees and faster transactions.",
  "New strategic partnership with a leading solar panel manufacturer announced. Details to follow.",
  "Our first community-funded solar project in Nigeria is now fully operational and generating clean energy.",
  "The CCO2 token audit by CertiK has been successfully completed. Read the full report on our website.",
  "Q3 revenue sharing for stakers has been distributed. Check your wallet for your rewards.",
];

const BreakingNews = () => {

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-background font-bold py-2 overflow-hidden">
      <div className="flex items-center whitespace-nowrap">
        <span className="flex-shrink-0 mx-4 flex items-center">
            <FiZap className="mr-2"/>
            BREAKING NEWS
        </span>
        <motion.div
          className="flex"
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          }}
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
