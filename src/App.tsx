import React, { useState } from 'react';
import { Menu, X, MapPin, Phone, Clock, Star, Facebook, Instagram, MessageCircle, ChevronRight, UtensilsCrossed } from 'lucide-react';
import Chatbot from './components/Chatbot';

const IMAGES = {
  logo: 'https://i.postimg.cc/cHKDrq5c/lwjw-removebg-preview.png',
  interior: 'https://i.postimg.cc/gJMM0zDr/471152384-559360833657445-9016187013698274759-n.jpg',
  pizza: 'https://i.postimg.cc/Vs0fcd4C/mtʿm-3.jpg',
  pasta: 'https://i.postimg.cc/DfPC0cx9/495699796-17985090860816670-6891375125952655884-n.jpg',
  samosa: 'https://i.postimg.cc/BbRt4FPj/brjr.jpg',
  vineLeaves: 'https://i.postimg.cc/3Rc20dDX/521537160-17993435060816670-7711415540609084111-n.jpg',
  mixedGrill: 'https://i.postimg.cc/zDxcpjTw/mkan-1.jpg',
  spread: 'https://i.postimg.cc/Yq3qdTbh/almkan.jpg'
};

const MENU_ITEMS = [
  {
    category: "Pizzas & Baked Dishes",
    image: IMAGES.pizza,
    items: [
      { name: "Margherita Pizza", price: "158 EGP", description: "Classic cheese and tomato sauce" },
      { name: "Truffle Mushroom Pizza", price: "211 EGP", description: "Earthy mushrooms with truffle oil" },
      { name: "Pepperoni Pizza", price: "183 EGP", description: "Spicy pepperoni slices with mozzarella" }
    ]
  },
  {
    category: "Main Courses",
    image: IMAGES.pasta,
    items: [
      { name: "Tenderloin Steak", price: "429 EGP", description: "Premium cut, cooked to perfection" },
      { name: "Honey Soy Chicken", price: "248 EGP", description: "Sweet and savory glazed chicken" },
      { name: "Chicken Alfredo Pasta", price: "150 EGP", description: "Creamy sauce with grilled chicken" }
    ]
  },
  {
    category: "Breakfast & Sandwiches",
    image: IMAGES.samosa,
    items: [
      { name: "Philly Steak", price: "204 EGP", description: "Thinly sliced steak with melted cheese" },
      { name: "Classic Burger", price: "196 EGP", description: "Juicy beef patty with fresh toppings" }
    ]
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReservationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const guests = formData.get('guests');
    const date = formData.get('date');
    const time = formData.get('time');

    const message = `مرحباً، أود حجز طاولة في مطعم Julia's Kitchen.
الاسم: ${name}
رقم الهاتف: ${phone}
عدد الأفراد: ${guests}
التاريخ: ${date}
الوقت: ${time}`;

    const whatsappUrl = `https://wa.me/201023669069?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans selection:bg-yellow-200">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <img src={IMAGES.logo} alt="Julia's Kitchen Logo" className="h-16 w-auto object-contain" referrerPolicy="no-referrer" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Menu', 'Gallery', 'Reviews', 'Reservation', 'Location'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium text-gray-600 hover:text-yellow-600 transition-colors uppercase tracking-wider"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('reservation')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <MessageCircle size={16} />
                Book a Table
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {['Home', 'Menu', 'Gallery', 'Reviews', 'Reservation', 'Location'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-gray-800 hover:bg-yellow-50 hover:text-yellow-600 border-b border-gray-50"
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 px-3 space-y-3">
                <button 
                  onClick={() => scrollToSection('reservation')}
                  className="w-full bg-yellow-500 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Book a Table
                </button>
                <a 
                  href="tel:01023669069"
                  className="w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Call 01023669069
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.interior} 
            alt="Julia's Kitchen Interior" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-in-up">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>4.2 Stars on Google Reviews</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
            A Global Dining <br className="hidden md:block" />
            <span className="text-yellow-400 italic">Experience</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Combining the elegance of Western cuisine with the warmth of Eastern flavors in the heart of New Cairo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('menu')}
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2"
            >
              <UtensilsCrossed size={20} />
              View Our Menu
            </button>
            <button 
              onClick={() => scrollToSection('reservation')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Book a Table
            </button>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <div className="bg-gray-900 text-gray-300 py-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
            <div className="flex flex-col items-center gap-2 pt-4 md:pt-0">
              <Clock className="text-yellow-500 w-6 h-6" />
              <span className="font-medium text-white">Working Hours</span>
              <span className="text-sm">Daily from 9:00 AM to 1:00 AM</span>
            </div>
            <div className="flex flex-col items-center gap-2 pt-4 md:pt-0">
              <MapPin className="text-yellow-500 w-6 h-6" />
              <span className="font-medium text-white">Location</span>
              <span className="text-sm">Cairo Festival City Mall (Fountain area)</span>
            </div>
            <div className="flex flex-col items-center gap-2 pt-4 md:pt-0">
              <Phone className="text-yellow-500 w-6 h-6" />
              <span className="font-medium text-white">Contact</span>
              <span className="text-sm">01023669069</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Dishes Section */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-yellow-600 uppercase mb-3">Chef's Recommendations</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Signature Dishes</h3>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dish 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
              <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                Best Seller
              </div>
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={IMAGES.pizza} 
                  alt="Truffle Mushroom Pizza" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 text-center">
                <h4 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">Truffle Mushroom Pizza</h4>
                <p className="text-gray-600 leading-relaxed">A blend of Italian luxury and authentic truffle oil</p>
              </div>
            </div>

            {/* Dish 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
              <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                Best Seller
              </div>
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={IMAGES.mixedGrill} 
                  alt="Tenderloin Steak" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 text-center">
                <h4 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">Tenderloin Steak</h4>
                <p className="text-gray-600 leading-relaxed">A premium cut of meat carefully grilled for lovers of authentic taste</p>
              </div>
            </div>

            {/* Dish 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
              <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                Best Seller
              </div>
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={IMAGES.pasta} 
                  alt="Chicken Alfredo Pasta" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 text-center">
                <h4 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">Chicken Alfredo Pasta</h4>
                <p className="text-gray-600 leading-relaxed">Comfort in a bowl of rich cream and grilled chicken</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-yellow-600 uppercase mb-3">Discover</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Our Menu</h3>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-24">
            {MENU_ITEMS.map((category, idx) => (
              <div key={category.category} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                    <img 
                      src={category.image} 
                      alt={category.category} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 lg:px-8">
                  <h4 className="text-3xl font-serif font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                    {category.category}
                  </h4>
                  <div className="space-y-8">
                    {category.items.map((item) => (
                      <div key={item.name} className="group">
                        <div className="flex justify-between items-baseline mb-2">
                          <h5 className="text-xl font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors">{item.name}</h5>
                          <div className="flex-grow border-b border-dotted border-gray-300 mx-4 relative top-[-6px]"></div>
                          <span className="text-lg font-bold text-yellow-600">{item.price}</span>
                        </div>
                        <p className="text-gray-500 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <a 
              href="https://www.talabat.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FF5A00] hover:bg-[#E04F00] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Order Now via Talabat
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-yellow-600 uppercase mb-3">Atmosphere</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Gallery & Decor</h3>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 lg:row-span-2 relative rounded-2xl overflow-hidden group shadow-lg">
              <img src={IMAGES.interior} alt="Interior" className="w-full h-full object-cover aspect-video lg:aspect-auto transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-wider uppercase bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">Elegant Interior</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden group shadow-lg">
              <img src={IMAGES.spread} alt="Food Spread" className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            </div>
            <div className="relative rounded-2xl overflow-hidden group shadow-lg">
              <img src={IMAGES.mixedGrill} alt="Mixed Grill" className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            </div>
            <div className="relative rounded-2xl overflow-hidden group shadow-lg">
              <img src={IMAGES.vineLeaves} alt="Vine Leaves" className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            </div>
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group shadow-lg">
              <img src={IMAGES.pasta} alt="Pasta" className="w-full h-full object-cover aspect-[2/1] transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-yellow-50/50 -skew-y-3 transform origin-top-left -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 mb-8">
            <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Loved by Our Guests</h3>
          <div className="flex justify-center items-center gap-2 mb-8">
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            ))}
            <div className="relative w-8 h-8">
              <Star className="absolute top-0 left-0 w-8 h-8 text-gray-300 fill-gray-300" />
              <div className="absolute top-0 left-0 w-[20%] h-full overflow-hidden">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
            <span className="text-3xl font-bold text-gray-900 ml-4">4.2</span>
          </div>
          <p className="text-xl text-gray-600 font-light italic max-w-2xl mx-auto leading-relaxed">
            "A wonderful dining experience! The blend of Western and Eastern flavors is truly unique. The atmosphere at Cairo Festival City is perfect for both family dinners and romantic evenings."
          </p>
          <div className="mt-10">
            <a 
              href="https://maps.google.com/?cid=9909281768275959842&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-yellow-600 font-semibold hover:text-yellow-700 transition-colors"
            >
              Read more reviews on Google <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-24 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-yellow-600 uppercase mb-3">Book a Table</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Online Reservation</h3>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-yellow-100">
            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name / الاسم بالكامل</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="John Doe"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number / رقم الهاتف</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="+20 100 000 0000"
                  />
                </div>

                {/* Number of Guests */}
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">Guests / عدد الأفراد</label>
                  <select 
                    id="guests" 
                    name="guests" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all bg-gray-50 focus:bg-white appearance-none"
                  >
                    <option value="">Select number of guests</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date / التاريخ</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Time */}
                <div className="md:col-span-2">
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Time / الوقت</label>
                  <input 
                    type="time" 
                    id="time" 
                    name="time" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl flex justify-center items-center gap-2 text-lg"
                >
                  <MessageCircle size={24} />
                  Reserve via WhatsApp / حجز عبر واتساب
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="location" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-yellow-500 uppercase mb-3">Visit Us</h2>
              <h3 className="text-4xl font-serif font-bold text-white mb-8">Location & Contact</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-yellow-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Address</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Cairo Festival City Mall<br />
                      The Fountain Area<br />
                      New Cairo, Egypt
                    </p>
                    <a 
                      href="https://maps.google.com/?cid=9909281768275959842&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-yellow-500 hover:text-yellow-400 mt-3 text-sm font-medium transition-colors"
                    >
                      Get Directions <ChevronRight size={14} />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-yellow-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Contact</h4>
                    <p className="text-gray-400 mb-3">01023669069</p>
                    <div className="flex gap-3">
                      <a 
                        href="tel:01023669069"
                        className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <Phone size={14} /> Call
                      </a>
                      <a 
                        href="https://wa.me/201023669069"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <MessageCircle size={14} /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-yellow-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Working Hours</h4>
                    <p className="text-gray-400">Daily: 9:00 AM - 1:00 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 h-[400px] lg:h-auto">
              <div className="flex-grow rounded-2xl overflow-hidden shadow-2xl relative bg-gray-800 min-h-[300px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.409388147141!2d31.40386257555307!3d30.02517867493309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d259c15b13d%3A0x898950c4014902a2!2sCairo%20Festival%20City%20Mall!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Julia's Kitchen Location"
                ></iframe>
              </div>
              <a 
                href="https://maps.google.com/?cid=9909281768275959842"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl text-center transition-colors shadow-lg flex items-center justify-center gap-2 text-lg"
              >
                <MapPin size={24} />
                افتح في تطبيق الخرائط
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-3">
              <img src={IMAGES.logo} alt="Julia's Kitchen Logo" className="h-14 w-auto object-contain bg-white/90 rounded-lg p-1" referrerPolicy="no-referrer" />
              <h2 className="font-serif text-2xl font-bold text-white">
                Julia's <span className="text-yellow-600">Kitchen</span>
              </h2>
            </div>
            <p className="text-sm">A global dining experience in New Cairo.</p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/profile.php?id=100088130101190&mibextid=2JQ9oc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-yellow-600 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/juliaskitchen_eg/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-yellow-600 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://wa.me/201023669069" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-yellow-600 hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-900 text-sm text-center md:text-left flex flex-col md:flex-row justify-between">
          <p>&copy; {new Date().getFullYear()} Julia's Kitchen. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Cairo Festival City Mall, Egypt</p>
        </div>
      </footer>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
}
