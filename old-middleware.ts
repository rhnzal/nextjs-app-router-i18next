import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
 
let headers = { 'accept-language': 'en-US,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en', 'id']
let defaultLocale = 'id'


 
match(languages, locales, defaultLocale) // -> 'en-US'