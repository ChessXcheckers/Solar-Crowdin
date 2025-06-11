import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const TEAM_MEMBERS = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: '/team/john-doe.jpg',
    bio: 'Blockchain and renewable energy expert with 10+ years of experience.',
    social: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe'
    }
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image: '/team/jane-smith.jpg',
    bio: 'Full-stack developer specializing in blockchain and smart contracts.',
    social: {
      github: 'https://github.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith',
      twitter: 'https://twitter.com/janesmith'
    }
  },
  {
    name: 'Mike Johnson',
    role: 'Head of Operations',
    image: '/team/mike-johnson.jpg',
    bio: 'Operations specialist with extensive experience in renewable energy projects.',
    social: {
      github: 'https://github.com/mikejohnson',
      linkedin: 'https://linkedin.com/in/mikejohnson',
      twitter: 'https://twitter.com/mikejohnson'
    }
  }
];

export function Team() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
          <p className="mt-2 text-gray-600">
            Meet the minds behind Solar Crowdin
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6 text-center"
            >
              {/* Image */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{member.role}</p>
              <p className="text-gray-600 mb-4">{member.bio}</p>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiTwitter className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 