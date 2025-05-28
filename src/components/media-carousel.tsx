import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { createPortal } from "react-dom";

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  title?: string;
}

interface MediaCarouselProps {
  media: MediaItem[];
  projectTitle: string;
}

interface MediaModalProps {
  media: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  projectTitle: string;
}

function MediaModal({ media, currentIndex, isOpen, onClose, onNavigate, projectTitle }: MediaModalProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onNavigate((currentIndex - 1 + media.length) % media.length);
          setIsVideoPlaying(false);
          break;
        case "ArrowRight":
          e.preventDefault();
          onNavigate((currentIndex + 1) % media.length);
          setIsVideoPlaying(false);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex, media.length, onNavigate, onClose]);

  useEffect(() => {
    setIsVideoPlaying(false);
  }, [currentIndex]);

  if (!mounted || !isOpen) return null;

  const currentMedia = media[currentIndex];

  const nextSlide = () => {
    onNavigate((currentIndex + 1) % media.length);
  };

  const prevSlide = () => {
    onNavigate((currentIndex - 1 + media.length) % media.length);
  };

  const modalContent = (
    <>
      <style jsx>{`
        .thumbnail-scroll::-webkit-scrollbar {
          display: none;
        }
        .thumbnail-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
            onClick={onClose}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex flex-col bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{ margin: "auto" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 bg-card border-b border-border flex-shrink-0">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-semibold">{projectTitle}</h3>
                  <Badge variant="outline" className="text-sm">
                    {currentIndex + 1} of {media.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-10 w-10">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Media Content */}
              <div className="flex-1 relative bg-surface/50 group min-h-0 overflow-hidden">
                {currentMedia.type === "image" ? (
                  <div className="relative w-3/4 mx-auto h-full flex items-center justify-center p-4">
                    <Image
                      src={currentMedia.src || "/placeholder.svg"}
                      alt={currentMedia.alt || `${projectTitle} screenshot`}
                      width={1600}
                      height={1200}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                      priority
                    />
                  </div>
                ) : (
                  <div className="relative w-3/4 mx-auto h-full flex items-center justify-center bg-black p-4">
                    {!isVideoPlaying ? (
                      <div
                        className="relative w-full h-full flex items-center justify-center cursor-pointer"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        <Image
                          src={`https://img.youtube.com/vi/${currentMedia.src}/maxresdefault.jpg`}
                          alt={currentMedia.title || `${projectTitle} video`}
                          width={1600}
                          height={900}
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsVideoPlaying(true);
                            }}
                            size="icon"
                            variant="default"
                            className="h-20 w-20 rounded-full"
                          >
                            <Play className="size-10" />
                          </Button>
                        </div>
                        {/* Media Type Indicator */}
                        <div className="absolute top-4 left-4">
                          <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                            <Play className="h-3 w-3 mr-1" />
                            Video
                          </div>
                        </div>
                      </div>
                    ) : (
                      <iframe
                        src={`https://www.youtube.com/embed/${currentMedia.src}?autoplay=1&rel=0`}
                        title={currentMedia.title || `${projectTitle} video`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                )}

                {/* Navigation Arrows */}
                {media.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="cursor-pointer flex items-center justify-center absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="size-8" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="cursor-pointer flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="size-8" />
                    </button>
                  </>
                )}
              </div>

              {/* Footer with Slide Indicators */}
              {media.length > 1 && (
                <div className="flex items-center justify-center p-4 bg-card border-t border-border flex-shrink-0">
                  <div className="flex space-x-2">
                    {media.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => onNavigate(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex ? "bg-primary" : "bg-foreground/50 hover:bg-foreground/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return createPortal(modalContent, document.body);
}

export function MediaCarousel({ media, projectTitle }: MediaCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + media.length) % media.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const openModal = (index?: number) => {
    setModalIndex(index ?? currentSlide);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateModal = (index: number) => {
    setModalIndex(index);
  };

  const currentMedia = media[currentSlide];

  return (
    <div className="relative overflow-hidden group">
      <div className="relative w-full h-48 cursor-pointer" onClick={() => openModal()}>
        {currentMedia.type === "image" ? (
          <Image
            src={currentMedia.src || "/placeholder.svg"}
            alt={currentMedia.alt || `${projectTitle} screenshot`}
            width={500}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative w-full h-full bg-surface">
            <Image
              src={`https://img.youtube.com/vi/${currentMedia.src}/maxresdefault.jpg`}
              alt={currentMedia.title || `${projectTitle} video`}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                <Play className="size-8 text-primary-foreground" />
              </div>
            </div>
          </div>
        )}

        {/* Expand Icon */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/70 text-white p-2 rounded-full">
            <Maximize2 className="h-4 w-4" />
          </div>
        </div>

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {media.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-primary" : "bg-foreground/50 hover:bg-foreground/70"
                }`}
              />
            ))}
          </div>
        )}

        {/* Media Type Indicator */}
        <div className="absolute top-2 left-2">
          {currentMedia.type === "video" && (
            <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
              <Play className="h-3 w-3 mr-1" />
              Video
            </div>
          )}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"></div>

      <MediaModal
        media={media}
        currentIndex={modalIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNavigate={navigateModal}
        projectTitle={projectTitle}
      />
    </div>
  );
}
