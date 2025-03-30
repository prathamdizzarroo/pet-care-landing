import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import PetGallery from './components/PetGallery'
import FunFacts from './components/FunFacts'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

const App = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <PetGallery />
      <FunFacts />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
