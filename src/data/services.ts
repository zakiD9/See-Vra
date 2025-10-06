import pic2 from "../assets/72f35ae957c302b8f272d9c331490e0af356b669.png";
import pic3 from "../assets/66770971021e72d7d408057419bcf11b15d37f40.png";
import pic1 from "../assets/c76e75d16ebc6acf8cee89552381c5f6c1ffd5f3.png";

export const services = [
  {
    id: 1,
    serviceName: "services.softwareDevelopment.title",
    description: "services.softwareDevelopment.description",
    logo: pic1,
    details: [
      { id: 1, name: "services.softwareDevelopment.details.webdev", logo: pic1 },
      { id: 2, name: "services.softwareDevelopment.details.mobileApp", logo: pic2 },
      { id: 3, name: "services.softwareDevelopment.details.desktop", logo: pic3 },
      { id: 4, name: "services.softwareDevelopment.details.payment", logo: pic3 },
    ],
  },
  {
    id: 2,
    serviceName: "services.ITMaintenance.title",
    description: "services.ITMaintenance.description",
    logo: pic2,
    details: [
      { id: 1, name: "services.ITMaintenance.details.monitoring", logo: pic2 },
      { id: 2, name: "services.ITMaintenance.details.securityPatches", logo: pic1 },
      { id: 3, name: "services.ITMaintenance.details.backupSolutions", logo: pic3 },
    ],
  },
  {
    id: 3,
    serviceName: "services.networkIntegration.title",
    description: "services.networkIntegration.description",
    logo: pic3,
    details: [
      { id: 1, name: "services.networkIntegration.details.LANWANSetup", logo: pic3 },
      { id: 2, name: "services.networkIntegration.details.firewallConfiguration", logo: pic2 },
      { id: 3, name: "services.networkIntegration.details.cloudConnectivity", logo: pic1 },
    ],
  },
];
