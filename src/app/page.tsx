const columns = [
  {
    title: "Planned", dot: "bg-blue-500",
    items: [
      { title: "Different icon", votes: 2, comments: 2, tags: ["feature"] },
      { title: "Recommendations as a quota", votes: 3, comments: 1, tags: ["feature"] },
      { title: "Session claiming policies", votes: 3, comments: 2, tags: ["feature"] },
      { title: "Session channel depending on type", votes: 1, comments: 1, tags: ["feature"] },
      { title: "Manager information", votes: 2, comments: 1, tags: ["feature"] },
    ],
  },
  {
    title: "In progress", dot: "bg-amber-500",
    items: [
      { title: "Remote banning", votes: 3, comments: 2, tags: ["feature", "integration"] },
      { title: "Multiple session announcement channels", votes: 2, comments: 2, tags: ["feature", "integration"] },
      { title: "Player logging", votes: 1, comments: 3, tags: ["feature"] },
    ],
  },
  {
    title: "Complete", dot: "bg-green-500",
    items: [
      { title: "Views", votes: 0, comments: 3, tags: ["feature"] },
      { title: "Trusted groups images", votes: 2, comments: 4, tags: ["other"] },
      { title: "Session roles locked to group ranks", votes: 2, comments: 1, tags: ["feature"] },
      { title: "Recommendations to only allow recognised users", votes: 2, comments: 2, tags: ["feature"] },
      { title: "Over percentage", votes: 3, comments: 2, tags: ["feature"] },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors">
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="flex sm:flex-row flex-col items-start justify-between mb-10">
          <div>
            <h1 className="text-[20px] font-medium text-black dark:text-white tracking-tight mb-1">
              Upcoming ideas
            </h1>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 grid-cols-1 sm gap-4">
          {columns.map((col) => (
            <div
              key={col.title}
              className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/60 rounded-xl p-5"
            >
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-neutral-100 dark:border-neutral-800/60">
                <div className="flex items-center gap-2 text-[12px] font-medium text-neutral-500 dark:text-neutral-500">
                  <span className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                  {col.title}
                </div>
                <span className="text-[11px] text-neutral-300 dark:text-neutral-700">
                  {col.items.length}
                </span>
              </div>

              <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {col.items.map((item, i) => (
                  <div key={i} className="group py-3 first:pt-0 last:pb-0 cursor-pointer">
                    <p className="text-[13px] text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white leading-snug mb-1.5 transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[11px] text-neutral-300 dark:text-neutral-700">
                        <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="1,8 5,2 9,8"/>
                        </svg>
                        {item.votes}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-neutral-300 dark:text-neutral-700">
                        <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 1h8v6H7l-2 2v-2H1z"/>
                        </svg>
                        {item.comments}
                      </span>
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-neutral-400 dark:text-neutral-700 border border-neutral-200 dark:border-neutral-800 px-1.5 py-px rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}