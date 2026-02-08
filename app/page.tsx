"use client";

import { useState, useEffect } from "react";

// Animated counter component
function Counter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    const el = document.getElementById(`counter-${end}`);
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span id={`counter-${end}`} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Wheel SVG Component
function WheelIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3"/>
      <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

// Brands data
const brands = [
  "Audi", "BMW", "Mercedes", "Porsche", "Mini", "Smart", "Volkswagen", "Land Rover"
];

const performanceBrands = ["Alpina", "AMG", "Brabus", "JCW", "Borbet"];

// Testimonials
const testimonials = [
  {
    name: "James R.",
    location: "London, UK",
    text: "Ordered BMW alloys on Monday, fitted by Wednesday. The pre-balanced tyres saved me £200+ in fitting costs. Absolute game changer.",
    rating: 5,
  },
  {
    name: "Michael T.",
    location: "Manchester, UK",
    text: "20 years in business for a reason. These guys know their stuff. Got exactly what I needed for my Audi A4 first time.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    location: "Edinburgh, UK",
    text: "Was quoted £800 elsewhere. Got the same genuine Mercedes wheels here for £520. Free delivery too. No brainer.",
    rating: 5,
  },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-steel/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WheelIcon className="w-10 h-10 text-gold" />
            <div>
              <span className="font-display text-2xl tracking-wide text-chrome">ALLOY WHEELS</span>
              <span className="font-display text-2xl tracking-wide text-gold ml-2">DIRECT</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#wheels" className="text-silver hover:text-gold transition-colors">Wheels</a>
            <a href="#brands" className="text-silver hover:text-gold transition-colors">Brands</a>
            <a href="#about" className="text-silver hover:text-gold transition-colors">About</a>
            <a href="tel:+441onal" className="btn-primary text-sm py-2 px-5">
              CALL NOW
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-carbon to-obsidian" />
        
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(201, 165, 92, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(201, 165, 92, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Urgency badge */}
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-accent text-sm font-medium">FREE FITTING ON ALL TYRES THIS MONTH</span>
              </div>

              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6">
                <span className="text-chrome">YOUR CAR</span>
                <br />
                <span className="text-chrome">DESERVES</span>
                <br />
                <span className="text-gradient-gold">BETTER WHEELS</span>
              </h1>

              <p className="text-xl md:text-2xl text-silver max-w-xl mb-8 leading-relaxed">
                Stop overpaying at dealerships. Get <span className="text-chrome font-semibold">genuine OEM alloys</span> at 
                <span className="text-gold font-semibold"> 40% less</span> — delivered to your door, 
                <span className="text-chrome font-semibold"> tyres fitted and balanced</span>.
              </p>

              {/* CTA Stack */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="btn-primary animate-pulse-glow">
                  GET YOUR PERFECT WHEELS →
                </button>
                <button className="border-2 border-steel hover:border-gold text-chrome hover:text-gold font-display tracking-wide px-6 py-4 transition-all duration-300">
                  TALK TO AN EXPERT
                </button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-silver">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>20+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Worldwide Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Expert Technical Support</span>
                </div>
              </div>
            </div>

            {/* Right - Wheel visual */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                {/* Glow behind wheel */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent blur-3xl" />
                
                {/* Main wheel */}
                <div className="relative animate-float">
                  <WheelIcon className="w-full max-w-lg mx-auto text-chrome" />
                  
                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-gold text-obsidian font-display text-lg px-4 py-2 rotate-12">
                    SAVE 40%
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-graphite border border-steel text-chrome font-display text-sm px-4 py-2 -rotate-6">
                    READY TO FIT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-silver">
          <span className="text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-carbon border-y border-steel/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-5xl md:text-6xl text-gradient-gold mb-2">
                <Counter end={20} suffix="+" />
              </div>
              <div className="text-silver">Years Experience</div>
            </div>
            <div>
              <div className="font-display text-5xl md:text-6xl text-gradient-gold mb-2">
                <Counter end={50000} suffix="+" />
              </div>
              <div className="text-silver">Happy Customers</div>
            </div>
            <div>
              <div className="font-display text-5xl md:text-6xl text-gradient-gold mb-2">
                <Counter end={100} suffix="+" />
              </div>
              <div className="text-silver">Vehicle Makes</div>
            </div>
            <div>
              <div className="font-display text-5xl md:text-6xl text-gradient-gold mb-2">
                <Counter end={24} suffix="HR" />
              </div>
              <div className="text-silver">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="relative py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-chrome mb-6">
              TIRED OF THESE <span className="text-accent">PROBLEMS</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                problem: "Dealer quotes you £1,500+ for a single alloy",
                icon: "💸"
              },
              {
                problem: "Can't find the exact OEM wheel for your car",
                icon: "🔍"
              },
              {
                problem: "Fitting & balancing costs add £50-100 per wheel",
                icon: "🔧"
              }
            ].map((item, i) => (
              <div key={i} className="card-metallic p-8 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-xl text-chrome">{item.problem}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto card-metallic p-12">
            <div className="text-center">
              <div className="text-gold text-sm font-semibold tracking-widest mb-4">THE SOLUTION</div>
              <h3 className="font-display text-3xl md:text-4xl text-chrome mb-6">
                WE DELIVER GENUINE WHEELS,<br/>
                <span className="text-gradient-gold">TYRES ALREADY FITTED & BALANCED</span>
              </h3>
              <p className="text-xl text-silver max-w-2xl mx-auto">
                Cut out the middleman. Skip the garage markup. Get OEM-quality alloys 
                at trade prices, ready to bolt straight onto your car.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Stack */}
      <section id="wheels" className="relative py-24 bg-carbon">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-chrome mb-4">
              WHAT YOU <span className="text-gradient-gold">GET</span>
            </h2>
            <p className="text-xl text-silver">Every order includes everything you need</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Genuine OEM Wheels",
                desc: "Not cheap replicas. Real manufacturer alloys that maintain your car's value.",
                icon: "✓",
                value: "Worth £200+"
              },
              {
                title: "Premium Tyres Fitted",
                desc: "Quality tyres already mounted on your wheels. Choose from top brands.",
                icon: "✓",
                value: "Worth £120+"
              },
              {
                title: "Computer Balanced",
                desc: "Every wheel precision-balanced before shipping. No vibrations, no hassle.",
                icon: "✓",
                value: "Worth £60+"
              },
              {
                title: "Inflated & Ready",
                desc: "Shipped at correct pressure. Literally bolt on and drive away.",
                icon: "✓",
                value: "Worth £40+"
              },
              {
                title: "Expert Fitment Check",
                desc: "We verify every order fits your exact vehicle. No guesswork.",
                icon: "✓",
                value: "Priceless"
              },
              {
                title: "Free Technical Support",
                desc: "Questions? Our wheel experts are available 24/7 to help.",
                icon: "✓",
                value: "Worth £50+"
              }
            ].map((item, i) => (
              <div key={i} className="card-metallic p-6 hover:border-gold/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                    {item.icon}
                  </div>
                  <span className="text-gold text-sm">{item.value}</span>
                </div>
                <h3 className="font-display text-xl text-chrome mb-2">{item.title}</h3>
                <p className="text-silver">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block card-metallic p-8 border-gold/30">
              <div className="text-silver mb-2">Total value of bonuses:</div>
              <div className="font-display text-4xl text-chrome line-through decoration-accent mb-2">£470+</div>
              <div className="font-display text-5xl text-gradient-gold">INCLUDED FREE</div>
              <div className="text-silver mt-4">with every wheel & tyre package</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="relative py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-chrome mb-4">
              WE COVER <span className="text-gradient-gold">EVERY BRAND</span>
            </h2>
            <p className="text-xl text-silver">From daily drivers to high-performance machines</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {brands.map((brand) => (
              <div 
                key={brand} 
                className="card-metallic px-8 py-4 hover:border-gold/50 transition-all duration-300 cursor-pointer group"
              >
                <span className="font-display text-xl text-silver group-hover:text-gold transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <div className="text-gold text-sm tracking-widest mb-4">PERFORMANCE SPECIALISTS</div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {performanceBrands.map((brand) => (
              <div 
                key={brand} 
                className="bg-gold/10 border border-gold/30 px-6 py-3 hover:bg-gold/20 transition-all duration-300 cursor-pointer"
              >
                <span className="font-display text-lg text-gold">{brand}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-silver mt-8">
            + 100+ other manufacturers. Can't find yours? <a href="#" className="text-gold underline">Ask us</a>
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-24 bg-carbon">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-chrome mb-4">
              TRUSTED BY <span className="text-gradient-gold">50,000+</span> DRIVERS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="card-metallic p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-chrome text-lg mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-display">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-chrome font-semibold">{testimonial.name}</div>
                    <div className="text-silver text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Reversal */}
      <section className="relative py-24 bg-obsidian">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="card-metallic p-12 border-gold/30">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-chrome mb-6">
              OUR <span className="text-gradient-gold">GUARANTEE</span>
            </h2>
            <p className="text-xl text-silver mb-8 max-w-2xl mx-auto">
              If your wheels don't fit perfectly, we'll replace them for <span className="text-gold">FREE</span>. 
              If you're not 100% satisfied, return them within 30 days for a full refund. 
              <span className="text-chrome font-semibold"> No questions asked.</span>
            </p>
            <p className="text-silver">
              We've been in business 20+ years because we stand behind every sale. Your satisfaction is everything.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 bg-carbon">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-gold text-sm tracking-widest mb-4">SINCE 2003</div>
              <h2 className="font-display text-4xl md:text-5xl text-chrome mb-6">
                FAMILY-OWNED.<br/>
                <span className="text-gradient-gold">EXPERT-RUN.</span>
              </h2>
              <p className="text-xl text-silver mb-6">
                We're not some faceless corporation. We're a family business that started in 2003 
                with one mission: make premium wheels accessible to everyone.
              </p>
              <p className="text-silver mb-6">
                Our team? Genuine car enthusiasts. The kind of people who spend weekends at car shows 
                and know the difference between a 5x112 and 5x114.3 bolt pattern without looking it up.
              </p>
              <p className="text-silver">
                That expertise means you get the right wheels, first time, every time. No returns. 
                No headaches. Just perfect fitment and a car that finally looks the way it should.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-graphite to-carbon rounded-lg border border-steel flex items-center justify-center">
                <WheelIcon className="w-2/3 text-gold/30" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold text-obsidian p-6">
                <div className="font-display text-4xl">20+</div>
                <div className="text-sm">Years of Trust</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 bg-obsidian">
        <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-chrome mb-6">
            READY TO<br/>
            <span className="text-gradient-gold">UPGRADE?</span>
          </h2>
          <p className="text-xl text-silver mb-10 max-w-2xl mx-auto">
            Stop settling for worn-out alloys. Get the wheels your car deserves — 
            at prices that make sense.
          </p>
          
          <button className="btn-primary text-2xl py-5 px-12 animate-pulse-glow mb-8">
            FIND YOUR PERFECT WHEELS →
          </button>

          <div className="flex flex-wrap justify-center gap-8 text-silver">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Free Expert Advice</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Tyres Fitted Free</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-carbon border-t border-steel/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <WheelIcon className="w-8 h-8 text-gold" />
              <span className="font-display text-xl text-chrome">ALLOY WHEELS DIRECT</span>
            </div>
            <div className="flex items-center gap-6 text-silver text-sm">
              <span>© 2003-2025 Alloy Wheels Direct</span>
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
