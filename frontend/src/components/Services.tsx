import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const services = [
  {
    title: 'Remodels',
    description: 'Transform your space with our comprehensive remodeling services. From kitchens to entire home renovations, we bring your vision to life.',
    image: '/assets/generated/service-remodels.dim_800x600.jpg'
  },
  {
    title: 'Carpentry',
    description: 'Expert carpentry services for custom woodwork, trim, cabinetry, and structural framing. Precision craftsmanship in every detail.',
    image: '/assets/generated/service-carpentry-no-people.dim_800x600.jpg'
  },
  {
    title: 'Drywall',
    description: 'Professional drywall installation, repair, and finishing. Smooth, flawless walls ready for your perfect finish.',
    image: '/assets/generated/service-drywall.dim_800x600.jpg'
  },
  {
    title: 'Metal Framing',
    description: 'Durable and precise metal framing solutions for commercial and residential projects. Built to last.',
    image: '/assets/generated/service-metal-framing.dim_800x600.jpg'
  },
  {
    title: 'Custom Backyard BBQ Islands',
    description: 'Create the ultimate outdoor entertainment space with custom-built barbecue islands designed for Arizona living.',
    image: '/assets/generated/service-bbq-island.dim_800x600.jpg'
  },
  {
    title: 'Fire Pits',
    description: 'Elegant fire pit installations that add warmth and ambiance to your outdoor living areas.',
    image: '/assets/generated/service-fire-pit.dim_800x600.jpg'
  },
  {
    title: 'Feature Walls',
    description: 'Stunning feature walls that make a statement. From stone to wood, we create focal points that elevate your space.',
    image: '/assets/generated/service-feature-wall.dim_800x600.jpg'
  },
  {
    title: 'Custom Specialty Services',
    description: 'Unique projects require unique solutions. We specialize in bringing your custom ideas to reality with expert craftsmanship.',
    image: '/assets/generated/service-specialty-premium.dim_800x600.jpg'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-5">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-lg">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto font-medium leading-relaxed">
            Comprehensive construction solutions tailored to your needs with unmatched quality and professionalism
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-yellow-400/50 bg-white"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-yellow-600 transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-700 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
