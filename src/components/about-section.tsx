"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, Target, Globe, Lightbulb, ArrowRight } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-secondary/20 via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/20">
            <Lightbulb className="w-4 h-4 mr-2" />
            About EcoTech
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Revolutionizing Tech Sustainability
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
            We're on a mission to transform how the world thinks about technology consumption, creating a sustainable
            future through innovative refurbishment and community impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Leaf className="w-6 h-6 text-primary mr-3" />
                What We Are
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                EcoTech is a pioneering marketplace that bridges the gap between high-quality technology and
                environmental responsibility. We specialize in certified refurbished laptops that meet the highest
                standards of performance while significantly reducing environmental impact.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Target className="w-6 h-6 text-primary mr-3" />
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To create a circular economy in technology where every device gets a second life, every purchase makes a
                positive impact, and every community has access to the digital tools they need to thrive in the modern
                world.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Globe className="w-6 h-6 text-primary mr-3" />
                Global Impact
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Through partnerships with NGOs worldwide, we've donated thousands of devices, trained communities in
                digital literacy, and prevented millions of kilograms of e-waste from entering landfills.
              </p>
            </div>
          </div>

          <div className="relative">
            <Card className="overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-0">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Sustainable Technology Workspace"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-6">
                    <h4 className="font-bold text-foreground mb-2">Certified Quality Process</h4>
                    <p className="text-sm text-muted-foreground">
                      Every device undergoes our rigorous 50-point inspection and certification process
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "Sustainability First",
              description: "Every decision we make prioritizes environmental impact and long-term sustainability.",
              icon: Leaf,
            },
            {
              title: "Quality Assured",
              description: "Rigorous testing and certification ensures every device meets our high standards.",
              icon: Target,
            },
            {
              title: "Community Focused",
              description: "Supporting communities worldwide through technology access and digital inclusion.",
              icon: Globe,
            },
          ].map((value, index) => (
            <Card
              key={index}
              className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-2xl border-0 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="rounded-xl">
            Join Our Mission
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
