const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Updates"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    title: "Support",
    links: ["Help Center", "Guides", "API", "Status"],
  },
];

export function Footer() {
  return (
    <footer id="about" className="scroll-mt-20 px-5 pb-10 pt-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-10 border-b border-zinc-200 pb-10 sm:flex-row">
          <div>
            <p className="text-lg font-semibold text-zinc-900">retailo</p>
            <p className="mt-2 max-w-xs text-sm text-zinc-500">
              The operating system for modern retail stores.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-10">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-semibold text-zinc-900">{column.title}</p>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase()}`} className="text-sm text-zinc-500 hover:text-zinc-800">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-8 select-none text-[18vw] font-semibold leading-none tracking-tight text-brand-lime sm:text-[140px] lg:text-[180px]">
          retailo
        </p>
      </div>
    </footer>
  );
}
