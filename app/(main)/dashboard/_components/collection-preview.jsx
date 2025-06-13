"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Plus, Folder, FolderArchive } from "lucide-react";
import { getMoodById } from "@/app/lib/moods";

const colorSchemes = {
  unorganized: {
    bg: "bg-[#232323] hover:bg-[#ffd600]/10 border border-[#ffd600]/30",
    tab: "bg-[#ffd600] group-hover:bg-[#ffd600]/80",
  },
  collection: {
    bg: "bg-[#232323] hover:bg-[#ffd600]/10 border border-[#ffd600]/30",
    tab: "bg-[#ffd600]/80 group-hover:bg-[#ffd600]",
  },
};

const FolderTab = ({ colorClass }) => (
  <div
    className={`absolute inset-x-4 -top-2 h-2 rounded-t-md transform -skew-x-6 transition-colors ${colorClass}`}
  />
);

const EntryPreview = ({ entry }) => (
  <div className="bg-[#181818] p-2 rounded text-sm truncate border border-[#ffd600]/20 flex items-center gap-2">
    <span className="mr-2 text-lg">{getMoodById(entry.mood)?.emoji}</span>
    <span className="text-[#ffd600] font-semibold">{entry.title}</span>
  </div>
);

const CollectionPreview = ({
  id,
  name,
  entries = [],
  isUnorganized = false,
}) => {
  return (
    <Link
      href={`/collection/${isUnorganized ? "unorganized" : id}`}
      className="group relative h-[240px] w-full"
    >
      <FolderTab
        colorClass={
          colorSchemes[isUnorganized ? "unorganized" : "collection"].tab
        }
      />
      <div
        className={`relative h-full rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all flex flex-col border-2 ${
          colorSchemes[isUnorganized ? "unorganized" : "collection"].bg
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          {isUnorganized ? (
            <FolderArchive className="h-7 w-7 text-[#ffd600]" />
          ) : (
            <Folder className="h-7 w-7 text-[#ffd600]" />
          )}
          <p className="text-xl font-bold truncate text-[#ffd600]">
            {name}
          </p>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between text-sm text-[#ffd600]/80 mb-2">
            <span>{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</span>
            {entries.length > 0 ? (
              <span>
                {formatDistanceToNow(new Date(entries[0].createdAt), {
                  addSuffix: true,
                })}
              </span>
            ) : (
              <span>Empty collection</span>
            )}
          </div>
          <div className="space-y-2 overflow-y-auto flex-grow">
            {entries.length > 0 ? (
              entries.slice(0, 3).map((entry) => (
                <EntryPreview key={entry.id} entry={entry} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-sm text-[#ffd600]/60 italic mb-2">
                  No entries yet
                </p>
                <Link 
                  href="/journal/write" 
                  className="text-xs text-[#ffd600] hover:underline"
                >
                  Add your first entry
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionPreview;