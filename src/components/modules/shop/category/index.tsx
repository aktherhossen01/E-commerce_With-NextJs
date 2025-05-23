"use client";

import { ICategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteCategory } from "@/services/Category";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";
import CreateCategoryModal from "./CreateCategoryModel";
import { NMTable } from "@/components/ui/core/NMtable";

type TCategoriesProps = {
  categories?: ICategory[]; // optional, handle safely
};

const ManageCategories = ({ categories = [] }: TCategoriesProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: ICategory) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteCategory(selectedId);
        if (res?.success) {
          toast.success(res.message || "Deleted successfully!");
          setModalOpen(false);
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: () => <div>Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.icon || "/placeholder.png"} // fallback image
            alt={row.original.name || "category"}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full object-contain"
          />
          <span className="truncate">{row.original.name || "Unnamed"}</span>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => <div>isActive</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Categories</h1>
        <CreateCategoryModal />
      </div>

      {/* Fallback to empty array if undefined */}
      <NMTable data={categories || []} columns={columns} />

      <DeleteConfirmationModal
        name={selectedItem || ""}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageCategories;
