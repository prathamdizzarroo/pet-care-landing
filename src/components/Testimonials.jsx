import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Dog Owner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 5,
    text: 'The care and attention my dog receives at The Furry Town is exceptional. The staff is friendly and professional, and I always feel confident leaving my furry friend in their hands.',
    color: 'from-primary/10 to-secondary/10',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Cat Owner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 5,
    text: 'The grooming service is top-notch! My cat always looks and feels amazing after a visit. The groomers are gentle and patient with even the most anxious pets.',
    color: 'from-secondary/10 to-accent/10',
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'Pet Parent',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    rating: 5,
    text: "The photography service captured beautiful moments of my pets that I'll treasure forever. The photographer was amazing with animals and got the perfect shots!",
    color: 'from-accent/10 to-primary/10',
  },
]

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="testimonials" className="section bg-gradient-to-br from-cream via-white to-cream py-12 sm:py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="heading text-3xl sm:text-4xl md:text-5xl">What Our Clients Say</h2>
          <p className="subheading text-base sm:text-lg mt-4 max-w-2xl mx-auto">
            Read testimonials from our satisfied pet parents
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="card group relative overflow-hidden h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10 p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4 ring-2 ring-primary/20"
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg group-hover:text-primary transition-colors duration-300">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm sm:text-base italic relative">
                  <span className="text-3xl sm:text-4xl text-primary/20 absolute -top-2 sm:-top-4 -left-2">"</span>
                  {testimonial.text}
                  <span className="text-3xl sm:text-4xl text-primary/20 absolute -bottom-2 sm:-bottom-4 -right-2">"</span>
                </p>
              </div>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
