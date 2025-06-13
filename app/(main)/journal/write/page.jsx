"use client";
import {
  PenLine,
  Edit,
  Bookmark,
  AlertCircle,
  Smile,
  MessageSquare,
  FolderPlus, PlusCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createJournalEntry,
  updateJournalEntry,
  getJournalEntry,
  getDraft,
  saveDraft,
} from "@/actions/journal";
import { createCollection, getCollections } from "@/actions/collection";
import { getMoodById, MOODS } from "@/app/lib/moods";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import { journalSchema } from "@/app/lib/schemas";
import "react-quill-new/dist/quill.snow.css";
import CollectionForm from "@/components/collection-form";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function JournalEntryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch Hooks
  const {
    loading: collectionsLoading,
    data: collections,
    fn: fetchCollections,
  } = useFetch(getCollections);

  const {
    loading: entryLoading,
    data: existingEntry,
    fn: fetchEntry,
  } = useFetch(getJournalEntry);

  const {
    loading: draftLoading,
    data: draftData,
    fn: fetchDraft,
  } = useFetch(getDraft);

  const { loading: savingDraft, fn: saveDraftFn } = useFetch(saveDraft);

  const {
    loading: actionLoading,
    fn: actionFn,
    data: actionResult,
  } = useFetch(isEditMode ? updateJournalEntry : createJournalEntry);

  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });

  // Handle draft or existing entry loading
  useEffect(() => {
    fetchCollections();
    if (editId) {
      setIsEditMode(true);
      fetchEntry(editId);
    } else {
      setIsEditMode(false);
      fetchDraft();
    }
  }, [editId]);

  // Handle setting form data from draft
  useEffect(() => {
    if (isEditMode && existingEntry) {
      reset({
        title: existingEntry.title || "",
        content: existingEntry.content || "",
        mood: existingEntry.mood || "",
        collectionId: existingEntry.collectionId || "",
      });
    } else if (draftData?.success && draftData?.data) {
      reset({
        title: draftData.data.title || "",
        content: draftData.data.content || "",
        mood: draftData.data.mood || "",
        collectionId: "",
      });
    } else {
      reset({
        title: "",
        content: "",
        mood: "",
        collectionId: "",
      });
    }
  }, [draftData, isEditMode, existingEntry]);

  // Handle collection creation success
  useEffect(() => {
    if (createdCollection) {
      setIsCollectionDialogOpen(false);
      fetchCollections();
      setValue("collectionId", createdCollection.id);
      toast.success(`Collection ${createdCollection.name} created!`);
    }
  }, [createdCollection]);

  // Handle successful submission
  useEffect(() => {
    if (actionResult && !actionLoading) {
      // Clear draft after successful publish
      if (!isEditMode) {
        saveDraftFn({ title: "", content: "", mood: "" });
      }

      router.push(
        `/collection/${
          actionResult.collectionId ? actionResult.collectionId : "unorganized"
        }`
      );

      toast.success(
        `Entry ${isEditMode ? "updated" : "created"} successfully!`
      );
    }
  }, [actionResult, actionLoading]);

  const onSubmit = handleSubmit(async (data) => {
    const mood = getMoodById(data.mood);
    actionFn({
      ...data,
      moodScore: mood.score,
      moodQuery: mood.pixabayQuery,
      ...(isEditMode && { id: editId }),
    });
  });

  const formData = watch();

  const handleSaveDraft = async () => {
    if (!isDirty) {
      toast.error("No changes to save");
      return;
    }
    const result = await saveDraftFn(formData);
    if (result?.success) {
      toast.success("Draft saved successfully");
    }
  };

  const handleCreateCollection = async (data) => {
    createCollectionFn(data);
  };

  const isLoading =
    collectionsLoading ||
    entryLoading ||
    draftLoading ||
    actionLoading ||
    savingDraft;

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center min-h-[90vh] bg-[#181818] rounded-2xl shadow-xl mt-8 mb-8">
      <form onSubmit={onSubmit} className="w-full max-w-2xl bg-[#232323] rounded-2xl shadow-lg p-8 space-y-8 border border-[#ffd60033]">
        <h1 className="text-4xl font-extrabold text-[#ffd600] flex items-center gap-3 mb-6 drop-shadow-lg">
          {isEditMode ? (
            <>
              <Edit className="h-8 w-8" />
              Edit Entry
            </>
          ) : (
            <>
              <PenLine className="h-8 w-8" />
              What's on your mind?
            </>
          )}
        </h1>
        {isLoading && (
          <BarLoader className="mb-4" width={"100%"} color="#ffd600" />
        )}
        <div className="space-y-2 mt-6">
          <label className="text-sm font-semibold text-[#ffd600] flex items-center gap-2">
            <Smile className="h-4 w-4 text-[#ffd600]" />
            How are you feeling?
          </label>
          <Controller
            name="mood"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={`text-[#181818] bg-[#fffbe6] border-[#ffd600] focus:border-[#ffd600] focus:ring-[#ffd600]/50 ${errors.mood ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select a mood..." />
                </SelectTrigger>
                <SelectContent className="border-[#ffd600] bg-[#232323] text-[#ffd600]">
                  {Object.values(MOODS).map((mood) => (
                    <SelectItem
                      key={mood.id}
                      value={mood.id}
                      className="hover:bg-[#ffd600]/10 focus:bg-[#ffd600]/10"
                    >
                      <span className="flex items-center gap-2">
                        {mood.emoji} {mood.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.mood && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.mood.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#ffd600] flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-[#ffd600]" />
            Title
          </label>
          <Input
            disabled={isLoading}
            {...register("title")}
            placeholder="Give your entry a title..."
            className={`py-4 bg-[#fffbe6] text-[#181818] border-[#ffd600] focus:border-[#ffd600] focus:ring-[#ffd600]/50 ${errors.title ? "border-red-500" : ""}`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#ffd600] flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#ffd600]" />
            {getMoodById(getValues("mood"))?.prompt ?? "Write your thoughts..."}
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                readOnly={isLoading}
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    ["link"],
                    ["clean"],
                  ],
                }}
                className="bg-[#fffbe6] text-[#181818] rounded-lg border border-[#ffd600] min-h-[180px]"
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#ffd600] flex items-center gap-2">
            <FolderPlus className="h-4 w-4 text-[#ffd600]" />
            Add to Collection (Optional)
          </label>
          <Controller
            name="collectionId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  if (value === "new") {
                    setIsCollectionDialogOpen(true);
                  } else {
                    field.onChange(value);
                  }
                }}
                value={field.value}
              >
                <SelectTrigger className="text-[#181818] border-[#ffd600] bg-[#fffbe6] focus:border-[#ffd600] focus:ring-[#ffd600]/50">
                  <SelectValue placeholder="Choose a collection..." />
                </SelectTrigger>
                <SelectContent className="border-[#ffd600] bg-[#232323] text-[#ffd600]">
                  {collections?.map((collection) => (
                    <SelectItem
                      key={collection.id}
                      value={collection.id}
                      className="hover:bg-[#ffd600]/10 focus:bg-[#ffd600]/10"
                    >
                      {collection.name}
                    </SelectItem>
                  ))}
                  <SelectItem
                    value="new"
                    className="hover:bg-[#ffd600]/10 focus:bg-[#ffd600]/10"
                  >
                    <span className="flex items-center gap-2 text-[#ffd600]">
                      <PlusCircle className="h-4 w-4" />
                      Create New Collection
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex gap-4 mt-6">
          {!isEditMode && (
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={savingDraft || !isDirty}
              className="border-[#ffd600] text-[#ffd600] hover:bg-[#ffd600]/10 hover:text-[#ffd600] disabled:opacity-50"
            >
              {savingDraft && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save as Draft
            </Button>
          )}
          <Button
            type="submit"
            disabled={actionLoading || !isDirty}
            className="bg-[#ffd600] hover:bg-[#ffe066] text-[#181818] font-bold shadow-md px-8 py-3 rounded-full disabled:opacity-50"
          >
            {actionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditMode ? "Update" : "Publish"}
          </Button>
          {isEditMode && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/journal/${existingEntry.id}`);
              }}
              variant="destructive"
              className="bg-[#232323] text-[#ffd600] border border-[#ffd600] hover:bg-[#ffd600] hover:text-[#181818]"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
      <CollectionForm
        loading={createCollectionLoading}
        onSuccess={handleCreateCollection}
        open={isCollectionDialogOpen}
        setOpen={setIsCollectionDialogOpen}
      />
    </div>
  );
}
