"use client";

import Image from "next/image";

interface ImageCollagePreviewProps {
  imageUrls: string[];
  platformLabel?: string;
}

export function ImageCollagePreview({ imageUrls }: ImageCollagePreviewProps) {
  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted text-muted-foreground">
        <p className="text-sm">Nenhuma imagem</p>
      </div>
    );
  }

  const displayImages = imageUrls.slice(0, 4);
  const hasMore = imageUrls.length > 4;

  if (displayImages.length === 1) {
    return (
      <div className="rounded-lg border border-border overflow-hidden w-full h-full">
        <div className="relative w-full h-full bg-muted">
          <Image
            src={displayImages[0]}
            alt="Preview 1"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    );
  }

  if (displayImages.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-1 rounded-lg border border-border overflow-hidden w-full h-full">
        {displayImages.map((url, idx) => (
          <div key={idx} className="relative w-full h-full bg-muted">
            <Image
              src={url}
              alt={`Preview ${idx + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>
    );
  }

  if (displayImages.length === 3) {
    return (
      <div className="rounded-lg border border-border overflow-hidden w-full h-full flex flex-col gap-1">
        <div className="relative flex-1 w-full bg-muted">
          <Image
            src={displayImages[0]}
            alt="Preview 1"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex gap-1 w-full flex-1">
          {displayImages.slice(1).map((url, idx) => (
            <div key={idx} className="relative flex-1 bg-muted">
              <Image
                src={url}
                alt={`Preview ${idx + 2}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-1 rounded-lg border border-border overflow-hidden w-full h-full">
      {displayImages.map((url, idx) => (
        <div key={idx} className="relative w-full h-full bg-muted">
          <Image
            src={url}
            alt={`Preview ${idx + 1}`}
            fill
            className="object-cover"
            unoptimized
          />
          {idx === 3 && hasMore && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="text-lg font-bold text-white">
                +{imageUrls.length - 4}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
