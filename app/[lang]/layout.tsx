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
    <html lang={params.lng}>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}