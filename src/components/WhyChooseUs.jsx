import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const features = [
  {
    title: 'Expert Care',
    description: 'Our team of certified pet care professionals ensures your pets receive the best care possible.',
    icon: '👨‍⚕️',
    color: 'from-primary/20 to-secondary/20',
    gradient: 'from-[#FF6B6B] to-[#4ECDC4]',
    delay: 0.1,
  },
  {
    title: '24/7 Monitoring',
    description: "Round-the-clock supervision and care for your pets' safety and comfort.",
    icon: '📹',
    color: 'from-secondary/20 to-accent/20',
    gradient: 'from-[#A8E6CF] to-[#FFD3B6]',
    delay: 0.2,
  },
  {
    title: 'Luxury Facilities',
    description: "State-of-the-art facilities designed for your pets' comfort and enjoyment.",
    icon: '🏰',
    color: 'from-accent/20 to-primary/20',
    gradient: 'from-[#FF9A9E] to-[#FAD0C4]',
    delay: 0.3,
  },
  {
    title: 'Personalized Care',
    description: "Tailored care plans based on your pet's unique needs and preferences.",
    icon: '🎯',
    color: 'from-primary/20 to-accent/20',
    gradient: 'from-[#84FAB0] to-[#8FD3F4]',
    delay: 0.4,
  },
]

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [hoveredFeature, setHoveredFeature] = useState(null)

  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      {/* Enhanced Background with Animated Gradients */}
      <div className="absolute inset-0">
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

      {/* Floating Decorative Elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            y: [0, -20, 0],
            x: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            top: `${20 + i * 15}%`,
            left: i % 2 === 0 ? `${10 + i * 5}%` : `${80 - i * 5}%`,
            fontSize: `${24 + i * 4}px`,
          }}
        >
          {['🐾', '💕', '🌟', '🎾', '🦴'][i]}
        </motion.div>
      ))}

      <div className="container relative z-10">
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
            <span className="text-4xl">⭐</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-display mb-4"
          >
            Why Choose{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              The Furry Town
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Experience the difference with our exceptional pet care services
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredFeature(feature.title)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="group relative"
            >
              {/* Card Container with 3D Effect */}
              <motion.div
                animate={{
                  rotateX: hoveredFeature === feature.title ? 10 : 0,
                  rotateY: hoveredFeature === feature.title ? 10 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative bg-white rounded-2xl p-6 shadow-xl transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Gradient Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                />

                {/* Icon Container */}
                <motion.div
                  className="relative mb-6 inline-block"
                  animate={{
                    y: hoveredFeature === feature.title ? -5 : 0,
                    rotate: hoveredFeature === feature.title ? 360 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-4xl md:text-5xl relative z-10"
                    whileHover={{ scale: 1.2 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-full blur-xl`}
                    animate={{
                      scale: hoveredFeature === feature.title ? 1.2 : 1,
                      opacity: hoveredFeature === feature.title ? 0.3 : 0.1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Content */}
                <motion.h3
                  className="text-xl font-display mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  animate={{
                    y: hoveredFeature === feature.title ? -3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  animate={{
                    y: hoveredFeature === feature.title ? -2 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {feature.description}
                </motion.p>

                {/* Corner Decorations */}
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary/20 rounded-tr-lg"
                  animate={{
                    scale: hoveredFeature === feature.title ? 1.2 : 1,
                    opacity: hoveredFeature === feature.title ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary/20 rounded-bl-lg"
                  animate={{
                    scale: hoveredFeature === feature.title ? 1.2 : 1,
                    opacity: hoveredFeature === feature.title ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Hover Indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: hoveredFeature === feature.title ? 1 : 0,
                    opacity: hoveredFeature === feature.title ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Floating Sparkles */}
              {hoveredFeature === feature.title && (
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

export default WhyChooseUs 