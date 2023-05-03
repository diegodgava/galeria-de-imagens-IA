import Header from '@/components/Header'
import PromptInput from '@/components/PromptInput'
import ClientProvider from "@/components/ClientProvider";


import '../styles/globals.css'



export const metadata = {
  title: 'Galeria de imagens IA',
  description: 'Feito por Diego Gava',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <ClientProvider>

          <Header />

          <PromptInput />

          {children}
          
        </ClientProvider>

      </body>
    </html>
  );
}
