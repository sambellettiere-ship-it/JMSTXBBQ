import { cookies } from 'next/headers';
import db from '@/lib/db';
import { login, logout, updateMenuItem, updateHours, updateFeast, addMenuItem, deleteMenuItem } from './actions';
import { LogOut, Save, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  if (!session || session.value !== 'authenticated') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white" style={{ background: '#0a0a0a' }}>
        <form action={login} className="bg-stone-900 border border-stone-800 p-8 max-w-sm w-full space-y-6">
          <div className="text-center">
            <h1 className="font-serif italic font-black text-3xl mb-2 tracking-tighter">JM'S <span className="text-orange-500">BBQ</span></h1>
            <p className="font-mono text-[10px] tracking-widest text-stone-500 font-bold uppercase">Admin Dashboard</p>
          </div>
          
          <div className="space-y-4">
            <input name="username" placeholder="Username" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-sm text-stone-200 outline-none focus:border-orange-500 transition-colors" />
            <input name="password" type="password" placeholder="Password" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-sm text-stone-200 outline-none focus:border-orange-500 transition-colors" />
          </div>
          
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-stone-950 px-4 py-3 font-black uppercase text-xs tracking-widest transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  const menuItems = db.prepare('SELECT * FROM menu_items ORDER BY section, sort_order').all() as any[];
  const settingsRows = db.prepare('SELECT key, value FROM settings WHERE key LIKE \'hours_%\'').all() as { key: string, value: string }[];
  
  const hours = {
    tuesday: settingsRows.find(r => r.key === 'hours_tuesday')?.value || '',
    wednesday: settingsRows.find(r => r.key === 'hours_wednesday')?.value || '',
    thursday: settingsRows.find(r => r.key === 'hours_thursday')?.value || '',
    friday: settingsRows.find(r => r.key === 'hours_friday')?.value || '',
    saturday: settingsRows.find(r => r.key === 'hours_saturday')?.value || '',
    sunday_monday: settingsRows.find(r => r.key === 'hours_sunday_monday')?.value || '',
  };

  const sections = ['plates', 'sandwiches', 'meats', 'sides', 'dessert'];

  return (
    <div className="min-h-screen text-stone-200 pb-24" style={{ background: '#0a0a0a' }}>
      <header className="border-b border-stone-900 bg-stone-950/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif italic font-black text-xl tracking-tighter">
            JM'S <span className="text-orange-500">BBQ</span> <span className="font-sans font-light text-stone-500 text-sm ml-2 tracking-normal not-italic">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-[10px] uppercase font-bold tracking-widest text-stone-400 hover:text-orange-500">View Site</Link>
            <form action={logout}>
              <button type="submit" className="text-stone-500 hover:text-red-500 p-2"><LogOut className="w-4 h-4" /></button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Feast Form */}
          <div className="space-y-6">
            <h2 className="font-mono text-sm tracking-[0.2em] font-bold text-orange-500 uppercase border-b border-stone-800 pb-2">Signature Feast</h2>
            {menuItems.filter(item => item.section === 'feast').map(item => (
               <form action={updateFeast} key={item.id} className="bg-stone-900/50 p-6 space-y-4 border border-stone-800">
                  <input type="hidden" name="id" value={item.id} />
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">Name</label>
                      <input disabled value={item.name} className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-400 text-sm opacity-50" />
                    </div>
                    <div className="w-32">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">Price</label>
                      <input name="price" defaultValue={item.price} className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-200 text-sm outline-none focus:border-orange-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">Description</label>
                    <textarea name="description" defaultValue={item.description} rows={4} className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-200 text-sm outline-none focus:border-orange-500 resize-y" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <button type="submit" className="flex items-center gap-2 bg-stone-800 hover:bg-orange-600 hover:text-stone-950 text-stone-300 px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors">
                      <Save className="w-3 h-3" /> Save Feast
                    </button>
                  </div>
               </form>
            ))}
          </div>

          {/* Regular Sections */}
          {sections.map(section => (
            <div key={section} className="space-y-6">
              <h2 className="font-mono text-sm tracking-[0.2em] font-bold text-stone-500 uppercase border-b border-stone-800 pb-2">{section}</h2>
              <div className="grid gap-4">
                {menuItems.filter(item => item.section === section).map(item => (
                  <form action={updateMenuItem} key={item.id} className="flex flex-col sm:flex-row gap-4 items-end bg-stone-900/50 p-4 border border-stone-800">
                    <input type="hidden" name="id" value={item.id} />
                    
                    <div className="w-full sm:flex-1">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">Name</label>
                      <input name="name" defaultValue={item.name} className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-200 text-sm outline-none focus:border-orange-500" />
                    </div>
                    
                    <div className="w-full sm:w-24">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">
                        {section === 'meats' ? 'Half Lb' : section === 'sides' ? 'Small' : 'Price'}
                      </label>
                      <input name="price" defaultValue={item.price || ''} className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-200 text-sm outline-none focus:border-orange-500" />
                    </div>
                    
                    {(section === 'meats' || section === 'sides') && (
                      <div className="w-full sm:w-24">
                        <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">
                           {section === 'meats' ? 'Full Lb' : 'Large'}
                        </label>
                        <input name="price2" defaultValue={item.price2 || ''} className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-200 text-sm outline-none focus:border-orange-500" />
                      </div>
                    )}
                    
                    <div className="flex gap-2 w-full sm:w-auto h-[38px] shrink-0">
                      <button type="submit" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-stone-800 hover:bg-orange-600 hover:text-stone-950 text-stone-300 px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors h-full">
                        <Save className="w-3 h-3" /> <span className="sm:hidden">Save</span>
                      </button>
                      
                      <button formAction={deleteMenuItem} className="flex items-center justify-center bg-stone-800/50 hover:bg-red-900/50 hover:text-red-400 text-stone-500 px-3 py-2 transition-colors h-full">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                ))}

                {/* Add New Item */}
                <form action={addMenuItem} className="flex flex-col sm:flex-row gap-4 items-end bg-[#0f0f0f] p-4 border border-stone-800 border-dashed mt-2">
                  <input type="hidden" name="section" value={section} />
                  
                  <div className="w-full sm:flex-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">New Item Name</label>
                    <input name="name" placeholder="Item Name" required className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-200 text-sm outline-none focus:border-orange-500" />
                  </div>
                  
                  <div className="w-full sm:w-24">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">
                      {section === 'meats' ? 'Half Lb' : section === 'sides' ? 'Small' : 'Price'}
                    </label>
                    <input name="price" placeholder="$0" className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-200 text-sm outline-none focus:border-orange-500" />
                  </div>
                  
                  {(section === 'meats' || section === 'sides') && (
                    <div className="w-full sm:w-24">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">
                          {section === 'meats' ? 'Full Lb' : 'Large'}
                      </label>
                      <input name="price2" placeholder="$0" className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-200 text-sm outline-none focus:border-orange-500" />
                    </div>
                  )}
                  
                  <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-800 hover:bg-orange-600 hover:text-stone-950 text-stone-300 px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors h-[38px] shrink-0">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-stone-900 border border-stone-800 p-6 sticky top-24">
            <h2 className="font-mono text-sm tracking-[0.2em] font-bold text-orange-500 uppercase border-b border-stone-800 pb-2 mb-6">Store Hours</h2>
            <form action={updateHours} className="space-y-4">
              {[
                { name: 'tuesday', label: 'Tuesday' },
                { name: 'wednesday', label: 'Wednesday' },
                { name: 'thursday', label: 'Thursday' },
                { name: 'friday', label: 'Friday' },
                { name: 'saturday', label: 'Saturday' },
                { name: 'sunday_monday', label: 'Sunday - Monday' },
              ].map(day => (
                <div key={day.name}>
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold block mb-1">{day.label}</label>
                  <input name={day.name} defaultValue={hours[day.name as keyof typeof hours]} className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-200 text-sm outline-none focus:border-orange-500" />
                </div>
              ))}
              
              <div className="pt-4 mt-4 border-t border-stone-800">
                <button type="submit" className="w-full flex justify-center items-center gap-2 bg-orange-600 hover:bg-orange-700 text-stone-950 px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors">
                  <Save className="w-3 h-3" /> Save Hours
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
