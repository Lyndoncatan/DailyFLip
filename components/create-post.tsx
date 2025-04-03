"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Image, Film, X } from "lucide-react"

interface CreatePostProps {
  onPostCreated: (post: {
    content: string
    image?: string
    video?: string
  }) => void
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState("")
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    imageInputRef.current?.click()
  }

  const handleVideoClick = () => {
    videoInputRef.current?.click()
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Create a preview URL
    const previewUrl = URL.createObjectURL(file)
    setMediaPreview(previewUrl)
    setMediaType(type)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
    }, 1000)
  }

  const clearMedia = () => {
    setMediaPreview(null)
    setMediaType(null)
    if (imageInputRef.current) imageInputRef.current.value = ""
    if (videoInputRef.current) videoInputRef.current.value = ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim() && !mediaPreview) return

    const newPost = {
      content,
      ...(mediaType === "image" && mediaPreview ? { image: mediaPreview } : {}),
      ...(mediaType === "video" && mediaPreview ? { video: mediaPreview } : {}),
    }

    onPostCreated(newPost)

    // Reset form
    setContent("")
    clearMedia()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
        <CardDescription>Share what's on your mind</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What's happening?"
            className="min-h-[100px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {mediaPreview && (
            <div className="relative rounded-md border overflow-hidden">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6 rounded-full"
                onClick={clearMedia}
              >
                <X className="h-4 w-4" />
              </Button>

              {mediaType === "image" && (
                <img
                  src={mediaPreview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-[300px] w-full object-contain"
                />
              )}

              {mediaType === "video" && <video src={mediaPreview} controls className="max-h-[300px] w-full" />}
            </div>
          )}

          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleMediaChange(e, "image")}
          />

          <input
            type="file"
            ref={videoInputRef}
            className="hidden"
            accept="video/*"
            onChange={(e) => handleMediaChange(e, "video")}
          />

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleImageClick}
              disabled={isUploading || !!mediaPreview}
            >
              <Image className="mr-2 h-4 w-4" />
              Add Image
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleVideoClick}
              disabled={isUploading || !!mediaPreview}
            >
              <Film className="mr-2 h-4 w-4" />
              Add Video
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="ml-auto bg-red-600 hover:bg-red-700"
            disabled={isUploading || (!content.trim() && !mediaPreview)}
          >
            {isUploading ? "Uploading..." : "Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

