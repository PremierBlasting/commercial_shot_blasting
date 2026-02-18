import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Upload, X, Image as ImageIcon, Loader2, Zap } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string, thumbnailUrl?: string) => void;
  folder?: string;
  label?: string;
  className?: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  generateWebP?: boolean;
}

interface CompressionStats {
  originalSize: number;
  compressedSize: number;
  webpSize?: number;
  savings: number;
}

interface ImageVariant {
  base64: string;
  contentType: string;
  width: number;
  height: number;
}

// Generate multiple image variants (original size + WebP thumbnail)
async function generateImageVariants(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.85,
  generateWebP: boolean = true
): Promise<{ 
  main: ImageVariant; 
  webp?: ImageVariant;
  thumbnail?: ImageVariant;
  stats: CompressionStats 
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      // Calculate main dimensions while maintaining aspect ratio
      let mainWidth = img.width;
      let mainHeight = img.height;
      
      if (mainWidth > maxWidth) {
        mainHeight = (mainHeight * maxWidth) / mainWidth;
        mainWidth = maxWidth;
      }
      
      if (mainHeight > maxHeight) {
        mainWidth = (mainWidth * maxHeight) / mainHeight;
        mainHeight = maxHeight;
      }

      // Create main image (JPEG)
      const mainCanvas = document.createElement("canvas");
      const mainCtx = mainCanvas.getContext("2d");
      if (!mainCtx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      
      mainCanvas.width = mainWidth;
      mainCanvas.height = mainHeight;
      mainCtx.fillStyle = "#FFFFFF";
      mainCtx.fillRect(0, 0, mainWidth, mainHeight);
      mainCtx.drawImage(img, 0, 0, mainWidth, mainHeight);
      
      const mainDataUrl = mainCanvas.toDataURL("image/jpeg", quality);
      const mainBase64 = mainDataUrl.split(",")[1];

      let webpVariant: ImageVariant | undefined;
      let thumbnailVariant: ImageVariant | undefined;
      let webpSize = 0;

      // Generate WebP version if supported and requested
      if (generateWebP) {
        // Check WebP support
        const testCanvas = document.createElement("canvas");
        testCanvas.width = 1;
        testCanvas.height = 1;
        const supportsWebP = testCanvas.toDataURL("image/webp").startsWith("data:image/webp");

        if (supportsWebP) {
          // Full-size WebP
          const webpDataUrl = mainCanvas.toDataURL("image/webp", quality);
          const webpBase64 = webpDataUrl.split(",")[1];
          webpSize = Math.round((webpBase64.length * 3) / 4);
          
          webpVariant = {
            base64: webpBase64,
            contentType: "image/webp",
            width: mainWidth,
            height: mainHeight,
          };

          // Generate smaller thumbnail WebP (400px max width for gallery grid)
          const thumbMaxWidth = 600;
          let thumbWidth = mainWidth;
          let thumbHeight = mainHeight;
          
          if (thumbWidth > thumbMaxWidth) {
            thumbHeight = (thumbHeight * thumbMaxWidth) / thumbWidth;
            thumbWidth = thumbMaxWidth;
          }

          const thumbCanvas = document.createElement("canvas");
          const thumbCtx = thumbCanvas.getContext("2d");
          if (thumbCtx) {
            thumbCanvas.width = thumbWidth;
            thumbCanvas.height = thumbHeight;
            thumbCtx.fillStyle = "#FFFFFF";
            thumbCtx.fillRect(0, 0, thumbWidth, thumbHeight);
            thumbCtx.drawImage(img, 0, 0, thumbWidth, thumbHeight);
            
            const thumbDataUrl = thumbCanvas.toDataURL("image/webp", 0.75);
            const thumbBase64 = thumbDataUrl.split(",")[1];
            
            thumbnailVariant = {
              base64: thumbBase64,
              contentType: "image/webp",
              width: thumbWidth,
              height: thumbHeight,
            };
          }
        }
      }

      // Calculate stats
      const compressedSize = Math.round((mainBase64.length * 3) / 4);
      const originalSize = file.size;
      const savings = Math.round(((originalSize - compressedSize) / originalSize) * 100);

      resolve({
        main: {
          base64: mainBase64,
          contentType: "image/jpeg",
          width: mainWidth,
          height: mainHeight,
        },
        webp: webpVariant,
        thumbnail: thumbnailVariant,
        stats: {
          originalSize,
          compressedSize,
          webpSize: webpSize || undefined,
          savings: Math.max(0, savings),
        },
      });
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    // Load image from file
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
}

// Format file size for display
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ImageUpload({ 
  value, 
  onChange, 
  folder = "gallery", 
  label, 
  className = "",
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.85,
  generateWebP = true,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [compressionStats, setCompressionStats] = useState<CompressionStats | null>(null);
  const [statusText, setStatusText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.upload.image.useMutation();
  const uploadWithWebPMutation = trpc.upload.imageWithWebP.useMutation({
    onSuccess: (data) => {
      onChange(data.url, data.thumbnailUrl);
      if (compressionStats && compressionStats.savings > 0) {
        const webpInfo = data.webpUrl ? " + WebP" : "";
        toast.success(`Image uploaded${webpInfo}! Saved ${compressionStats.savings}%`);
      } else {
        toast.success("Image uploaded successfully");
      }
      setIsUploading(false);
      setUploadProgress(0);
      setCompressionStats(null);
      setStatusText("");
    },
    onError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
      setIsUploading(false);
      setUploadProgress(0);
      setCompressionStats(null);
      setStatusText("");
    },
  });

  const handleFile = useCallback(async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 20MB before compression)
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Image must be less than 20MB");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setStatusText("Reading image...");

    try {
      // Generate image variants
      setUploadProgress(20);
      setStatusText("Compressing image...");
      
      const variants = await generateImageVariants(file, maxWidth, maxHeight, quality, generateWebP);
      setCompressionStats(variants.stats);
      
      setUploadProgress(40);
      if (variants.webp) {
        setStatusText("Generating WebP versions...");
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      setUploadProgress(60);
      setStatusText(`Compressed: ${formatFileSize(variants.stats.originalSize)} → ${formatFileSize(variants.stats.compressedSize)}`);
      
      // Small delay to show compression stats
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUploadProgress(80);
      setStatusText("Uploading to server...");
      
      // Get file name without extension
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      
      // Upload with WebP variants if available
      if (generateWebP && variants.webp && variants.thumbnail) {
        uploadWithWebPMutation.mutate({
          fileName: baseName + ".jpg",
          mainData: variants.main.base64,
          mainContentType: variants.main.contentType,
          webpData: variants.webp.base64,
          thumbnailData: variants.thumbnail.base64,
          folder,
        });
      } else {
        // Fallback to regular upload
        uploadMutation.mutate({
          fileName: baseName + ".jpg",
          fileData: variants.main.base64,
          contentType: variants.main.contentType,
          folder,
        }, {
          onSuccess: (data) => {
            onChange(data.url);
            toast.success("Image uploaded successfully");
            setIsUploading(false);
            setUploadProgress(0);
            setCompressionStats(null);
            setStatusText("");
          },
          onError: (error) => {
            toast.error(`Upload failed: ${error.message}`);
            setIsUploading(false);
            setUploadProgress(0);
            setCompressionStats(null);
            setStatusText("");
          },
        });
      }
    } catch (error) {
      toast.error("Failed to process image");
      setIsUploading(false);
      setUploadProgress(0);
      setCompressionStats(null);
      setStatusText("");
    }
  }, [folder, uploadMutation, uploadWithWebPMutation, maxWidth, maxHeight, quality, generateWebP, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={className}>
      {label && <p className="text-sm font-medium mb-2">{label}</p>}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {value ? (
        <div className="relative group">
          <div className="relative aspect-video rounded-lg overflow-hidden border bg-gray-100">
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleClick}
                disabled={isUploading}
              >
                <Upload className="w-4 h-4 mr-1" /> Replace
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={!isUploading ? handleClick : undefined}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative aspect-video rounded-lg border-2 border-dashed
            transition-all duration-200 flex flex-col items-center justify-center gap-2
            ${isDragging 
              ? "border-[#2C5F7F] bg-[#2C5F7F]/5" 
              : "border-gray-300 hover:border-[#2C5F7F] hover:bg-gray-50"
            }
            ${isUploading ? "pointer-events-none" : "cursor-pointer"}
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[#2C5F7F] animate-spin" />
              <p className="text-sm text-gray-600">{statusText || `Uploading... ${uploadProgress}%`}</p>
              <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2C5F7F] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              {compressionStats && compressionStats.savings > 0 && (
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <Zap className="w-3 h-3" />
                  <span>Saved {compressionStats.savings}%{generateWebP ? " + WebP" : ""}</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${isDragging ? "bg-[#2C5F7F]/10" : "bg-gray-100"}
              `}>
                {isDragging ? (
                  <Upload className="w-6 h-6 text-[#2C5F7F]" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  {isDragging ? "Drop image here" : "Click or drag image"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 20MB • Auto WebP
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
