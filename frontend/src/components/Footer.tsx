import { Mail, Phone, MapPin, Award, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-700 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-700 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/assets/generated/kingston-logo.dim_200x200.png" 
                alt="Kingston Logo" 
                className="h-12 w-12 rounded-lg"
              />
              <h3 className="text-2xl font-bold">Kingston<span className="text-xl md:text-2xl text-yellow-400 font-bold">Customizations</span></h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Arizona's trusted construction partner for residential and commercial projects. From modern farmhouse designs to custom renovations, we build excellence with integrity.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-6 flex items-center">
              <span className="w-1 h-6 bg-yellow-400 mr-3 rounded-full" />
              Contact Us
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:joshkingston342@gmail.com" 
                className="flex items-start space-x-3 text-gray-300 hover:text-yellow-400 transition-colors group"
              >
                <Mail className="h-5 w-5 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm break-all">joshkingston342@gmail.com</span>
              </a>
              <a 
                href="tel:+16025768855" 
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors group"
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>(602) 576-8855</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5" />
                <span>Serving All of Arizona</span>
              </div>
            </div>
          </div>

          {/* Services Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-6 flex items-center">
              <span className="w-1 h-6 bg-yellow-400 mr-3 rounded-full" />
              Our Services
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-yellow-400 hover:translate-x-1 transition-all cursor-pointer">Remodels</li>
              <li className="hover:text-yellow-400 hover:translate-x-1 transition-all cursor-pointer">Carpentry</li>
              <li className="hover:text-yellow-400 hover:translate-x-1 transition-all cursor-pointer">Drywall & Metal Framing</li>
              <li className="hover:text-yellow-400 hover:translate-x-1 transition-all cursor-pointer">Custom Outdoor Features</li>
            </ul>
          </div>

          {/* Credentials */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-6 flex items-center">
              <span className="w-1 h-6 bg-yellow-400 mr-3 rounded-full" />
              Our Promise
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <Shield className="h-6 w-6 text-yellow-400 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold">Licensed & Insured</p>
                  <p className="text-sm text-gray-400">Fully certified professionals</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <Award className="h-6 w-6 text-yellow-400 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold">Quality Craftsmanship</p>
                  <p className="text-sm text-gray-400">Excellence in every detail</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <Heart className="h-6 w-6 text-yellow-400 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold">Team of Integrity</p>
                  <p className="text-sm text-gray-400">Trust and transparency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex justify-center items-center text-gray-400 text-sm">
          <p>© 2025 Kingston Customizations LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
