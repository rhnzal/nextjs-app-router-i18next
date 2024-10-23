import { dir } from 'i18next'
import { languages } from '@/app/i18n/settings'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout(
  {
    children,
    params
  }
    :
  {
    children : any,
    params: {
      lng : any
    }
  }

) {
  return (
    <html lang={params.lng} dir={dir(params.lng)}>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}