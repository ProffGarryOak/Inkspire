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
      toast.success(`Collection "${createdCollection.name}" created!`);
    }
  }, [createdCollection]);

  const handleCreateCollection = async (data) => {
    await createCollectionFn(data);
  };

  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title my-12 text-[#b33a3a]">
        Collections
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Collection Button */}
        {/* <CollectionPreview
          isCreateNew={true}
          onCreateNew={() => setIsCollectionDialogOpen(true)}
        /> */}

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
