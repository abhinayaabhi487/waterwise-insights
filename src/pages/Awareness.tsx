import { Droplets, FlaskConical, Waves, AlertTriangle, CheckCircle, Info, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const parameters = [
  {
    name: 'pH Level',
    icon: FlaskConical,
    safe: '6.5 - 8.5',
    description: 'pH indicates how acidic or alkaline the water is. A pH of 7 is neutral.',
    effects: 'Water with very low pH (<6.5) can corrode pipes and cause metallic taste. High pH (>8.5) can cause bitter taste and affect chlorine disinfection efficiency.',
    recommendations: 'For drinking, pH should be between 6.5-8.5. Minor deviations are usually not harmful but indicate other issues.',
  },
  {
    name: 'TDS (Total Dissolved Solids)',
    icon: Waves,
    safe: '< 500 mg/L',
    description: 'TDS measures all dissolved substances in water including salts, minerals, and organic matter.',
    effects: 'High TDS affects taste and may indicate presence of harmful contaminants. Very high TDS (>2000) makes water unsuitable for most uses.',
    recommendations: 'Fresh water (<500): Suitable for all uses. Brackish (500-2000): May need treatment for drinking. Saline (>2000): Not recommended without desalination.',
  },
  {
    name: 'Hardness',
    icon: Droplets,
    safe: '< 300 mg/L',
    description: 'Water hardness is caused by dissolved calcium and magnesium compounds.',
    effects: 'Hard water causes scale buildup in pipes and appliances, reduces soap effectiveness, and may affect taste.',
    recommendations: 'Water softeners can reduce hardness. Hard water is not a health hazard but may increase mineral intake.',
  },
  {
    name: 'Fluoride',
    icon: FlaskConical,
    safe: '< 1.5 mg/L',
    description: 'Fluoride occurs naturally in groundwater and affects dental and bone health.',
    effects: 'Low levels (0.5-1.0) benefit dental health. High levels (>1.5) can cause dental fluorosis and skeletal problems.',
    recommendations: 'Defluoridation is required if levels exceed 1.5 mg/L. Activated alumina or bone char filters can help.',
  },
  {
    name: 'Nitrate',
    icon: AlertTriangle,
    safe: '< 45 mg/L',
    description: 'Nitrates enter groundwater from fertilizers, sewage, and decaying organic matter.',
    effects: 'High nitrate levels are dangerous for infants (blue baby syndrome) and can indicate contamination.',
    recommendations: 'Reverse osmosis or ion exchange can remove nitrates. Pregnant women and infants should avoid high-nitrate water.',
  },
  {
    name: 'Chloride',
    icon: Waves,
    safe: '< 250 mg/L',
    description: 'Chloride is naturally present in water and can increase due to seawater intrusion or pollution.',
    effects: 'High chloride gives salty taste and can corrode pipes. Indicates possible contamination sources.',
    recommendations: 'Reverse osmosis effectively removes chloride. Check for sources of contamination if levels are high.',
  },
];

const faqs = [
  {
    question: 'What is groundwater level and why is it important?',
    answer: 'Groundwater level refers to the depth below ground surface where water is found in aquifers. It\'s crucial for understanding water availability - declining levels indicate over-extraction or reduced recharge. Normal levels (<15m) are sustainable, while critical levels (>30m) may require conservation measures.',
  },
  {
    question: 'How is water type determined?',
    answer: 'Water type is classified based on TDS (Total Dissolved Solids): Fresh Water (<500 mg/L) is suitable for all purposes including drinking. Brackish Water (500-2000 mg/L) may require treatment for drinking but can be used for irrigation. Saline Water (>2000 mg/L) needs desalination and is only suitable for very salt-tolerant uses.',
  },
  {
    question: 'What should I do if my water quality is "Moderate"?',
    answer: 'Moderate quality water typically requires basic treatment before drinking. Consider installing an RO (Reverse Osmosis) water purifier. For irrigation, it\'s generally safe for most crops but periodic soil testing is recommended to monitor salt accumulation.',
  },
  {
    question: 'Can I use groundwater for irrigation if TDS is high?',
    answer: 'It depends on TDS level and crop type. Water with TDS 500-2000 mg/L can be used for salt-tolerant crops like cotton, wheat, and barley. For sensitive crops like vegetables, TDS should be below 500 mg/L. High TDS water may require mixing with fresh water or special soil management.',
  },
  {
    question: 'How often should groundwater quality be tested?',
    answer: 'For domestic use, testing twice a year (pre and post-monsoon) is recommended. If you notice changes in taste, odor, or color, test immediately. Industrial and agricultural users should test quarterly. Always test after any nearby construction or contamination event.',
  },
  {
    question: 'What is DWLR and how does it work?',
    answer: 'DWLR (Digital Water Level Recorder) is an electronic device that continuously monitors groundwater levels. It uses sensors to measure water level in observation wells and transmits data in real-time to monitoring centers, enabling precise tracking of groundwater fluctuations.',
  },
];

const Awareness = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Water Quality Awareness
          </h1>
          <p className="text-muted-foreground">
            Learn about water quality parameters and their significance for health and usage
          </p>
        </div>

        {/* Introduction */}
        <div className="water-card p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-secondary text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
                Understanding Groundwater Quality
              </h2>
              <p className="text-muted-foreground">
                Groundwater quality is determined by various physical, chemical, and biological parameters. 
                These parameters affect water's suitability for drinking, irrigation, and industrial use. 
                Understanding these parameters helps in making informed decisions about water treatment and usage.
              </p>
            </div>
          </div>
        </div>

        {/* Water Quality Parameters */}
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
            Key Water Quality Parameters
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {parameters.map((param) => (
              <div key={param.name} className="water-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-secondary text-primary">
                    <param.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{param.name}</h3>
                    <p className="text-sm text-status-safe font-medium">Safe Limit: {param.safe}</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">What is it?</p>
                    <p className="text-muted-foreground">{param.description}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Effects of High Levels</p>
                    <p className="text-muted-foreground">{param.effects}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      Recommendations
                    </p>
                    <p className="text-muted-foreground">{param.recommendations}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BIS Standards */}
        <div className="water-card p-6 mb-12">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
            BIS Drinking Water Standards (IS 10500:2012)
          </h2>
          <p className="text-muted-foreground mb-4">
            The Bureau of Indian Standards specifies acceptable and permissible limits for drinking water quality:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Parameter</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Acceptable Limit</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Permissible Limit</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">pH</td>
                  <td className="py-3 px-4 text-status-safe">6.5 - 8.5</td>
                  <td className="py-3 px-4">No relaxation</td>
                  <td className="py-3 px-4">-</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">TDS</td>
                  <td className="py-3 px-4 text-status-safe">500</td>
                  <td className="py-3 px-4 text-status-moderate">2000</td>
                  <td className="py-3 px-4">mg/L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Total Hardness</td>
                  <td className="py-3 px-4 text-status-safe">200</td>
                  <td className="py-3 px-4 text-status-moderate">600</td>
                  <td className="py-3 px-4">mg/L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Chloride</td>
                  <td className="py-3 px-4 text-status-safe">250</td>
                  <td className="py-3 px-4 text-status-moderate">1000</td>
                  <td className="py-3 px-4">mg/L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Fluoride</td>
                  <td className="py-3 px-4 text-status-safe">1.0</td>
                  <td className="py-3 px-4 text-status-moderate">1.5</td>
                  <td className="py-3 px-4">mg/L</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Nitrate</td>
                  <td className="py-3 px-4 text-status-safe">45</td>
                  <td className="py-3 px-4">No relaxation</td>
                  <td className="py-3 px-4">mg/L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="water-card px-6 border-none">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Tips Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="water-card p-6 border-l-4 border-l-status-safe">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-status-safe" />
              <h3 className="font-heading font-semibold text-lg text-foreground">Best Practices</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Get water tested regularly from certified labs</li>
              <li>• Use appropriate filtration based on water quality</li>
              <li>• Store water in clean, covered containers</li>
              <li>• Avoid contamination of water sources</li>
              <li>• Practice rainwater harvesting for recharge</li>
            </ul>
          </div>
          
          <div className="water-card p-6 border-l-4 border-l-status-unsafe">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-status-unsafe" />
              <h3 className="font-heading font-semibold text-lg text-foreground">Warning Signs</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Unusual taste, odor, or color in water</li>
              <li>• Staining on fixtures (indicates minerals)</li>
              <li>• Soap not lathering properly (hard water)</li>
              <li>• Health issues like stomach problems</li>
              <li>• Significant drop in water level</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awareness;
