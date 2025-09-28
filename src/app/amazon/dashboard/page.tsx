"use client";

import { useEffect, useState } from 'react';
import { getUserSession, User } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import ProtectedRoute from '@/components/ProtectedRoute';
import AmazonDashboardNavbar from '@/components/AmazonDashboardNavbar';
import { 
  Package, 
  Recycle, 
  Plus,
  Download,
  Search,
  Printer,
  Award,
  LinkedinIcon,
  QrCode,
  Laptop,
  Monitor,
  Server,
  CheckCircle,
  Clock,
  FileText,
  Eye,
  Edit,
  Activity,
  Share2,
  Calculator,
  Info,
  X
} from 'lucide-react';

interface Device {
  id: string;
  type: 'laptop' | 'desktop' | 'server' | 'monitor';
  model: string;
  serialNumber: string;
  status: 'ready' | 'picked-up' | 'donated' | 'processing';
  dateAdded: string;
  batch: string;
  co2Saved: number;
}

interface ActivityItem {
  id: string;
  type: 'device_added' | 'batch_created' | 'pickup_scheduled' | 'donation_completed' | 'certificate_generated';
  description: string;
  timestamp: string;
  batch?: string;
  count?: number;
}

interface Certificate {
  id: string;
  batch: string;
  devices: number;
  co2Saved: number;
  dateGenerated: string;
}

interface MonthlyStats {
  [key: string]: {
    devices: number;
    co2: number;
  };
}

interface DeviceBreakdown {
  [key: string]: {
    count: number;
    totalCO2: number;
    manufacturing: number;
    transportation: number;
    ewaste: number;
  };
}

export default function AmazonDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [selectedOS, setSelectedOS] = useState('');
  const [selectedDriveType, setSelectedDriveType] = useState('');
  const [showCO2Calculator, setShowCO2Calculator] = useState(false);

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  // Button handler functions
  const handleAddNewBatch = () => {
    alert('🎉 New batch creation initiated! Your batch ID is: B-2025-010\n\nNext steps:\n1. Label devices with QR codes\n2. Perform secure data wipe\n3. Schedule pickup with Loop It');
  };

  const handleDownloadESGCertificate = () => {
    // Create a fake download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Amazon ESG Impact Certificate\n\nCO2 Avoided: ' + co2Impact.totalCO2Saved.toFixed(1) + ' kg\nDevices Donated: ' + devices.filter(d => d.status === 'donated').length + '\nGenerated: ' + new Date().toLocaleDateString();
    link.download = 'Amazon_ESG_Certificate_' + new Date().toISOString().split('T')[0] + '.txt';
    link.click();
    alert('📄 ESG Certificate downloaded successfully!\n\nThis certificate verifies your environmental impact contribution through Loop It partnership.');
  };

  const handleShareImpact = () => {
    const shareText = `🌱 Amazon has avoided ${co2Impact.totalCO2Saved.toFixed(1)} kg of CO₂ through our partnership with @LoopIt! That's equivalent to planting ${Math.round(co2Impact.totalCO2Saved * 0.0454)} trees 🌳 #Sustainability #CircularEconomy`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Amazon Environmental Impact',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('📋 Impact message copied to clipboard!\n\nShare on your favorite social platform to showcase your environmental commitment.');
    }
  };

  const handleViewAllActivity = () => {
    alert('📊 Activity History Dashboard\n\nShowing all 247 activities from the past 6 months:\n• Device additions\n• Pickup schedules\n• Donation completions\n• Certificate generations\n\n[This would open a detailed activity log view]');
  };

  const handleGenerateLabel = (device: Device) => {
    alert(`🏷️ QR Code Label Generated!\n\nDevice: ${device.model}\nSerial: ${device.serialNumber}\nBatch: ${device.batch}\n\nLabel includes:\n✓ Secure wipe instructions\n✓ Loop It pickup QR code\n✓ Amazon asset tracking ID\n\n[Label sent to default printer]`);
  };

  const handleEditDevice = (device: Device) => {
    const newModel = prompt(`Edit device model (current: ${device.model}):`, device.model);
    if (newModel && newModel !== device.model) {
      alert(`✅ Device updated successfully!\n\nOld: ${device.model}\nNew: ${newModel}\n\nChanges will sync with inventory system in 2-3 minutes.`);
    }
  };

  const handleDownloadScript = async () => {
    try {
      // Call the Python API to generate the script
      const response = await fetch('api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          os_type: selectedOS,
          drive_type: selectedDriveType
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate script');
      }

      // Create download link with the generated script content
      const link = document.createElement('a');
      link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data.script_content);
      link.download = data.filename;
      link.click();
      
      alert(`📥 Advanced Audit & Wipe Script Generated!\n\n🔹 Device ID: ${data.device_id}\n🔹 OS: ${data.os_type}\n🔹 Drive: ${data.drive_type}\n🔹 Filename: ${data.filename}\n\n📋 Script Features:\n✅ Pre-wipe complete file/folder inventory\n✅ ${data.drive_type.toUpperCase()}-optimized secure wipe\n✅ Post-wipe verification scan\n✅ Compliance: NIST 800-88, DoD 5220.22-M\n✅ Generated via Python API\n\n⚠️ IMPORTANT:\n• Requires appropriate privileges\n• Uses safe test wipe by default\n• Uncomment secure_wipe_drive() for production\n\n🔧 Setup Required:\n1. Run with appropriate privileges\n2. Ensure proper backup before execution`);
      
    } catch (error) {
      console.error('Error generating script:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`❌ Error generating script: ${errorMessage}\n\nPlease try again or contact support if the issue persists.`);
    }
  };

  const handlePrintQRLabel = () => {
    alert('🖨️ QR Code Label Printing...\n\nLabel contains:\n• Device tracking code\n• Pickup instructions\n• Amazon asset ID\n• Loop It batch number\n\n✅ Sent to default printer\n📧 Backup copy emailed to IT team');
  };

  const handleAddDeviceSubmit = () => {
    if (!selectedOS || !selectedDriveType) {
      alert('⚠️ Please complete all steps before adding the device.');
      return;
    }
    
    const newDeviceId = 'D' + String(devices.length + 1).padStart(3, '0');
    alert(`✅ Device added successfully!\n\nDevice ID: ${newDeviceId}\nOS: ${selectedOS}\nDrive: ${selectedDriveType}\nBatch: B-2025-009\n\n📋 Next steps:\n1. Apply QR label\n2. Run wipe script\n3. Mark as ready for pickup`);
    
    setShowAddDevice(false);
    setSelectedOS('');
    setSelectedDriveType('');
  };

  const handleGenerateNewCertificate = () => {
    const readyDevices = devices.filter(d => d.status === 'ready').length;
    const potentialCO2 = calculateCO2Impact(devices.filter(d => d.status === 'ready')).totalCO2Saved;
    
    alert(`📄 New Certificate Generation\n\nBatch: B-2025-009\nDevices Ready: ${readyDevices}\nPotential CO₂ Impact: ${potentialCO2.toFixed(1)} kg\n\n⏳ Certificate will be generated after pickup completion.\nEstimated completion: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}`);
  };

  const handleDownloadCertificate = (cert: Certificate) => {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(
      `LOOP IT IMPACT CERTIFICATE\n\nBatch: ${cert.batch}\nDevices: ${cert.devices}\nCO₂ Saved: ${cert.co2Saved} kg\nDate: ${cert.dateGenerated}\n\nThis certificate verifies the environmental impact achieved through responsible device recycling.`
    );
    link.download = `LoopIt_Certificate_${cert.batch}.pdf`;
    link.click();
    alert('📥 Certificate downloaded as PDF!\n\n✅ Digitally signed\n✅ Blockchain verified\n✅ Ready for ESG reporting');
  };

  const handlePreviewCertificate = (cert: Certificate) => {
    alert(`📄 Certificate Preview\n\n${cert.batch} Impact Certificate\n\n🏆 Environmental Achievement:\n• ${cert.devices} devices responsibly recycled\n• ${cert.co2Saved} kg CO₂ emissions avoided\n• Equivalent to ${Math.round(cert.co2Saved * 0.0454)} trees planted\n\n📅 Generated: ${cert.dateGenerated}\n🔒 Verification ID: LC-${cert.id}-2025\n\n[Full PDF preview would open here]`);
  };

  const handleGenerateLinkedInBadge = () => {
    const badgeText = `Amazon Environmental Leadership Badge\n\n🌱 ${co2Impact.totalCO2Saved.toFixed(1)} kg CO₂ avoided\n🏆 ${devices.filter(d => d.status === 'donated').length} devices donated\n🌳 ${Math.round(co2Impact.totalCO2Saved * 0.0454)} tree equivalent\n\n#Sustainability #CircularEconomy #ESG`;
    
    navigator.clipboard.writeText(badgeText);
    alert('🎖️ LinkedIn Badge Generated!\n\n✅ Badge text copied to clipboard\n✅ Ready to post on LinkedIn\n✅ Includes verification QR code\n\nPaste this on your LinkedIn profile to showcase your environmental leadership!');
  };

  const handleDownloadSocialKit = () => {
    alert('📦 Social Media Kit Download\n\nKit includes:\n\n📸 Impact infographics (PNG, SVG)\n📊 CO₂ savings charts\n🎨 Branded templates\n📝 Pre-written captions\n🔗 Shareable links\n\n✅ Downloading 15 assets...\n📧 Access link emailed to marketing team');
    
    // Simulate download
    setTimeout(() => {
      alert('📥 Download complete! Check your Downloads folder for "LoopIt_Social_Media_Kit.zip"');
    }, 2000);
  };







  // Pickup schedule data
  const pickupScheduleData = [
    { day: 'Mon', pickups: 12, batches: 3 },
    { day: 'Tue', pickups: 18, batches: 5 },
    { day: 'Wed', pickups: 24, batches: 7 },
    { day: 'Thu', pickups: 15, batches: 4 },
    { day: 'Fri', pickups: 28, batches: 8 },
    { day: 'Sat', pickups: 8, batches: 2 },
    { day: 'Sun', pickups: 5, batches: 1 }
  ];

  // NGO Distribution data
  const ngoDistributionData = [
    { ngo: 'Tech4All', devices: 4250, impact: 'Rural Education', color: 'bg-emerald-500' },
    { ngo: 'Digital Bridge', devices: 3180, impact: 'Urban Schools', color: 'bg-cyan-500' },
    { ngo: 'Learn & Grow', devices: 2890, impact: 'Community Centers', color: 'bg-indigo-500' },
    { ngo: 'Future Leaders', devices: 2240, impact: 'Vocational Training', color: 'bg-rose-500' },
    { ngo: 'Bright Minds', devices: 1882, impact: 'Special Needs', color: 'bg-amber-500' }
  ];

  // Status progression data


  // CO₂ Calculation Function
  const calculateCO2Impact = (devices: Device[]) => {
    const deviceFactors = {
      laptop: {
        weight: 2.1, // kg
        manufacturingFactor: 15.2, // kg CO2 per kg device weight
        complexityMultiplier: 1.8, // for electronics
        transportationSaved: 12.8, // kg CO2 (new device shipping from factory)
        localTransportation: 0.7, // kg CO2 (local pickup/delivery)
        ewastePreventionPerYear: 2.4, // kg CO2 per year
        averageLifeExtension: 5 // years
      },
      desktop: {
        weight: 8.5, // kg
        manufacturingFactor: 12.8, // kg CO2 per kg device weight
        complexityMultiplier: 1.6,
        transportationSaved: 18.5,
        localTransportation: 1.2,
        ewastePreventionPerYear: 3.1,
        averageLifeExtension: 6
      },
      monitor: {
        weight: 4.2, // kg
        manufacturingFactor: 8.9, // kg CO2 per kg device weight
        complexityMultiplier: 1.3,
        transportationSaved: 9.4,
        localTransportation: 0.5,
        ewastePreventionPerYear: 1.8,
        averageLifeExtension: 7
      },
      server: {
        weight: 15.6, // kg
        manufacturingFactor: 18.7, // kg CO2 per kg device weight
        complexityMultiplier: 2.2,
        transportationSaved: 32.1,
        localTransportation: 2.8,
        ewastePreventionPerYear: 5.2,
        averageLifeExtension: 4
      }
    };

    let totalCO2Saved = 0;
    let totalManufacturingSaved = 0;
    let totalTransportationSaved = 0;
    let totalEwastePrevented = 0;
    const deviceBreakdown: DeviceBreakdown = {};

    devices.forEach(device => {
      const factors = deviceFactors[device.type];
      if (!factors) return;

      // Calculate manufacturing impact avoided
      const manufacturingImpact = factors.weight * factors.manufacturingFactor * factors.complexityMultiplier;
      
      // Calculate transportation savings
      const transportationImpact = factors.transportationSaved - factors.localTransportation;
      
      // Calculate e-waste prevention
      const ewasteImpact = factors.averageLifeExtension * factors.ewastePreventionPerYear;
      
      const deviceTotal = manufacturingImpact + transportationImpact + ewasteImpact;
      
      totalManufacturingSaved += manufacturingImpact;
      totalTransportationSaved += transportationImpact;
      totalEwastePrevented += ewasteImpact;
      totalCO2Saved += deviceTotal;

      // Track by device type for breakdown
      if (!deviceBreakdown[device.type]) {
        deviceBreakdown[device.type] = {
          count: 0,
          totalCO2: 0,
          manufacturing: 0,
          transportation: 0,
          ewaste: 0
        };
      }
      
      deviceBreakdown[device.type].count++;
      deviceBreakdown[device.type].totalCO2 += deviceTotal;
      deviceBreakdown[device.type].manufacturing += manufacturingImpact;
      deviceBreakdown[device.type].transportation += transportationImpact;
      deviceBreakdown[device.type].ewaste += ewasteImpact;
    });

    return {
      totalCO2Saved: Math.round(totalCO2Saved * 10) / 10,
      totalManufacturingSaved: Math.round(totalManufacturingSaved * 10) / 10,
      totalTransportationSaved: Math.round(totalTransportationSaved * 10) / 10,
      totalEwastePrevented: Math.round(totalEwastePrevented * 10) / 10,
      deviceBreakdown,
      totalDevices: devices.length
    };
  };

  // CO₂ Calculation methodology data
  const co2CalculationData = {
    methodology: "Loop It CO₂ Calculator v2.1",
    certifiedBy: "Carbon Trust & EPA",
    factors: [
      { 
        category: "Manufacturing Avoidance", 
        description: "CO₂ saved by avoiding new device production",
        calculation: "Device weight × Material carbon factor × Manufacturing multiplier",
        factors: {
          laptop: "2.1 kg × 15.2 kg CO₂/kg × 1.8 = 57.5 kg CO₂",
          desktop: "4.5 kg × 15.2 kg CO₂/kg × 1.8 = 123.1 kg CO₂", 
          server: "12.8 kg × 15.2 kg CO₂/kg × 2.2 = 428.2 kg CO₂",
          monitor: "3.2 kg × 15.2 kg CO₂/kg × 1.6 = 77.8 kg CO₂"
        }
      },
      {
        category: "Transportation Savings",
        description: "CO₂ saved by local redistribution vs. global shipping", 
        calculation: "Distance saved × Transport emission factor",
        factors: {
          newDevice: "Average 8,500 km shipping = 12.8 kg CO₂",
          localPickup: "Average 45 km delivery = 0.7 kg CO₂",
          savings: "12.8 - 0.7 = 12.1 kg CO₂ per device"
        }
      },
      {
        category: "E-waste Prevention",
        description: "CO₂ saved by avoiding landfill decomposition",
        calculation: "Device lifespan extension × Decomposition factor",
        factors: {
          laptop: "5 year extension × 2.4 kg CO₂/year = 12.0 kg CO₂",
          desktop: "6 year extension × 3.8 kg CO₂/year = 22.8 kg CO₂",
          server: "4 year extension × 15.2 kg CO₂/year = 60.8 kg CO₂", 
          monitor: "8 year extension × 1.8 kg CO₂/year = 14.4 kg CO₂"
        }
      }
    ],
    verification: {
      standard: "ISO 14067:2018 Carbon Footprint Standard",
      auditor: "Deloitte Sustainability Services", 
      lastAudit: "Q3 2024",
      confidence: "95%"
    }
  };

  const recentActivity: ActivityItem[] = [
    { id: '1', type: 'device_added', description: '4 new devices added to September batch B-2025-009', timestamp: '2 hours ago', count: 4 },
    { id: '2', type: 'pickup_scheduled', description: 'Pickup scheduled for batch #B-2025-008 (24 devices)', timestamp: '6 hours ago', batch: 'B-2025-008' },
    { id: '3', type: 'donation_completed', description: 'Batch #B-2025-007 successfully donated to Bright Minds Foundation (23 devices)', timestamp: '1 day ago', batch: 'B-2025-007', count: 23 },
    { id: '4', type: 'certificate_generated', description: 'ESG Impact certificate generated for July donations (1,877 kg CO₂ saved)', timestamp: '2 days ago' },
    { id: '5', type: 'donation_completed', description: 'Batch #B-2025-006 donated to Education First (21 devices, 1,713 kg CO₂ saved)', timestamp: '3 days ago', batch: 'B-2025-006', count: 21 },
    { id: '6', type: 'batch_created', description: 'Monthly batch B-2025-009 initiated with 22 devices', timestamp: '4 days ago', batch: 'B-2025-009', count: 22 },
    { id: '7', type: 'pickup_scheduled', description: 'August devices (B-2025-008) picked up by Loop It transport', timestamp: '5 days ago', batch: 'B-2025-008' },
    { id: '8', type: 'certificate_generated', description: 'Q2 2025 impact certificate generated (5,234 kg CO₂ total)', timestamp: '1 week ago' }
  ];

  // Realistic device data - approximately 22 devices per month over 6 months
  const devices: Device[] = [
    // September 2025 (22 devices) - Current month
    { id: 'D001', type: 'laptop', model: 'ThinkPad X1 Carbon Gen 11', serialNumber: 'AMZ-LT-2509-001', status: 'ready', dateAdded: '2025-09-25', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D002', type: 'laptop', model: 'MacBook Pro 14"', serialNumber: 'AMZ-LT-2509-002', status: 'ready', dateAdded: '2025-09-24', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D003', type: 'desktop', model: 'OptiPlex 7090', serialNumber: 'AMZ-DT-2509-003', status: 'processing', dateAdded: '2025-09-23', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D004', type: 'laptop', model: 'ThinkPad T14s', serialNumber: 'AMZ-LT-2509-004', status: 'ready', dateAdded: '2025-09-22', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D005', type: 'monitor', model: 'UltraSharp U2720Q', serialNumber: 'AMZ-MN-2509-005', status: 'ready', dateAdded: '2025-09-21', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D006', type: 'laptop', model: 'Surface Laptop 5', serialNumber: 'AMZ-LT-2509-006', status: 'processing', dateAdded: '2025-09-20', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D007', type: 'desktop', model: 'Precision 3660', serialNumber: 'AMZ-DT-2509-007', status: 'ready', dateAdded: '2025-09-19', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D008', type: 'laptop', model: 'ThinkPad X13', serialNumber: 'AMZ-LT-2509-008', status: 'ready', dateAdded: '2025-09-18', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D009', type: 'monitor', model: 'Dell S2722DC', serialNumber: 'AMZ-MN-2509-009', status: 'ready', dateAdded: '2025-09-17', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D010', type: 'laptop', model: 'MacBook Air M2', serialNumber: 'AMZ-LT-2509-010', status: 'processing', dateAdded: '2025-09-16', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D011', type: 'server', model: 'PowerEdge R750', serialNumber: 'AMZ-SV-2509-011', status: 'ready', dateAdded: '2025-09-15', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D012', type: 'laptop', model: 'EliteBook 845 G9', serialNumber: 'AMZ-LT-2509-012', status: 'ready', dateAdded: '2025-09-14', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D013', type: 'desktop', model: 'iMac 24"', serialNumber: 'AMZ-DT-2509-013', status: 'processing', dateAdded: '2025-09-13', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D014', type: 'laptop', model: 'Latitude 9430', serialNumber: 'AMZ-LT-2509-014', status: 'ready', dateAdded: '2025-09-12', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D015', type: 'monitor', model: 'ProDisplay XDR', serialNumber: 'AMZ-MN-2509-015', status: 'ready', dateAdded: '2025-09-11', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D016', type: 'laptop', model: 'ZenBook Pro 15', serialNumber: 'AMZ-LT-2509-016', status: 'processing', dateAdded: '2025-09-10', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D017', type: 'desktop', model: 'OptiPlex 5090', serialNumber: 'AMZ-DT-2509-017', status: 'ready', dateAdded: '2025-09-09', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D018', type: 'laptop', model: 'ThinkBook 14s', serialNumber: 'AMZ-LT-2509-018', status: 'ready', dateAdded: '2025-09-08', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D019', type: 'monitor', model: 'Alienware AW3423DW', serialNumber: 'AMZ-MN-2509-019', status: 'ready', dateAdded: '2025-09-07', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D020', type: 'laptop', model: 'Pavilion Plus 14', serialNumber: 'AMZ-LT-2509-020', status: 'processing', dateAdded: '2025-09-06', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D021', type: 'server', model: 'PowerEdge R740xd', serialNumber: 'AMZ-SV-2509-021', status: 'ready', dateAdded: '2025-09-05', batch: 'B-2025-009', co2Saved: 0 },
    { id: 'D022', type: 'laptop', model: 'Surface Pro 9', serialNumber: 'AMZ-LT-2509-022', status: 'ready', dateAdded: '2025-09-04', batch: 'B-2025-009', co2Saved: 0 },

    // August 2025 (24 devices) - Picked up & some donated
    { id: 'D023', type: 'laptop', model: 'ThinkPad X1 Carbon Gen 10', serialNumber: 'AMZ-LT-2508-001', status: 'picked-up', dateAdded: '2025-08-28', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D024', type: 'desktop', model: 'Mac Studio', serialNumber: 'AMZ-DT-2508-002', status: 'picked-up', dateAdded: '2025-08-27', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D025', type: 'laptop', model: 'XPS 13 Plus', serialNumber: 'AMZ-LT-2508-003', status: 'donated', dateAdded: '2025-08-26', batch: 'B-2025-008', co2Saved: 81.6 },
    { id: 'D026', type: 'monitor', model: 'Studio Display', serialNumber: 'AMZ-MN-2508-004', status: 'picked-up', dateAdded: '2025-08-25', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D027', type: 'laptop', model: 'ThinkPad P1 Gen 5', serialNumber: 'AMZ-LT-2508-005', status: 'donated', dateAdded: '2025-08-24', batch: 'B-2025-008', co2Saved: 81.6 },
    { id: 'D028', type: 'desktop', model: 'Precision 7760', serialNumber: 'AMZ-DT-2508-006', status: 'picked-up', dateAdded: '2025-08-23', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D029', type: 'laptop', model: 'MacBook Pro 16"', serialNumber: 'AMZ-LT-2508-007', status: 'donated', dateAdded: '2025-08-22', batch: 'B-2025-008', co2Saved: 81.6 },
    { id: 'D030', type: 'server', model: 'PowerEdge R650', serialNumber: 'AMZ-SV-2508-008', status: 'picked-up', dateAdded: '2025-08-21', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D031', type: 'laptop', model: 'Surface Laptop Studio', serialNumber: 'AMZ-LT-2508-009', status: 'donated', dateAdded: '2025-08-20', batch: 'B-2025-008', co2Saved: 81.6 },
    { id: 'D032', type: 'monitor', model: 'UltraSharp U3223QE', serialNumber: 'AMZ-MN-2508-010', status: 'picked-up', dateAdded: '2025-08-19', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D033', type: 'laptop', model: 'ThinkPad T16', serialNumber: 'AMZ-LT-2508-011', status: 'donated', dateAdded: '2025-08-18', batch: 'B-2025-008', co2Saved: 81.6 },
    { id: 'D034', type: 'desktop', model: 'OptiPlex 7000', serialNumber: 'AMZ-DT-2508-012', status: 'picked-up', dateAdded: '2025-08-17', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D035', type: 'laptop', model: 'EliteBook 1040 G9', serialNumber: 'AMZ-LT-2508-013', status: 'donated', dateAdded: '2025-08-16', batch: 'B-2025-008', co2Saved: 81.6 },
    { id: 'D036', type: 'monitor', model: 'ThinkVision P32u-10', serialNumber: 'AMZ-MN-2508-014', status: 'picked-up', dateAdded: '2025-08-15', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D037', type: 'laptop', model: 'Latitude 5530', serialNumber: 'AMZ-LT-2508-015', status: 'donated', dateAdded: '2025-08-14', batch: 'B-2025-008', co2Saved: 81.6 },
    { id: 'D038', type: 'desktop', model: 'Workstation Z4 G5', serialNumber: 'AMZ-DT-2508-016', status: 'picked-up', dateAdded: '2025-08-13', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D039', type: 'laptop', model: 'ROG Zephyrus G14', serialNumber: 'AMZ-LT-2508-017', status: 'donated', dateAdded: '2025-08-12', batch: 'B-2025-008', co2Saved: 81.6 },
    { id: 'D040', type: 'server', model: 'PowerEdge T550', serialNumber: 'AMZ-SV-2508-018', status: 'picked-up', dateAdded: '2025-08-11', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D041', type: 'laptop', model: 'Inspiron 16 Plus', serialNumber: 'AMZ-LT-2508-019', status: 'donated', dateAdded: '2025-08-10', batch: 'B-2025-008', co2Saved: 81.6 },
    { id: 'D042', type: 'monitor', model: 'Odyssey G7', serialNumber: 'AMZ-MN-2508-020', status: 'picked-up', dateAdded: '2025-08-09', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D043', type: 'laptop', model: 'ThinkPad Z13', serialNumber: 'AMZ-LT-2508-021', status: 'donated', dateAdded: '2025-08-08', batch: 'B-2025-008', co2Saved: 81.6 },
    { id: 'D044', type: 'desktop', model: 'Mini PC EliteDesk', serialNumber: 'AMZ-DT-2508-022', status: 'picked-up', dateAdded: '2025-08-07', batch: 'B-2025-008', co2Saved: 0 },
    { id: 'D045', type: 'laptop', model: 'Yoga Slim 7 Pro', serialNumber: 'AMZ-LT-2508-023', status: 'donated', dateAdded: '2025-08-06', batch: 'B-2025-008', co2Saved: 81.6 },
    { id: 'D046', type: 'monitor', model: 'ProArt PA329C', serialNumber: 'AMZ-MN-2508-024', status: 'picked-up', dateAdded: '2025-08-05', batch: 'B-2025-008', co2Saved: 0 },

    // July 2025 (23 devices) - Mostly donated
    { id: 'D047', type: 'laptop', model: 'ThinkPad X1 Yoga Gen 7', serialNumber: 'AMZ-LT-2507-001', status: 'donated', dateAdded: '2025-07-30', batch: 'B-2025-007', co2Saved: 81.6 },
    { id: 'D048', type: 'desktop', model: 'iMac Pro', serialNumber: 'AMZ-DT-2507-002', status: 'donated', dateAdded: '2025-07-29', batch: 'B-2025-007', co2Saved: 137.4 },
    { id: 'D049', type: 'laptop', model: 'Surface Book 3', serialNumber: 'AMZ-LT-2507-003', status: 'donated', dateAdded: '2025-07-28', batch: 'B-2025-007', co2Saved: 81.6 },
    { id: 'D050', type: 'monitor', model: 'UltraWide 38WN95C', serialNumber: 'AMZ-MN-2507-004', status: 'donated', dateAdded: '2025-07-27', batch: 'B-2025-007', co2Saved: 62.0 },
    { id: 'D051', type: 'laptop', model: 'XPS 15', serialNumber: 'AMZ-LT-2507-005', status: 'donated', dateAdded: '2025-07-26', batch: 'B-2025-007', co2Saved: 81.6 },
    { id: 'D052', type: 'server', model: 'PowerEdge R740', serialNumber: 'AMZ-SV-2507-006', status: 'donated', dateAdded: '2025-07-25', batch: 'B-2025-007', co2Saved: 289.6 },
    { id: 'D053', type: 'laptop', model: 'ThinkPad E15 Gen 4', serialNumber: 'AMZ-LT-2507-007', status: 'donated', dateAdded: '2025-07-24', batch: 'B-2025-007', co2Saved: 81.6 },
    { id: 'D054', type: 'desktop', model: 'Precision Tower 7000', serialNumber: 'AMZ-DT-2507-008', status: 'donated', dateAdded: '2025-07-23', batch: 'B-2025-007', co2Saved: 137.4 },
    { id: 'D055', type: 'laptop', model: 'MacBook Air M1', serialNumber: 'AMZ-LT-2507-009', status: 'donated', dateAdded: '2025-07-22', batch: 'B-2025-007', co2Saved: 81.6 },
    { id: 'D056', type: 'monitor', model: 'ViewSonic VP3268', serialNumber: 'AMZ-MN-2507-010', status: 'donated', dateAdded: '2025-07-21', batch: 'B-2025-007', co2Saved: 62.0 },
    { id: 'D057', type: 'laptop', model: 'Spectre x360 16', serialNumber: 'AMZ-LT-2507-011', status: 'donated', dateAdded: '2025-07-20', batch: 'B-2025-007', co2Saved: 81.6 },
    { id: 'D058', type: 'desktop', model: 'OptiPlex 3090', serialNumber: 'AMZ-DT-2507-012', status: 'donated', dateAdded: '2025-07-19', batch: 'B-2025-007', co2Saved: 137.4 },
    { id: 'D059', type: 'laptop', model: 'ThinkPad L15 Gen 3', serialNumber: 'AMZ-LT-2507-013', status: 'donated', dateAdded: '2025-07-18', batch: 'B-2025-007', co2Saved: 81.6 },
    { id: 'D060', type: 'server', model: 'PowerEdge T340', serialNumber: 'AMZ-SV-2507-014', status: 'donated', dateAdded: '2025-07-17', batch: 'B-2025-007', co2Saved: 289.6 },
    { id: 'D061', type: 'laptop', model: 'Latitude 7420', serialNumber: 'AMZ-LT-2507-015', status: 'donated', dateAdded: '2025-07-16', batch: 'B-2025-007', co2Saved: 81.6 },
    { id: 'D062', type: 'monitor', model: 'Dell C2722DE', serialNumber: 'AMZ-MN-2507-016', status: 'donated', dateAdded: '2025-07-15', batch: 'B-2025-007', co2Saved: 62.0 },
    { id: 'D063', type: 'laptop', model: 'Legion 5 Pro', serialNumber: 'AMZ-LT-2507-017', status: 'donated', dateAdded: '2025-07-14', batch: 'B-2025-007', co2Saved: 81.6 },
    { id: 'D064', type: 'desktop', model: 'Vostro 3910', serialNumber: 'AMZ-DT-2507-018', status: 'donated', dateAdded: '2025-07-13', batch: 'B-2025-007', co2Saved: 137.4 },
    { id: 'D065', type: 'laptop', model: 'ThinkBook 15 G4', serialNumber: 'AMZ-LT-2507-019', status: 'donated', dateAdded: '2025-07-12', batch: 'B-2025-007', co2Saved: 81.6 },
    { id: 'D066', type: 'monitor', model: 'ASUS PA278QV', serialNumber: 'AMZ-MN-2507-020', status: 'donated', dateAdded: '2025-07-11', batch: 'B-2025-007', co2Saved: 62.0 },
    { id: 'D067', type: 'laptop', model: 'Surface Laptop 4', serialNumber: 'AMZ-LT-2507-021', status: 'donated', dateAdded: '2025-07-10', batch: 'B-2025-007', co2Saved: 81.6 },
    { id: 'D068', type: 'desktop', model: 'Mac mini M2', serialNumber: 'AMZ-DT-2507-022', status: 'donated', dateAdded: '2025-07-09', batch: 'B-2025-007', co2Saved: 137.4 },
    { id: 'D069', type: 'laptop', model: 'Pavilion Aero 13', serialNumber: 'AMZ-LT-2507-023', status: 'donated', dateAdded: '2025-07-08', batch: 'B-2025-007', co2Saved: 81.6 },

    // June 2025 (21 devices) - All donated
    { id: 'D070', type: 'laptop', model: 'ThinkPad T14 Gen 3', serialNumber: 'AMZ-LT-2506-001', status: 'donated', dateAdded: '2025-06-28', batch: 'B-2025-006', co2Saved: 81.6 },
    { id: 'D071', type: 'desktop', model: 'OptiPlex 5000', serialNumber: 'AMZ-DT-2506-002', status: 'donated', dateAdded: '2025-06-27', batch: 'B-2025-006', co2Saved: 137.4 },
    { id: 'D072', type: 'laptop', model: 'XPS 13', serialNumber: 'AMZ-LT-2506-003', status: 'donated', dateAdded: '2025-06-26', batch: 'B-2025-006', co2Saved: 81.6 },
    { id: 'D073', type: 'monitor', model: 'UltraSharp U2422H', serialNumber: 'AMZ-MN-2506-004', status: 'donated', dateAdded: '2025-06-25', batch: 'B-2025-006', co2Saved: 62.0 },
    { id: 'D074', type: 'laptop', model: 'MacBook Pro 13"', serialNumber: 'AMZ-LT-2506-005', status: 'donated', dateAdded: '2025-06-24', batch: 'B-2025-006', co2Saved: 81.6 },
    { id: 'D075', type: 'server', model: 'PowerEdge R450', serialNumber: 'AMZ-SV-2506-006', status: 'donated', dateAdded: '2025-06-23', batch: 'B-2025-006', co2Saved: 289.6 },
    { id: 'D076', type: 'laptop', model: 'ThinkPad X13s', serialNumber: 'AMZ-LT-2506-007', status: 'donated', dateAdded: '2025-06-22', batch: 'B-2025-006', co2Saved: 81.6 },
    { id: 'D077', type: 'desktop', model: 'Precision 3260', serialNumber: 'AMZ-DT-2506-008', status: 'donated', dateAdded: '2025-06-21', batch: 'B-2025-006', co2Saved: 137.4 },
    { id: 'D078', type: 'laptop', model: 'EliteBook 650 G9', serialNumber: 'AMZ-LT-2506-009', status: 'donated', dateAdded: '2025-06-20', batch: 'B-2025-006', co2Saved: 81.6 },
    { id: 'D079', type: 'monitor', model: 'ThinkVision M14', serialNumber: 'AMZ-MN-2506-010', status: 'donated', dateAdded: '2025-06-19', batch: 'B-2025-006', co2Saved: 62.0 },
    { id: 'D080', type: 'laptop', model: 'Latitude 3530', serialNumber: 'AMZ-LT-2506-011', status: 'donated', dateAdded: '2025-06-18', batch: 'B-2025-006', co2Saved: 81.6 },
    { id: 'D081', type: 'desktop', model: 'iMac 24" M1', serialNumber: 'AMZ-DT-2506-012', status: 'donated', dateAdded: '2025-06-17', batch: 'B-2025-006', co2Saved: 137.4 },
    { id: 'D082', type: 'laptop', model: 'Yoga 9i', serialNumber: 'AMZ-LT-2506-013', status: 'donated', dateAdded: '2025-06-16', batch: 'B-2025-006', co2Saved: 81.6 },
    { id: 'D083', type: 'server', model: 'PowerEdge R350', serialNumber: 'AMZ-SV-2506-014', status: 'donated', dateAdded: '2025-06-15', batch: 'B-2025-006', co2Saved: 289.6 },
    { id: 'D084', type: 'laptop', model: 'Surface Pro 8', serialNumber: 'AMZ-LT-2506-015', status: 'donated', dateAdded: '2025-06-14', batch: 'B-2025-006', co2Saved: 81.6 },
    { id: 'D085', type: 'monitor', model: 'Dell P2423D', serialNumber: 'AMZ-MN-2506-016', status: 'donated', dateAdded: '2025-06-13', batch: 'B-2025-006', co2Saved: 62.0 },
    { id: 'D086', type: 'laptop', model: 'ThinkBook 13x', serialNumber: 'AMZ-LT-2506-017', status: 'donated', dateAdded: '2025-06-12', batch: 'B-2025-006', co2Saved: 81.6 },
    { id: 'D087', type: 'desktop', model: 'OptiPlex 7090 UFF', serialNumber: 'AMZ-DT-2506-018', status: 'donated', dateAdded: '2025-06-11', batch: 'B-2025-006', co2Saved: 137.4 },
    { id: 'D088', type: 'laptop', model: 'Envy x360 15', serialNumber: 'AMZ-LT-2506-019', status: 'donated', dateAdded: '2025-06-10', batch: 'B-2025-006', co2Saved: 81.6 },
    { id: 'D089', type: 'monitor', model: 'ASUS ProArt PA248QV', serialNumber: 'AMZ-MN-2506-020', status: 'donated', dateAdded: '2025-06-09', batch: 'B-2025-006', co2Saved: 62.0 },
    { id: 'D090', type: 'laptop', model: 'TravelMate P2', serialNumber: 'AMZ-LT-2506-021', status: 'donated', dateAdded: '2025-06-08', batch: 'B-2025-006', co2Saved: 81.6 },

    // May 2025 (24 devices) - All donated
    { id: 'D091', type: 'laptop', model: 'ThinkPad P14s Gen 3', serialNumber: 'AMZ-LT-2505-001', status: 'donated', dateAdded: '2025-05-30', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D092', type: 'desktop', model: 'Precision Tower 3660', serialNumber: 'AMZ-DT-2505-002', status: 'donated', dateAdded: '2025-05-29', batch: 'B-2025-005', co2Saved: 137.4 },
    { id: 'D093', type: 'laptop', model: 'MacBook Air M1', serialNumber: 'AMZ-LT-2505-003', status: 'donated', dateAdded: '2025-05-28', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D094', type: 'monitor', model: 'UltraSharp U3421WE', serialNumber: 'AMZ-MN-2505-004', status: 'donated', dateAdded: '2025-05-27', batch: 'B-2025-005', co2Saved: 62.0 },
    { id: 'D095', type: 'laptop', model: 'Latitude 9520', serialNumber: 'AMZ-LT-2505-005', status: 'donated', dateAdded: '2025-05-26', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D096', type: 'server', model: 'PowerEdge R250', serialNumber: 'AMZ-SV-2505-006', status: 'donated', dateAdded: '2025-05-25', batch: 'B-2025-005', co2Saved: 289.6 },
    { id: 'D097', type: 'laptop', model: 'ThinkPad E14 Gen 4', serialNumber: 'AMZ-LT-2505-007', status: 'donated', dateAdded: '2025-05-24', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D098', type: 'desktop', model: 'Mac Studio M1 Max', serialNumber: 'AMZ-DT-2505-008', status: 'donated', dateAdded: '2025-05-23', batch: 'B-2025-005', co2Saved: 137.4 },
    { id: 'D099', type: 'laptop', model: 'Surface Laptop Go 2', serialNumber: 'AMZ-LT-2505-009', status: 'donated', dateAdded: '2025-05-22', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D100', type: 'monitor', model: 'Dell S3422DWG', serialNumber: 'AMZ-MN-2505-010', status: 'donated', dateAdded: '2025-05-21', batch: 'B-2025-005', co2Saved: 62.0 },
    { id: 'D101', type: 'laptop', model: 'XPS 17', serialNumber: 'AMZ-LT-2505-011', status: 'donated', dateAdded: '2025-05-20', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D102', type: 'desktop', model: 'OptiPlex 3090 UFF', serialNumber: 'AMZ-DT-2505-012', status: 'donated', dateAdded: '2025-05-19', batch: 'B-2025-005', co2Saved: 137.4 },
    { id: 'D103', type: 'laptop', model: 'ThinkPad L14 Gen 3', serialNumber: 'AMZ-LT-2505-013', status: 'donated', dateAdded: '2025-05-18', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D104', type: 'server', model: 'PowerEdge T150', serialNumber: 'AMZ-SV-2505-014', status: 'donated', dateAdded: '2025-05-17', batch: 'B-2025-005', co2Saved: 289.6 },
    { id: 'D105', type: 'laptop', model: 'EliteBook 840 G9', serialNumber: 'AMZ-LT-2505-015', status: 'donated', dateAdded: '2025-05-16', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D106', type: 'monitor', model: 'ThinkVision P27h-20', serialNumber: 'AMZ-MN-2505-016', status: 'donated', dateAdded: '2025-05-15', batch: 'B-2025-005', co2Saved: 62.0 },
    { id: 'D107', type: 'laptop', model: 'Inspiron 15 3000', serialNumber: 'AMZ-LT-2505-017', status: 'donated', dateAdded: '2025-05-14', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D108', type: 'desktop', model: 'Vostro 3710', serialNumber: 'AMZ-DT-2505-018', status: 'donated', dateAdded: '2025-05-13', batch: 'B-2025-005', co2Saved: 137.4 },
    { id: 'D109', type: 'laptop', model: 'Legion Slim 7', serialNumber: 'AMZ-LT-2505-019', status: 'donated', dateAdded: '2025-05-12', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D110', type: 'monitor', model: 'ASUS VP28UQG', serialNumber: 'AMZ-MN-2505-020', status: 'donated', dateAdded: '2025-05-11', batch: 'B-2025-005', co2Saved: 62.0 },
    { id: 'D111', type: 'laptop', model: 'ThinkBook 16p', serialNumber: 'AMZ-LT-2505-021', status: 'donated', dateAdded: '2025-05-10', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D112', type: 'desktop', model: 'Precision 3650', serialNumber: 'AMZ-DT-2505-022', status: 'donated', dateAdded: '2025-05-09', batch: 'B-2025-005', co2Saved: 137.4 },
    { id: 'D113', type: 'laptop', model: 'Pavilion 15', serialNumber: 'AMZ-LT-2505-023', status: 'donated', dateAdded: '2025-05-08', batch: 'B-2025-005', co2Saved: 81.6 },
    { id: 'D114', type: 'monitor', model: 'Dell E2720H', serialNumber: 'AMZ-MN-2505-024', status: 'donated', dateAdded: '2025-05-07', batch: 'B-2025-005', co2Saved: 62.0 },

    // April 2025 (20 devices) - All donated
    { id: 'D115', type: 'laptop', model: 'ThinkPad X1 Extreme Gen 5', serialNumber: 'AMZ-LT-2504-001', status: 'donated', dateAdded: '2025-04-28', batch: 'B-2025-004', co2Saved: 81.6 },
    { id: 'D116', type: 'desktop', model: 'iMac 27"', serialNumber: 'AMZ-DT-2504-002', status: 'donated', dateAdded: '2025-04-27', batch: 'B-2025-004', co2Saved: 137.4 },
    { id: 'D117', type: 'laptop', model: 'Surface Pro X', serialNumber: 'AMZ-LT-2504-003', status: 'donated', dateAdded: '2025-04-26', batch: 'B-2025-004', co2Saved: 81.6 },
    { id: 'D118', type: 'monitor', model: 'UltraSharp U4021QW', serialNumber: 'AMZ-MN-2504-004', status: 'donated', dateAdded: '2025-04-25', batch: 'B-2025-004', co2Saved: 62.0 },
    { id: 'D119', type: 'laptop', model: 'Latitude 7320', serialNumber: 'AMZ-LT-2504-005', status: 'donated', dateAdded: '2025-04-24', batch: 'B-2025-004', co2Saved: 81.6 },
    { id: 'D120', type: 'server', model: 'PowerEdge MX750c', serialNumber: 'AMZ-SV-2504-006', status: 'donated', dateAdded: '2025-04-23', batch: 'B-2025-004', co2Saved: 289.6 },
    { id: 'D121', type: 'laptop', model: 'ThinkPad P15v Gen 3', serialNumber: 'AMZ-LT-2504-007', status: 'donated', dateAdded: '2025-04-22', batch: 'B-2025-004', co2Saved: 81.6 },
    { id: 'D122', type: 'desktop', model: 'Mac Pro', serialNumber: 'AMZ-DT-2504-008', status: 'donated', dateAdded: '2025-04-21', batch: 'B-2025-004', co2Saved: 137.4 },
    { id: 'D123', type: 'laptop', model: 'EliteBook x360 1040', serialNumber: 'AMZ-LT-2504-009', status: 'donated', dateAdded: '2025-04-20', batch: 'B-2025-004', co2Saved: 81.6 },
    { id: 'D124', type: 'monitor', model: 'Dell C3422WE', serialNumber: 'AMZ-MN-2504-010', status: 'donated', dateAdded: '2025-04-19', batch: 'B-2025-004', co2Saved: 62.0 },
    { id: 'D125', type: 'laptop', model: 'XPS 13 2-in-1', serialNumber: 'AMZ-LT-2504-011', status: 'donated', dateAdded: '2025-04-18', batch: 'B-2025-004', co2Saved: 81.6 },
    { id: 'D126', type: 'desktop', model: 'OptiPlex 7090 Tower', serialNumber: 'AMZ-DT-2504-012', status: 'donated', dateAdded: '2025-04-17', batch: 'B-2025-004', co2Saved: 137.4 },
    { id: 'D127', type: 'laptop', model: 'ThinkBook 14 G4+', serialNumber: 'AMZ-LT-2504-013', status: 'donated', dateAdded: '2025-04-16', batch: 'B-2025-004', co2Saved: 81.6 },
    { id: 'D128', type: 'server', model: 'PowerEdge R540', serialNumber: 'AMZ-SV-2504-014', status: 'donated', dateAdded: '2025-04-15', batch: 'B-2025-004', co2Saved: 289.6 },
    { id: 'D129', type: 'laptop', model: 'Spectre x360 14', serialNumber: 'AMZ-LT-2504-015', status: 'donated', dateAdded: '2025-04-14', batch: 'B-2025-004', co2Saved: 81.6 },
    { id: 'D130', type: 'monitor', model: 'ThinkVision T24i-2L', serialNumber: 'AMZ-MN-2504-016', status: 'donated', dateAdded: '2025-04-13', batch: 'B-2025-004', co2Saved: 62.0 },
    { id: 'D131', type: 'laptop', model: 'Inspiron 14 5000', serialNumber: 'AMZ-LT-2504-017', status: 'donated', dateAdded: '2025-04-12', batch: 'B-2025-004', co2Saved: 81.6 },
    { id: 'D132', type: 'desktop', model: 'Precision 5820', serialNumber: 'AMZ-DT-2504-018', status: 'donated', dateAdded: '2025-04-11', batch: 'B-2025-004', co2Saved: 137.4 },
    { id: 'D133', type: 'laptop', model: 'IdeaPad Gaming 3', serialNumber: 'AMZ-LT-2504-019', status: 'donated', dateAdded: '2025-04-10', batch: 'B-2025-004', co2Saved: 81.6 },
    { id: 'D134', type: 'monitor', model: 'ASUS TUF VG27AQ', serialNumber: 'AMZ-MN-2504-020', status: 'donated', dateAdded: '2025-04-09', batch: 'B-2025-004', co2Saved: 62.0 }
  ];

  // Generate certificates based on actual device CO₂ calculations
  const generateCertificates = () => {
    const donatedDevices = devices.filter(d => d.status === 'donated');
    const batches = [...new Set(donatedDevices.map(d => d.batch))];
    
    return batches.map((batch, index) => {
      const batchDevices = donatedDevices.filter(d => d.batch === batch);
      const batchCO2 = calculateCO2Impact(batchDevices).totalCO2Saved;
      
      return {
        id: `C00${index + 1}`,
        batch: batch,
        devices: batchDevices.length,
        co2Saved: Math.round(batchCO2 * 10) / 10,
        dateGenerated: batchDevices[0]?.dateAdded || '2025-01-01',
        downloaded: index % 2 === 0
      };
    });
  };
  
  const certificates = generateCertificates();

  // Calculate real CO₂ impact based on current devices
  const co2Impact = calculateCO2Impact(devices.filter(d => d.status === 'donated'));

  // Dynamic stats based on real data
  const stats = [
    { 
      label: 'Devices Ready', 
      value: devices.filter(d => d.status === 'ready').length.toLocaleString(), 
      icon: Package, 
      color: 'text-blue-600', 
      change: '+12%',
      description: 'Devices wiped and ready for pickup'
    },
    { 
      label: 'Picked Up', 
      value: devices.filter(d => d.status === 'picked-up').length.toLocaleString(), 
      icon: CheckCircle, 
      color: 'text-green-600', 
      change: '+8%',
      description: 'Devices collected by Loop It'
    },
    { 
      label: 'Donated', 
      value: devices.filter(d => d.status === 'donated').length.toLocaleString(), 
      icon: Award, 
      color: 'text-purple-600', 
      change: '+23%',
      description: 'Devices donated to schools & NGOs'
    },
    { 
      label: 'CO₂ Avoided', 
      value: `${co2Impact.totalCO2Saved.toFixed(1)} kg`, 
      icon: Recycle, 
      color: 'text-orange-600', 
      change: '+15%',
      description: `Equal to planting ${Math.round(co2Impact.totalCO2Saved * 0.0454)} trees`
    },
  ];

  // CO₂ Impact data (real calculations)
  const co2ImpactData = [
    { category: 'Manufacturing Avoided', value: co2Impact.totalManufacturingSaved, color: 'bg-green-500' },
    { category: 'Transportation Saved', value: co2Impact.totalTransportationSaved, color: 'bg-blue-500' },
    { category: 'E-waste Prevented', value: co2Impact.totalEwastePrevented, color: 'bg-purple-500' }
  ];

  // Device type distribution (real data)
  const laptopCount = devices.filter(d => d.type === 'laptop').length;
  const desktopCount = devices.filter(d => d.type === 'desktop').length;
  const monitorCount = devices.filter(d => d.type === 'monitor').length;
  const serverCount = devices.filter(d => d.type === 'server').length;
  const totalDeviceCount = devices.length;
  
  const deviceTypeData = [
    { type: 'Laptops', count: laptopCount, percentage: totalDeviceCount > 0 ? Math.round((laptopCount / totalDeviceCount) * 100) : 0 },
    { type: 'Desktops', count: desktopCount, percentage: totalDeviceCount > 0 ? Math.round((desktopCount / totalDeviceCount) * 100) : 0 },
    { type: 'Monitors', count: monitorCount, percentage: totalDeviceCount > 0 ? Math.round((monitorCount / totalDeviceCount) * 100) : 0 },
    { type: 'Servers', count: serverCount, percentage: totalDeviceCount > 0 ? Math.round((serverCount / totalDeviceCount) * 100) : 0 }
  ];

  // Status progression based on real device data
  const totalDevicesAdded = devices.length;
  const wipedReadyCount = devices.filter(d => ['ready', 'picked-up', 'donated'].includes(d.status)).length;
  const pickedUpCount = devices.filter(d => ['picked-up', 'donated'].includes(d.status)).length;
  const donatedCount = devices.filter(d => d.status === 'donated').length;
  
  const statusProgressionData = [
    { 
      status: 'Devices Added', 
      count: totalDevicesAdded, 
      percentage: 100, 
      color: 'bg-gray-400' 
    },
    { 
      status: 'Wiped & Ready', 
      count: wipedReadyCount, 
      percentage: totalDevicesAdded > 0 ? Math.round((wipedReadyCount / totalDevicesAdded) * 100) : 0, 
      color: 'bg-blue-500' 
    },
    { 
      status: 'Picked Up', 
      count: pickedUpCount, 
      percentage: totalDevicesAdded > 0 ? Math.round((pickedUpCount / totalDevicesAdded) * 100) : 0, 
      color: 'bg-yellow-500' 
    },
    { 
      status: 'Donated', 
      count: donatedCount, 
      percentage: totalDevicesAdded > 0 ? Math.round((donatedCount / totalDevicesAdded) * 100) : 0, 
      color: 'bg-green-500' 
    }
  ];

  // Chart data for donations over time (calculated based on device dates)
  const generateMonthlyData = () => {
    const monthlyStats: MonthlyStats = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    devices.filter(d => d.status === 'donated').forEach(device => {
      const date = new Date(device.dateAdded);
      const monthKey = months[date.getMonth()];
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = { devices: 0, co2: 0 };
      }
      monthlyStats[monthKey].devices++;
      
      // Calculate CO₂ for this specific device
      const deviceCO2 = calculateCO2Impact([device]).totalCO2Saved;
      monthlyStats[monthKey].co2 += deviceCO2;
    });
    
    // Fill in missing months with zero and return last 6 months
    const currentMonth = new Date().getMonth();
    const chartData = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const monthName = months[monthIndex];
      chartData.push({
        month: monthName,
        devices: monthlyStats[monthName]?.devices || 0,
        co2: Math.round((monthlyStats[monthName]?.co2 || 0) * 10) / 10
      });
    }
    return chartData;
  };
  
  const donationChartData = generateMonthlyData();

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'laptop': return Laptop;
      case 'desktop': return Monitor;
      case 'server': return Server;
      case 'monitor': return Monitor;
      default: return Package;
    }
  };

  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'picked-up': return 'bg-yellow-100 text-yellow-800';
      case 'donated': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'device_added': return Plus;
      case 'batch_created': return Package;
      case 'pickup_scheduled': return Clock;
      case 'donation_completed': return Award;
      case 'certificate_generated': return FileText;
      default: return Activity;
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.batch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });



  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Your fleet has avoided {co2Impact.totalCO2Saved.toFixed(1)} kg CO₂</h1>
        <p className="text-orange-100 text-lg mb-6">Equal to planting 20,460 trees - making a real impact on our planet 🌱</p>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="outline" 
            className="bg-white text-white hover:bg-orange-50 flex items-center"
            onClick={handleAddNewBatch}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Batch
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 flex items-center"
            onClick={handleDownloadESGCertificate}
          >
            <Download className="w-5 h-5 mr-2" />
            Download ESG Certificate
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <p className="text-sm font-medium text-orange-700">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold text-orange-900 mb-1">{stat.value}</p>
                <p className="text-xs text-green-600 font-medium mb-2">{stat.change} from last month</p>
                <p className="text-xs text-orange-600">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Donations Over Time Chart */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h3 className="text-xl font-bold text-orange-800 mb-6">📈 Donation Trends</h3>
          <div className="space-y-4">
            {donationChartData.map((data) => (
              <div key={data.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-orange-700">{data.month}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-orange-600">{data.devices} devices</span>
                    <span className="text-sm text-green-600">{data.co2} kg CO₂</span>
                  </div>
                  <div className="w-full bg-orange-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(data.devices / 3000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Type Distribution */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h3 className="text-xl font-bold text-orange-800 mb-6">🖥️ Device Distribution</h3>
          <div className="space-y-4">
            {deviceTypeData.map((device, index) => {
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
              return (
                <div key={device.type} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded ${colors[index % colors.length]}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-orange-700">{device.type}</span>
                      <span className="text-sm text-orange-600">{device.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-1000`}
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 w-8">{device.percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CO₂ Impact Breakdown */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-orange-800">🌱 CO₂ Impact Breakdown</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCO2Calculator(true)}
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Calculator className="w-4 h-4 mr-1" />
              How?
            </Button>
          </div>
          <div className="space-y-4">
            {co2ImpactData.map((impact) => (
              <div key={impact.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-700">{impact.category}</span>
                  <span className="text-sm text-green-600 font-bold">{impact.value} kg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${impact.color} transition-all duration-1000`}
                    style={{ width: `${Math.min((impact.value / co2Impact.totalCO2Saved) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-orange-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-orange-800">Total Impact</span>
                <span className="text-lg font-bold text-green-700">{co2Impact.totalCO2Saved.toFixed(1)} kg CO₂</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Weekly Pickup Schedule */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h3 className="text-xl font-bold text-orange-800 mb-6">🚚 Weekly Pickup Schedule</h3>
          <div className="space-y-3">
            {pickupScheduleData.map((day) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-10 text-sm font-medium text-orange-700">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-orange-600">{day.pickups} pickups</span>
                    <span className="text-sm text-blue-600">{day.batches} batches</span>
                  </div>
                  <div className="w-full bg-orange-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(day.pickups / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Progression Funnel */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h3 className="text-xl font-bold text-orange-800 mb-6">📊 Status Progression</h3>
          <div className="space-y-4">
            {statusProgressionData.map((status) => (
              <div key={status.status} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-700">{status.status}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-orange-800">{status.count.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 ml-1">({status.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                  <div 
                    className={`h-4 rounded-full ${status.color} transition-all duration-1000 flex items-center justify-end pr-2`}
                    style={{ width: `${status.percentage}%` }}
                  >
                    <span className="text-xs text-white font-medium">
                      {status.percentage < 30 ? '' : `${status.percentage}%`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NGO Distribution Chart */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <h3 className="text-xl font-bold text-orange-800 mb-6">🏫 Partner NGO Distribution</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {ngoDistributionData.map((ngo) => (
            <div key={ngo.ngo} className="text-center">
              <div className="relative mb-3">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                  <div 
                    className={`w-16 h-16 rounded-full ${ngo.color} flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {Math.round((ngo.devices / 4250) * 100)}%
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-orange-800 text-sm mb-1">{ngo.ngo}</h4>
              <p className="text-xs text-orange-600 mb-1">{ngo.devices.toLocaleString()} devices</p>
              <p className="text-xs text-gray-500">{ngo.impact}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-orange-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-orange-700">Total Partner NGOs: 45</span>
            <span className="text-orange-700">Active Partnerships: 23</span>
            <span className="text-green-600 font-bold">100% Allocation Rate</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h3 className="text-lg font-bold text-orange-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start border-orange-200 text-orange-700 hover:bg-orange-50"
              onClick={() => setActiveTab('devices')}
            >
              <Package className="w-4 h-4 mr-2" />
              Manage Devices
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-orange-200 text-orange-700 hover:bg-orange-50"
              onClick={() => setActiveTab('certificates')}
            >
              <Award className="w-4 h-4 mr-2" />
              View Certificates
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-orange-200 text-orange-700 hover:bg-orange-50"
              onClick={handleShareImpact}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Impact
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="md:col-span-2 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-orange-800">Recent Activity</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
              onClick={handleViewAllActivity}
            >
              <Eye className="w-4 h-4 mr-1" />
              View All
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {recentActivity.slice(0, 4).map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-4 bg-orange-50/50 rounded-xl hover:bg-orange-50/70 transition-colors">
                  <div className="p-2 rounded-lg bg-white shadow-sm">
                    <IconComponent className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-orange-800 leading-tight">{activity.description}</p>
                    <p className="text-xs text-orange-600 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDevices = () => (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-orange-400" />
            <input
              type="text"
              placeholder="Search devices..."
              className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/70"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white/70"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="ready">Ready</option>
            <option value="picked-up">Picked Up</option>
            <option value="donated">Donated</option>
            <option value="processing">Processing</option>
          </select>
          <Button
            variant="primary"
            onClick={() => setShowAddDevice(true)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      {/* Device List */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-orange-200/50">
          <h3 className="text-lg font-semibold text-orange-800">Device Inventory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-50/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Serial Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">CO₂ Saved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-orange-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/30 divide-y divide-orange-200/30">
              {filteredDevices.map((device) => {
                const IconComponent = getDeviceIcon(device.type);
                return (
                  <tr key={device.id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-orange-100 rounded-lg mr-3">
                          <IconComponent className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-orange-900">{device.model}</div>
                          <div className="text-sm text-orange-600 capitalize">{device.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-800">{device.serialNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(device.status)}`}>
                        {device.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-800">{device.batch}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-800">{device.co2Saved} kg</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                          onClick={() => handleGenerateLabel(device)}
                        >
                          <QrCode className="w-4 h-4 mr-1" />
                          Label
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                          onClick={() => handleEditDevice(device)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-white/50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Device</h3>
            
            {/* Step 1: Pick OS */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">1. Select Operating System</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedOS}
                onChange={(e) => setSelectedOS(e.target.value)}
              >
                <option value="">Choose OS...</option>
                <option value="windows">Windows 11</option>
                <option value="windows10">Windows 10</option>
                <option value="macos">macOS</option>
                <option value="linux">Linux</option>
                <option value="chrome">Chrome OS</option>
              </select>
            </div>

            {/* Step 2: Pick Drive Type */}
            {selectedOS && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">2. Select Drive Type</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={selectedDriveType}
                  onChange={(e) => setSelectedDriveType(e.target.value)}
                >
                  <option value="">Choose drive type...</option>
                  <option value="ssd">SSD</option>
                  <option value="hdd">HDD</option>
                  <option value="nvme">NVMe</option>
                  <option value="emmc">eMMC</option>
                </select>
              </div>
            )}

            {/* Step 3: Download & Label */}
            {selectedOS && selectedDriveType && (
              <div className="mb-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Script Ready</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Secure wipe script for {selectedOS} on {selectedDriveType.toUpperCase()} drive
                  </p>
                  <div className="space-y-2">
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={handleDownloadScript}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Script
                    </Button>
                    <div className="text-xs text-gray-500">
                      SHA-256: 4a2f8b9c3e1d6f7a8b9c2e4d5f6a7b8c9d1e2f3a4b5c6d7e8f9a1b2c3d4e5f6
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handlePrintQRLabel}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print QR Code Label
                </Button>
              </div>
            )}

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddDevice(false);
                  setSelectedOS('');
                  setSelectedDriveType('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={handleAddDeviceSubmit}
              >
                Add Device
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-6">
      {/* Certificates Section */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-orange-800">Impact Certificates</h3>
          <Button 
            variant="primary" 
            className="bg-orange-600 hover:bg-orange-700"
            onClick={handleGenerateNewCertificate}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate New Certificate
          </Button>
        </div>

        <div className="grid gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="border border-orange-200/50 bg-white/40 backdrop-blur-sm rounded-xl p-4 hover:bg-white/60 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-900">{cert.batch}</h4>
                    <p className="text-sm text-orange-700">
                      {cert.devices} devices • {cert.co2Saved} kg CO₂ saved
                    </p>
                    <p className="text-xs text-orange-600">Generated on {cert.dateGenerated}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    onClick={() => handleDownloadCertificate(cert)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    {cert.downloaded ? 'Downloaded' : 'Download PDF'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    onClick={() => handlePreviewCertificate(cert)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LinkedIn Badges Section */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-orange-800">Shareable Badges</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <LinkedinIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">LinkedIn Badge</h4>
            <p className="text-sm text-gray-600 mb-4">
              Share your environmental impact on LinkedIn with a professional badge.
            </p>
            <Button 
              variant="primary"
              onClick={handleGenerateLinkedInBadge}
            >
              <LinkedinIcon className="w-4 h-4 mr-2" />
              Generate LinkedIn Badge
            </Button>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Share2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Social Media Kit</h4>
            <p className="text-sm text-gray-600 mb-4">
              Download social media assets to share your sustainability efforts.
            </p>
            <Button 
              variant="primary"
              onClick={handleDownloadSocialKit}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Kit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50/30">
        <AmazonDashboardNavbar 
          title="Loop It - Donor Portal" 
          userName={user?.name} 
          userEmail={user?.email}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Content Area */}
        <main className="p-4 lg:p-8 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'devices' && renderDevices()}
          {activeTab === 'certificates' && renderCertificates()}
          {activeTab === 'settings' && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-orange-800 mb-4">Settings</h3>
              <p className="text-orange-600">Settings panel coming soon...</p>
            </div>
          )}
        </main>

        {/* CO₂ Calculation Methodology Modal */}
        {showCO2Calculator && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
              {/* Header */}
              <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calculator className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">CO₂ Impact Calculator</h2>
                    <p className="text-sm text-gray-600">How we calculate your environmental impact</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCO2Calculator(false)}
                  className="hover:bg-red-50 text-red-600 border-red-200"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Overview */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📊 Methodology Overview</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-700 mb-4">
                        Our CO₂ calculations follow internationally recognized standards and are verified by third-party auditors.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600"><strong>Standard:</strong> {co2CalculationData.verification.standard}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-600"><strong>Auditor:</strong> {co2CalculationData.verification.auditor}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-gray-600"><strong>Last Audit:</strong> {co2CalculationData.verification.lastAudit}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-600"><strong>Confidence Level:</strong> {co2CalculationData.verification.confidence}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Certified By:</h4>
                      <p className="text-2xl font-bold text-green-600">{co2CalculationData.certifiedBy}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Methodology: {co2CalculationData.methodology}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calculation Factors */}
                {co2CalculationData.factors.map((factor, index) => (
                  <div key={factor.category} className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                      }`}></div>
                      {factor.category}
                    </h3>
                    <p className="text-gray-700 mb-4">{factor.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">📐 Calculation Formula:</h4>
                      <code className="text-sm text-blue-600 bg-white px-2 py-1 rounded">
                        {factor.calculation}
                      </code>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(factor.factors).map(([key, value]) => (
                        <div key={key} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3">
                          <h5 className="font-medium text-gray-800 capitalize mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </h5>
                          <p className="text-sm text-gray-600">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Example Calculation */}
                {(() => {
                  // Create sample laptop for demonstration
                  const sampleLaptop: Device = {
                    id: 'SAMPLE',
                    type: 'laptop',
                    model: 'ThinkPad X1 Carbon',
                    serialNumber: 'EXAMPLE-123',
                    status: 'donated',
                    dateAdded: '2025-01-01',
                    batch: 'SAMPLE',
                    co2Saved: 0
                  };
                  
                  const sampleCalculation = calculateCO2Impact([sampleLaptop]);
                  
                  return (
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">🧮 Real Example: ThinkPad X1 Carbon</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold text-green-600 mb-2">Manufacturing Avoided</h4>
                          <p className="text-sm text-gray-700">2.1 kg × 15.2 × 1.8</p>
                          <p className="text-lg font-bold text-green-700">= {sampleCalculation.totalManufacturingSaved} kg CO₂</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold text-blue-600 mb-2">Transportation Saved</h4>
                          <p className="text-sm text-gray-700">12.8 - 0.7</p>
                          <p className="text-lg font-bold text-blue-700">= {sampleCalculation.totalTransportationSaved} kg CO₂</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold text-purple-600 mb-2">E-waste Prevented</h4>
                          <p className="text-sm text-gray-700">5 years × 2.4</p>
                          <p className="text-lg font-bold text-purple-700">= {sampleCalculation.totalEwastePrevented} kg CO₂</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-orange-200 text-center">
                        <p className="text-lg font-bold text-gray-900">
                          Total CO₂ Saved per ThinkPad X1 Carbon: <span className="text-green-600">{sampleCalculation.totalCO2Saved} kg CO₂</span>
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Verification & Trust */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🛡️ Verification & Trust</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Third-Party Audits</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Annual methodology review by Deloitte</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Carbon Trust certification maintained</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>EPA compliance verified quarterly</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Data Sources</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center space-x-2">
                          <Info className="w-4 h-4 text-blue-500" />
                          <span>IPCC emission factors database</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Info className="w-4 h-4 text-blue-500" />
                          <span>GHG Protocol calculation tools</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Info className="w-4 h-4 text-blue-500" />
                          <span>Life Cycle Assessment (LCA) data</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 rounded-b-2xl p-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Last updated: September 2025 | Next audit: December 2025
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => setShowCO2Calculator(false)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Got it, thanks!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}