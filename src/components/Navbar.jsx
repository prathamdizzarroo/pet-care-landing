import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'gallery', 'testimonials', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', icon: '🏠', color: 'from-primary/20 to-secondary/20' },
    { name: 'Services', href: '#services', icon: '🛍️', color: 'from-secondary/20 to-accent/20' },
    { name: 'Gallery', href: '#gallery', icon: '📸', color: 'from-accent/20 to-primary/20' },
    { name: 'Testimonials', href: '#testimonials', icon: '💬', color: 'from-primary/20 to-accent/20' },
    { name: 'Contact', href: '#contact', icon: '📞', color: 'from-secondary/20 to-primary/20' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`} />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center group"
          >
            <a href="#home" className="flex items-center space-x-3">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-3xl sm:text-4xl"
              >
                🐾
              </motion.span>
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                  The Furry Town
                </span>
                <span className="font-sans text-xs text-gray-500 tracking-wide">Where Pets Are Family</span>
              </div>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onHoverStart={() => setHoveredItem(item.name)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group flex items-center space-x-2 px-3 py-2 rounded-full transition-colors duration-300 ${
                  activeSection === item.name.toLowerCase()
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                <motion.span
                  animate={{ rotate: hoveredItem === item.name ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg"
                >
                  {item.icon}
                </motion.span>
                <span className="font-sans font-medium tracking-wide">{item.name}</span>
                <motion.div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${item.color}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2 rounded-full font-sans font-medium text-white overflow-hidden group tracking-wide"
            >
              <span className="relative z-10">Book Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-primary" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 relative"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-gray-600 rounded-full"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-gray-600 rounded-full"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-gray-600 rounded-full"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 rounded-b-2xl backdrop-blur-lg"
            >
              <div className="py-4 space-y-2 px-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                      activeSection === item.name.toLowerCase()
                        ? 'text-primary bg-primary/5'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <motion.span
                      animate={{ rotate: hoveredItem === item.name ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-xl"
                    >
                      {item.icon}
                    </motion.span>
                    <span className="font-sans font-medium tracking-wide">{item.name}</span>
                    <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${item.color} rounded-r-lg transform origin-left transition-transform duration-300 ${
                      activeSection === item.name.toLowerCase() ? 'scale-y-100' : 'scale-y-0'
                    }`} />
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="px-2 pt-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative px-6 py-3 rounded-xl font-sans font-medium text-white overflow-hidden group"
                  >
                    <span className="relative z-10">Book Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-primary" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
