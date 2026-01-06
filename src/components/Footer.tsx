import { Droplets } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="h-6 w-6" />
              <span className="font-heading font-bold text-lg">GWRE System</span>
            </div>
            <p className="text-sm opacity-80">
              Real-Time Groundwater Resource Evaluation using DWLR Data. 
              A project for sustainable water resource management.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="/dashboard" className="hover:opacity-100 transition-opacity">Check Water Quality</a></li>
              <li><a href="/visualization" className="hover:opacity-100 transition-opacity">View Statistics</a></li>
              <li><a href="/awareness" className="hover:opacity-100 transition-opacity">Water Awareness</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Data Source</h4>
            <p className="text-sm opacity-80">
              Data modeled after CGWB (Central Ground Water Board) 
              and DWLR (Digital Water Level Recorder) standards.
            </p>
            <p className="text-xs mt-4 opacity-60">
              Final Year Engineering Project
            </p>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-60">
          <p>© 2024 Groundwater Resource Evaluation System. Educational Project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
