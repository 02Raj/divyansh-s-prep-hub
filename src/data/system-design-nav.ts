import SystemDesignBasics from '@/components/system-design/content/SystemDesignBasics';
import HLD01Requirements from '@/components/system-design/content/HLD01_Requirements';
import HLD02Architecture from '@/components/system-design/content/HLD02_Architecture';
import HLD03ClientBackendFlow from '@/components/system-design/content/HLD03_ClientBackendFlow';
import HLD04APIDesign from '@/components/system-design/content/HLD04_APIDesign';
import HLD05DatabaseDesign from '@/components/system-design/content/HLD05_DatabaseDesign';
import HLD06CachingAndQueues from '@/components/system-design/content/HLD06_CachingAndQueues';
import LLD01DesignPrinciples from '@/components/system-design/content/LLD01_DesignPrinciples';
import LLD02DesignPatterns from '@/components/system-design/content/LLD02_DesignPatterns';
import LLD03SpringBootArchitecture from '@/components/system-design/content/LLD03_SpringBootArchitecture';
import LLD04DatabaseIntegration from '@/components/system-design/content/LLD04_DatabaseIntegration';
import LLD05ConcurrencyAndAsync from '@/components/system-design/content/LLD05_ConcurrencyAndAsync';

export interface NavItem {
  id: string;
  title: string;
  component: React.ComponentType;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const systemDesignNav: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'basics', title: 'System Design Basics', component: SystemDesignBasics },
    ]
  },
  {
    title: 'HLD - High-Level Design',
    items: [
      { id: 'hld-01-requirements', title: 'HLD-01: Requirements & Capacity', component: HLD01Requirements },
      { id: 'hld-02-architecture', title: 'HLD-02: Architecture & Gateways', component: HLD02Architecture },
      { id: 'hld-03-flow', title: 'HLD-03: Client → Backend Flow', component: HLD03ClientBackendFlow },
      { id: 'hld-04-api-design', title: 'HLD-04: API Design (REST, gRPC)', component: HLD04APIDesign },
      { id: 'hld-05-database', title: 'HLD-05: Database Design & Scaling', component: HLD05DatabaseDesign },
      { id: 'hld-06-caching-queues', title: 'HLD-06: Caching & Message Queues', component: HLD06CachingAndQueues },
    ]
  },
  {
    title: 'LLD - Low-Level Design (Spring Boot)',
    items: [
      { id: 'lld-01-principles', title: 'LLD-01: Design Principles (SOLID)', component: LLD01DesignPrinciples },
      { id: 'lld-02-patterns', title: 'LLD-02: Top Design Patterns', component: LLD02DesignPatterns },
      { id: 'lld-03-architecture', title: 'LLD-03: Spring Boot Architecture', component: LLD03SpringBootArchitecture },
      { id: 'lld-04-database', title: 'LLD-04: Database Integration (JPA)', component: LLD04DatabaseIntegration },
      { id: 'lld-05-concurrency', title: 'LLD-05: Concurrency & Async', component: LLD05ConcurrencyAndAsync },
    ]
  }
];
