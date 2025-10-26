"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/cropper";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageUploadWithCropperProps {
  value: string[];
  onChange: (imageUrls: string[]) => void;
  disabled?: boolean;
  aspectRatio?: number;
  maxImages?: number;
  platformLabel?: string;
}

export function ImageUploadWithCropper({
  value,
  onChange,
  disabled = false,
  aspectRatio = 1,
  maxImages = 5,
  platformLabel = "Post",
}: ImageUploadWithCropperProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>(value || []);
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(
    null
  );
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [cropArea, setCropArea] = useState<CropArea | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUploadedImages(value || []);
  }, [value]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newImages = [...uploadedImages];
    let filesProcessed = 0;

    fileArray.forEach((file, idx) => {
      if (newImages.length + idx >= maxImages) {
        if (idx === 0) {
          alert(`Limite máximo de ${maxImages} imagens alcançado`);
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        newImages[uploadedImages.length + idx] = result;
        filesProcessed++;

        if (filesProcessed === fileArray.length) {
          setUploadedImages(newImages);
          onChange(newImages);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCrop = () => {
    if (tempImage && cropArea) {
      try {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = cropArea.width;
          canvas.height = cropArea.height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(
              img,
              cropArea.x,
              cropArea.y,
              cropArea.width,
              cropArea.height,
              0,
              0,
              cropArea.width,
              cropArea.height
            );

            const croppedImageUrl = canvas.toDataURL("image/png");

            const newImages = [...uploadedImages];
            if (currentEditingIndex !== null) {
              newImages[currentEditingIndex] = croppedImageUrl;
            } else {
              newImages.push(croppedImageUrl);
            }

            setUploadedImages(newImages);
            onChange(newImages);
            closeCropper();
          }
        };
        img.src = tempImage;
      } catch (error) {
        console.error("Error cropping image:", error);
        alert("Erro ao cortar a imagem. Tente novamente.");
      }
    }
  };

  const closeCropper = useCallback(() => {
    setIsCropping(false);
    setTempImage(null);
    setCropArea(null);
  }, []);

  const handleCropAreaChange = useCallback((area: CropArea | null) => {
    if (area) {
      setCropArea(area);
    }
  }, []);

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    onChange(newImages);
  };

  const editImage = (index: number) => {
    setTempImage(uploadedImages[index]);
    setCurrentEditingIndex(index);
    setIsCropping(true);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Imagens do {platformLabel}</Label>

        <div
          className={cn(
            "border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            disabled={disabled || uploadedImages.length >= maxImages}
            className="hidden"
          />

          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">Clique ou arraste imagens aqui</p>
          <p className="text-xs text-muted-foreground">
            {uploadedImages.length}/{maxImages} imagens adicionadas
          </p>
        </div>

        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                  <Image
                    src={image}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => editImage(index)}
                    disabled={disabled}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(index)}
                    disabled={disabled}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {index === 0 && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isCropping && tempImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto p-6">
            <h2 className="text-lg font-semibold mb-4">Cortar Imagem</h2>

            <div className="border border-border rounded-lg overflow-hidden bg-muted mb-4">
              <Cropper
                image={tempImage}
                className="h-96"
                aspectRatio={aspectRatio}
                onCropChange={handleCropAreaChange}
              >
                <CropperDescription>
                  Ajuste a imagem conforme desejado
                </CropperDescription>
                <CropperImage />
                <CropperCropArea />
              </Cropper>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={closeCropper}>
                Cancelar
              </Button>
              <Button onClick={handleCrop}>Aplicar Corte</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
