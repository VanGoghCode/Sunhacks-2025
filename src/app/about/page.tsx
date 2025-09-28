import React from "react";
import Image from "next/image";
import { Button } from "../../components/ui/Button";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Kirtan",
      role: "Full-Stack & Cloud Developer",
      description:
        "Full-stack and cloud developer passionate about green technology solutions.",
      image: "/team/kirtan.jpg",
    },
    {
      name: "Navneetha",
      role: "Backend & AI Developer",
      description:
        "Backend and AI developer passionate about green technology solutions.",
      image: "/team/navneetha.png",
    },
    {
      name: "Shubham",
      role: "Project Manager",
      description:
        "Project manager ensuring smooth execution of our sustainability initiatives.",
      image: "/team/shubham.jpg",
    },
    {
      name: "Smit",
      role: "Data Analyst",
      description:
        "Developer and data enthusiast focused on impactful solutions.",
      image: "/team/smit.png",
    },
  ];

  const values = [
    {
      icon: "🌱",
      title: "Sustainability First",
      description:
        "Every decision we make considers environmental impact and long-term sustainability.",
    },
    {
      icon: "🤝",
      title: "Community Driven",
      description:
        "We believe in the power of community to create meaningful change.",
    },
    {
      icon: "💡",
      title: "Innovation",
      description:
        "Constantly pushing boundaries to find better, greener solutions.",
    },
    {
      icon: "🌍",
      title: "Global Impact",
      description:
        "Thinking globally while acting locally to create positive change.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
                Turning Eco-Ready Tech Into Impact
              </span>
            </h1>
            <p className="text-xl text-green-800 mb-8 max-w-3xl mx-auto leading-relaxed">
              Securely wipe, certify, and repurpose devices keeping technology
              in use, out of landfills, and in the hands of communities that
              need it most.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-green-800 text-center mb-12">
            Why We Exist
          </h2>
          <div className="space-y-8 text-green-800 text-lg leading-relaxed text-justify">
            <p>
              Every year, <em>millions</em> of laptops and desktops are discarded, not because they are broken, but because organizations fear the risks of <strong>sensitive data leaking</strong>. The result is a cycle of waste: perfectly usable devices are shredded or landfilled, while the environmental cost of manufacturing new hardware keeps rising. At the same time, schools and nonprofits struggle to equip classrooms and communities with reliable technology.
            </p>
            <p>
              At LoopIT, we set out to change this <strong>broken system</strong> by bridging the gap between <em>data security</em> and <em>sustainability</em>. Our platform empowers organizations to securely wipe devices using{" "}
              <span className="font-semibold">NIST-compliant workflows</span>, generate <strong>tamper-evident certificates</strong> that prove compliance, and quantify the <strong>CO₂ emissions avoided</strong> through reuse instead of disposal. By pairing compliance with measurable impact, we give IT teams confidence while helping ESG leaders meet their sustainability goals.
            </p>
            <p>
              But our story doesn&apos;t end with security and reporting — it extends into the <em>community</em>. Once devices are certified clean, LoopIT connects them directly to schools and NGOs that need them most. What was once <strong>e-waste</strong> becomes a tool for education, growth, and opportunity. We believe technology should live beyond the office, fueling brighter futures while reducing our collective environmental footprint.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-green-800 max-w-2xl mx-auto">
              These core principles guide everything we do and shape our vision
              for a sustainable future.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-white/50"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-green-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-green-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-green-800 max-w-2xl mx-auto">
              The passionate individuals working to make sustainability
              accessible to everyone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-white/50"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-green-200 shadow-lg">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-green-500 font-medium mb-4">{member.role}</p>
                <p className="text-green-700 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-green-800 mb-8 max-w-2xl mx-auto">
              Ready to be part of the sustainable revolution? Join thousands of
              others making a positive impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Get Started Today
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;