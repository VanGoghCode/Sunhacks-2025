"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink, MapPin, Users } from "lucide-react"

const ngoPartners = [
  {
    name: "Digital Divide Foundation",
    description:
      "Bridging the technology gap in underserved communities through device donations and digital literacy programs.",
    location: "Global",
    impact: "25,000+ students",
    image: "/students-using-computers-in-classroom.jpg",
    website: "#",
  },
  {
    name: "Green Tech Initiative",
    description:
      "Promoting sustainable technology practices and e-waste reduction through education and community programs.",
    location: "North America",
    impact: "500+ schools",
    image: "/environmental-technology-recycling-center.jpg",
    website: "#",
  },
  {
    name: "Code for Communities",
    description: "Empowering local communities with technology skills and providing refurbished devices for learning.",
    location: "Latin America",
    impact: "15,000+ people trained",
    image: "/community-coding-workshop-technology-training.jpg",
    website: "#",
  },
  {
    name: "Tech4Good Alliance",
    description:
      "Leveraging technology to solve social challenges and create sustainable solutions for developing regions.",
    location: "Africa & Asia",
    impact: "100+ communities",
    image: "/technology-center-in-developing-community.jpg",
    website: "#",
  },
  {
    name: "Sustainable Futures Org",
    description:
      "Creating pathways to sustainable technology adoption while supporting environmental conservation efforts.",
    location: "Europe",
    impact: "2M kg CO₂ saved",
    image: "/sustainable-technology-environmental-conservation.jpg",
    website: "#",
  },
  {
    name: "Digital Inclusion Network",
    description:
      "Ensuring equal access to technology and digital opportunities for marginalized communities worldwide.",
    location: "Oceania",
    impact: "50+ remote areas",
    image: "/placeholder.svg?height=200&width=300",
    website: "#",
  },
]

export function NGOPartners() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/20">
            <Heart className="w-4 h-4 mr-2" />
            Our Partners
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Featured NGO Partners</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Working together with organizations worldwide to create lasting positive impact through sustainable
            technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ngoPartners.map((ngo, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl overflow-hidden border-0 bg-card/50 backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={ngo.image || "/placeholder.svg"}
                    alt={ngo.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center text-white text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{ngo.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl text-foreground mb-3">{ngo.name}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{ngo.description}</p>

                  <div className="flex items-center mb-4 text-primary">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="font-semibold text-sm">{ngo.impact}</span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors bg-transparent"
                  >
                    Learn More
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="rounded-xl bg-transparent">
            <Heart className="w-5 h-5 mr-2" />
            Become a Partner
          </Button>
        </div>
      </div>
    </section>
  )
}
