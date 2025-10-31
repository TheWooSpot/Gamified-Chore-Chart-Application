import React from 'react'
import { FaHeart, FaGithub, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="glass-card mt-16 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
                Chore Champions
              </span>
            </h2>
            <p className="text-text-muted leading-relaxed">
              Turning household chores into global impact. Empowering children to work hard and change the world.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-text mb-3 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/marketplace" className="text-text-muted hover:text-primary transition-colors">
                  Impact Marketplace
                </a>
              </li>
              <li>
                <a href="/sponsor" className="text-text-muted hover:text-secondary transition-colors">
                  Become a Sponsor
                </a>
              </li>
              <li>
                <a href="/chores" className="text-text-muted hover:text-primary transition-colors">
                  Browse Chores
                </a>
              </li>
              <li>
                <a href="/leaderboard" className="text-text-muted hover:text-accent transition-colors">
                  Leaderboard
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-text mb-3 text-lg">Connect With Us</h3>
            <div className="flex space-x-3 mb-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-secondary-light flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-tertiary to-tertiary-light flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-success to-success-light flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <FaGlobe />
              </a>
            </div>
            <p className="text-text-muted text-sm flex items-center">
              Made with <FaHeart className="mx-1 text-secondary animate-pulse" /> for a better world
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/20 text-center">
          <p className="text-text-muted text-sm mb-3">
            © {new Date().getFullYear()} Chore Champions. Changing lives, one chore at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <span className="text-text-muted">•</span>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              Terms of Service
            </a>
            <span className="text-text-muted">•</span>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              Contact Us
            </a>
            <span className="text-text-muted">•</span>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
