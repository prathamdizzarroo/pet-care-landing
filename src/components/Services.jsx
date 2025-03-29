import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const services = [
  {
    title: 'Pet Boarding',
    description: 'Safe and comfortable overnight stays with 24/7 supervision and care.',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80',
    color: 'from-primary/20 to-secondary/20',
    gradient: 'from-[#FF6B6B] to-[#4ECDC4]',
  },
  {
    title: 'Dog & Cat Daycare',
    description: 'Fun-filled days with supervised playtime, exercise, and socialization.',
    icon: '🐕',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    color: 'from-secondary/20 to-accent/20',
    gradient: 'from-[#A8E6CF] to-[#FFD3B6]',
  },
  {
    title: 'Pet Photography',
    description: "Professional photo sessions capturing your pet's unique personality.",
    icon: '📸',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    color: 'from-accent/20 to-primary/20',
    gradient: 'from-[#FF9A9E] to-[#FAD0C4]',
  },
  {
    title: 'Pet Grooming',
    description: 'Expert grooming services to keep your pet looking and feeling their best.',
    icon: '✂️',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80',
    color: 'from-primary/20 to-accent/20',
    gradient: 'from-[#84FAB0] to-[#8FD3F4]',
  },
]

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [hoveredService, setHoveredService] = useState(null)

  return (
    <section id="services" className="relative min-h-screen py-20 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-cream">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [180, 0, 180],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-secondary/5 to-accent/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="text-4xl">🎯</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-display mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            Our Premium Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Comprehensive pet care solutions tailored to your beloved companions' needs
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredService(service.title)}
              onHoverEnd={() => setHoveredService(null)}
              className="group relative perspective-1000"
            >
              <motion.div
                animate={{
                  rotateX: hoveredService === service.title ? 10 : 0,
                  rotateY: hoveredService === service.title ? 10 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform-gpu"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Gradient Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <motion.span 
                      className="text-5xl transform-gpu"
                      animate={{
                        scale: hoveredService === service.title ? 1.2 : 1,
                        rotate: hoveredService === service.title ? 360 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <motion.h3
                    className="text-xl font-display mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                    animate={{
                      y: hoveredService === service.title ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-600"
                    animate={{
                      y: hoveredService === service.title ? -3 : 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Learn More Button */}
                  <motion.button
                    className="mt-4 px-4 py-2 rounded-full text-sm font-medium text-primary border border-primary/20 
                      hover:bg-primary hover:text-white transition-colors duration-300 group-hover:border-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More →
                  </motion.button>

                  {/* Bottom Border Animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: hoveredService === service.title ? 1 : 0,
                      opacity: hoveredService === service.title ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Corner Decorations */}
                <motion.div
                  className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-lg"
                  animate={{
                    scale: hoveredService === service.title ? 1.2 : 1,
                    opacity: hoveredService === service.title ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-lg"
                  animate={{
                    scale: hoveredService === service.title ? 1.2 : 1,
                    opacity: hoveredService === service.title ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Floating Particles */}
              {hoveredService === service.title && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-2 -right-2 text-2xl"
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute -bottom-2 -left-2 text-2xl"
                  >
                    ✨
                  </motion.div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
