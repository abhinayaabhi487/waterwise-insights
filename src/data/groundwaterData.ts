// Sample groundwater data mimicking DWLR/CGWB CSV data format
export interface GroundwaterRecord {
  id: string;
  location: string;
  pincode: string;
  state: string;
  district: string;
  groundwaterLevel: number; // meters below ground level
  ph: number;
  tds: number; // Total Dissolved Solids in mg/L
  hardness: number; // mg/L
  chloride: number; // mg/L
  fluoride: number; // mg/L
  nitrate: number; // mg/L
  lastUpdated: string;
}

export const groundwaterData: GroundwaterRecord[] = [
  {
    id: "GW001",
    location: "Anand Vihar",
    pincode: "110092",
    state: "Delhi",
    district: "East Delhi",
    groundwaterLevel: 15.2,
    ph: 7.2,
    tds: 420,
    hardness: 280,
    chloride: 120,
    fluoride: 0.8,
    nitrate: 25,
    lastUpdated: "2024-01-15"
  },
  {
    id: "GW002",
    location: "Dwarka Sector 12",
    pincode: "110078",
    state: "Delhi",
    district: "South West Delhi",
    groundwaterLevel: 22.5,
    ph: 7.8,
    tds: 890,
    hardness: 450,
    chloride: 280,
    fluoride: 1.2,
    nitrate: 40,
    lastUpdated: "2024-01-14"
  },
  {
    id: "GW003",
    location: "Rajouri Garden",
    pincode: "110027",
    state: "Delhi",
    district: "West Delhi",
    groundwaterLevel: 18.7,
    ph: 6.9,
    tds: 650,
    hardness: 320,
    chloride: 180,
    fluoride: 0.9,
    nitrate: 32,
    lastUpdated: "2024-01-15"
  },
  {
    id: "GW004",
    location: "Vasant Kunj",
    pincode: "110070",
    state: "Delhi",
    district: "South Delhi",
    groundwaterLevel: 28.3,
    ph: 8.1,
    tds: 1250,
    hardness: 580,
    chloride: 350,
    fluoride: 1.8,
    nitrate: 55,
    lastUpdated: "2024-01-13"
  },
  {
    id: "GW005",
    location: "Rohini Sector 22",
    pincode: "110086",
    state: "Delhi",
    district: "North West Delhi",
    groundwaterLevel: 12.4,
    ph: 7.4,
    tds: 380,
    hardness: 220,
    chloride: 95,
    fluoride: 0.6,
    nitrate: 18,
    lastUpdated: "2024-01-15"
  },
  {
    id: "GW006",
    location: "Gurgaon Sector 49",
    pincode: "122018",
    state: "Haryana",
    district: "Gurgaon",
    groundwaterLevel: 35.6,
    ph: 8.4,
    tds: 2150,
    hardness: 720,
    chloride: 520,
    fluoride: 2.5,
    nitrate: 68,
    lastUpdated: "2024-01-14"
  },
  {
    id: "GW007",
    location: "Noida Sector 62",
    pincode: "201309",
    state: "Uttar Pradesh",
    district: "Gautam Buddha Nagar",
    groundwaterLevel: 16.8,
    ph: 7.1,
    tds: 520,
    hardness: 290,
    chloride: 145,
    fluoride: 0.7,
    nitrate: 28,
    lastUpdated: "2024-01-15"
  },
  {
    id: "GW008",
    location: "Faridabad Sector 21",
    pincode: "121001",
    state: "Haryana",
    district: "Faridabad",
    groundwaterLevel: 24.2,
    ph: 7.6,
    tds: 980,
    hardness: 420,
    chloride: 260,
    fluoride: 1.4,
    nitrate: 45,
    lastUpdated: "2024-01-14"
  },
  {
    id: "GW009",
    location: "Greater Noida Beta 2",
    pincode: "201310",
    state: "Uttar Pradesh",
    district: "Gautam Buddha Nagar",
    groundwaterLevel: 19.5,
    ph: 7.3,
    tds: 580,
    hardness: 310,
    chloride: 165,
    fluoride: 0.85,
    nitrate: 30,
    lastUpdated: "2024-01-15"
  },
  {
    id: "GW010",
    location: "Ghaziabad Indirapuram",
    pincode: "201014",
    state: "Uttar Pradesh",
    district: "Ghaziabad",
    groundwaterLevel: 21.1,
    ph: 7.5,
    tds: 720,
    hardness: 380,
    chloride: 210,
    fluoride: 1.1,
    nitrate: 38,
    lastUpdated: "2024-01-14"
  },
  {
    id: "GW011",
    location: "Jaipur Malviya Nagar",
    pincode: "302017",
    state: "Rajasthan",
    district: "Jaipur",
    groundwaterLevel: 42.8,
    ph: 8.6,
    tds: 2800,
    hardness: 850,
    chloride: 680,
    fluoride: 3.2,
    nitrate: 75,
    lastUpdated: "2024-01-13"
  },
  {
    id: "GW012",
    location: "Lucknow Gomti Nagar",
    pincode: "226010",
    state: "Uttar Pradesh",
    district: "Lucknow",
    groundwaterLevel: 14.6,
    ph: 7.0,
    tds: 350,
    hardness: 200,
    chloride: 85,
    fluoride: 0.5,
    nitrate: 15,
    lastUpdated: "2024-01-15"
  }
];

// Utility functions for water classification
export const getWaterType = (tds: number): { type: string; color: 'safe' | 'moderate' | 'unsafe' } => {
  if (tds < 500) return { type: 'Fresh Water', color: 'safe' };
  if (tds <= 2000) return { type: 'Brackish Water', color: 'moderate' };
  return { type: 'Saline Water', color: 'unsafe' };
};

export const getQualityStatus = (record: GroundwaterRecord): { status: string; color: 'safe' | 'moderate' | 'unsafe' } => {
  // Based on BIS standards for drinking water
  const issues: string[] = [];
  
  if (record.ph < 6.5 || record.ph > 8.5) issues.push('pH');
  if (record.tds > 500) issues.push('TDS');
  if (record.hardness > 300) issues.push('Hardness');
  if (record.fluoride > 1.5) issues.push('Fluoride');
  if (record.nitrate > 45) issues.push('Nitrate');
  if (record.chloride > 250) issues.push('Chloride');
  
  if (issues.length === 0) return { status: 'Safe for Drinking', color: 'safe' };
  if (issues.length <= 2) return { status: 'Moderate - Treatment Advised', color: 'moderate' };
  return { status: 'Unsafe - Not Recommended', color: 'unsafe' };
};

export const getWaterLevelStatus = (level: number): { status: string; color: 'safe' | 'moderate' | 'unsafe' } => {
  if (level < 15) return { status: 'Normal', color: 'safe' };
  if (level <= 30) return { status: 'Declining', color: 'moderate' };
  return { status: 'Critical', color: 'unsafe' };
};

export const searchLocations = (query: string): GroundwaterRecord[] => {
  const lowerQuery = query.toLowerCase().trim();
  return groundwaterData.filter(
    record =>
      record.location.toLowerCase().includes(lowerQuery) ||
      record.pincode.includes(lowerQuery) ||
      record.district.toLowerCase().includes(lowerQuery) ||
      record.state.toLowerCase().includes(lowerQuery)
  );
};
