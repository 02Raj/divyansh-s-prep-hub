import { InterviewTopic } from './types';

export const angularTopics: InterviewTopic[] = [
  {
    id: 'ng-components',
    name: 'Components in Angular',
    category: 'Angular',
    difficulty: 'easy',
    description: 'Components are the main building blocks of Angular applications. A component controls a patch of screen called a view. It consists of a TypeScript class, an HTML template, and optional CSS styles.',
    bulletPoints: [
      'Every Angular app has at least one component (root component)',
      'Components use @Component decorator',
      'selector defines how the component is used in templates',
      'Components can communicate via @Input() and @Output()'
    ],
    codeExample: `@Component({
  selector: 'app-hero',
  template: \`
    <h2>{{ hero.name }}</h2>
    <p>{{ hero.description }}</p>
  \`,
  styles: ['h2 { color: blue; }']
})
export class HeroComponent {
  @Input() hero: Hero;
  @Output() selected = new EventEmitter<Hero>();
}`
  },
  {
    id: 'ng-lifecycle',
    name: 'Component Lifecycle Hooks',
    category: 'Angular',
    difficulty: 'medium',
    description: 'Angular provides lifecycle hooks that give visibility into key life moments of components and directives. These hooks allow you to act when a component is created, updated, or destroyed.',
    bulletPoints: [
      'ngOnInit - Initialize component after first ngOnChanges',
      'ngOnChanges - Called when input bindings change',
      'ngDoCheck - Custom change detection',
      'ngOnDestroy - Cleanup before component destruction'
    ],
    codeExample: `export class LifecycleComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  ngOnInit(): void {
    console.log('Component initialized');
    this.subscription = this.dataService.getData()
      .subscribe(data => this.handleData(data));
  }

  ngOnDestroy(): void {
    console.log('Component destroyed');
    this.subscription?.unsubscribe();
  }
}`
  },
  {
    id: 'ng-di',
    name: 'Dependency Injection',
    category: 'Angular',
    difficulty: 'medium',
    description: 'Dependency Injection (DI) is a design pattern where dependencies are provided to a class rather than the class creating them. Angular has its own DI framework that provides dependencies to components and services.',
    bulletPoints: [
      'Services are typically provided in root for singleton instances',
      '@Injectable() decorator makes a class injectable',
      'Providers can be scoped to modules or components',
      'DI increases testability and maintainability'
    ],
    codeExample: `@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '/api/data';

  constructor(private http: HttpClient) {}

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl);
  }
}

@Component({...})
export class MyComponent {
  constructor(private dataService: DataService) {}
}`
  },
  {
    id: 'ng-routing',
    name: 'Angular Routing',
    category: 'Angular',
    difficulty: 'medium',
    description: 'The Angular Router enables navigation from one view to another. It interprets the browser URL as an instruction to navigate to a client-generated view.',
    bulletPoints: [
      'Routes are configured with path and component mappings',
      'RouterOutlet directive displays routed components',
      'Route guards protect routes (CanActivate, CanDeactivate)',
      'Lazy loading improves initial load performance'
    ],
    codeExample: `const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'heroes', component: HeroesComponent },
  { 
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}`
  },
  {
    id: 'ng-observables',
    name: 'Observables and RxJS',
    category: 'Angular',
    difficulty: 'hard',
    description: 'Angular uses RxJS Observables extensively for handling asynchronous operations. Observables provide a powerful way to handle streams of data over time.',
    bulletPoints: [
      'Observables are lazy - they don\'t execute until subscribed',
      'Operators like map, filter, switchMap transform data',
      'Always unsubscribe to prevent memory leaks',
      'AsyncPipe automatically subscribes and unsubscribes'
    ],
    codeExample: `@Component({...})
export class SearchComponent implements OnInit, OnDestroy {
  searchResults$: Observable<Result[]>;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchResults$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchService.search(term)),
      takeUntil(this.destroy$)
    );
  }

  onSearch(term: string): void {
    this.searchSubject.next(term);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`
  },
  {
    id: 'ng-signals',
    name: 'Angular Signals',
    category: 'Angular',
    difficulty: 'medium',
    description: 'Signals are a new reactive primitive introduced in Angular 16. They provide a way to define reactive values and express dependencies between them, enabling fine-grained reactivity.',
    bulletPoints: [
      'Signals are getter functions that track dependencies',
      'computed() creates derived signals',
      'effect() runs side effects when signals change',
      'Signals work with Zone-less change detection'
    ],
    codeExample: `@Component({...})
export class CounterComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  constructor() {
    effect(() => {
      console.log(\`Count changed to: \${this.count()}\`);
    });
  }

  increment(): void {
    this.count.update(c => c + 1);
  }
}`
  },
  {
    id: 'ng-forms',
    name: 'Reactive Forms',
    category: 'Angular',
    difficulty: 'medium',
    description: 'Reactive forms provide a model-driven approach to handling form inputs. They offer more predictability, easier testing, and better handling of complex scenarios.',
    bulletPoints: [
      'FormGroup groups related FormControls',
      'FormBuilder simplifies form creation',
      'Validators can be sync or async',
      'valueChanges Observable enables reactive form handling'
    ],
    codeExample: `@Component({...})
export class RegistrationComponent {
  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['']
  }, { validators: this.passwordMatchValidator });

  constructor(private fb: FormBuilder) {}

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    }
  }
}`
  },
  {
    id: 'ng-standalone',
    name: 'Standalone Components',
    category: 'Angular',
    difficulty: 'easy',
    description: 'Standalone components are self-contained and don\'t need to be declared in an NgModule. They simplify the application structure and improve tree-shaking.',
    bulletPoints: [
      'Use standalone: true in @Component decorator',
      'Import dependencies directly in the component',
      'Can be lazy loaded directly without modules',
      'Gradually migrate existing apps to standalone'
    ],
    codeExample: `@Component({
  selector: 'app-standalone-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroCardComponent],
  template: \`
    <h1>Heroes</h1>
    <app-hero-card *ngFor="let hero of heroes" [hero]="hero" />
  \`
})
export class StandaloneHeroComponent {
  heroes = inject(HeroService).getHeroes();
}`
  },
  {
  id: 'angular-workflow',
  name: 'Angular workflow',
  category: 'Angular',
  difficulty: 'easy',
  description: 'The Angular workflow describes the step-by-step process of creating, building, testing, and deploying an Angular application.',
  bulletPoints: [
    'Set up the development environment using Node.js and Angular CLI',
    'Create a new Angular project using ng new',
    'Build components, services, and modules',
    'Bind data using templates and directives',
    'Test the application using unit and e2e tests',
    'Optimize and build the app for production',
    'Deploy the application to a hosting platform'
  ],
  codeExample: `// Create a new Angular project
ng new my-angular-app

// Run the development server
cd my-angular-app
ng serve

// Build for production
ng build --configuration production`
},
{
  id: 'component-communication',
  name: 'Component Communication',
  category: 'Angular',
  difficulty: 'easy',
  description: 'Component communication in Angular is the process of sharing data between components.',
  bulletPoints: [
    'Use @Input for parent to child communication',
    'Use @Output and EventEmitter for child to parent',
    'Use ViewChild and ContentChild for direct access',
    'Use shared services for sibling or unrelated components'
  ],
  codeExample: `@Input() data: string;
@Output() notify = new EventEmitter<string>();`
},
{
  id: 'directives',
  name: 'Angular Directives',
  category: 'Angular',
  difficulty: 'easy',
  description: 'Directives are used to manipulate the DOM or change the appearance and behavior of elements.',
  bulletPoints: [
    'Structural directives change DOM structure (ngIf, ngFor)',
    'Attribute directives change appearance (ngClass, ngStyle)',
    'Custom directives can be created for reuse'
  ],
  codeExample: `*ngIf="isLoggedIn"
[ngClass]="active"`
},
{
  id: 'pipes',
  name: 'Angular Pipes',
  category: 'Angular',
  difficulty: 'easy',
  description: 'Pipes transform data before displaying it in the template.',
  bulletPoints: [
    'Built-in pipes like date, currency, percent',
    'Pure pipes run only when input changes',
    'Impure pipes run on every change detection',
    'Custom pipes can be created'
  ],
  codeExample: `{{ today | date:'shortDate' }}`
},
{
  id: 'dependency-injection',
  name: 'Dependency Injection',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Dependency Injection allows classes to receive dependencies instead of creating them.',
  bulletPoints: [
    'Promotes loose coupling',
    'Services provided via providers',
    'Supports hierarchical injectors',
    'Improves testability'
  ],
  codeExample: `constructor(private userService: UserService) {}`
},
{
  id: 'host-listener-binding',
  name: 'Host Listener and Host Binding',
  category: 'Angular',
  difficulty: 'medium',
  description: 'HostListener listens to events on the host element and HostBinding binds properties.',
  bulletPoints: [
    'Listen to DOM events',
    'Bind styles or classes dynamically',
    'Mostly used in directives'
  ],
  codeExample: `@HostListener('click') onClick() {}
@HostBinding('class.active') isActive = true;`
},
{
  id: 'data-binding',
  name: 'One-way and Two-way Data Binding',
  category: 'Angular',
  difficulty: 'easy',
  description: 'Data binding connects the component class with the template.',
  bulletPoints: [
    'One-way binding uses interpolation and property binding',
    'Two-way binding uses ngModel',
    'Keeps UI and data in sync'
  ],
  codeExample: `[(ngModel)]="username"`
},
{
  id: 'route-guards',
  name: 'Route and Auth Guards',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Route guards control access to routes based on conditions.',
  bulletPoints: [
    'CanActivate prevents unauthorized access',
    'CanDeactivate prevents leaving route',
    'Used for authentication and authorization'
  ],
  codeExample: `canActivate(): boolean { return isLoggedIn; }`
},
{
  id: 'lazy-loading',
  name: 'Lazy Loading',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Lazy loading loads modules only when needed.',
  bulletPoints: [
    'Improves initial load time',
    'Reduces bundle size',
    'Configured using loadChildren'
  ],
  codeExample: `loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)`
},
{
  id: 'forms-validation',
  name: 'Template and Reactive Forms',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Angular supports two approaches for forms handling.',
  bulletPoints: [
    'Template-driven forms use directives',
    'Reactive forms use FormGroup and FormControl',
    'Both support validations'
  ],
  codeExample: `this.form = new FormGroup({
  name: new FormControl('', Validators.required)
});`
},
{
  id: 'rxjs',
  name: 'RxJS Observables and Operators',
  category: 'Angular',
  difficulty: 'hard',
  description: 'RxJS provides reactive programming using Observables.',
  bulletPoints: [
    'Observables handle async streams',
    'Operators transform data',
    'Used heavily with HTTP and forms'
  ],
  codeExample: `this.http.get(url).pipe(map(res => res.data))`
},
{
  id: 'http-interceptor',
  name: 'HTTP Interceptor',
  category: 'Angular',
  difficulty: 'medium',
  description: 'HTTP interceptors modify HTTP requests and responses globally.',
  bulletPoints: [
    'Add auth tokens',
    'Handle errors centrally',
    'Log requests and responses'
  ],
  codeExample: `intercept(req, next) { return next.handle(req); }`
},
{
  id: 'change-detection',
  name: 'Change Detection and OnPush',
  category: 'Angular',
  difficulty: 'hard',
  description: 'Change detection updates the view when data changes.',
  bulletPoints: [
    'Default strategy checks every cycle',
    'OnPush improves performance',
    'Triggers only on input change or events'
  ],
  codeExample: `changeDetection: ChangeDetectionStrategy.OnPush`
},
{
  id: 'angular-signals',
  name: 'Angular Signals',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Signals provide fine-grained reactivity in Angular.',
  bulletPoints: [
    'Automatic UI updates',
    'No manual subscriptions',
    'Better performance'
  ],
  codeExample: `count = signal(0);`
},
{
  id: 'accessibility-a11y',
  name: 'Accessibility (a11y) in Angular',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Accessibility ensures Angular applications are usable by people with disabilities.',
  bulletPoints: [
    'Use ARIA attributes properly',
    'Support keyboard navigation',
    'Use semantic HTML elements',
    'Angular CDK provides a11y utilities'
  ],
  codeExample: `<button aria-label="Close dialog">X</button>`
},
{
  id: 'dist-and-bundle',
  name: 'Dist and Bundle',
  category: 'Angular',
  difficulty: 'easy',
  description: 'Dist folder contains the production-ready bundled output of an Angular application.',
  bulletPoints: [
    'Generated after ng build',
    'Contains optimized JS, CSS, and assets',
    'Used for deployment'
  ],
  codeExample: `ng build --configuration production`
},
{
  id: 'unit-testing',
  name: 'Unit Testing in Angular',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Unit testing verifies individual components and services.',
  bulletPoints: [
    'Uses Jasmine and Karma',
    'TestBed configures testing modules',
    'Improves reliability'
  ],
  codeExample: `expect(component).toBeTruthy();`
},
{
  id: 'shadow-dom',
  name: 'Shadow DOM',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Shadow DOM encapsulates DOM and styles for components.',
  bulletPoints: [
    'Prevents style leakage',
    'Improves component isolation'
  ],
  codeExample: `encapsulation: ViewEncapsulation.ShadowDom`
},
{
  id: 'content-projection',
  name: 'Content Projection',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Content projection allows passing content into components.',
  bulletPoints: [
    'Uses ng-content',
    'Supports single and multi-slot projection'
  ],
  codeExample: `<ng-content select=".header"></ng-content>`
},
{
  id: 'view-encapsulation',
  name: 'View Encapsulation',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Controls how styles are scoped to components.',
  bulletPoints: [
    'Emulated (default)',
    'None',
    'ShadowDom'
  ],
  codeExample: `encapsulation: ViewEncapsulation.Emulated`
},
{
  id: 'ng-deep-host',
  name: 'ng-deep and :host',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Used for styling child and host components.',
  bulletPoints: [
    ':host targets component host element',
    '::ng-deep overrides child styles (deprecated)'
  ],
  codeExample: `:host { display: block; }`
},
{
  id: 'angular-universal',
  name: 'Angular Universal (SSR)',
  category: 'Angular',
  difficulty: 'hard',
  description: 'Angular Universal enables server-side rendering.',
  bulletPoints: [
    'Improves SEO',
    'Faster first contentful paint'
  ],
  codeExample: `ng add @nguniversal/express-engine`
},
{
  id: 'angular-elements',
  name: 'Angular Elements',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Angular Elements allow Angular components to be used as Web Components.',
  bulletPoints: [
    'Framework-agnostic usage',
    'Uses Custom Elements API'
  ],
  codeExample: `createCustomElement(AppComponent, { injector })`
},
{
  id: 'dynamic-components',
  name: 'Dynamic Component Loading',
  category: 'Angular',
  difficulty: 'hard',
  description: 'Loads components dynamically at runtime.',
  bulletPoints: [
    'Used for modals and plugins',
    'Uses ViewContainerRef'
  ],
  codeExample: `viewContainerRef.createComponent(MyComponent)`
},
{
  id: 'i18n',
  name: 'Internationalization (i18n)',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Supports multiple languages and locales.',
  bulletPoints: [
    'Uses i18n attribute',
    'Supports locale-based formatting'
  ],
  codeExample: `<h1 i18n>Hello</h1>`
},
{
  id: 'error-handling',
  name: 'Error Handling in Angular',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Centralized error handling improves stability.',
  bulletPoints: [
    'GlobalErrorHandler',
    'HTTP error interception'
  ],
  codeExample: `handleError(error: any) { console.error(error); }`
},
{
  id: 'preloading-strategy',
  name: 'Preloading Strategies',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Preloads lazy-loaded modules in background.',
  bulletPoints: [
    'PreloadAllModules strategy',
    'Improves navigation speed'
  ],
  codeExample: `RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })`
},
{
  id: 'pwa',
  name: 'Service Workers and PWA',
  category: 'Angular',
  difficulty: 'hard',
  description: 'Enables offline support and caching.',
  bulletPoints: [
    'Uses Angular Service Worker',
    'Improves performance and reliability'
  ],
  codeExample: `ng add @angular/pwa`
},
{
  id: 'custom-validators',
  name: 'Custom Validators',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Custom validation logic for forms.',
  bulletPoints: [
    'Supports sync and async validators',
    'Reusable validation logic'
  ],
  codeExample: `return control.value ? null : { invalid: true };`
},
{
  id: 'di-hierarchy',
  name: 'Dependency Injection Hierarchy',
  category: 'Angular',
  difficulty: 'hard',
  description: 'Defines how services are scoped and shared.',
  bulletPoints: [
    'Root-level services are singleton',
    'Component-level providers create new instances'
  ],
  codeExample: `providers: [MyService]`
},
{
  id: 'view-queries',
  name: 'ViewChild and ContentChild',
  category: 'Angular',
  difficulty: 'medium',
  description: 'Access child components and DOM elements.',
  bulletPoints: [
    'ViewChild accesses view DOM',
    'ContentChild accesses projected content'
  ],
  codeExample: `@ViewChild('input') inputRef!: ElementRef;`
},
{
  id: 'angular-security',
  name: 'Angular Security',
  category: 'Angular',
  difficulty: 'hard',
  description: 'Protects against common web vulnerabilities.',
  bulletPoints: [
    'XSS protection by default',
    'DomSanitizer for trusted values',
    'CSRF protection'
  ],
  codeExample: `this.sanitizer.bypassSecurityTrustHtml(html)`
}



];
