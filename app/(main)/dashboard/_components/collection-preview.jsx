"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Plus, Folder, FolderArchive } from "lucide-react";
import { getMoodById } from "@/app/lib/moods";

const colorSchemes = {
  unorganized: {
    bg: "bg-[#f8e8e8] hover:bg-[#f5e0e0]", // Light red background
    tab: "bg-[#b33a3a] group-hover:bg-[#a03535]", // Primary red tab
  },
  collection: {
    bg: "bg-[#f0f0f0] hover:bg-[#e8e8e8]", // Light gray background
    tab: "bg-[#1c1c1c]/80 group-hover:bg-[#1c1c1c]", // Dark gray tab
  },
  createCollection: {
    bg: "bg-[#f5f5f5] hover:bg-[#eeeeee]", // Lightest gray background
    tab: "bg-[#1c1c1c]/60 hover:bg-[#1c1c1c]/80", // Lighter gray tab
  },
};

const FolderTab = ({ colorClass }) => (
  <div
    className={`absolute inset-x-4 -top-2 h-2 rounded-t-md transform -skew-x-6 transition-colors ${colorClass}`}
  />
);

const EntryPreview = ({ entry }) => (
  <div className="bg-white/70 p-2 rounded text-sm truncate border border-[#1c1c1c]/10">
    <span className="mr-2">{getMoodById(entry.mood)?.emoji}</span>
    <span className="text-[#1c1c1c]">{entry.title}</span>
  </div>
);

const CollectionPreview = ({
  id,
  name,
  entries = [],
  isUnorganized = false,
  isCreateNew = false,
  onCreateNew,
}) => {
  if (isCreateNew) {
    return (
      <button
        onClick={onCreateNew}
        className="group relative h-[240px] w-full cursor-pointer"
      >
        <FolderTab colorClass={colorSchemes["createCollection"].tab} />
        <div
          className={`relative h-full rounded-lg p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-4 ${colorSchemes["createCollection"].bg}`}
        >
          <div className="h-12 w-12 rounded-full bg-[#1c1c1c]/10 group-hover:bg-[#1c1c1c]/20 flex items-center justify-center">
            <Plus className="h-6 w-6 text-[#1c1c1c]" />
          </div>
          <p className="text-[#1c1c1c] font-medium">Create New Collection</p>
        </div>
      </button>
    );
  }

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
        className={`relative h-full rounded-lg p-6 shadow-md hover:shadow-lg transition-all flex flex-col ${
          colorSchemes[isUnorganized ? "unorganized" : "collection"].bg
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          {isUnorganized ? (
            <FolderArchive className="h-6 w-6 text-[#b33a3a]" />
          ) : (
            <Folder className="h-6 w-6 text-[#1c1c1c]" />
          )}
          <p className="text-lg font-semibold truncate text-[#1c1c1c]">
            {name}
          </p>
        </div>
        {/* <div className="flex flex-col flex-grow">
          <div className="flex justify-between text-sm text-[#1c1c1c]/80 mb-2">
            <span>{entries.length} entries</span>
            {entries.length > 0 && (
              <span>
                {formatDistanceToNow(new Date(entries[0].createdAt), {
                  addSuffix: true,
                })}
              </span>
            )}
          </div>
          <div className="space-y-2 overflow-y-auto flex-grow">
            {entries.length > 0 ? (
              entries
                .slice(0, 3)
                .map((entry) => <EntryPreview key={entry.id} entry={entry} />)
            ) : (
              <p className="text-sm text-[#1c1c1c]/60 italic">No entries yet</p>
            )}
          </div>
        </div> */}
        <div className="flex flex-col flex-grow">
  <div className="flex justify-between text-sm text-[#1c1c1c]/80 mb-2">
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
        <p className="text-sm text-[#1c1c1c]/60 italic mb-2">
          No entries yet
        </p>
        <Link 
          href="/journal/write" 
          className="text-xs text-[#b33a3a] hover:underline"
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