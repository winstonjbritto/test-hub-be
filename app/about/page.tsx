"use client"

import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Church, Heart, Globe, Users, Mail } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Father Michael Johnson",
      role: "Spiritual Director",
      image: "/placeholder.svg?height=200&width=200&text=Fr.+Michael",
      bio: "Father Michael has been leading digital initiatives for the Catholic community for over 10 years.",
    },
    {
      name: "Sarah Williams",
      role: "Community Manager",
      image: "/placeholder.svg?height=200&width=200&text=Sarah",
      bio: "Sarah coordinates community engagement and ensures churches can connect effectively with their members.",
    },
    {
      name: "David Chen",
      role: "Technical Director",
      image: "/placeholder.svg?height=200&width=200&text=David",
      bio: "David oversees the technical aspects of the Catholic Portal, ensuring a seamless experience for all users.",
    },
    {
      name: "Maria Rodriguez",
      role: "Content Curator",
      image: "/placeholder.svg?height=200&width=200&text=Maria",
      bio: "Maria manages the spiritual content and ensures accurate information across the platform.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <CommonHeader />

      {/* Hero Section */}
      <section className="relative h-80">
        <div className="absolute inset-0">
          <img src="/images/church-interior.png" alt="Church Interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/70"></div>
        </div>
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">About Catholic Portal</h1>
            <p className="text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
              Connecting Catholic communities worldwide through faith, fellowship, and service
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <Church className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center text-purple-900 mb-8">Our Mission</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                The Catholic Church Portal was established with a clear mission: to create a unified digital platform
                that connects Catholic churches, parishioners, and seekers worldwide. In today's digital age, we
                recognize the importance of leveraging technology to strengthen faith communities and make spiritual
                resources more accessible.
              </p>
              <p>
                Our platform serves as a bridge between traditional church practices and modern connectivity needs,
                allowing churches to extend their reach beyond physical walls and enabling individuals to find spiritual
                homes that resonate with their faith journey.
              </p>
              <p>
                We are committed to supporting the global Catholic community by providing tools that facilitate
                communication, enhance worship experiences, and foster deeper connections among believers. Through our
                portal, we aim to preserve the rich traditions of the Catholic faith while embracing innovations that
                can help spread the Gospel message in the digital era.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-purple-200 text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Faith</h3>
              <CardContent className="p-0">
                <p className="text-gray-700">
                  We are rooted in the Catholic faith and committed to upholding its teachings and traditions in
                  everything we do.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Community</h3>
              <CardContent className="p-0">
                <p className="text-gray-700">
                  We believe in fostering meaningful connections among believers and strengthening the bonds of the
                  Catholic community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Accessibility</h3>
              <CardContent className="p-0">
                <p className="text-gray-700">
                  We are dedicated to making the Catholic faith accessible to all, breaking down barriers of distance,
                  language, and technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Service</h3>
              <CardContent className="p-0">
                <p className="text-gray-700">
                  We are committed to serving the needs of churches and individuals, providing tools and resources that
                  enhance spiritual growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-purple-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-purple-900">{member.name}</h3>
                  <p className="text-purple-600 mb-3">{member.role}</p>
                  <p className="text-gray-700 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Have questions about the Catholic Portal? We'd love to hear from you and help you connect with our
            community.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="px-8">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      <CommonFooter />
    </div>
  )
}
