'use client'

import Link from 'next/link'
import { getDictionary, Locale } from '../dictionaries'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from '@/app/i18n/client';

export default function Page({params} : { params: { lang : Locale } }) {
  const router = useRouter();
  const pathname = usePathname();

  const { t } = useTranslation(params.lang, 'second-page');

  // const [dict, setDict] = useState<any>(null);


  // useEffect(() => {
  //   const fetchDictionary = async () => {
  //     const dict = await getDictionary(params.lang);
  //     setDict(dict);
  //   }

  //   fetchDictionary();
  // }, [params.lang])

  function handleSwitchToEnglish() {
    // Cookies.set('lang', 'en', {expires: new Date('9999-12-31')});
    // window.location.reload();
    // router.refresh();
    // console.log(pathname.split('/'))
    // const splittedPathname = pathname.split('/');
    // splittedPathname[1] = 'en';
    // const newPathname = splittedPathname.join('/');
    // console.log(newPathname)
    // router.replace(newPathname);
    // router.refresh();

    router.replace(`/en/second-page`);
    router.refresh();
  }
  
  function handleSwitchToIndonesian() {
    // Cookies.set('lang', 'id', {expires: new Date('9999-12-31')});
    // window.location.reload();
    // router.refresh();

    // console.log(pathname.split('/'))
    // const splittedPathname = pathname.split('/');
    // splittedPathname[1] = 'id';
    // const newPathname = splittedPathname.join('/');
    // console.log(newPathname)
    // router.replace(newPathname);
    // router.refresh();

    router.replace(`/id/second-page`);
    router.refresh();
  }
 
  // if (!dict) {
  //   return <div>loading...</div>
  // }

  return (
    <>
      <h1>{t('title')}</h1>
      <p>lang: {params.lang}</p>
      <Link href={`/${params.lang}`}>
        {t('back-to-home')}
      </Link>

      <br /> 
      <button onClick={handleSwitchToEnglish}>switch to english</button>
      <br />
      <button onClick={handleSwitchToIndonesian}>switch to indonesian</button>
    </>
  )
}