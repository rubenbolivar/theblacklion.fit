import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n';

// Redirigir root a locale por defecto
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}