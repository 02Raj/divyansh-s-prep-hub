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
  }
];
