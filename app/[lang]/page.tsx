'use client';                       

import Link from 'next/link'
import { getDictionary, Locale } from './dictionaries'
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({params} : { params: { lang : Locale } }) {
  const router = useRouter();
  const pathname = usePathname();

  const [dict, setDict] = useState<any>(null);


  useEffect(() => {
    const fetchDictionary = async () => {
      const dict = await getDictionary(params.lang);
      setDict(dict);
    }

    fetchDictionary();
  }, [params.lang])

  function handleSwitchToEnglish() {
    Cookies.set('lang', 'en', {expires: new Date('9999-12-31')});
    // window.location.reload();
    // router.refresh();
    console.log(pathname.split('/'))
    const splittedPathname = pathname.split('/');
    splittedPathname[1] = 'en';
    const newPathname = splittedPathname.join('/');
    console.log(newPathname)
    router.replace(newPathname);
    router.refresh();
  }
  
  function handleSwitchToIndonesian() {
    Cookies.set('lang', 'id', {expires: new Date('9999-12-31')});
    // window.location.reload();
    // router.refresh();

    console.log(pathname.split('/'))
    const splittedPathname = pathname.split('/');
    splittedPathname[1] = 'id';
    const newPathname = splittedPathname.join('/');
    console.log(newPathname)
    router.replace(newPathname);
    router.refresh();
  }

  if (!dict) {
    return <div>loading...</div>
  }

  return (
    <>
      <h1>{dict.homePage.title}</h1>
      <p>lang: {params.lang}</p>
      <Link href={`/second-page`}>
        second page
      </Link>
      <br />
      <button onClick={handleSwitchToEnglish}>switch to english</button>
      <br />
      <button onClick={handleSwitchToIndonesian}>switch to indonesian</button>
    </>
  )
}