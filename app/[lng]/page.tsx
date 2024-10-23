import Link from 'next/link'

export default function Page({ params } : { params: { lng : string } }) {
  return (
    <>
      <h1>Hi there!</h1>
      <Link href={`/${params.lng}/second-page`}>
        second page
      </Link>
    </>
  )
}