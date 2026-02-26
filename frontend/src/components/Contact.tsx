import { Mail, Phone, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Get In Touch With Us
          </h2>
          <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto font-medium leading-relaxed">
            Ready to start your project? Contact us today for a professional consultation
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              {/* Email */}
              <div className="flex flex-col items-start space-y-4 p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors duration-300">
                <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-lg">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-slate-900 text-xl">Email Us</p>
                  <a
                    href="mailto:joshkingston342@gmail.com"
                    className="text-slate-700 hover:text-yellow-600 transition-colors text-lg font-medium block break-all"
                  >
                    joshkingston342@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col items-start space-y-4 p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors duration-300">
                <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-lg">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-slate-900 text-xl">Call or Text</p>
                  <a
                    href="tel:+16025768855"
                    className="text-slate-700 hover:text-yellow-600 transition-colors text-lg font-medium block"
                  >
                    (602) 576-8855
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Clock className="h-8 w-8 text-yellow-400" />
                <h3 className="font-bold text-2xl text-white">Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-slate-300 font-medium text-lg">Monday - Friday</span>
                  <span className="text-white font-semibold text-lg">7:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-slate-300 font-medium text-lg">Saturday</span>
                  <span className="text-white font-semibold text-lg">8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-300 font-medium text-lg">Sunday</span>
                  <span className="text-xl md:text-2xl text-yellow-400 font-bold">Closed</span>
                </div>
              </div>
            </div>

            {/* Location Badge */}
            <div className="mt-8 flex items-center justify-center space-x-3 text-slate-700">
              <MapPin className="h-6 w-6 text-yellow-600" />
              <p className="text-lg font-semibold">Proudly Serving All of Arizona</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
