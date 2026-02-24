/**
 * Python Scraper Mock Data
 * TGS 2025 Gazelle Design
 * Imported from combined_db.json (2,617 actual records)
 */
import rawData from './combined_db.json';

export interface ExhibitorItem {
  Exhibitor?: string;
  exhibitor?: string;
  Area?: string;
  area?: string;
  'Booth Number'?: string;
  boothNumber?: string;
  Country?: string;
  country?: string;
  'Exhibitor Figure'?: string;
  exhibitorFigure?: string;
  'Exhibitor ID'?: string;
  exhibitorId?: number | string;
  'Is Online'?: string;
  isOnline?: boolean;
  Location?: string;
  location?: string;
  uid?: string;
}

// Transform raw data to match interface
const transformData = (data: any[]): ExhibitorItem[] => {
  return data.map(item => ({
    ...item,
    // Map CSV column names to camelCase if needed
    exhibitor: item.Exhibitor || item.exhibitor,
    area: item.Area || item.area,
    boothNumber: item['Booth Number'] || item.boothNumber,
    country: item.Country || item.country || '',
    location: item.Location || item.location || '',
    exhibitorId: item['Exhibitor ID'] ? parseFloat(String(item['Exhibitor ID'])) : 0,
    isOnline: item['Is Online']?.toLowerCase() === 'yes' || item.isOnline === true,
  }));
};

export const pythonScraperMockData: ExhibitorItem[] = transformData(rawData as any[]);

// Calculate statistics from actual data
const calculateStatistics = () => {
  const totalExhibitors = pythonScraperMockData.length;

  // Get unique locations
  const uniqueLocations = new Set(
    pythonScraperMockData
      .map(item => item.location)
      .filter(location => location && location.trim() !== '')
  );

  // Get unique areas
  const uniqueAreas = new Set(
    pythonScraperMockData
      .map(item => item.area)
      .filter(area => area && area.trim() !== '')
  );

  // Count international exhibitors (country not empty and not Japan)
  const internationalExhibitors = pythonScraperMockData.filter(
    item => item.country && item.country.trim() !== '' && item.country !== '日本'
  ).length;

  // Format number with comma separator
  const recordsProcessed = totalExhibitors.toLocaleString('en-US') + '件';

  return {
    totalExhibitors,
    totalLocations: uniqueLocations.size,
    totalAreas: uniqueAreas.size,
    internationalExhibitors,
    recordsProcessed,
    dataSource: 'Tokyo Game Show 2025',
    lastUpdated: new Date('2025-02-24'),
  };
};

export const scraperStatistics = calculateStatistics();
