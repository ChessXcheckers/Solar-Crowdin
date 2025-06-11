import { FiGithub, FiTwitter, FiLinkedin, FiDiscord } from 'react-icons/fi';

const FOOTER_LINKS = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Whitepaper', href: '/whitepaper.pdf' }
  ],
  company: [
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact', href: '#contact' }
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Support', href: '/support' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' }
  ]
};

const SOCIAL_LINKS = [
  { name: 'GitHub', icon: FiGithub, href: 'https://github.com/solarcrowdin' },
  { name: 'Twitter', icon: FiTwitter, href: 'https://twitter.com/solarcrowdin' },
  { name: 'LinkedIn', icon: FiLinkedin, href: 'https://linkedin.com/company/solarcrowdin' },
  { name: 'Discord', icon: FiDiscord, href: 'https://discord.gg/solarcrowdin' }
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 lg:col-span-1">
            <img
              src="/logo.svg"
              alt="Solar Crowdin"
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-gray-400">
              Revolutionizing renewable energy investment through blockchain technology.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Solar Crowdin. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{link.name}</span>
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
