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
    <div className="min-h-[90vh] bg-[#181818] rounded-2xl shadow-xl px-4 py-12 flex flex-col items-center mt-8 mb-8">
      {/* Back to Dashboard Button */}
      <div className="w-full max-w-3xl mb-8 flex justify-start">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#ffd600] text-[#181818] font-bold shadow-lg hover:bg-[#ffe066] transition-all border-2 border-[#ffd600] text-lg"
        >
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to Dashboard
        </Link>
      </div>
      {/* Mood Image */}
      {entry.moodImageUrl && (
        <div className="relative h-[40vh] w-full max-w-3xl rounded-2xl overflow-hidden shadow-lg mb-8 border border-[#ffd60033]">
          <Image
            src={entry.moodImageUrl}
            alt="Mood visualization"
            className="object-cover"
            fill
            priority
          />
        </div>
      )}
      <div className="w-full max-w-3xl bg-[#232323] rounded-2xl shadow-lg p-8 border border-[#ffd60033] space-y-8">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-extrabold text-[#ffd600] drop-shadow-lg">{entry.title}</h1>
            </div>
            {/* AI Summary Section */}
            {summary && (
              <p className="text-[#ffd600]/80 italic mt-2">{summary}</p>
            )}
            <p className="text-[#fffbe6]/60 mt-1">
              Created {format(new Date(entry.createdAt), "PPP")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <EditButton entryId={id} />
            <DeleteDialog entryId={id} />
          </div>
        </div>
        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-4">
          {entry.collection && (
            <Link href={`/collection/${entry.collection.id}`}>
              <Badge className="bg-[#ffd600]/20 text-[#ffd600] border-[#ffd600]">Collection: {entry.collection.name}</Badge>
            </Link>
          )}
          <Badge
            variant="outline"
            style={{
              backgroundColor: `var(--${mood?.color}-50, #fffbe6)` ,
              color: `var(--${mood?.color}-700, #ffd600)` ,
              borderColor: `var(--${mood?.color}-200, #ffd600)` ,
            }}
            className="border-2"
          >
            Feeling {mood?.label}
          </Badge>
        </div>
        {/* Content Section */}
        <div className="prose prose-invert max-w-none text-[#fffbe6] bg-[#232323] rounded-xl p-6 border border-[#ffd60033] shadow-inner" dangerouslySetInnerHTML={{ __html: entry.content }} />
      </div>
    </div>
  );
}