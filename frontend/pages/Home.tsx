import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Service } from "../types";
import { api } from "../services/api";

const Home: React.FC = () => {
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);

  useEffect(() => {
    api.getServices().then((data) => setFeaturedServices(data.slice(0, 3)));
  }, []);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-stylist-washing-a-clients-hair-in-a-salon-44510-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        <div className="relative z-10 text-left px-6 md:px-20 w-full max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-brand-pink font-bold uppercase tracking-[0.4em] mb-4 block animate-pulse">
              International Beauty Standards
            </span>

            <h1 className="text-5xl md:text-8xl text-white font-serif mb-6 drop-shadow-2xl leading-tight">
              Master the Art of <span className="italic text-brand-gold">Beauty</span>
            </h1>

            <p className="text-xl text-white/90 mb-10 max-w-xl font-light leading-relaxed">
              Experience the pinnacle of luxury salon services or launch your global career with
              Orane-Style&apos;s world-renowned beauty academy.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/services"
                className="px-12 py-5 bg-brand-pink text-white rounded-full text-lg font-bold hover:bg-brand-700 transition transform hover:scale-105 shadow-2xl flex items-center justify-center"
              >
                Book a Session
              </Link>

              <Link
                to="/about"
                className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full text-lg font-bold hover:bg-white/20 transition transform hover:scale-105 flex items-center justify-center"
              >
                Explore Academy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE PACKAGES */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-brand-gold font-serif text-xl italic">Curated Collections</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2">
              Signature Luxury Packages
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#1a1a1a] p-10 rounded-[3rem] text-white hover:-translate-y-4 transition-transform duration-500 flex flex-col justify-between">
              <div>
                <span className="text-brand-pink font-bold uppercase tracking-widest text-xs">
                  Best Seller
                </span>
                <h4 className="text-3xl font-serif mt-4 mb-6">The Royal Bridal Suite</h4>
                <ul className="space-y-4 text-gray-400 mb-10">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-brand-pink rounded-full mr-3"></span>Premium HD Makeup
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-brand-pink rounded-full mr-3"></span>Designer Hair Styling
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-brand-pink rounded-full mr-3"></span>Gold Leaf Facial
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-brand-pink rounded-full mr-3"></span>Luxury Draping
                  </li>
                </ul>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <span className="text-2xl font-bold">₹24,999</span>
                <Link to="/services" className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm">
                  Select
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-pink p-10 rounded-[3rem] text-white hover:-translate-y-4 transition-transform duration-500 shadow-2xl shadow-pink-200">
              <span className="text-white/80 font-bold uppercase tracking-widest text-xs">Exclusive</span>
              <h4 className="text-3xl font-serif mt-4 mb-6">Red Carpet Glow</h4>
              <ul className="space-y-4 text-white/90 mb-10">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>Hydra-Aesthetic Facial
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>Moroccan Hair Spa
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>Signature Gel Mani-Pedi
                </li>
              </ul>
              <div className="flex justify-between items-center pt-6 border-t border-white/20">
                <span className="text-2xl font-bold">₹8,500</span>
                <Link to="/services" className="px-6 py-2 bg-white text-brand-pink rounded-full font-bold text-sm">
                  Select
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-gold p-10 rounded-[3rem] text-white hover:-translate-y-4 transition-transform duration-500">
              <span className="text-white/80 font-bold uppercase tracking-widest text-xs">Rejuvenation</span>
              <h4 className="text-3xl font-serif mt-4 mb-6">Glow Zen Spa Path</h4>
              <ul className="space-y-4 text-white/90 mb-10">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>Swedish Therapy
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>Essential Oil Wrap
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>Detox Herbal Tea
                </li>
              </ul>
              <div className="flex justify-between items-center pt-6 border-t border-white/20">
                <span className="text-2xl font-bold">₹4,200</span>
                <Link to="/services" className="px-6 py-2 bg-white text-brand-gold rounded-full font-bold text-sm">
                  Select
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ORANE STYLE LOOKBOOK (HOME PAGE) */}
      <section className="py-28 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-brand-pink font-bold uppercase tracking-widest text-sm">
              Our Signature Work
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-3">
              The Orane Lookbook
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-4">
              A curated showcase of our premium beauty transformations and luxury experiences.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            {/* Left Stack */}
            <div className="space-y-10">
              <LookImg
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
                title="Hair Styling"
              />
              <LookImg
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
                title="Facial Therapy"
              />
            </div>

            {/* Center Big */}
            <div className="relative group">
              <div className="absolute -inset-6 bg-pink-100/40 rounded-[3rem] blur-2xl"></div>
              <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80"
                  className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Bridal Makeup"
                />
                <LookOverlay title="Bridal Makeup" />
              </div>
            </div>

            {/* Right Stack */}
            <div className="space-y-10">
              <LookImg
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80"
                title="Luxury Spa"
              />
              <LookImg
                src="https://plus.unsplash.com/premium_photo-1664048712492-9d395c204e37?auto=format&fit=crop&w=800&q=80"
                title="Skin Care"
              />
            </div>
          </div>

          <div className="text-center mt-20">
            <Link
              to="/services"
              className="inline-block px-12 py-4 bg-brand-pink text-white rounded-full font-bold text-lg hover:bg-brand-700 transition shadow-xl"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CLIENT STORIES */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-pink font-bold uppercase tracking-widest text-sm">
              Kind Words
            </span>
            <h3 className="text-4xl md:text-5xl font-serif mt-2">Our Client Stories</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                text: "The bridal package was worth every penny. Elena is a magician with makeup!",
                author: "Priya Sharma",
                role: "Happy Bride"
              },
              {
                text: "A truly international experience. The hygiene standards are impeccable.",
                author: "Rahul Verma",
                role: "Regular Client"
              },
              {
                text: "My skin has never felt better after the clinical facial. Professional staff!",
                author: "Anjali Gupta",
                role: "Skin Enthusiast"
              }
            ].map((t, i) => (
              <div key={i} className="p-10 bg-pink-50/50 rounded-3xl relative">
                <svg
                  className="absolute top-6 left-6 w-12 h-12 text-brand-pink/10"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8v8h6v8h-8v-8h-6v-8h8zm14 0v8h6v8h-8v-8h-6v-8h8z" />
                </svg>

                <p className="relative z-10 text-gray-700 mb-8 italic text-lg leading-relaxed">
                  "{t.text}"
                </p>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-brand-pink rounded-full mr-4"></div>
                  <div>
                    <h5 className="font-bold text-gray-900">{t.author}</h5>
                    <p className="text-xs text-brand-pink uppercase font-black">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>







     {/* VIDEO INSPIRED MOVING LOOKBOOK – NO CONFIG NEEDED */}
<section className="py-24 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 text-center mb-12">
    <span className="text-brand-pink font-bold uppercase tracking-widest text-sm">
      Beauty in Motion
    </span>
    <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-3">
      Our Signature Transformations
    </h2>
    <p className="text-gray-500 max-w-2xl mx-auto mt-4">
      Inspired by real salon reels – smooth, premium and alive.
    </p>
  </div>

  {/* Moving strip */}
  <div className="relative w-full overflow-hidden">
    <div
      className="flex gap-8 px-6"
      style={{
        animation: "scrollReel 25s linear infinite",
        width: "max-content"
      }}
    >
      {LOOKBOOK.map((item, i) => (
        <div
          key={i}
          className="group relative w-[300px] md:w-[380px] h-[440px] rounded-[2.5rem] overflow-hidden shadow-2xl flex-shrink-0"
        >
          <img
            src={item.img}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition" />
          <div className="absolute bottom-0 p-6">
            <h3 className="text-white font-serif text-2xl opacity-0 group-hover:opacity-100 transition">
              {item.title}
            </h3>
            <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition delay-100">
              {item.tag}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* fade edges */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
  </div>

  {/* inline keyframes – NO tailwind config */}
  <style>{`
    @keyframes scrollReel {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}</style>
</section>






      {/* 5. MEET OUR EXPERTS */}
      <section className="py-24 px-6 bg-pink-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-pink font-bold uppercase tracking-widest text-sm">
              The Talent
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mt-2">Our Master Artists</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                name: "Elena Gilbert",
                role: "Chief Makeup Artist",
                img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Marcus Vain",
                role: "Senior Hair Stylist",
                img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Sarah Chen",
                role: "Skin Specialist",
                img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "David Rossi",
                role: "Creative Director",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              }
            ].map((expert, i) => (
              <div key={i} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 bg-brand-pink rounded-full translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
                  <img
                    src={expert.img}
                    alt={expert.name}
                    className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{expert.name}</h3>
                <p className="text-brand-pink text-sm uppercase tracking-tighter">{expert.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* (Optional) Featured Services - if you want to show fetched services */}
      {featuredServices.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-brand-pink font-bold uppercase tracking-widest text-sm">
                Featured Services
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-2">
                Popular Choices
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map((s) => (
                <div key={s.id} className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition">
                  <div className="h-56 bg-gray-100 overflow-hidden">
                    <img
                      src={s.imageUrl || "https://via.placeholder.com/800x600?text=Service"}
                      alt={s.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-pink">
                      {s.category}
                    </p>
                    <h3 className="text-2xl font-serif text-gray-900 mt-2">{s.name}</h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                      {s.description || "Premium service curated by our experts."}
                    </p>
                    <div className="flex justify-between items-center mt-6">
                      <span className="font-bold text-gray-900">₹{s.price}</span>
                      <Link
                        to={`/book/${s.id}`}
                        className="px-5 py-2 rounded-full bg-brand-pink text-white font-bold text-sm hover:bg-brand-700 transition"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;

/* ========= Helpers (same file) ========= */
const LookImg = ({ src, title }: { src: string; title: string }) => (
  <div className="group relative overflow-hidden rounded-[2.5rem] shadow-xl">
    <img
      src={src}
      alt={title}
      className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <LookOverlay title={title} />
  </div>
);

const LookOverlay = ({ title }: { title: string }) => (
  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition flex items-end">
    <span className="text-white font-serif text-xl p-6 opacity-0 group-hover:opacity-100 transition">
      {title}
    </span>
  </div>
);


const LOOKBOOK = [
  {
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    title: "Bridal Makeup",
    tag: "HD • Luxury • Editorial"
  },
  {
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    title: "Hair Styling",
    tag: "Precision • Volume"
  },
  {
    img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
    title: "Luxury Spa",
    tag: "Relax • Detox"
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1664048712492-9d395c204e37?auto=format&fit=crop&w=1200&q=80",
    title: "Skin Therapy",
    tag: "Clinical • Glow"
  },
  {
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",
    title: "Facial Art",
    tag: "Lift • Sculpt"
  }
];
