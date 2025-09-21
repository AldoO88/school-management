import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthProvider } from '@/context/AuthContext';

// Habilita el renderizado estático para todos los idiomas

export default async function LocaleLayout({
  children, 
  params
}: {
  children: React.ReactNode;
  params: any
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  // Habilita el renderizado estático
  setRequestLocale(locale);
  // Carga los mensajes para proveerlos a los Client Components
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}