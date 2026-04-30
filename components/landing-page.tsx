'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { MapPin, Clock, Star, Phone, Utensils, Instagram } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export interface MenuItem {
  id: number;
  section: string;
  name: string;
  price: string | null;
  price2: string | null;
  description: string | null;
  sort_order: number;
}

export interface Hours {
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday_monday: string;
}

export default function LandingPage({ menuItems, hours }: { menuItems: MenuItem[], hours: Hours }) {
  const plates = menuItems.filter(item => item.section === 'plates').sort((a, b) => a.sort_order - b.sort_order);
  const feast = menuItems.filter(item => item.section === 'feast').sort((a, b) => a.sort_order - b.sort_order)[0];
  const sandwiches = menuItems.filter(item => item.section === 'sandwiches').sort((a, b) => a.sort_order - b.sort_order);
  const meats = menuItems.filter(item => item.section === 'meats').sort((a, b) => a.sort_order - b.sort_order);
  const sides = menuItems.filter(item => item.section === 'sides').sort((a, b) => a.sort_order - b.sort_order);
  const desserts = menuItems.filter(item => item.section === 'dessert').sort((a, b) => a.sort_order - b.sort_order);
  return (
    <div className="w-full smoke-texture">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-serif italic font-black text-2xl tracking-tighter text-white">
            JM&apos;S <span className="text-orange-500">BBQ</span>
          </div>
          <div className="hidden md:flex gap-8 font-mono text-[11px] tracking-[0.3em] uppercase text-stone-400 font-bold">
            <a href="#menu" className="hover:text-orange-500 transition-colors">Menu</a>
            <a href="#reviews" className="hover:text-orange-500 transition-colors">Reviews</a>
            <a href="#visit" className="hover:text-orange-500 transition-colors">Visit</a>
          </div>
          <a href="tel:737-381-8678" className="hidden sm:flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-stone-950 px-8 py-3 rounded-none font-black text-xs uppercase tracking-widest transition-colors">
            <Phone className="w-4 h-4" />
            Order Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/jmbrisket.jpg"
            alt="Perfectly smoked Texas brisket"
            fill
            className="object-cover object-[95%_center] opacity-80 scale-105 transform hover:scale-100 transition-transform duration-[10s] ease-out"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/30 via-transparent to-stone-950/30" />
        </div>

        <motion.div 
          className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeIn} className="font-serif italic text-[14vw] sm:text-[100px] md:text-[130px] lg:text-[150px] leading-[0.9] sm:leading-[0.85] font-black tracking-tighter mb-4 text-white drop-shadow-2xl whitespace-nowrap">
            JM&apos;S <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600 drop-shadow-none">TEXAS</span><br />
            CRAFT BBQ
          </motion.h1>

          <motion.p variants={fadeIn} className="font-sans font-light text-xl md:text-2xl text-stone-400 max-w-2xl mx-auto leading-snug tracking-tight text-balance">
            Family owned, straight from ATX to CU. <br className="hidden sm:block" />
            Authentic low & slow smokehouse flavors.
          </motion.p>

          <motion.div variants={fadeIn} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <a href="#visit" className="bg-orange-600 hover:bg-orange-700 text-stone-950 font-black px-8 py-4 text-xs uppercase tracking-widest transition-colors rounded-none">
              Get Directions
            </a>
            <a href="#menu" className="bg-transparent hover:bg-stone-900 border border-stone-800 text-white px-8 py-4 font-black text-xs uppercase tracking-widest transition-colors rounded-none">
              View The Menu
            </a>
          </motion.div>
        </motion.div>
      </header>

      {/* Info Strip */}
      <section className="bg-orange-600 w-full relative z-20 overflow-hidden border-t border-b border-orange-700">
        <div className="flex whitespace-nowrap py-4 items-center">
          <div className="flex animate-[marquee_20s_linear_infinite]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center text-stone-950 font-serif italic font-black text-2xl uppercase tracking-tighter mx-8">
                <MapPin className="w-5 h-5 mr-2" />
                300 S Broadway Ave, Urbana, IL
                <span className="mx-8 opacity-40">•</span>
                <Phone className="w-5 h-5 mr-2" />
                (737) 381-8678
                <span className="mx-8 opacity-40">•</span>
                <Star className="w-5 h-5 mr-2 fill-stone-950" />
                5.0 Stars (10 Reviews)
                <span className="mx-8 opacity-40">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / The Food Section */}
      <section id="about" className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative">
        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="space-y-8">
            <div className="inline-block border-l-4 border-orange-500 pl-4">
              <h2 className="font-serif italic font-black text-5xl md:text-7xl uppercase tracking-tighter">The low &<br />slow difference</h2>
            </div>
            <p className="text-stone-400 text-lg leading-relaxed">
              We brought the authentic taste of Austin, Texas right here to Champaign-Urbana. Our meats are smoked low and slow using traditional techniques, creating a beautiful dark bark, deep smoke ring, and melt-in-your-mouth tenderness that you won&apos;t find anywhere else.
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-white/10">
            <Image 
              src="/bbq-plate.jpg"
              alt="The Low and Slow Difference BBQ Plate"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>

        {/* The Actual Menu */}
        <motion.div 
          id="menu"
          className="mt-32 border-t border-stone-800 pt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h3 className="font-serif italic font-black text-5xl md:text-7xl uppercase tracking-tighter mb-4 text-white">The Menu</h3>
            <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-orange-600 font-bold">Plates & By The Pound</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column: Plates & Feast */}
            <motion.div variants={fadeIn} className="space-y-16">
              <div>
                <h4 className="font-mono text-[12px] uppercase text-stone-500 font-bold mb-8 tracking-[0.2em] border-b border-stone-800 pb-3 flex items-center justify-between">
                  <span>BBQ Plates</span>
                  <span className="text-[9px] text-stone-600 tracking-widest">W/ 2 SIDES</span>
                </h4>
                
                <div className="space-y-6">
                  {plates.map(item => (
                    <div key={item.id} className="flex justify-between items-baseline border-b border-stone-800/50 pb-2 border-dashed">
                      <span className="font-serif italic font-black text-2xl tracking-tighter uppercase text-stone-200">{item.name}</span>
                      <span className="font-mono text-sm font-bold text-orange-500">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[12px] uppercase text-orange-600 font-bold mb-8 tracking-[0.2em] border-b border-orange-900/50 pb-3">
                  Signature Feast
                </h4>
                {feast && (
                  <div className="bg-stone-900/50 border border-orange-500/20 p-8">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-serif italic font-black text-3xl tracking-tighter uppercase text-orange-500">{feast.name}</span>
                      <span className="font-mono text-lg font-bold text-orange-500">{feast.price}</span>
                    </div>
                    <p className="font-sans font-light text-stone-400 text-sm leading-relaxed text-balance whitespace-pre-line">
                      {feast.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Sandwiches */}
              <div>
                <h4 className="font-mono text-[12px] uppercase text-stone-500 font-bold mb-6 tracking-[0.2em] border-b border-stone-800 pb-3">Sandwiches</h4>
                <div className="space-y-4">
                  {sandwiches.map(item => (
                    <div key={item.id} className="flex justify-between items-baseline border-b border-stone-800/30 pb-2 border-dashed">
                      <span className="font-serif italic font-black text-xl tracking-tighter uppercase text-stone-200">{item.name}</span>
                      <span className="font-mono text-sm font-bold text-orange-500">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Meats, Sides, Dessert */}
            <motion.div variants={fadeIn} className="space-y-12">
              {/* Meats */}
              <div>
                <div className="flex justify-between items-end border-b border-stone-800 pb-3 mb-6">
                  <h4 className="font-mono text-[12px] uppercase text-stone-500 font-bold tracking-[0.2em]">Meats</h4>
                  <div className="flex gap-6 font-mono text-[10px] text-stone-600 uppercase tracking-widest w-24 justify-end">
                    <span className="w-8 text-center">1/2 LB</span>
                    <span className="w-8 text-center">1 LB</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {meats.map(item => (
                    <div key={item.id} className="flex justify-between items-baseline border-b border-stone-800/30 pb-2 border-dashed">
                      <span className="font-serif italic font-black text-xl tracking-tighter uppercase text-stone-200">{item.name}</span>
                      <div className="flex gap-6 font-mono text-sm font-bold text-orange-500 w-24 justify-end">
                        <span className="w-8 text-center">{item.price}</span>
                        <span className="w-8 text-center">{item.price2}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sides */}
              <div>
                <div className="flex justify-between items-end border-b border-stone-800 pb-3 mb-6">
                  <h4 className="font-mono text-[12px] uppercase text-stone-500 font-bold tracking-[0.2em]">Sides</h4>
                  <div className="flex gap-6 font-mono text-[10px] text-stone-600 uppercase tracking-widest w-24 justify-end">
                    <span className="w-8 text-center">8 OZ</span>
                    <span className="w-8 text-center">16 OZ</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {sides.map(item => (
                    <div key={item.id} className="flex justify-between items-baseline border-b border-stone-800/30 pb-2 border-dashed">
                      <span className="font-serif italic font-black text-xl tracking-tighter uppercase text-stone-200">{item.name}</span>
                      <div className="flex gap-6 font-mono text-sm font-bold text-orange-500 w-24 justify-end">
                        <span className="w-8 text-center">{item.price}</span>
                        <span className="w-8 text-center">{item.price2}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dessert */}
              <div>
                <h4 className="font-mono text-[12px] uppercase text-stone-500 font-bold mb-6 tracking-[0.2em] border-b border-stone-800 pb-3">Dessert</h4>
                <div className="space-y-4">
                  {desserts.map(item => (
                    <div key={item.id} className="flex justify-between items-baseline border-b border-stone-800/30 pb-2 border-dashed">
                      <span className="font-serif italic font-black text-xl tracking-tighter uppercase text-stone-200">{item.name}</span>
                      <span className="font-mono text-sm font-bold text-orange-500">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 bg-stone-900 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="font-serif italic font-black text-5xl md:text-7xl uppercase tracking-tighter mb-4">What CU is saying</h2>
            <div className="flex justify-center items-center gap-2 text-orange-500 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <p className="text-xl font-medium tracking-wide text-stone-300">5.0 Average • 10 Reviews</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { text: "The service was friendly and the atmosphere was very chill.", author: "Google Reviewer" },
              { text: "My partner said the pulled pork was delicious.", author: "Google Reviewer" },
              { text: "Mac and cheese is so good!!!", author: "Google Reviewer" }
            ].map((review, idx) => (
              <motion.div key={idx} variants={fadeIn} className="bg-stone-950 p-8 rounded-3xl border border-stone-800 relative">
                <div className="text-orange-500 text-6xl font-serif italic font-black absolute top-4 left-6 opacity-20">&quot;</div>
                <div className="flex gap-1 mb-6 mt-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-orange-500 fill-current" />)}
                </div>
                <p className="font-serif italic text-xl text-stone-300 mb-6 font-light relative z-10 leading-relaxed text-pretty">
                  &quot;{review.text}&quot;
                </p>
                <p className="font-mono text-[10px] text-orange-600 font-bold uppercase tracking-widest">— {review.author}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-orange-500 hover:text-orange-400 transition-colors">
              Read all reviews on Google <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Info & Location */}
      <section id="visit" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 bg-stone-900 rounded-[2rem] overflow-hidden border border-stone-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {/* Map Image */}
          <div className="h-64 md:h-auto min-h-[400px] relative w-full bg-stone-800">
            <iframe 
              style={{ filter: "invert(100%) hue-rotate(180deg) grayscale(80%) brightness(140%) contrast(85%)" }}
              src="https://maps.google.com/maps?q=300+S+Broadway+Ave,+Urbana,+IL+61801&t=&z=19&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <h2 className="font-serif italic font-black text-5xl md:text-7xl uppercase tracking-tighter mb-8">Come on by</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Location</h3>
                  <p className="text-stone-400 leading-relaxed">
                    300 S Broadway Ave,<br />
                    Urbana, IL 61801
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-4">Hours</h3>
                  <ul className="w-full sm:w-80 space-y-3 text-stone-400 font-mono text-sm">
                    <li className="flex justify-between items-baseline border-b border-stone-800/80 border-dashed pb-2"><span className="text-stone-300 font-medium">Tuesday</span> <span className="text-orange-500/80">{hours.tuesday}</span></li>
                    <li className="flex justify-between items-baseline border-b border-stone-800/80 border-dashed pb-2"><span className="text-stone-300 font-medium">Wednesday</span> <span className="text-orange-500/80">{hours.wednesday}</span></li>
                    <li className="flex justify-between items-baseline border-b border-stone-800/80 border-dashed pb-2"><span className="text-stone-300 font-medium">Thursday</span> <span className="text-orange-500/80">{hours.thursday}</span></li>
                    <li className="flex justify-between items-baseline border-b border-stone-800/80 border-dashed pb-2"><span className="text-stone-300 font-medium">Friday</span> <span className="text-orange-500/80">{hours.friday}</span></li>
                    <li className="flex justify-between items-baseline border-b border-stone-800/80 border-dashed pb-2"><span className="text-stone-300 font-medium">Saturday</span> <span className="text-orange-500/80">{hours.saturday}</span></li>
                    <li className="flex justify-between items-baseline border-b border-stone-800/80 border-dashed pb-2 text-stone-600"><span className="text-stone-500 font-medium">Sun - Mon</span> <span>{hours.sunday_monday}</span></li>
                  </ul>
                  <p className="text-xs text-stone-600 mt-5 italic">Confirmed by business recently.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <a href="tel:737-381-8678" className="text-stone-400 hover:text-orange-500 transition-colors">
                    (737) 381-8678
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-white/5 py-12 text-center text-stone-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="font-serif italic font-black text-2xl tracking-tighter text-white mb-6">
            JM&apos;S <span className="text-orange-500">BBQ</span>
          </div>
          <p className="mb-6">Straight from ATX to CU. Authentic Texas Craft BBQ in Urbana, IL.</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/jms.txbbq/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-stone-900 hover:text-orange-500 transition-all"><Instagram className="w-5 h-5" /></a>
          </div>
          <p className="mt-8 text-sm text-stone-600">
            &copy; {new Date().getFullYear()} JM&apos;s Texas Craft BBQ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
