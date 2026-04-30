'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const user = formData.get('username');
  const pass = formData.get('password');

  if (user === 'admin' && pass === 'pass') {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
  }
  redirect('/admin');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin');
}

export async function updateMenuItem(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const price2 = formData.get('price2') as string;
  
  db.prepare('UPDATE menu_items SET name = @name, price = @price, price2 = @price2 WHERE id = @id').run({
    id, name, price: price || null, price2: price2 || null
  });
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateFeast(formData: FormData) {
  const id = formData.get('id') as string;
  const price = formData.get('price') as string;
  const description = formData.get('description') as string;
  db.prepare('UPDATE menu_items SET price = @price, description = @description WHERE id = @id').run({
    id, price, description
  });
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateHours(formData: FormData) {
  const stmt = db.prepare('UPDATE settings SET value = @value WHERE key = @key');
  db.transaction(() => {
    stmt.run({ key: 'hours_tuesday', value: formData.get('tuesday') });
    stmt.run({ key: 'hours_wednesday', value: formData.get('wednesday') });
    stmt.run({ key: 'hours_thursday', value: formData.get('thursday') });
    stmt.run({ key: 'hours_friday', value: formData.get('friday') });
    stmt.run({ key: 'hours_saturday', value: formData.get('saturday') });
    stmt.run({ key: 'hours_sunday_monday', value: formData.get('sunday_monday') });
  })();
  revalidatePath('/');
  revalidatePath('/admin');
}
