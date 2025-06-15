"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Palette, Settings, Bell, Shield, Mail, Save, RotateCcw, Eye, Monitor, Moon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useThemeContext } from "@/components/providers/theme-context"
import { ThemeDemo } from "@/components/common/theme-demo"

export default function SuperAdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { themeSettings, updateThemeSettings, resetThemeSettings } = useThemeContext()

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Catholic Portal",
    siteDescription: "A unified platform for all Catholic churches",
    defaultLanguage: "en",
    timezone: "UTC",
    maintenanceMode: false,
    registrationEnabled: true,
  })

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
  })

  const colorOptions = [
    { value: "purple", label: "Purple", color: "bg-purple-500" },
    { value: "blue", label: "Blue", color: "bg-blue-500" },
    { value: "green", label: "Green", color: "bg-green-500" },
    { value: "red", label: "Red", color: "bg-red-500" },
    { value: "orange", label: "Orange", color: "bg-orange-500" },
    { value: "teal", label: "Teal", color: "bg-teal-500" },
    { value: "indigo", label: "Indigo", color: "bg-indigo-500" },
    { value: "pink", label: "Pink", color: "bg-pink-500" },
  ]

  const colorSchemes = [
    { value: "default", label: "Default", description: "Standard color palette" },
    { value: "vibrant", label: "Vibrant", description: "High contrast colors" },
    { value: "muted", label: "Muted", description: "Soft, subtle colors" },
    { value: "monochrome", label: "Monochrome", description: "Grayscale theme" },
  ]

  const borderRadiusOptions = [
    { value: "none", label: "None (0px)" },
    { value: "small", label: "Small (4px)" },
    { value: "medium", label: "Medium (8px)" },
    { value: "large", label: "Large (12px)" },
    { value: "xl", label: "Extra Large (16px)" },
  ]

  const fontOptions = [
    { value: "inter", label: "Inter" },
    { value: "roboto", label: "Roboto" },
    { value: "opensans", label: "Open Sans" },
    { value: "lato", label: "Lato" },
    { value: "poppins", label: "Poppins" },
  ]

  const handleSaveSettings = async (settingsType: string) => {
    setIsLoading(true)
    try {
      // For theme settings, we don't need to do anything as they're already saved via context
      // For other settings, we would make API calls here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: `${settingsType} settings have been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const previewTheme = () => {
    toast({
      title: "Theme preview",
      description: "Theme changes are applied in real-time across the entire platform.",
    })
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">Manage platform settings and configurations</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="theme" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                UI Theme Settings
              </CardTitle>
              <CardDescription>Customize the appearance and visual style of the Catholic Portal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Color Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Color Scheme</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Select
                      value={themeSettings.primaryColor}
                      onValueChange={(value) => updateThemeSettings({ primaryColor: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full ${color.color}`} />
                              {color.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <Select
                      value={themeSettings.accentColor}
                      onValueChange={(value) => updateThemeSettings({ accentColor: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full ${color.color}`} />
                              {color.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Color Scheme */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Color Palette</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {colorSchemes.map((scheme) => (
                    <Card
                      key={scheme.value}
                      className={`cursor-pointer transition-all ${
                        themeSettings.colorScheme === scheme.value
                          ? "ring-2 ring-[var(--theme-primary)] bg-[var(--theme-accent)]"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => updateThemeSettings({ colorScheme: scheme.value })}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{scheme.label}</h4>
                            <p className="text-sm text-muted-foreground">{scheme.description}</p>
                          </div>
                          {themeSettings.colorScheme === scheme.value && <Badge variant="default">Active</Badge>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Display Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Display Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="borderRadius">Border Radius</Label>
                    <Select
                      value={themeSettings.borderRadius}
                      onValueChange={(value) => updateThemeSettings({ borderRadius: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {borderRadiusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select
                      value={themeSettings.fontFamily}
                      onValueChange={(value) => updateThemeSettings({ fontFamily: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Theme Toggles */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        Dark Mode
                      </Label>
                      <p className="text-sm text-muted-foreground">Enable dark theme across the platform</p>
                    </div>
                    <Switch
                      checked={themeSettings.darkMode}
                      onCheckedChange={(checked) => updateThemeSettings({ darkMode: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        Compact Mode
                      </Label>
                      <p className="text-sm text-muted-foreground">Reduce spacing and padding for denser layouts</p>
                    </div>
                    <Switch
                      checked={themeSettings.compactMode}
                      onCheckedChange={(checked) => updateThemeSettings({ compactMode: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={previewTheme}>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" onClick={resetThemeSettings}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                </div>
                <Button onClick={() => handleSaveSettings("Theme")} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Theme"}
                </Button>
              </div>
            </CardContent>
          </Card>
          <ThemeDemo />
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                General Settings
              </CardTitle>
              <CardDescription>Configure basic platform settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select
                    value={generalSettings.defaultLanguage}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, defaultLanguage: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable public access to the platform</p>
                  </div>
                  <Switch
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, maintenanceMode: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>User Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                  </div>
                  <Switch
                    checked={generalSettings.registrationEnabled}
                    onCheckedChange={(checked) =>
                      setGeneralSettings({ ...generalSettings, registrationEnabled: checked })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("General")} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure notification preferences and delivery methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Send browser push notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly platform activity reports</p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Security Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive alerts for security-related events</p>
                  </div>
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, securityAlerts: checked })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Notifications")} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" min="5" max="480" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input id="maxLoginAttempts" type="number" defaultValue="5" min="3" max="10" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password Complexity</Label>
                    <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Security")} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
