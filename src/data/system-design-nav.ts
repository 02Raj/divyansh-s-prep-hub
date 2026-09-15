import SystemDesignRoadmap from '@/components/system-design/content/SystemDesignRoadmap';
import SystemDesignBasics from '@/components/system-design/content/SystemDesignBasics';
import HLD01Requirements from '@/components/system-design/content/HLD01_Requirements';
import HLD02Architecture from '@/components/system-design/content/HLD02_Architecture';
import HLD03ClientBackendFlow from '@/components/system-design/content/HLD03_ClientBackendFlow';
import HLD04APIDesign from '@/components/system-design/content/HLD04_APIDesign';
import HLD05DatabaseDesign from '@/components/system-design/content/HLD05_DatabaseDesign';
import HLD06CachingAndQueues from '@/components/system-design/content/HLD06_CachingAndQueues';
import HLD07ReliabilityAndScale from '@/components/system-design/content/HLD07_ReliabilityAndScale';
import HLD08CaseStudies from '@/components/system-design/content/HLD08_CaseStudies';
import HLD09InterviewDeepDive from '@/components/system-design/content/HLD09_InterviewDeepDive';
import LLD01DesignPrinciples from '@/components/system-design/content/LLD01_DesignPrinciples';
import LLD02DesignPatterns from '@/components/system-design/content/LLD02_DesignPatterns';
import LLD03SpringBootArchitecture from '@/components/system-design/content/LLD03_SpringBootArchitecture';
import LLD04DatabaseIntegration from '@/components/system-design/content/LLD04_DatabaseIntegration';
import LLD05ConcurrencyAndAsync from '@/components/system-design/content/LLD05_ConcurrencyAndAsync';
import LLD06ClassDesignWalkthrough from '@/components/system-design/content/LLD06_ClassDesignWalkthrough';

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
    title: 'Start here',
    items: [
      { id: 'roadmap', title: '📍 Course roadmap (read first)', component: SystemDesignRoadmap },
      { id: 'basics', title: 'Core ideas in simple English', component: SystemDesignBasics },
    ],
  },
  {
    title: 'HLD — big picture (beginner → advanced)',
    items: [
      { id: 'hld-01-requirements', title: 'Step 1: What are we building?', component: HLD01Requirements },
      { id: 'hld-02-architecture', title: 'Step 2: Architecture & gateways', component: HLD02Architecture },
      { id: 'hld-03-flow', title: 'Step 3: Client → backend flow', component: HLD03ClientBackendFlow },
      { id: 'hld-04-api-design', title: 'Step 4: API design (REST, gRPC)', component: HLD04APIDesign },
      { id: 'hld-05-database', title: 'Step 5: Database & scaling', component: HLD05DatabaseDesign },
      { id: 'hld-06-caching-queues', title: 'Step 6: Cache & message queues', component: HLD06CachingAndQueues },
      { id: 'hld-07-reliability', title: 'Step 7: Reliability & CAP', component: HLD07ReliabilityAndScale },
      { id: 'hld-08-cases', title: 'Step 8: Famous systems (URL, chat…)', component: HLD08CaseStudies },
      { id: 'hld-09-interview', title: 'Step 9: Interview trade-offs', component: HLD09InterviewDeepDive },
    ],
  },
  {
    title: 'LLD — code & classes (Spring Boot focus)',
    items: [
      { id: 'lld-01-principles', title: 'Step 1: SOLID & clean code', component: LLD01DesignPrinciples },
      { id: 'lld-02-patterns', title: 'Step 2: Design patterns', component: LLD02DesignPatterns },
      { id: 'lld-03-architecture', title: 'Step 3: Spring layers', component: LLD03SpringBootArchitecture },
      { id: 'lld-04-database', title: 'Step 4: JPA & repositories', component: LLD04DatabaseIntegration },
      { id: 'lld-05-concurrency', title: 'Step 5: Threads & async', component: LLD05ConcurrencyAndAsync },
      { id: 'lld-06-class-design', title: 'Step 6: Class design (parking lot)', component: LLD06ClassDesignWalkthrough },
    ],
  },
];
