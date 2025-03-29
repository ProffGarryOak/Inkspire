import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import DeleteDialog from "./_components/delete-dialog";
import EditButton from "./_components/edit-button";
import { getMoodById } from "@/app/lib/moods";
import { getJournalEntry } from "@/actions/journal";
import { generateEntrySummary } from "@/lib/gemini"; // Your Gemini utility function

export default async function JournalEntryPage({ params }) {
  const { id } = await params;
  const entry = await getJournalEntry(id);
  const mood = getMoodById(entry.mood);
  let summary = null;
  try {
    summary = await generateEntrySummary(entry.content);
  } catch (error) {
    console.error("Failed to generate summary:", error);
  }

  return (
    <>
      {/* Header with Mood Image */}
      {entry.moodImageUrl && (
        <div className="relative h-[50vh] w-full">
          <Image
            src={entry.moodImageUrl}
            alt="Mood visualization"
            className="object-cover"
            fill
            priority
          />
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-5xl font-bold text-[#1c1c1c]">
                  {entry.title}
                </h1>
              </div>
              {/* AI Summary Section */}
              {summary && (
                <p className="text-[#b33a3a]/80 italic">
                   {summary}
                </p>
              )}
              <p className="text-[#1c1c1c]/60">
                Created {format(new Date(entry.createdAt), "PPP")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <EditButton entryId={id} />
              <DeleteDialog entryId={id} />
            </div>
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2">
            {entry.collection && (
              <Link href={`/collection/${entry.collection.id}`}>
                <Badge>Collection: {entry.collection.name}</Badge>
              </Link>
            )}
            <Badge
              variant="outline"
              style={{
                backgroundColor: `var(--${mood?.color}-50)`,
                color: `var(--${mood?.color}-700)`,
                borderColor: `var(--${mood?.color}-200)`,
              }}
            >
              Feeling {mood?.label}
            </Badge>
          </div>
        </div>

        <hr className="border-[#1c1c1c]/10" />

        {/* Content Section */}
        <div className="ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        </div>

        {/* Footer */}
        <div className="text-sm text-[#1c1c1c]/60 pt-4 border-t border-[#1c1c1c]/10">
          Last updated {format(new Date(entry.updatedAt), "PPP 'at' p")}
        </div>
      </div>
    </>
  );
}