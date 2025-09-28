"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Award, TreePine, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Award,
    number: "15,000+",
    label: "Devices Certified",
    description: "Thoroughly tested and verified",
  },
  {
    icon: Leaf,
    number: "2.5M kg",
    label: "CO₂ Emissions Saved",
    description: "Equivalent to planting 30,000 trees",
  },
  {
    icon: TreePine,
    number: "8,500+",
    label: "Devices Donated",
    description: "To schools and communities",
  },
  {
    icon: Users,
    number: "50,000+",
    label: "People Impacted",
    description: "Across 25 communities served",
  },
]

export function EnvironmentalImpact() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/20">
            <Leaf className="w-4 h-4 mr-2" />
            Environmental Impact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Making a Real Difference</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Every refurbished device purchased contributes to a more sustainable future and supports communities
            worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-2xl border-0 bg-card/50 backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{stat.number}</h3>
                <p className="font-semibold text-foreground mb-2">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Visualization */}
        <div className="relative">
          <Card className="overflow-hidden rounded-3xl border-0 bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Circular Economy in Action</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    By choosing refurbished technology, you're participating in a circular economy that reduces waste,
                    conserves resources, and creates opportunities for communities worldwide.
                  </p>
                  <div className="flex items-center text-primary font-semibold">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    <span>95% reduction in environmental impact</span>
                  </div>
                </div>
                <div className="relative h-64 lg:h-auto">
                  <img
                    src="/sustainable-technology-circular-economy-environmen.jpg"
                    alt="Environmental Impact Visualization"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats Line */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Join 50,000+ customers</span> who have already made a positive
            environmental impact
          </p>
        </div>
      </div>
    </section>
  )
}
