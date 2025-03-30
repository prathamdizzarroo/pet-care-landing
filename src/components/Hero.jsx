import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence as FramerAnimatePresence } from 'framer-motion'

const images = [
  {
    url: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1000&auto=format&fit=crop',
    alt: 'Happy dog playing in the park'
  },
  {
    url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1000&auto=format&fit=crop',
    alt: 'Professional pet grooming'
  },
  {
    url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1000&auto=format&fit=crop',
    alt: 'Pet care services'
  }
];

// Particle configurations
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 10 + 5,
  initialX: Math.random() * 100,
  initialY: Math.random() * 100,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 5,
}));

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const controls = useAnimation()

  // Enhanced scroll effect with smoother transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        controls.start({ 
          opacity: 0.7,
          scale: 0.98,
          y: -10,
          transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }
        })
      } else {
        controls.start({ 
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }
        })
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [controls])

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth) * 100,
      y: (clientY / innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      return () => {
        containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [handleMouseMove]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  // Enhanced animation variants with smoother transitions
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const springTransition = {
    type: "spring",
    stiffness: 200,
    damping: 20
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <motion.section 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
      ref={containerRef}
      animate={controls}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        transform: `rotateX(${mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.03}deg)`,
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            transform: `translate(${mousePosition.x/10 - 50}px, ${mousePosition.y/10 - 50}px)`,
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            transform: `translate(${-mousePosition.x/8}px, ${-mousePosition.y/8}px)`,
          }}
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(particle.id) * 50, 0],
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}

        {/* Animated Paw Prints */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            initial={{ 
              x: -50,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360 
            }}
            animate={{
              x: window.innerWidth + 50,
              rotate: Math.random() * 360
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 5,
              ease: "linear"
            }}
          >
            🐾
          </motion.div>
        ))}
      </div>

      {/* Interactive Background Elements with smoother transitions */}
      <motion.div
        animate={{
          background: isHovered 
            ? `radial-gradient(
                800px at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, 
                rgba(var(--color-primary), 0.15), 
                rgba(var(--color-secondary), 0.1),
                transparent 80%
              )`
            : "none",
        }}
        className="absolute inset-0 transition-all duration-700"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      />

      {/* Enhanced Animated Particles with smoother motion */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, (i % 2 ? 1 : -1) * Math.random() * 300],
            y: [-Math.random() * 300, -Math.random() * 600]
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={`absolute bottom-0 left-1/2 w-1 h-1 rounded-full
            ${i % 3 === 0 ? 'bg-primary/30' : i % 3 === 1 ? 'bg-secondary/30' : 'bg-accent/30'}`}
          style={{
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Enhanced Background Circles with smoother rotation */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      />

      {/* Content Container with smoother entrance animations */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Text Content with smoother transitions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="mb-6 relative"
            >
              {/* Enhanced Welcome Badge with Modern Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
              >
                <motion.div
                  className="relative px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm shadow-xl
                    border border-white/20 overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Sparkle Effect */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ✨
                  </motion.div>

                  {/* Content */}
                  <div className="relative flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xl"
                    >
                      👋
                    </motion.span>
                    <span className="font-medium text-primary">
                      Welcome to The Furry Town
                    </span>
                    <motion.span
                      animate={{ rotate: [10, -10, 10] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xl"
                    >
                      🐾
                    </motion.span>
                  </div>

                  {/* Hover Effect Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>

              {/* Enhanced Heading with Modern Typography */}
              <motion.h1 
                className="font-display text-5xl md:text-6xl lg:text-7xl text-primary mb-6 leading-tight
                  perspective-1000 transform-gpu text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  rotateX: 10,
                  transition: { duration: 0.3 }
                }}
              >
                <span className="relative inline-block">
                  Where Every Pet
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 to-secondary/20"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <motion.span
                  className="relative block mt-2"
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                >
                  <span className="relative z-10 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent 
                    bg-[length:200%_auto] animate-gradient"> 
                    Feels Special
                  </span>
                  <motion.svg
                    viewBox="0 0 100 20"
                    className="absolute -bottom-2 left-0 w-full h-4 text-secondary/20"
                    preserveAspectRatio="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.9, ease: "easeOut" }}
                  >
                    <motion.path
                      d="M0 10 Q25 0, 50 10 T100 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="0 1"
                      filter="url(#glow)"
                    />
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                  </motion.svg>
                </motion.span>
              </motion.h1>

              {/* Enhanced Description with Animated Highlight */}
              <motion.p 
                className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 relative leading-relaxed"
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
              >
                Experience the finest pet care services with our loving team. 
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="inline-block text-primary font-medium mx-1"
                >
                  We treat your pets like family
                </motion.span>, 
                providing them with the attention and care they deserve.
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.p>
            </motion.div>

            {/* Enhanced Buttons with Advanced Effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 30px -10px rgba(var(--color-primary), 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-medium 
                  shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 
                  relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mr-2"
                  >
                    📅
                  </motion.span>
                  Book Appointment
                  <motion.span
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-full border-2 border-primary/20 text-primary font-medium 
                  hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  <motion.span
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mr-2"
                  >
                    🔍
                  </motion.span>
                  Our Services
                </span>
              </motion.button>
            </motion.div>

            {/* Enhanced Trust Indicators with Interactive Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="mt-12 grid grid-cols-2 gap-8 max-w-md mx-auto lg:mx-0"
            >
              {[
                { number: "500+", text: "Happy Pets", color: "primary", icon: "🐾" },
                { number: "100%", text: "Satisfaction", color: "accent", icon: "⭐" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.2), duration: 1, ease: "easeOut" }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm shadow-xl shadow-primary/5 relative group"
                >
                  <motion.span
                    className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center text-lg"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {stat.icon}
                  </motion.span>
                  <motion.h3
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + (index * 0.2), type: "spring", stiffness: 100 }}
                    className={`text-3xl font-display text-${stat.color} mb-1`}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-sm text-gray-600">{stat.text}</p>
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-transparent"
                    whileHover={{
                      borderColor: `var(--color-${stat.color})`,
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Image Section with Interactive Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div 
              className="relative aspect-square rounded-full overflow-hidden bg-gradient-to-b from-primary/20 via-secondary/20 to-accent/20 p-4
                before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/20 before:to-transparent before:rounded-full
                after:absolute after:inset-0 after:bg-gradient-to-bl after:from-white/10 after:to-transparent after:rounded-full"
              animate={{
                rotate: isHovered ? [0, -5, 5, 0] : 0,
                scale: isHovered ? 1.02 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              <FramerAnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.2, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative w-full h-full rounded-full overflow-hidden"
                >
                  <motion.img
                    src={images[currentImageIndex].url}
                    alt={images[currentImageIndex].alt}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center" }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </FramerAnimatePresence>
              
              {/* Enhanced Floating Elements */}
              <motion.div
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                className="absolute -top-4 right-10 bg-white/80 rounded-lg shadow-xl p-3 backdrop-blur-sm
                  border border-white/20 hover:border-white/40 transition-colors"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <span className="text-2xl">🎾</span>
              </motion.div>
              <motion.div
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                className="absolute -bottom-4 left-10 bg-white/80 rounded-lg shadow-xl p-3 backdrop-blur-sm
                  border border-white/20 hover:border-white/40 transition-colors"
                whileHover={{ scale: 1.1, rotate: -10 }}
              >
                <span className="text-2xl">🦴</span>
              </motion.div>

              {/* Enhanced Image Navigation */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 p-2 rounded-full
                bg-white/10 backdrop-blur-md border border-white/20">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentImageIndex 
                        ? 'bg-white shadow-lg shadow-white/30' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              {/* Image Navigation Arrows */}
              <motion.button
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-8 h-8 rounded-full
                  bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center
                  hover:bg-white transition-colors"
                onClick={prevImage}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                ←
              </motion.button>
              <motion.button
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 rounded-full
                  bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center
                  hover:bg-white transition-colors"
                onClick={nextImage}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                →
              </motion.button>
            </motion.div>

            {/* Enhanced Stats Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
              className="absolute -right-4 top-1/4 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 
                flex items-center gap-3 border border-white/20"
            >
              <motion.div
                className="relative"
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 text-3xl"
                >
                  ⭐
                </motion.span>
                <span className="text-3xl opacity-0">⭐</span>
              </motion.div>
              <div>
                <motion.p 
                  className="font-medium text-primary"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  4.9/5 Rating
                </motion.p>
                <p className="text-sm text-gray-500">from 200+ reviews</p>
              </div>
            </motion.div>

            {/* Enhanced Experience Badge */}
            <motion.div
              initial={{ scale: 0, rotate: 20 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
              className="absolute -left-4 bottom-1/4 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4
                border border-white/20 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.p 
                className="font-medium text-secondary relative"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                10+ Years
              </motion.p>
              <p className="text-sm text-gray-500 relative">of Experience</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Hero
