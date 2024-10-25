import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
 
let locales = ['id', 'en']
 
// Get the preferred locale, similar to the above or using a library
function getLocale(request : NextRequest) {

  const headers : any = {};
  request.headers.forEach((value : any, key : any) => {
    headers[key] = value;
  });

  const negotiator = new Negotiator({headers});
  const preferredLanguages = negotiator.languages();

  console.log("Preferred languages: ", preferredLanguages);
  

  for (const lang of preferredLanguages) {
    if (locales.includes(lang)) {
      return lang;
    }
  }

  return 'en';
}
 
export function middleware(request : NextRequest) {
  // check if there is a cookie for the preferred locale
  const storedPrefferedLocale = request.cookies.get('lang');


  // Check if there is any supported locale in the pathname

  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // return when path already has a locale and its mathed with the stored preferred locale
  if (pathnameHasLocale) {
    console.log('pathname has locale');
    const currentLocale = pathname.split('/')[1];
    if (storedPrefferedLocale?.value == currentLocale) return;
  }

  console.log('pathname has already local but not matched with stored preferred locale')

  
  
  // console.log("Stored preferred locale: ", storedPrefferedLocale);
  if (storedPrefferedLocale) {
    if (pathnameHasLocale) {
      // replace the locale in the pathname with the stored preferred locale
      
      const splittedPathname = request.nextUrl.pathname.split('/');
      console.log("Splitted pathname: ", splittedPathname)
      splittedPathname[1] = storedPrefferedLocale.value;
      const newPathname = splittedPathname.join('/');
      console.log("New pathname: ", newPathname)
      
      return NextResponse.redirect(request.nextUrl.origin + newPathname);
    }


    const redirectUrl = '/' + storedPrefferedLocale.value + request.nextUrl.pathname ;

    return NextResponse.redirect(request.nextUrl.origin + redirectUrl);
  }





  // Redirect if there is no locale in the pathname
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en/products
  const response = NextResponse.redirect(request.nextUrl);
  // set cookies for the locale
  response.cookies.set('lang', locale, {expires: new Date('9999-12-31')});
  return response;



  
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}