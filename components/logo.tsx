import Link from "next/link"

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 shadow-md">
        <span className="text-lg font-bold text-white">DF</span>
      </div>
      <h1 className="text-2xl font-bold text-red-600">DAILYFLIP</h1>
    </Link>
  )
}

