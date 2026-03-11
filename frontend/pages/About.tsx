
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Header */}
      <section className="relative py-32 bg-gray-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80" 
          alt="About Us" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 bg-fixed"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-brand-pink font-bold uppercase tracking-widest text-sm mb-4 block">Established 2010</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Our Story & Vision</h1>
          <div className="w-24 h-1 bg-brand-pink mx-auto"></div>
        </div>
      </section>

      {/* Main Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-serif text-gray-900 mb-8 leading-tight">
              Leading the Beauty <br/>Revolution in India
            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Glow & Grace (inspired by the excellence of Orane) began with a simple mission: to bridge the gap between passion and profession. Today, we stand as a premier destination that combines world-class beauty education with unparalleled luxury salon services.
            </p>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              We don't just provide treatments; we create transformations. Our academy has empowered over 50,000 students to build successful careers globally, while our salons offer a sanctuary of rejuvenation for the modern individual.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-serif text-brand-pink mb-1">100+</h4>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Centers Globally</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-brand-pink mb-1">500+</h4>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Expert Trainers</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-brand-pink/20 rounded-[2rem] -z-10 translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80" 
              alt="Our Workshop" 
              className="rounded-[2rem] shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* The Two Pillars */}
      <section className="py-24 bg-pink-50/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif text-gray-900">The Two Pillars of Excellence</h2>
            <p className="text-gray-500 mt-4">Merging education with luxury lifestyle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Academy Pillar */}
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-pink-100 hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 bg-brand-pink rounded-2xl flex items-center justify-center text-white mb-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="text-3xl font-serif mb-4">The Global Academy</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our curriculum is designed to meet international standards. We are affiliated with prestigious bodies like CIBTAC (UK) and CIDESCO (Switzerland), ensuring our graduates are ready for the global stage.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-brand-pink rounded-full mr-3"></span>
                  Hands-on Practical Training
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-brand-pink rounded-full mr-3"></span>
                  100% Placement Assistance
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-brand-pink rounded-full mr-3"></span>
                  Advanced Skincare & Makeup Kits
                </li>
              </ul>
              <Link to="/consultant" className="text-brand-pink font-bold hover:underline">Learn about courses →</Link>
            </div>

            {/* Salon Pillar */}
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-pink-100 hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 bg-brand-gold rounded-2xl flex items-center justify-center text-white mb-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
              </div>
              <h3 className="text-3xl font-serif mb-4">The Luxury Salon</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Step into a world of pure indulgence. Our salons provide a multi-sensory experience where luxury meets hygiene and technical perfection. We use only the finest international brands.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                  Certified Senior Stylists
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                  Signature Bridal Transformations
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-brand-gold rounded-full mr-3"></span>
                  Clinical-grade Skin Treatments
                </li>
              </ul>
              <Link to="/services" className="text-brand-gold font-bold hover:underline">Browse our services →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-16">The Values We Live By</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8">
              <h4 className="text-xl font-bold mb-4">Integrity</h4>
              <p className="text-gray-500">We believe in transparent pricing and honest consultations. Your beauty health is our priority.</p>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-bold mb-4">Innovation</h4>
              <p className="text-gray-500">From AI consultations to the latest clinical facials, we stay ahead of industry trends.</p>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-bold mb-4">Inclusion</h4>
              <p className="text-gray-500">Beauty is for everyone. We provide tailored services for all skin types and gender identities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
