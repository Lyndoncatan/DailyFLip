"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Home, LogOut, MessageSquare, Search, Settings, User, Users } from "lucide-react"
import { Logo } from "@/components/logo"

export default function FriendsPage() {
  const [searchTerm, setSearchTerm] = useState("")

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
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
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
              <Button variant="ghost" className="w-full justify-start gap-2 bg-muted">
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
          <Card>
            <CardHeader>
              <CardTitle>Friends</CardTitle>
              <CardDescription>Manage your friends and find new connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Input
                  placeholder="Search friends..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Friends</TabsTrigger>
                  <TabsTrigger value="requests">Friend Requests</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
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

                    <Card>
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <Avatar className="h-20 w-20 mb-4">
                          <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Friend" />
                          <AvatarFallback>EW</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">Emily Wilson</h3>
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
                <TabsContent value="requests" className="mt-4">
                  <div className="grid gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                            <AvatarFallback>MJ</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold">Michael Johnson</div>
                            <div className="text-xs text-muted-foreground">3 mutual friends</div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline">
                              Decline
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                            <AvatarFallback>SB</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold">Sarah Brown</div>
                            <div className="text-xs text-muted-foreground">1 mutual friend</div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline">
                              Decline
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="suggestions" className="mt-4">
                  <div className="grid gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                            <AvatarFallback>TD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold">Thomas Davis</div>
                            <div className="text-xs text-muted-foreground">5 mutual friends</div>
                          </div>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Add Friend
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                            <AvatarFallback>LM</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold">Lisa Miller</div>
                            <div className="text-xs text-muted-foreground">2 mutual friends</div>
                          </div>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Add Friend
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                            <AvatarFallback>JW</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold">James Wilson</div>
                            <div className="text-xs text-muted-foreground">4 mutual friends</div>
                          </div>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Add Friend
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

