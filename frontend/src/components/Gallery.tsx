import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { src: '/assets/generated/gallery-kitchen.dim_800x600.jpg', alt: 'Kitchen Remodel', category: 'Remodel' },
  { src: '/assets/generated/gallery-outdoor.dim_800x600.jpg', alt: 'Outdoor Living Space', category: 'Outdoor' },
  { src: '/assets/generated/gallery-bathroom.dim_800x600.jpg', alt: 'Bathroom Renovation', category: 'Remodel' },
  { src: '/assets/generated/farmhouse-exterior.dim_800x600.jpg', alt: 'Farmhouse Exterior', category: 'Construction' },
  { src: '/assets/generated/remodel-kitchen-modern.dim_800x600.jpg', alt: 'Modern Kitchen Remodel', category: 'Remodel' },
  { src: '/assets/generated/remodel-bathroom-elegant.dim_800x600.jpg', alt: 'Elegant Bathroom Remodel', category: 'Remodel' },
  { src: '/assets/generated/gallery-commercial.dim_800x600.jpg', alt: 'Commercial Project', category: 'Commercial' },
  { src: '/assets/generated/remodel-living-room.dim_800x600.jpg', alt: 'Living Room Remodel', category: 'Remodel' },
  { src: '/assets/generated/gallery-carpentry.dim_800x600.jpg', alt: 'Custom Carpentry', category: 'Carpentry' },
  { src: '/assets/generated/remodel-bedroom-master.dim_800x600.jpg', alt: 'Master Bedroom Remodel', category: 'Remodel' }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-5">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-lg">
            Our Work
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 mx-auto rounded-full shadow-lg" />
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto font-medium leading-relaxed">
            Explore our portfolio of completed projects showcasing exceptional craftsmanship and attention to detail
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer group shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-700 hover:border-yellow-400/50 bg-slate-800"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ imageRendering: 'crisp-edges' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Category Badge */}
              <div className="absolute top-3 right-3 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.category}
              </div>
              
              {/* Project Title */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-base md:text-lg drop-shadow-lg mb-1">
                  {image.alt}
                </p>
                <div className="w-12 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/97 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-3 rounded-full bg-white hover:bg-slate-100 transition-colors z-10 shadow-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6 text-slate-900" />
          </button>
          
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white hover:bg-slate-100 transition-colors z-10 shadow-2xl"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6 text-slate-900" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white hover:bg-slate-100 transition-colors z-10 shadow-2xl"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6 text-slate-900" />
          </button>

          <img
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            style={{ imageRendering: 'crisp-edges' }}
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-8 py-4 rounded-xl backdrop-blur-sm shadow-2xl border border-slate-700">
            <p className="font-bold text-lg mb-1">{galleryImages[selectedImage].alt}</p>
            <div className="flex items-center justify-between gap-6">
              <span className="text-sm text-yellow-400 font-semibold">{galleryImages[selectedImage].category}</span>
              <span className="text-sm text-slate-300">
                {selectedImage + 1} / {galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
