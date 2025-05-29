import { FaHeart, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-background-dark py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="font-display text-2xl text-primary mb-2">
              Chore<span className="text-secondary">Champions</span>
            </h2>
            <p className="text-text-muted max-w-md">
              Making household responsibilities fun and rewarding for children of all ages.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-text-muted hover:text-primary transition-colors duration-200 text-xl">
                <FaGithub />
              </a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors duration-200 text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors duration-200 text-xl">
                <FaInstagram />
              </a>
            </div>
            <p className="text-text-muted text-sm flex items-center">
              Made with <FaHeart className="mx-1 text-error" /> by ChoreChampions Team
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-background text-center text-text-muted text-sm">
          <p>© {new Date().getFullYear()} ChoreChampions. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-primary transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors duration-200">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
