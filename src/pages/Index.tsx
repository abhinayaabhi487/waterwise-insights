import { Droplets, BarChart3, BookOpen, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LocationSearch from '@/components/LocationSearch';

const features = [
  {
    icon: Droplets,
    title: 'Water Level Monitoring',
    description: 'Real-time groundwater level data from DWLR sensors across multiple locations.',
  },
  {
    icon: Shield,
    title: 'Quality Assessment',
    description: 'Comprehensive water quality analysis including pH, TDS, and contaminant levels.',
  },
  {
    icon: BarChart3,
    title: 'Data Visualization',
    description: 'Interactive charts and graphs for trend analysis and comparison.',
  },
  {
    icon: BookOpen,
    title: 'Awareness Module',
    description: 'Educational content about water parameters and usage recommendations.',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 animate-fade-in">
              <Droplets className="h-4 w-4" />
              <span className="text-sm font-medium">DWLR-Based Monitoring System</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Real-Time Groundwater
              <br />
              Resource Evaluation
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto animate-fade-in">
              Access comprehensive groundwater data for your location. Check water levels, 
              quality status, and make informed decisions about water usage.
            </p>

            <div className="animate-fade-in">
              <LocationSearch />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm opacity-80">
              <span>🏠 For Residents</span>
              <span>🌾 For Farmers</span>
              <span>🏛️ For Planners</span>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="relative h-16 -mb-1 mt-12">
          <svg viewBox="0 0 1440 100" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
            <path 
              fill="hsl(var(--background))" 
              d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,75 1440,50 L1440,100 L0,100 Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Groundwater Data
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our system provides detailed groundwater information to help you understand 
              water availability and quality in your area.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="water-card p-6 text-center group hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 rounded-2xl bg-secondary text-primary mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="water-card p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Check Your Area's Water Status
            </h2>
            <p className="text-muted-foreground mb-6">
              Enter your pincode or location to get detailed groundwater information including 
              water level, quality parameters, and usage recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-semibold">
                <Link to="/dashboard">
                  View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold">
                <Link to="/awareness">
                  Learn About Water Quality
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                About This Project
              </h2>
              <p className="text-muted-foreground mb-4">
                This system is developed as a final-year engineering project to demonstrate 
                real-time groundwater resource evaluation using DWLR (Digital Water Level Recorder) data.
              </p>
              <p className="text-muted-foreground mb-6">
                The application processes CSV-based groundwater data modeled after CGWB (Central Ground Water Board) 
                standards to provide location-wise water quality and availability information.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-2xl font-bold text-primary">12+</p>
                  <p className="text-sm text-muted-foreground">Locations</p>
                </div>
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-2xl font-bold text-primary">7</p>
                  <p className="text-sm text-muted-foreground">Parameters</p>
                </div>
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-2xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Access</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-secondary to-muted rounded-2xl p-8">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                Data Parameters Monitored
              </h3>
              <ul className="space-y-3">
                {['Groundwater Level (meters)', 'pH Level', 'TDS (Total Dissolved Solids)', 'Hardness', 'Chloride', 'Fluoride', 'Nitrate'].map((param) => (
                  <li key={param} className="flex items-center gap-3 text-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {param}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
