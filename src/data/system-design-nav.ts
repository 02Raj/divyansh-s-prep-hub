import SystemDesignBasics from '@/components/system-design/content/SystemDesignBasics';
import HLD01Requirements from '@/components/system-design/content/HLD01_Requirements';
import HLD02Architecture from '@/components/system-design/content/HLD02_Architecture';
import HLD03ClientBackendFlow from '@/components/system-design/content/HLD03_ClientBackendFlow';

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
      { id: 'hld-01-requirements', title: 'HLD-01: Requirements', component: HLD01Requirements },
      { id: 'hld-02-architecture', title: 'HLD-02: Architecture', component: HLD02Architecture },
      { id: 'hld-03-flow', title: 'HLD-03: Client → Backend Flow', component: HLD03ClientBackendFlow },
      { id: 'hld-04-api-design', title: 'HLD-04: API Design', component: () => null },
      { id: 'hld-05-database', title: 'HLD-05: Database Design', component: () => null },
      { id: 'hld-06-scalability', title: 'HLD-06: Scalability', component: () => null },
    ]
  }
];
