import Link from "next/link"

export function Layout({ children }) {
  return (
    <>
      <div className="px-6 mx-auto">
        <header>
          <div className="container flex items-center justify-between py-6 mx-auto">
            <Link href="/" className="text-2xl font-semibold no-underline">
              Pacific Dataviz Challenge
            </Link>
          </div>
        </header>
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  )
}
