export const dynamic = "force-dynamic";
import { getCollections } from "@/actions/collection";
import { getJournalEntries } from "@/actions/journal";
import MoodAnalytics from "./_components/mood-analytics";
import Collections from "./_components/collections";

const Dashboard = async () => {
  const collections = await getCollections();
  const entriesData = await getJournalEntries();

  const entriesByCollection = entriesData?.data?.entries?.reduce(
    (acc, entry) => {
      const collectionId = entry.collectionId || "unorganized";
      if (!acc[collectionId]) {
        acc[collectionId] = [];
      }
      acc[collectionId].push(entry);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-[90vh] bg-[#181818] rounded-2xl shadow-xl px-4 py-12 flex flex-col gap-12 items-center mt-8 mb-8">
      <section className="w-full max-w-5xl bg-[#232323] rounded-2xl shadow-lg p-8 border border-[#ffd60033] mb-8">
        <h1 className="text-4xl font-extrabold text-[#ffd600] mb-6 drop-shadow-lg text-center">Dashboard</h1>
        <MoodAnalytics />
      </section>
      <section className="w-full max-w-5xl bg-[#232323] rounded-2xl shadow-lg p-8 border border-[#ffd60033]">
        <Collections
          collections={collections}
          entriesByCollection={entriesByCollection}
        />
      </section>
    </div>
  );
};

export default Dashboard;