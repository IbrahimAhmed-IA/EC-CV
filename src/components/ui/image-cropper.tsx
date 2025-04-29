import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropperProps {
  open: boolean;
  onClose: () => void;
  onCropComplete: (croppedImageUrl: string) => void;
  imageUrl: string;
  aspectRatio?: number;
}

// This function centers the initial crop
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export function ImageCropper({
  open,
  onClose,
  onCropComplete,
  imageUrl,
  aspectRatio = 1,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Set initial crop when image loads
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspectRatio));
    setIsImageLoaded(true);
  };

  // Reset crop when dialog opens or image changes
  useEffect(() => {
    if (open) {
      setIsImageLoaded(false);
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  }, [open, imageUrl]);

  const handleCancel = () => {
    onClose();
  };

  const cropImage = () => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current
    ) {
      const canvas = document.createElement("canvas");
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      // Set canvas size to desired output size
      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;

      // Draw the cropped image onto the canvas
      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      );

      // Convert canvas to data URL and pass to parent
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      onCropComplete(dataUrl);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex items-center justify-center">
          {imageUrl && (
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop) => setCrop(pixelCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              minWidth={100}
              minHeight={100}
              circularCrop={aspectRatio === 1}
            >
              <img
                ref={imgRef}
                src={imageUrl}
                alt="Crop me"
                className="max-h-[60vh] max-w-full object-contain"
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={cropImage}
            disabled={!isImageLoaded || !completedCrop?.width || !completedCrop?.height}
          >
            Apply Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
