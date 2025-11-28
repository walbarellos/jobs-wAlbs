// src/app/search/page.tsx
import { searchLinks } from "@/lib/queries";

export default async function SearchPage({ searchParams }) {
  const q = searchParams.q || "";
  const results = q ? await searchLinks(q) : [];

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Buscar</h1>

      <form>
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Buscar links, categorias..."
          className="border p-2 rounded w-full"
        />
      </form>

      {q && (
        <div className="text-sm text-zinc-500">
          {results.length} resultado(s) para <strong>{q}</strong>
        </div>
      )}

      <div className="space-y-3">
        {results.map((item) => (
          <a
            key={item.id}
            href={item.url}
            className="block p-4 rounded border hover:bg-zinc-100"
          >
            <div className="font-semibold">{item.title}</div>
            <div className="text-sm">{item.category}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
