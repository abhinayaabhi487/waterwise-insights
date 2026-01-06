import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { groundwaterData, getWaterType, getQualityStatus } from '@/data/groundwaterData';

const Visualization = () => {
  // Prepare data for charts
  const waterLevelData = groundwaterData.map(loc => ({
    name: loc.location.length > 12 ? loc.location.substring(0, 12) + '...' : loc.location,
    level: loc.groundwaterLevel,
    fullName: loc.location,
  })).sort((a, b) => b.level - a.level);

  const tdsData = groundwaterData.map(loc => ({
    name: loc.location.length > 12 ? loc.location.substring(0, 12) + '...' : loc.location,
    tds: loc.tds,
    fullName: loc.location,
  }));

  // Water type distribution
  const waterTypeCount = groundwaterData.reduce((acc, loc) => {
    const type = getWaterType(loc.tds).type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const waterTypePieData = Object.entries(waterTypeCount).map(([name, value]) => ({
    name,
    value,
  }));

  // Quality status distribution
  const qualityCount = groundwaterData.reduce((acc, loc) => {
    const status = getQualityStatus(loc).color;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const qualityPieData = [
    { name: 'Safe', value: qualityCount.safe || 0 },
    { name: 'Moderate', value: qualityCount.moderate || 0 },
    { name: 'Unsafe', value: qualityCount.unsafe || 0 },
  ];

  // Parameter comparison for radar chart
  const radarData = groundwaterData.slice(0, 5).map(loc => ({
    location: loc.location.substring(0, 10),
    pH: (loc.ph / 14) * 100,
    TDS: (loc.tds / 3000) * 100,
    Hardness: (loc.hardness / 1000) * 100,
    Fluoride: (loc.fluoride / 5) * 100,
    Nitrate: (loc.nitrate / 100) * 100,
  }));

  // Multiple parameters line chart
  const parameterTrendData = groundwaterData.map(loc => ({
    name: loc.location.substring(0, 8),
    pH: loc.ph,
    TDS: loc.tds / 100, // Scaled for visibility
    Hardness: loc.hardness / 10,
  }));

  const COLORS = {
    safe: 'hsl(142, 70%, 45%)',
    moderate: 'hsl(38, 92%, 50%)',
    unsafe: 'hsl(0, 84%, 55%)',
    primary: 'hsl(204, 80%, 35%)',
    accent: 'hsl(183, 70%, 40%)',
  };

  const PIE_COLORS = [COLORS.safe, COLORS.moderate, COLORS.unsafe];
  const WATER_TYPE_COLORS = [COLORS.safe, COLORS.moderate, COLORS.unsafe];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Data Visualization
          </h1>
          <p className="text-muted-foreground">
            Interactive charts showing groundwater trends and comparisons across locations
          </p>
        </div>

        <div className="grid gap-8">
          {/* Water Level Comparison */}
          <div className="water-card p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
              Groundwater Level by Location (meters BGL)
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Higher values indicate deeper water tables. Critical levels (&gt;30m) require attention.
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterLevelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} m`,
                      props.payload.fullName,
                    ]}
                  />
                  <Bar 
                    dataKey="level" 
                    fill={COLORS.primary}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Charts Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Water Type Distribution */}
            <div className="water-card p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                Water Type Distribution
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Classification based on TDS levels
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={waterTypePieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {waterTypePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={WATER_TYPE_COLORS[index % WATER_TYPE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quality Status Distribution */}
            <div className="water-card p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                Quality Status Distribution
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Based on BIS drinking water standards
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={qualityPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {qualityPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* TDS Comparison */}
          <div className="water-card p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
              TDS Levels Across Locations
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Total Dissolved Solids in mg/L. Fresh water: &lt;500, Brackish: 500-2000, Saline: &gt;2000
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tdsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} mg/L`,
                      props.payload.fullName,
                    ]}
                  />
                  <Bar dataKey="tds" fill={COLORS.accent} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Parameter Trends */}
          <div className="water-card p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
              Multi-Parameter Comparison
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Comparing pH, TDS (÷100), and Hardness (÷10) across locations
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={parameterTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="pH" stroke={COLORS.safe} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="TDS" stroke={COLORS.moderate} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Hardness" stroke={COLORS.primary} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="water-card p-5 text-center">
              <p className="text-3xl font-bold text-primary">{groundwaterData.length}</p>
              <p className="text-sm text-muted-foreground">Total Locations</p>
            </div>
            <div className="water-card p-5 text-center">
              <p className="text-3xl font-bold text-status-safe">{qualityCount.safe || 0}</p>
              <p className="text-sm text-muted-foreground">Safe Locations</p>
            </div>
            <div className="water-card p-5 text-center">
              <p className="text-3xl font-bold text-status-moderate">{qualityCount.moderate || 0}</p>
              <p className="text-sm text-muted-foreground">Moderate Quality</p>
            </div>
            <div className="water-card p-5 text-center">
              <p className="text-3xl font-bold text-status-unsafe">{qualityCount.unsafe || 0}</p>
              <p className="text-sm text-muted-foreground">Need Treatment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
