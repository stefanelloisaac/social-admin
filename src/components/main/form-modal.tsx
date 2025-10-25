"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploadWithCropper } from "@/components/main/image-upload-with-cropper";
import { ImageCollagePreview } from "@/components/main/image-collage-preview";
import type { Post, PostStatus, CreatePostInput, UpdatePostInput } from "@/types/post";

interface FormModalProps {
  open: boolean;
  mode: "create" | "edit" | "view";
  post?: Post;
  onClose: () => void;
  onSubmit: (data: CreatePostInput | UpdatePostInput) => Promise<void>;
  platformLabel: string;
  platform?: "instagram" | "facebook" | "tiktok" | "linkedin";
}

export function FormModal({
  open,
  mode,
  post,
  onClose,
  onSubmit,
  platformLabel,
  platform,
}: FormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState<CreatePostInput>({
    title: post?.title || "",
    imageUrls: post?.imageUrls || [],
    caption: post?.caption || "",
    status: (post?.status || "draft") as PostStatus,
    scheduledDate: post?.scheduledDate || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(formData.title as string).trim() || !(formData.caption as string).trim()) {
      setAlertMessage("Por favor, preencha título e legenda");
      setAlertOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        title: "",
        imageUrls: [],
        caption: "",
        status: "draft",
      });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      setAlertMessage("Erro ao salvar post. Tente novamente.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isReadOnly = mode === "view";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" && `Novo Post - ${platformLabel}`}
            {mode === "edit" && `Editar Post - ${platformLabel}`}
            {mode === "view" && `Ver Post - ${platformLabel}`}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" && "Crie um novo post para sua plataforma"}
            {mode === "edit" && "Edite os detalhes do seu post"}
            {mode === "view" && "Visualize os detalhes do post"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Título do post"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={isReadOnly || isLoading}
              required
            />
          </div>

          {platform === "instagram" || platform === "linkedin" ? (
            <ImageUploadWithCropper
              value={formData.imageUrls}
              onChange={(imageUrls) =>
                setFormData({ ...formData, imageUrls })
              }
              disabled={isReadOnly || isLoading}
              aspectRatio={platform === "instagram" ? 1 : 1.91}
              maxImages={platform === "instagram" ? 10 : 5}
              platformLabel={platformLabel}
            />
          ) : (
            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                placeholder="https://exemplo.com/imagem.jpg"
                value={formData.imageUrls[0] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrls: e.target.value ? [e.target.value] : [] })
                }
                disabled={isReadOnly || isLoading}
                type="text"
              />
              {formData.imageUrls[0] && (
                <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={formData.imageUrls[0] || "/placeholder.svg"}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>
          )}

          {formData.imageUrls.length > 0 && (
            <div className="space-y-2">
              <Label>Prévia da Postagem</Label>
              <div className="h-64 w-full">
                <ImageCollagePreview
                  imageUrls={formData.imageUrls}
                  platformLabel={platformLabel}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="caption">Legenda</Label>
            <Textarea
              id="caption"
              placeholder="Escreva a legenda do post..."
              value={formData.caption}
              onChange={(e) =>
                setFormData({ ...formData, caption: e.target.value })
              }
              disabled={isReadOnly || isLoading}
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value as PostStatus })
                }
                disabled={isReadOnly || isLoading}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Publicado</SelectItem>
                  <SelectItem value="scheduled">Agendado</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Data de Agendamento</Label>
              <Input
                id="scheduledDate"
                type="datetime-local"
                value={
                  formData.scheduledDate
                    ? new Date(formData.scheduledDate)
                        .toISOString()
                        .slice(0, 16)
                    : ""
                }
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    scheduledDate: e.target.value
                      ? new Date(e.target.value).toISOString()
                      : "",
                  });
                }}
                disabled={isReadOnly || isLoading}
              />
            </div>
          </div>

          {!isReadOnly && (
            <DialogFooter className="mt-8 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading} className="relative flex-1">
                {isLoading ? (
                  <>
                    <Loader size="sm" className="absolute left-2" />
                    <span className="ml-6">Salvando...</span>
                  </>
                ) : mode === "create" ? (
                  "Criar"
                ) : (
                  "Atualizar"
                )}
              </Button>
            </DialogFooter>
          )}
          {isReadOnly && (
            <DialogFooter className="mt-8">
              <Button type="button" onClick={onClose}>
                Fechar
              </Button>
            </DialogFooter>
          )}
        </form>

        {isLoading && <Loader fullscreen text="Processando..." />}
      </DialogContent>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Aviso</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
