import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Droplets, Gauge, Activity, Thermometer, AlertTriangle, CheckCircle, MapPin, Calendar } from 'lucide-react';
import LocationSearch from '@/components/LocationSearch';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import WaterQualityGauge from '@/components/WaterQualityGauge';
import { 
  groundwaterData, 
  GroundwaterRecord, 
  getWaterType, 
  getQualityStatus, 
  getWaterLevelStatus 
} from '@/data/groundwaterData';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState<GroundwaterRecord | null>(null);

  useEffect(() => {
    const locationId = searchParams.get('location');
    if (locationId) {
      const location = groundwaterData.find(l => l.id === locationId);
      if (location) setSelectedLocation(location);
    }
  }, [searchParams]);

  const handleLocationSelect = (locationId: string) => {
    const location = groundwaterData.find(l => l.id === locationId);
    if (location) setSelectedLocation(location);
  };

  const waterType = selectedLocation ? getWaterType(selectedLocation.tds) : null;
  const qualityStatus = selectedLocation ? getQualityStatus(selectedLocation) : null;
  const levelStatus = selectedLocation ? getWaterLevelStatus(selectedLocation.groundwaterLevel) : null;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Groundwater Dashboard
          </h1>
          <p className="text-muted-foreground">
            View detailed groundwater information for your selected location
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <LocationSearch variant="compact" onSelect={handleLocationSelect} />
        </div>

        {!selectedLocation ? (
          /* Location Selection Prompt */
          <div className="water-card p-12 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-secondary mb-4">
              <MapPin className="h-12 w-12 text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
              Select a Location
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Use the search bar above to find groundwater data for your area. 
              Enter a location name, pincode, or district.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
              {groundwaterData.slice(0, 4).map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleLocationSelect(loc.id)}
                  className="p-4 rounded-xl bg-muted hover:bg-secondary transition-colors text-left"
                >
                  <p className="font-medium text-foreground text-sm">{loc.location}</p>
                  <p className="text-xs text-muted-foreground">{loc.pincode}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Dashboard Content */
          <div className="space-y-8 animate-fade-in">
            {/* Location Header */}
            <div className="water-card p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      {selectedLocation.location}
                    </h2>
                    <p className="text-muted-foreground">
                      {selectedLocation.district}, {selectedLocation.state} - {selectedLocation.pincode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last Updated: {selectedLocation.lastUpdated}</span>
                  </div>
                  {qualityStatus && (
                    <StatusBadge status={qualityStatus.color} label={qualityStatus.status} />
                  )}
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <StatCard
                title="Groundwater Level"
                value={selectedLocation.groundwaterLevel}
                unit="m BGL"
                icon={Droplets}
                description="Meters below ground level"
                status={levelStatus?.color}
              />
              <StatCard
                title="Water Type"
                value={waterType?.type || 'N/A'}
                icon={Activity}
                description={`Based on TDS: ${selectedLocation.tds} mg/L`}
                status={waterType?.color}
              />
              <StatCard
                title="Overall Quality"
                value={qualityStatus?.status.split(' - ')[0] || 'N/A'}
                icon={qualityStatus?.color === 'safe' ? CheckCircle : AlertTriangle}
                description="Based on BIS standards"
                status={qualityStatus?.color}
              />
            </div>

            {/* Water Quality Parameters */}
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Water Quality Parameters
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <WaterQualityGauge
                  value={selectedLocation.ph}
                  max={14}
                  safeMax={8.5}
                  moderateMax={9}
                  label="pH Level"
                  unit=""
                />
                <WaterQualityGauge
                  value={selectedLocation.tds}
                  max={3000}
                  safeMax={500}
                  moderateMax={2000}
                  label="TDS (Total Dissolved Solids)"
                  unit="mg/L"
                />
                <WaterQualityGauge
                  value={selectedLocation.hardness}
                  max={1000}
                  safeMax={300}
                  moderateMax={600}
                  label="Hardness"
                  unit="mg/L"
                />
                <WaterQualityGauge
                  value={selectedLocation.chloride}
                  max={1000}
                  safeMax={250}
                  moderateMax={500}
                  label="Chloride"
                  unit="mg/L"
                />
                <WaterQualityGauge
                  value={selectedLocation.fluoride}
                  max={5}
                  safeMax={1}
                  moderateMax={1.5}
                  label="Fluoride"
                  unit="mg/L"
                />
                <WaterQualityGauge
                  value={selectedLocation.nitrate}
                  max={100}
                  safeMax={45}
                  moderateMax={70}
                  label="Nitrate"
                  unit="mg/L"
                />
              </div>
            </div>

            {/* Recommendations */}
            <div className="water-card p-6">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Usage Recommendations
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-muted">
                  <h4 className="font-semibold text-foreground mb-2">🚰 Drinking Purpose</h4>
                  <p className="text-sm text-muted-foreground">
                    {qualityStatus?.color === 'safe' 
                      ? 'Water is suitable for drinking purposes. Regular monitoring recommended.'
                      : qualityStatus?.color === 'moderate'
                      ? 'Water requires basic treatment (filtration/RO) before drinking. Consider water purifier installation.'
                      : 'Water is not recommended for drinking without advanced treatment. Use alternative water sources.'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted">
                  <h4 className="font-semibold text-foreground mb-2">🌾 Irrigation Purpose</h4>
                  <p className="text-sm text-muted-foreground">
                    {waterType?.color === 'safe'
                      ? 'Water is suitable for all types of irrigation. Good for sensitive crops.'
                      : waterType?.color === 'moderate'
                      ? 'Water is suitable for salt-tolerant crops. May require periodic soil testing.'
                      : 'High salinity water. Only suitable for very salt-tolerant crops. Soil management required.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
