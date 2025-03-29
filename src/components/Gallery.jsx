import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredImages, setFilteredImages] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isGridView, setIsGridView] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80",
      alt: "Dogs playing together",
      category: "Dogs",
      featured: true
    },
    {
      src: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500&q=80",
      alt: "Cute cat relaxing",
      category: "Cats"
    },
    {
      src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80",
      alt: "Golden retriever puppy",
      category: "Dogs"
    },
    {
      src: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&q=80",
      alt: "Cat looking curious",
      category: "Cats",
      featured: true
    },
    {
      src: "https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=500&q=80",
      alt: "Playful pet grooming",
      category: "Grooming"
    },
    {
      src: "https://images.unsplash.com/photo-1587764379873-97837921fd44?w=500&q=80",
      alt: "Pet spa treatment",
      category: "Spa"
    },
    {
      src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&q=80",
      alt: "Dog getting groomed",
      category: "Grooming",
      featured: true
    },
    {
      src: "https://images.unsplash.com/photo-1516734212186-65266f08a870?w=500&q=80",
      alt: "Pet massage therapy",
      category: "Spa"
    },
    // Adding more images for variety
    {
      src: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500&q=80",
      alt: "Pet daycare fun",
      category: "Daycare"
    },
    {
      src: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
      alt: "Pet training session",
      category: "Training"
    },
    {
      src: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80",
      alt: "Pet health checkup",
      category: "Health"
    },
    {
      src: "https://images.unsplash.com/photo-1558929996-da64ba858215?w=500&q=80",
      alt: "Pet dental care",
      category: "Health",
      featured: true
    }
  ]

  const categories = ['All', 'Favorites', ...new Set(galleryImages.map(img => img.category))]

  useEffect(() => {
    setFilteredImages(
      selectedCategory === 'All'
        ? galleryImages
        : selectedCategory === 'Favorites'
        ? galleryImages.filter(img => favorites.includes(img.src))
        : galleryImages.filter(img => img.category === selectedCategory)
    )
  }, [selectedCategory, favorites])

  const toggleFavorite = (imageSrc, e) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(imageSrc)
        ? prev.filter(src => src !== imageSrc)
        : [...prev, imageSrc]
    )
  }

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.src === selectedImage.src)
    const newIndex = (currentIndex + direction + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[newIndex])
    setSelectedImageIndex(newIndex)
  }

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-4">
            Our Furry Friends Gallery
          </h2>
          <p className="font-sans text-gray-600 max-w-2xl mx-auto mb-8">
            Take a peek at the wonderful moments we share with our adorable pets. Each photo tells a story of love, care, and happiness.
          </p>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-sans font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category === 'Favorites' ? '❤️ ' + category : category}
                </motion.button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-full transition-all ${
                  isGridView ? 'bg-white shadow-md' : 'hover:bg-white/50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-full transition-all ${
                  !isGridView ? 'bg-white shadow-md' : 'hover:bg-white/50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          layout
          className={isGridView 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr"
            : "flex flex-col gap-6"
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`relative group cursor-pointer ${
                  isGridView && image.featured ? 'md:col-span-2 md:row-span-2' : ''
                } ${!isGridView ? 'aspect-video' : ''}`}
                onClick={() => {
                  setSelectedImage(image)
                  setSelectedImageIndex(index)
                }}
              >
                <div className={`relative overflow-hidden rounded-2xl ${
                  isGridView ? 'aspect-square' : 'aspect-video'
                } w-full h-full`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(image.src, e)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm
                      opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 
                      transition-all duration-300 hover:bg-white"
                  >
                    <svg 
                      className={`w-5 h-5 ${
                        favorites.includes(image.src) ? 'text-red-500 fill-current' : 'text-gray-600'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  </button>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full 
                    opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-xs font-medium text-primary">{image.category}</span>
                  </div>

                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full 
                    group-hover:translate-y-0 transition-all duration-300">
                    <p className="font-sans font-medium text-sm mb-1">{image.alt}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/80">{image.category}</span>
                      {image.featured && (
                        <span className="bg-primary/20 text-white px-2 py-0.5 rounded-full text-xs">Featured</span>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 
                    rounded-2xl transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enhanced Lightbox with Navigation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-5xl w-full"
              onClick={e => e.stopPropagation()}
            >
              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage(-1)
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3
                  hover:bg-black/70 transition-colors transform hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage(1)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3
                  hover:bg-black/70 transition-colors transform hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium text-xl mb-2">{selectedImage.alt}</h3>
                    <p className="text-white/80 text-sm">{selectedImage.category}</p>
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(selectedImage.src, e)}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <svg 
                      className={`w-6 h-6 ${
                        favorites.includes(selectedImage.src) ? 'text-red-500 fill-current' : 'text-white'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 text-white bg-primary rounded-full p-2 hover:bg-primary/80 
                  transition-colors shadow-lg hover:shadow-primary/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
