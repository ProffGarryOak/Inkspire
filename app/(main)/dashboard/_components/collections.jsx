"use client";

import React, { useState, useEffect } from "react";
import { createCollection } from "@/actions/collection";
import { toast } from "sonner";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-form";
import useFetch from "@/hooks/use-fetch";

const Collections = ({ collections = [], entriesByCollection = {} }) => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);

  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

  useEffect(() => {
    if (createdCollection) {
      setIsCollectionDialogOpen(false);
      toast.success(`Collection \"${createdCollection.name}\" created!`);
    }
  }, [createdCollection]);

  const handleCreateCollection = async (data) => {
    await createCollectionFn(data);
  };

  return (
    <section id="collections" className="space-y-8">
      <h2 className="text-4xl font-extrabold gradient-title my-12 text-[#ffd600] drop-shadow-lg text-center tracking-tight">
        Collections
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Always show Unorganized collection */}
        <CollectionPreview
          name="Unbound Entries"
          entries={entriesByCollection.unorganized || []}
          isUnorganized={true}
        />
        {/* Show all collections, even empty ones */}
        {collections.map((collection) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.name}
            entries={entriesByCollection[collection.id] || []}
          />
        ))}
        {/* Creative Add New Collection Card */}
        <button
          onClick={() => setIsCollectionDialogOpen(true)}
          className="group relative h-[240px] w-full cursor-pointer border-2 border-dashed border-[#ffd600] rounded-2xl flex flex-col items-center justify-center bg-[#232323] hover:bg-[#ffd600]/10 transition-all shadow-lg"
        >
          <span className="text-5xl text-[#ffd600] mb-2">+</span>
          <span className="text-[#ffd600] font-semibold text-lg">Create New Collection</span>
        </button>
        <CollectionForm
          loading={createCollectionLoading}
          onSuccess={handleCreateCollection}
          open={isCollectionDialogOpen}
          setOpen={setIsCollectionDialogOpen}
        />
      </div>
    </section>
  );
};

export default Collections;
