import LandingPage from '@/components/landing-page';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function Home() {
  const menuItems = db.prepare('SELECT * FROM menu_items').all() as any[];
  const settingsRows = db.prepare('SELECT key, value FROM settings WHERE key LIKE \'hours_%\'').all() as { key: string, value: string }[];
  
  const hours = {
    tuesday: settingsRows.find(r => r.key === 'hours_tuesday')?.value || '',
    wednesday: settingsRows.find(r => r.key === 'hours_wednesday')?.value || '',
    thursday: settingsRows.find(r => r.key === 'hours_thursday')?.value || '',
    friday: settingsRows.find(r => r.key === 'hours_friday')?.value || '',
    saturday: settingsRows.find(r => r.key === 'hours_saturday')?.value || '',
    sunday_monday: settingsRows.find(r => r.key === 'hours_sunday_monday')?.value || '',
  };

  return (
    <LandingPage menuItems={menuItems} hours={hours} />
  );
}
