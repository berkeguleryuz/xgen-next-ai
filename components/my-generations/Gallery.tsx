"use client";
import { Tables } from "@/database.types";
import Image from "next/image";
import React, { useState } from "react";
import { Download, Trash, X, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { deleteImage } from "@/utils/image-actions";
import Link from "next/link";

type ImageProps = {
  url: string | undefined;
} & Tables<"generated_images">;

interface GalleryProps {
  images: ImageProps[];
  onImageDeleted?: (deletedImageId: number) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const Gallery = ({ images, onImageDeleted }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const openModal = (image: ImageProps) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
    setShowDeleteDialog(false);
    setDeleteError(null);
  };

  const downloadImage = async (image: ImageProps, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    if (!image.url || downloading) return;

    try {
      setDownloading(true);

      const fileExtension =
        image.output_format ||
        image.url.split(".").pop()?.toLowerCase() ||
        "png";

      const promptText = image.prompt
        ? image.prompt.slice(0, 30).replace(/[^a-z0-9]/gi, "_")
        : "image";
      const filename = `xgen_${promptText}_${new Date(
        image.created_at,
      ).getTime()}.${fileExtension}`;

      const response = await fetch(image.url);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Error downloading image");
    } finally {
      setDownloading(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
    setDeleteError(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedImage || deleting) return;

    try {
      setDeleting(true);
      setDeleteError(null);

      const { error, success } = await deleteImage(Number(selectedImage.id));

      if (error) {
        setDeleteError("Failed to delete image. Please try again.");
        toast.error("Error deleting image");
      } else if (success) {
        toast.success("Image deleted successfully");
        if (onImageDeleted) {
          onImageDeleted(Number(selectedImage.id));
        } else {
          window.location.reload();
        }
        closeModal();
      } else {
        toast.error("An error occurred while deleting the image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      setDeleteError("An error occurred while deleting the image.");
      toast.error("An error occurred while deleting the image");
    } finally {
      setDeleting(false);
    }
  };

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-2">
        <p className="text-2xl font-bold">No images generated yet</p>
        <p className="text-sm text-gray-500">
          Generate an image to get started
        </p>
        <Link
          href="/generate-image"
          className="text-lime-500 border border-lime-500/30 px-4 py-2 rounded-md hover:text-lime-400 hover:bg-lime-500/10 transition-all duration-300">
          Generate an image
        </Link>
      </div>
    );
  }
  return (
    <section className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group border border-lime-500/10 rounded-md cursor-pointer overflow-hidden transition-all duration-500 hover:border-lime-400/50 hover:shadow-[0_0_25px_rgba(132,204,22,0.15)]"
            onClick={() => openModal(image)}>
            <div className="relative h-[250px] w-full overflow-hidden rounded-md">
              <Image
                src={image.url || ""}
                alt={image.prompt || ""}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-[1.1] group-hover:saturate-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 line-clamp-2">
                  {image.prompt &&
                    (image.prompt.includes("photo of a") &&
                    image.prompt.includes("CLDRN")
                      ? image.prompt.replace(
                          /photo of a (CLDRN|[A-Za-z]+) (man|woman|character)?,\s*/i,
                          "",
                        )
                      : image.prompt)}
                </p>
                <div className="flex justify-between items-center mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  <p className="text-white/80 text-xs">
                    {formatDate(image.created_at)}
                  </p>
                  <button
                    className={`bg-lime-500/80 hover:bg-lime-500 text-black p-1.5 rounded-full transition-colors ${
                      downloading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={(e) => downloadImage(image, e)}
                    disabled={downloading}>
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
          onClick={closeModal}>
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-0 right-0 z-10 flex flex-col-reverse gap-2 bg-black/50 backdrop-blur-lg rounded-lg p-2">
              <button
                className="p-2 bg-black/50 border border-lime-500/50 rounded-full text-white transition-colors hover:bg-red-500/50"
                onClick={handleDeleteClick}
                disabled={deleting}>
                <Trash size={24} className={deleting ? "animate-pulse" : ""} />
              </button>
              <button
                className="p-2 bg-black/50 border border-lime-500/50 rounded-full text-white transition-colors hover:bg-lime-500/50"
                onClick={(e) => downloadImage(selectedImage, e)}
                disabled={downloading}>
                <Download
                  size={24}
                  className={downloading ? "animate-pulse" : ""}
                />
              </button>

              <button
                className="p-2 bg-black/50 border border-lime-500/50 rounded-full text-white transition-colors hover:bg-lime-500/50"
                onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage.url || ""}
                alt={selectedImage.prompt || ""}
                width={selectedImage.width || 512}
                height={selectedImage.height || 512}
                className="object-contain max-h-[90vh]"
              />
            </div>
            <div className="absolute bottom-4 left-0 right-0 bg-black/70 p-4 text-white text-center">
              <p className="text-sm mb-1">
                {selectedImage.prompt &&
                  (selectedImage.prompt.includes("photo of a") &&
                  selectedImage.prompt.includes("CLDRN")
                    ? selectedImage.prompt.replace(
                        /photo of a (CLDRN|[A-Za-z]+) (man|woman|character)?,\s*/i,
                        "",
                      )
                    : selectedImage.prompt)}
              </p>
              <p className="text-xs text-gray-300">
                {formatDate(selectedImage.created_at)} •{selectedImage.width}×
                {selectedImage.height}px
              </p>
            </div>

            {showDeleteDialog && (
              <div
                className="absolute inset-0 bg-black/70 flex items-center justify-center z-20"
                onClick={(e) => e.stopPropagation()}>
                <div className="bg-black/50 backdrop-blur-lg border border-lime-500/30 rounded-lg p-6 max-w-md w-full mx-4">
                  <div className="flex items-center gap-3 mb-4 text-red-500">
                    <AlertTriangle size={24} />
                    <h3 className="text-xl font-bold">Delete Image</h3>
                  </div>

                  <p className="text-white mb-6">
                    Are you sure you want to delete this image? This action
                    cannot be undone.
                  </p>

                  {deleteError && (
                    <div className="bg-red-900/30 border border-red-500/50 rounded p-3 mb-4 text-red-200 text-sm">
                      {deleteError}
                    </div>
                  )}

                  <div className="flex justify-end gap-3">
                    <button
                      className="font-semibold leading-tight tracking-wider text-white px-8 py-2 rounded-md bg-lime-500/10 border border-lime-500 hover:bg-transparent transition-all duration-300 mx-auto text-center"
                      onClick={() => setShowDeleteDialog(false)}
                      disabled={deleting}>
                      Cancel
                    </button>
                    <button
                      className={`font-semibold leading-tight tracking-wider text-white px-8 py-2 rounded-md bg-red-500/10 border border-red-500 hover:bg-transparent transition-all duration-300 mx-auto text-center ${
                        deleting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      onClick={handleDeleteConfirm}
                      disabled={deleting}>
                      {deleting ? "Deleting..." : "Delete"}
                      {deleting && <span className="animate-spin">⟳</span>}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
