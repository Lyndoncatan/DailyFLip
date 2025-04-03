"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Home, LogOut, MessageSquare, Search, Settings, User, Users } from "lucide-react"
import { Logo } from "@/components/logo"
import { CreatePost } from "@/components/create-post"
import { PostCard } from "@/components/post-card"

// Sample initial posts data
const initialPosts = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "johndoe",
    },
    content: "Just had an amazing day at the beach! The sunset was incredible. 🌊☀️",
    image: "/placeholder.svg?height=300&width=500",
    timestamp: "2 hours ago",
    likes: 15,
    comments: [
      {
        id: "c1",
        user: {
          name: "Jane Smith",
          avatar: "/placeholder.svg?height=40&width=40",
          username: "janesmith",
        },
        content: "Looks amazing! Where is this?",
        timestamp: "1 hour ago",
      },
    ],
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "janesmith",
    },
    content: "Just finished reading this amazing book! Highly recommend it to everyone. 📚",
    timestamp: "5 hours ago",
    likes: 8,
    comments: [],
  },
]

export default function DashboardPage() {
  const [posts, setPosts] = useState(initialPosts)

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("dailyflip_posts")
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }
  }, [])

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("dailyflip_posts", JSON.stringify(posts))
  }, [posts])

  useEffect(() => {
    // Load saved profile image
    const savedProfileImage = localStorage.getItem("userProfileImage")
    if (savedProfileImage) {
      // Update avatar images in the UI
      const avatarImages = document.querySelectorAll(".user-avatar")
      avatarImages.forEach((img: any) => {
        img.src = savedProfileImage
      })
    }
  }, [])

  const handleCreatePost = (newPostData: { content: string; image?: string; video?: string }) => {
    const newPost = {
      id: Date.now().toString(),
      user: {
        name: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "currentuser",
      },
      content: newPostData.content,
      ...(newPostData.image ? { image: newPostData.image } : {}),
      ...(newPostData.video ? { video: newPostData.video } : {}),
      timestamp: "Just now",
      likes: 0,
      comments: [],
    }

    setPosts([newPost, ...posts])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Logo href="/dashboard" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Link href="/profile">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" className="user-avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start gap-6 py-8 md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr_240px]">
        <aside className="hidden md:block">
          <nav className="grid items-start gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-muted">
                <Home className="h-5 w-5" />
                Home
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </Link>
            <Link href="/friends">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="h-5 w-5" />
                Friends
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User className="h-5 w-5" />
                Profile
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start gap-2 text-red-600">
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex w-full flex-col gap-6">
          <CreatePost onPostCreated={handleCreatePost} />

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 mt-4">
              {posts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </TabsContent>
            <TabsContent value="friends" className="space-y-4 mt-4">
              {posts
                .filter((post) => post.user.username === "janesmith" || post.user.username === "johndoe")
                .map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
            </TabsContent>
          </Tabs>
        </main>
        <aside className="hidden lg:block">
          <div className="grid gap-4">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 font-semibold">Friend Suggestions</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" className="user-avatar" />
                    <AvatarFallback>RJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold">Robert Johnson</div>
                    <div className="text-xs text-muted-foreground">5 mutual friends</div>
                  </div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    Add
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" className="user-avatar" />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold">Emily Wilson</div>
                    <div className="text-xs text-muted-foreground">2 mutual friends</div>
                  </div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    Add
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 font-semibold">Trending Topics</h3>
              <div className="space-y-2">
                <div className="text-sm font-medium">#Photography</div>
                <div className="text-sm font-medium">#Travel</div>
                <div className="text-sm font-medium">#FoodLovers</div>
                <div className="text-sm font-medium">#Technology</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

