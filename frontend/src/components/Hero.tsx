export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-16 bg-white">
      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Logo - Centered */}
          <div className="flex justify-center mb-8">
            <img
              src="/assets/IMG_2219.jpeg"
              alt="Kingston Customizations Logo"
              className="h-40 w-40 md:h-52 md:w-52 lg:h-64 lg:w-64"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>

          {/* Main Headline with Dark Text for White Background */}
          <div className="space-y-6 max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight text-slate-900 px-4">
              A professional American builder you can trust and rely on — delivering professional results with respect, integrity, and talent that gets the job done right the first time, every time.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
