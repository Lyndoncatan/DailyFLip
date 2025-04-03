"use client"

import { useState, useRef, useEffect } from "react"
import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Home, LogOut, MessageSquare, Search, Settings, User, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "@/components/logo"
import { PostCard } from "@/components/post-card"

export default function ProfilePage() {
  const [name, setName] = useState("John Doe")
  const [bio, setBio] = useState("I love photography and traveling!")
  const [email, setEmail] = useState("john.doe@example.com")
  const [editing, setEditing] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=96&width=96")
  const [bannerImage, setBannerImage] = useState("")

  const profileImageInputRef = useRef<HTMLInputElement>(null)
  const bannerImageInputRef = useRef<HTMLInputElement>(null)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // This would be replaced with actual profile update logic
    setEditing(false)
    alert("Profile updated successfully!")
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result as string
        setProfileImage(imageUrl)
        // Save to localStorage
        localStorage.setItem("userProfileImage", imageUrl)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result as string
        setBannerImage(imageUrl)
        // Save to localStorage
        localStorage.setItem("userBannerImage", imageUrl)
      }
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    // Load saved profile and banner images
    const savedProfileImage = localStorage.getItem("userProfileImage")
    const savedBannerImage = localStorage.getItem("userBannerImage")

    if (savedProfileImage) {
      setProfileImage(savedProfileImage)
    }

    if (savedBannerImage) {
      setBannerImage(savedBannerImage)
    }
  }, [])

  // Sample posts data
  const posts = [
    {
      id: "1",
      user: {
        name: name,
        avatar: profileImage,
        username: "johndoe",
      },
      content: "Just visited the Grand Canyon! The views were breathtaking. 🏞️",
      image: "/placeholder.svg?height=300&width=500",
      timestamp: "2 days ago",
      likes: 24,
      comments: [
        {
          id: "c1",
          user: {
            name: "Jane Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            username: "janesmith",
          },
          content: "Amazing! I've always wanted to go there.",
          timestamp: "1 day ago",
        },
      ],
    },
    {
      id: "2",
      user: {
        name: name,
        avatar: profileImage,
        username: "johndoe",
      },
      content: "Just got a new camera! Can't wait to try it out this weekend. 📸",
      timestamp: "1 week ago",
      likes: 15,
      comments: [],
    },
  ]

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
            <Avatar>
              <AvatarImage src={profileImage} alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start gap-6 py-8 md:grid md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">
          <nav className="grid items-start gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
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
              <Button variant="ghost" className="w-full justify-start gap-2 bg-muted">
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
          <div className="relative h-48 w-full rounded-lg bg-gradient-to-r from-red-500 to-red-800 overflow-hidden group">
            {bannerImage && (
              <img
                src={bannerImage || "/placeholder.svg"}
                alt="Banner"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => bannerImageInputRef.current?.click()}
            >
              Change Banner
            </Button>
            <input
              type="file"
              ref={bannerImageInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleBannerImageChange}
            />
            <div className="absolute -bottom-12 left-6">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={profileImage} alt="User" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-background"
                  onClick={() => profileImageInputRef.current?.click()}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <input
                  type="file"
                  ref={profileImageInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <Button variant="outline" size="sm" className="bg-background" onClick={() => setEditing(!editing)}>
                {editing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            {editing ? (
              <Card>
                <form onSubmit={handleSaveProfile}>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Update your profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="ml-auto bg-red-600 hover:bg-red-700">
                      Save Changes
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            ) : (
              <>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">{name}</h2>
                  <p className="text-muted-foreground">{bio}</p>
                  <p className="text-sm text-muted-foreground">Joined January 2023</p>
                </div>

                <Tabs defaultValue="posts">
                  <TabsList>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                  </TabsList>
                  <TabsContent value="posts" className="space-y-4 mt-4">
                    {posts.map((post) => (
                      <PostCard key={post.id} {...post} />
                    ))}
                  </TabsContent>
                  <TabsContent value="friends" className="mt-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <Avatar className="h-20 w-20 mb-4">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Friend" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold">Jane Smith</h3>
                          <p className="text-sm text-muted-foreground">Friends since 2022</p>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">
                              Message
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              Unfriend
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <Avatar className="h-20 w-20 mb-4">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Friend" />
                            <AvatarFallback>RJ</AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold">Robert Johnson</h3>
                          <p className="text-sm text-muted-foreground">Friends since 2023</p>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">
                              Message
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              Unfriend
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="photos" className="mt-4">
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Photo 1"
                        className="rounded-md aspect-square object-cover"
                      />
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Photo 2"
                        className="rounded-md aspect-square object-cover"
                      />
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Photo 3"
                        className="rounded-md aspect-square object-cover"
                      />
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Photo 4"
                        className="rounded-md aspect-square object-cover"
                      />
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Photo 5"
                        className="rounded-md aspect-square object-cover"
                      />
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Photo 6"
                        className="rounded-md aspect-square object-cover"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

