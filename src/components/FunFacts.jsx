import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

const facts = [
  {
    number: 1000,
    label: 'Happy Pets',
    icon: '🐾',
    color: 'from-primary/20 to-secondary/20',
  },
  {
    number: 50,
    label: 'Expert Staff',
    icon: '👥',
    color: 'from-secondary/20 to-accent/20',
  },
  {
    number: 100,
    label: 'Success Stories',
    icon: '✨',
    color: 'from-accent/20 to-primary/20',
  },
  {
    number: 24,
    label: 'Hours of Care',
    icon: '⏰',
    color: 'from-primary/20 to-accent/20',
  },
]

const Counter = ({ number, label, icon, color, delay }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay,
        },
      })
    }
  }, [inView, controls, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="text-4xl sm:text-5xl mb-4">{icon}</div>
        <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
          {number}+
        </div>
        <div className="text-gray-600 text-sm sm:text-base">{label}</div>
      </div>
    </motion.div>
  )
}

const FunFacts = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="section bg-gradient-to-br from-cream via-white to-cream py-16 sm:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="heading text-3xl sm:text-4xl md:text-5xl mb-4">
            Fun <span className="text-primary">Facts</span>
          </h2>
          <p className="subheading text-base sm:text-lg max-w-2xl mx-auto">
            Numbers that make us proud to serve your pets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {facts.map((fact, index) => (
            <Counter
              key={fact.label}
              number={fact.number}
              label={fact.label}
              icon={fact.icon}
              color={fact.color}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
      </div>
    </section>
  )
}

export default FunFacts 