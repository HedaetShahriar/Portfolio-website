"use client";
import { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';

/*
  ImportProjectsModal
  - Fetches GitHub repos from /api/github/repos (GraphQL aggregated)
  - Allows selecting repos to import as projects
  - Maps fields to your internal project shape
  - Calls onImport(arrayOfProjects)
*/

const languageColor = (name, color) => ({ name, color: color || '#888' });

export default function ImportProjectsModal({ onClose, existingProjects = [], onImport }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);
  const [selected, setSelected] = useState({});
  const [filter, setFilter] = useState('');
  const [includeReadme, setIncludeReadme] = useState(true);

  const existingSlugs = useMemo(() => new Set(existingProjects.map(p => p.name.toLowerCase())), [existingProjects]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/github/repos');
        if (!res.ok) throw new Error('Failed to fetch repos');
        const json = await res.json();
        setRepos(json.repos || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggle = (slug) => setSelected(prev => ({ ...prev, [slug]: !prev[slug] }));

  const filteredRepos = repos.filter(r => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return r.name.toLowerCase().includes(f) || (r.topics || []).some(t => t.toLowerCase().includes(f));
  });

  const anySelected = Object.values(selected).some(Boolean);

  const handleImport = () => {
    const toImport = repos.filter(r => selected[r.slug] && !existingSlugs.has(r.slug));
    if (!toImport.length) return;
    const mapped = toImport.map(r => ({
      name: r.name,
      techStack: r.techStack.join(', '),
      description: r.description || '',
      image: '/placeholder-project.png', // placeholder (add logic later to parse README image)
      liveLink: r.homepageUrl || '#',
      githubLink: r.githubLink,
      challenges: '',
      improvements: '',
      importedFromGithub: true,
      stars: r.stars,
      forks: r.forks,
      updatedAt: r.updatedAt,
      topics: r.topics,
      languages: r.languages,
      readme: includeReadme ? r.readme : ''
    }));
    onImport(mapped);
  };

  if (typeof window === 'undefined') return null;
  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4">
      <div className="bg-gray-900 w-full max-w-5xl rounded-lg shadow-xl flex flex-col max-h-[90vh] z-[1010]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Import Projects from GitHub</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none" aria-label="Close modal">&times;</button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <input
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Filter by name or topic..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={includeReadme} onChange={e => setIncludeReadme(e.target.checked)} />
              Include README text
            </label>
          </div>

          {loading && <p className="text-sm text-gray-400">Loading repositories...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {!loading && !error && (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-800 text-gray-300">
                  <th className="p-2 text-left">Select</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Languages</th>
                  <th className="p-2 text-left">Stars</th>
                  <th className="p-2 text-left">Updated</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRepos.map(repo => {
                  const already = existingSlugs.has(repo.slug);
                  return (
                    <tr key={repo.repoId} className="border-b border-gray-800 hover:bg-gray-800/60">
                      <td className="p-2 align-top">
                        {already ? (
                          <span className="text-xs text-gray-500">Imported</span>
                        ) : (
                          <input
                            type="checkbox"
                            checked={!!selected[repo.slug]}
                            onChange={() => toggle(repo.slug)}
                            aria-label={`Select ${repo.name}`}
                          />
                        )}
                      </td>
                      <td className="p-2 align-top w-56">
                        <div className="font-medium text-white flex items-center gap-2">
                          <span>{repo.name}</span>
                          {repo.archived && <span className="text-xs bg-yellow-600/20 text-yellow-400 px-1.5 py-0.5 rounded">Archived</span>}
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-3 mt-1">{repo.description || 'No description.'}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {(repo.topics || []).slice(0,4).map(t => (
                            <span key={t} className="text-[10px] px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-gray-300">{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-2 align-top">
                        <div className="flex flex-wrap gap-1">
                          {(repo.languages || []).slice(0,3).map(l => (
                            <span key={l.name} className="text-[10px] px-1 py-0.5 rounded" style={{ background: l.color + '22', color: l.color }}>
                              {l.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-2 align-top text-center text-gray-300">{repo.stars}</td>
                      <td className="p-2 align-top text-xs text-gray-400 whitespace-nowrap">{new Date(repo.updatedAt).toLocaleDateString()}</td>
                      <td className="p-2 align-top text-xs text-gray-400">{already ? 'Existing' : 'New'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-gray-700 bg-gray-850">
          <p className="text-xs text-gray-400">{Object.values(selected).filter(Boolean).length} selected</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm">Cancel</button>
            <button
              onClick={handleImport}
              disabled={!anySelected}
              className={`px-4 py-2 rounded text-sm font-medium ${anySelected ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
            >
              Import Selected
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
