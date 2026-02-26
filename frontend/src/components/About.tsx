import { Shield, Award, Briefcase } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-yellow-400/8 to-transparent rounded-full blur-xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-5">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
              About Us
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 mx-auto rounded-full" />
          </div>

          <div className="bg-slate-800/80 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border-2 border-slate-700/60 space-y-12">
            <p className="text-xl md:text-2xl text-slate-50 leading-relaxed text-center font-medium">
              Kingston Customizations LLC is Arizona's most trusted construction partner, bringing decades of experience and unwavering integrity to every project. Our skilled craftsmen deliver exceptional quality in both residential and commercial construction, ensuring safety, precision, and unmatched professionalism in every detail we create.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-8">
              <div className="group flex flex-col items-center text-center space-y-5 p-6 rounded-2xl transition-all duration-300 hover:bg-slate-700/40">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Briefcase className="h-10 w-10 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white">Decades of Experience</h3>
                <p className="text-base text-slate-200 leading-relaxed">
                  Years of proven expertise in residential and commercial construction across Arizona
                </p>
              </div>

              <div className="group flex flex-col items-center text-center space-y-5 p-6 rounded-2xl transition-all duration-300 hover:bg-slate-700/40">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Shield className="h-10 w-10 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white">Unwavering Integrity</h3>
                <p className="text-base text-slate-200 leading-relaxed">
                  Honest, transparent service with a commitment to doing what's right for every client
                </p>
              </div>

              <div className="group flex flex-col items-center text-center space-y-5 p-6 rounded-2xl transition-all duration-300 hover:bg-slate-700/40">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Award className="h-10 w-10 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white">Exceptional Quality</h3>
                <p className="text-base text-slate-200 leading-relaxed">
                  Unmatched craftsmanship with meticulous attention to safety, precision, and detail
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
