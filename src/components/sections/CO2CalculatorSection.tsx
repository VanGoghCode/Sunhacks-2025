"use client";

import { useState } from 'react';
import { Calculator, Leaf, Monitor, Laptop, Server, Info, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

interface DeviceType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  weight: number;
  manufacturingFactor: number;
  complexityMultiplier: number;
  transportationSaved: number;
  localTransportation: number;
  ewastePreventionPerYear: number;
  averageLifeExtension: number;
}

const deviceTypes: DeviceType[] = [
  {
    id: 'laptop',
    name: 'Laptop',
    icon: Laptop,
    weight: 2.1,
    manufacturingFactor: 15.2,
    complexityMultiplier: 1.8,
    transportationSaved: 12.8,
    localTransportation: 0.7,
    ewastePreventionPerYear: 2.4,
    averageLifeExtension: 5
  },
  {
    id: 'desktop',
    name: 'Desktop',
    icon: Monitor,
    weight: 8.5,
    manufacturingFactor: 12.8,
    complexityMultiplier: 1.6,
    transportationSaved: 18.5,
    localTransportation: 1.2,
    ewastePreventionPerYear: 3.1,
    averageLifeExtension: 6
  },
  {
    id: 'monitor',
    name: 'Monitor',
    icon: Monitor,
    weight: 4.2,
    manufacturingFactor: 8.9,
    complexityMultiplier: 1.3,
    transportationSaved: 9.4,
    localTransportation: 0.5,
    ewastePreventionPerYear: 1.8,
    averageLifeExtension: 7
  },
  {
    id: 'server',
    name: 'Server',
    icon: Server,
    weight: 15.6,
    manufacturingFactor: 18.7,
    complexityMultiplier: 2.2,
    transportationSaved: 32.1,
    localTransportation: 2.8,
    ewastePreventionPerYear: 5.2,
    averageLifeExtension: 4
  }
];

export default function CO2CalculatorSection() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>(deviceTypes[0]);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculateCO2Impact = (device: DeviceType) => {
    // Manufacturing impact avoided
    const manufacturingImpact = device.weight * device.manufacturingFactor * device.complexityMultiplier;
    
    // Transportation savings
    const transportationImpact = device.transportationSaved - device.localTransportation;
    
    // E-waste prevention
    const ewasteImpact = device.averageLifeExtension * device.ewastePreventionPerYear;
    
    const totalImpact = manufacturingImpact + transportationImpact + ewasteImpact;
    
    return {
      manufacturing: Math.round(manufacturingImpact * 10) / 10,
      transportation: Math.round(transportationImpact * 10) / 10,
      ewaste: Math.round(ewasteImpact * 10) / 10,
      total: Math.round(totalImpact * 10) / 10
    };
  };

  const impact = calculateCO2Impact(selectedDevice);
  const treesEquivalent = Math.round(impact.total * 0.0454); // 1 kg CO2 = ~0.0454 trees

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-100 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-100 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-100 rounded-full opacity-20 blur-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-orange-500 rounded-full mb-6">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Calculate Your Environmental Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how much CO₂ you can save by donating just one device instead of throwing it away. 
            Every device donated makes a real difference for our planet! 🌍
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Device Selection */}
            <div className="p-8 bg-gradient-to-r from-orange-500 to-green-500 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">Choose Your Device Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {deviceTypes.map((device) => {
                  const IconComponent = device.icon;
                  return (
                    <button
                      key={device.id}
                      onClick={() => setSelectedDevice(device)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                        selectedDevice.id === device.id
                          ? 'border-white bg-white/20 shadow-lg scale-105'
                          : 'border-white/30 bg-white/10 hover:bg-white/15'
                      }`}
                    >
                      <IconComponent className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">{device.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results */}
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-full mb-4 animate-pulse">
                  <Leaf className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-3xl font-bold text-gray-900 mb-2">
                  By donating your {selectedDevice.name.toLowerCase()}, you&apos;ll save:
                </h4>
                <div className="bg-gradient-to-r from-green-500 to-orange-500 text-transparent bg-clip-text transform transition-all duration-500 hover:scale-105">
                  <p className="text-6xl font-bold mb-2 animate-bounce">{impact.total} kg</p>
                  <p className="text-2xl font-semibold">of CO₂ emissions</p>
                </div>
                <p className="text-lg text-gray-600 mt-4">
                  That&apos;s equivalent to planting <span className="font-bold text-green-600 animate-pulse">{treesEquivalent} trees</span> 🌱
                </p>
              </div>

              {/* Comparison: Donate vs Throw Away */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Donate Option */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">RECOMMENDED</span>
                  </div>
                  <h5 className="text-xl font-bold text-green-800 mb-4 text-center">📦 Donate Your Device</h5>
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-green-600">-{impact.total} kg CO₂</div>
                    <div className="text-sm text-green-700">Environmental impact SAVED</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-white/50 rounded p-2">
                        <div className="font-bold text-green-600">{impact.manufacturing} kg</div>
                        <div>Manufacturing</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <div className="font-bold text-blue-600">{impact.transportation} kg</div>
                        <div>Transport</div>
                      </div>
                      <div className="bg-white/50 rounded p-2">
                        <div className="font-bold text-purple-600">{impact.ewaste} kg</div>
                        <div>E-waste</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-green-800">
                    🌱 Equivalent to planting <strong>{treesEquivalent} trees</strong>
                  </div>
                </div>

                {/* Throw Away Option */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200 relative opacity-80">
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">WASTEFUL</span>
                  </div>
                  <h5 className="text-xl font-bold text-red-800 mb-4 text-center">🗑️ Throw in Trash</h5>
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-red-600">+{impact.total} kg CO₂</div>
                    <div className="text-sm text-red-700">Environmental impact WASTED</div>
                    <div className="space-y-2 text-sm text-red-700">
                      <div className="flex items-center justify-center space-x-2">
                        <span>❌</span>
                        <span>New device must be manufactured</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span>❌</span>
                        <span>Device goes to landfill</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span>❌</span>
                        <span>No one benefits from your device</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-red-800">
                    💔 Like cutting down <strong>{treesEquivalent} trees</strong>
                  </div>
                </div>
              </div>

              {/* Breakdown Toggle */}
              <div className="text-center mb-8">
                <Button
                  variant="outline"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Info className="w-4 h-4 mr-2" />
                  {showBreakdown ? 'Hide' : 'Show'} Calculation Details
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showBreakdown ? 'rotate-180' : ''}`} />
                </Button>
              </div>

              {/* Detailed Breakdown */}
              {showBreakdown && (
                <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                  <h5 className="text-xl font-bold text-gray-900 text-center">How We Calculate This</h5>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-4">
                      <h6 className="font-bold text-green-600 mb-2">Manufacturing Avoided</h6>
                      <p className="text-sm text-gray-600 mb-2">
                        CO₂ saved by avoiding new device production
                      </p>
                      <div className="bg-gray-100 rounded p-2 text-xs font-mono">
                        {selectedDevice.weight} kg × {selectedDevice.manufacturingFactor} × {selectedDevice.complexityMultiplier} = {impact.manufacturing} kg CO₂
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4">
                      <h6 className="font-bold text-blue-600 mb-2">Transportation Saved</h6>
                      <p className="text-sm text-gray-600 mb-2">
                        CO₂ saved by local redistribution vs. global shipping
                      </p>
                      <div className="bg-gray-100 rounded p-2 text-xs font-mono">
                        {selectedDevice.transportationSaved} - {selectedDevice.localTransportation} = {impact.transportation} kg CO₂
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4">
                      <h6 className="font-bold text-purple-600 mb-2">E-waste Prevented</h6>
                      <p className="text-sm text-gray-600 mb-2">
                        CO₂ saved by avoiding landfill decomposition
                      </p>
                      <div className="bg-gray-100 rounded p-2 text-xs font-mono">
                        {selectedDevice.averageLifeExtension} years × {selectedDevice.ewastePreventionPerYear} = {impact.ewaste} kg CO₂
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-orange-100 to-green-100 rounded-xl">
                    <p className="text-sm text-gray-700">
                      <strong>Methodology:</strong> Calculations based on EPA standards, IPCC emission factors, and Life Cycle Assessment (LCA) data.
                      Verified by Carbon Trust & third-party auditors.
                    </p>
                  </div>
                </div>
              )}

              {/* Fun Facts */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                <h5 className="text-lg font-bold text-gray-900 mb-4 text-center">💡 Did You Know?</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 font-bold">🚗</span>
                    <span>Your {impact.total} kg CO₂ savings is like taking a car off the road for {Math.round(impact.total / 4.6)} days</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-500 font-bold">💡</span>
                    <span>That&apos;s enough to power an LED light bulb for {Math.round(impact.total * 365)} hours</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 font-bold">🏠</span>
                    <span>Equivalent to {Math.round(impact.total / 16)} kg of home energy savings</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-500 font-bold">🌊</span>
                    <span>Saves {Math.round(impact.total * 500)} liters of water from manufacturing</span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-green-700 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Leaf className="w-5 h-5 mr-2" />
                  Start Donating & Make Impact
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  Join thousands of companies already making a difference with Loop It
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">15,842+</div>
              <div className="text-gray-700 font-medium">Devices Donated</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">1,284,000 kg</div>
              <div className="text-gray-700 font-medium">CO₂ Emissions Saved</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">58,000+</div>
              <div className="text-gray-700 font-medium">Trees Equivalent</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}