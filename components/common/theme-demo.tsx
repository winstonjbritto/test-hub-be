"use client"

import { useThemeContext } from "@/components/providers/theme-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Check, Settings } from "lucide-react"

export function ThemeDemo() {
  const { themeSettings } = useThemeContext()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Current Theme Settings
          </CardTitle>
          <CardDescription>This card demonstrates the current theme settings applied across the site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="font-medium">Primary Color</div>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full bg-theme-primary`}></div>
                <span className="capitalize">{themeSettings.primaryColor}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Accent Color</div>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full bg-theme-accent`}></div>
                <span className="capitalize">{themeSettings.accentColor}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="font-medium">Color Scheme</div>
              <Badge variant="outline" className="capitalize">
                {themeSettings.colorScheme}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Border Radius</div>
              <Badge variant="outline" className="capitalize">
                {themeSettings.borderRadius}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Font Family</div>
              <Badge variant="outline" className="capitalize">
                {themeSettings.fontFamily}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">Dark Mode</div>
              <Badge variant={themeSettings.darkMode ? "default" : "outline"}>
                {themeSettings.darkMode ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="font-medium">Compact Mode</div>
              <Badge variant={themeSettings.compactMode ? "default" : "outline"}>
                {themeSettings.compactMode ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Change Theme
          </Button>
          <Button className="bg-theme-primary hover:bg-purple-700 gap-2">
            <Check className="w-4 h-4" />
            Apply Theme
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="buttons" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>
        <TabsContent value="buttons" className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button className="bg-theme-primary hover:bg-purple-700">Primary Button</Button>
            <Button variant="outline" className="border-theme-primary text-theme-primary">
              Outline Button
            </Button>
            <Button variant="ghost" className="text-theme-primary hover:bg-theme-accent">
              Ghost Button
            </Button>
            <Button variant="link" className="text-theme-primary">
              Link Button
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="cards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription>This is a standard card</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here</p>
              </CardContent>
            </Card>
            <Card className="border-theme-primary">
              <CardHeader>
                <CardTitle className="text-theme-primary">Themed Card</CardTitle>
                <CardDescription>This card uses theme colors</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here</p>
              </CardContent>
            </Card>
            <Card className="bg-theme-accent">
              <CardHeader>
                <CardTitle>Accent Card</CardTitle>
                <CardDescription>This card uses the accent color</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="badges" className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Badge>Default Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
            <Badge className="bg-theme-primary">Primary Badge</Badge>
            <Badge variant="outline" className="border-theme-primary text-theme-primary">
              Themed Badge
            </Badge>
            <Badge className="bg-theme-accent text-theme-primary">Accent Badge</Badge>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
