"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageSquare, Send } from "lucide-react"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
    username: string
  }
  content: string
  timestamp: string
}

interface PostCardProps {
  id: string
  user: {
    name: string
    avatar: string
    username: string
  }
  content: string
  image?: string
  video?: string
  timestamp: string
  likes: number
  comments: Comment[]
}

export function PostCard({
  id,
  user,
  content,
  image,
  video,
  timestamp,
  likes: initialLikes,
  comments: initialComments,
}: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)
  const [comments, setComments] = useState(initialComments)
  const [commentText, setCommentText] = useState("")
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "currentuser",
      },
      content: commentText,
      timestamp: "Just now",
    }

    setComments([...comments, newComment])
    setCommentText("")
    setShowComments(true)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="font-semibold">{user.name}</div>
          <div className="text-xs text-muted-foreground">{timestamp}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{content}</p>
        {image && (
          <div className="mt-4">
            <img
              src={image || "/placeholder.svg"}
              alt="Post image"
              className="rounded-md w-full object-cover max-h-[500px]"
            />
          </div>
        )}
        {video && (
          <div className="mt-4">
            <video src={video} controls className="rounded-md w-full max-h-[500px]" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t pt-4">
        <div className="flex w-full gap-4">
          <Button variant="ghost" size="sm" className={`gap-1 ${liked ? "text-red-600" : ""}`} onClick={handleLike}>
            <Heart className={`h-4 w-4 ${liked ? "fill-current text-red-600" : ""}`} />
            {likes > 0 && <span>{likes}</span>}
            <span className="sr-only">Like</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowComments(!showComments)}>
            <MessageSquare className="h-4 w-4" />
            {comments.length > 0 && <span>{comments.length}</span>}
            <span className="sr-only">Comment</span>
          </Button>
        </div>

        {showComments && comments.length > 0 && (
          <div className="w-full space-y-2 pt-2">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="rounded-lg bg-muted px-3 py-2 text-sm">
                  <div className="font-medium">{comment.user.name}</div>
                  <div>{comment.content}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{comment.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleAddComment} className="flex w-full gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Current user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 items-center gap-2">
            <Input
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" variant="ghost">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}

