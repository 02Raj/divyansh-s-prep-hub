import { InterviewTopic } from './types';

export const springBootTopics: InterviewTopic[] = [
  // ==========================================
  // SECTION 1: Spring Core Foundations
  // ==========================================
  {
    id: 'spring-ioc-di',
    name: 'IoC Container & Dependency Injection',
    category: 'Spring Boot',
    difficulty: 'easy',
    description: 'Inversion of Control (IoC) means Spring creates and manages objects for you. Dependency Injection (DI) is how Spring delivers those objects where needed. This is the foundation of everything in Spring.',
    bulletPoints: [
      'IoC: Instead of YOUR code creating objects with "new", the Spring Container creates and manages them. You just declare what you need',
      'DI: The container "injects" dependencies automatically. You don\'t go find them — they come to you',
      'Constructor Injection (Best Practice): Ensures immutability, makes testing easy, prevents null fields. Spring auto-detects single constructor',
      'Field Injection (@Autowired on field): Works but discouraged — hides dependencies, makes unit testing harder',
      'ApplicationContext is the main IoC container. It creates beans, manages lifecycle, and wires everything together'
    ],
    codeExample: `// Constructor Injection — the recommended way
@Service
public class OrderService {

    private final PaymentGateway paymentGateway;
    private final InventoryService inventoryService;

    // Spring automatically injects both — no @Autowired needed with single constructor
    public OrderService(PaymentGateway paymentGateway,
                        InventoryService inventoryService) {
        this.paymentGateway = paymentGateway;
        this.inventoryService = inventoryService;
    }
}

// ❌ Field Injection — avoid this
@Service
public class BadService {
    @Autowired  // Hidden dependency — can't easily mock in tests
    private UserRepo userRepo;
}`
  },
  {
    id: 'spring-beans-scopes',
    name: 'Spring Beans & Scopes',
    category: 'Spring Boot',
    difficulty: 'easy',
    description: 'A Bean is any object that Spring creates and manages. Scopes control how many instances exist and how long they live. Singleton vs Prototype is asked in every interview.',
    bulletPoints: [
      'Singleton (Default): Only ONE instance for the entire app. Shared everywhere. 95% of beans are Singleton',
      'Prototype: A brand NEW instance every time someone asks for it. Use for stateful objects like ShoppingCart',
      'Request Scope: One instance per HTTP request. Dies when the request completes',
      'Session Scope: One instance per user session. Lives until the session expires (e.g., user login state)',
      'Bean Lifecycle: Constructor → @PostConstruct → Ready to Use → @PreDestroy → Destroyed'
    ],
    codeExample: `// Singleton Bean — one instance shared everywhere (Default)
@Service
public class NotificationService { }

// Prototype Bean — new instance every time
@Component
@Scope("prototype")
public class ShoppingCart { } // Each user gets their own cart

// Lifecycle hooks
@Component
public class CacheManager {
    @PostConstruct
    public void init() {
        System.out.println("Cache warming up...");
        // Load frequently accessed data into memory
    }

    @PreDestroy
    public void cleanup() {
        System.out.println("Cache cleared.");
        // Release resources before shutdown
    }
}`
  },
  {
    id: 'spring-annotations',
    name: 'Essential Spring Boot Annotations',
    category: 'Spring Boot',
    difficulty: 'easy',
    description: 'Annotations are the backbone of Spring Boot. They replace XML config and tell Spring how to wire your app. Know these by heart.',
    bulletPoints: [
      '@SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan. It\'s the entry point of every app',
      'Stereotype: @Component (generic), @Service (business logic), @Repository (DB layer — adds exception translation), @Controller (web layer)',
      '@Autowired: Inject a dependency. @Qualifier("beanName"): Pick a specific bean when multiple candidates exist',
      '@Value("${app.name}"): Inject a single property value. @ConfigurationProperties: Bind a whole group of properties to a POJO (much cleaner)',
      '@Primary: Marks one bean as the default choice when multiple beans of the same type exist'
    ],
    codeExample: `@SpringBootApplication // Entry point — starts everything
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}

// Clean layered architecture
@Repository  // Data layer — Spring translates SQL exceptions to Spring exceptions
public interface UserRepo extends JpaRepository<User, Long> {}

@Service     // Business layer
public class UserService {
    private final UserRepo repo;
    public UserService(UserRepo repo) { this.repo = repo; }
}

@RestController // Web layer — handles HTTP requests
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;
    public UserController(UserService service) { this.service = service; }
}`
  },
  {
    id: 'spring-auto-config',
    name: 'Auto-Configuration & Starters',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Auto-Configuration is the magic of Spring Boot. It automatically sets up beans based on your classpath. Add a dependency, and Spring configures everything for you.',
    bulletPoints: [
      'How it works: @EnableAutoConfiguration scans your classpath. If it finds H2 jar → auto-configures DataSource. Finds Spring Web → auto-configures Tomcat',
      'Powered by conditional annotations: @ConditionalOnClass (library exists?), @ConditionalOnMissingBean (user hasn\'t defined their own?)',
      'You can ALWAYS override auto-config by defining your own @Bean. Spring Boot gracefully "backs off"',
      'Starter Dependencies (e.g., spring-boot-starter-web): Bundle related libraries together — add one dependency instead of ten',
      'Debug auto-config: Use --debug flag or check /actuator/conditions to see what got auto-configured and why'
    ],
    codeExample: `// Auto-configuration in action:
// Just add "spring-boot-starter-data-jpa" + H2 dependency
// Spring Boot AUTOMATICALLY configures:
//   ✅ DataSource (H2 in-memory DB)
//   ✅ EntityManagerFactory
//   ✅ TransactionManager
// You write ZERO configuration code!

// Want to override? Just define your own bean:
@Configuration
public class CustomDataSourceConfig {

    @Bean // This REPLACES the auto-configured DataSource
    public DataSource dataSource() {
        return DataSourceBuilder.create()
            .url("jdbc:postgresql://localhost:5432/mydb")
            .username("admin")
            .password("secret")
            .build();
    }
}`
  },
  // ==========================================
  // SECTION 2: What Happens on Startup
  // ==========================================
  {
    id: 'spring-startup-flow',
    name: 'What Happens When Spring Boot Starts?',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'This is one of the most popular interview questions. Understanding the startup flow shows you truly understand how Spring Boot works under the hood.',
    bulletPoints: [
      'Step 1: SpringApplication.run() is called → creates the ApplicationContext (IoC container)',
      'Step 2: @ComponentScan kicks in → scans your packages for @Component, @Service, @Repository, @Controller and registers them as bean definitions',
      'Step 3: Auto-Configuration runs → checks classpath and conditionally creates beans (DataSource, Tomcat, etc.)',
      'Step 4: Beans are instantiated → Constructor Injection happens → @PostConstruct methods are called',
      'Step 5: Embedded server (Tomcat/Netty) starts and begins listening for HTTP requests',
      'Step 6: ApplicationReadyEvent fires → app is fully ready to serve traffic'
    ],
    codeExample: `@SpringBootApplication
public class MyApp {
    public static void main(String[] args) {
        // This single line triggers the ENTIRE startup flow:
        // 1. Creates ApplicationContext
        // 2. Scans packages for components
        // 3. Runs auto-configuration
        // 4. Creates and wires all beans
        // 5. Starts embedded Tomcat
        SpringApplication.run(MyApp.class, args);
    }
}

// @SpringBootApplication is actually 3 annotations combined:
// @Configuration        → This class can define @Bean methods
// @EnableAutoConfiguration → Auto-configure based on classpath
// @ComponentScan        → Scan this package + sub-packages for components

// Hook into startup events
@Component
public class StartupListener {
    @EventListener(ApplicationReadyEvent.class)
    public void onStartup() {
        System.out.println("App is fully ready! All beans initialized.");
    }
}`
  },
  // ==========================================
  // SECTION 3: Building REST APIs
  // ==========================================
  {
    id: 'spring-rest-api',
    name: 'Building RESTful APIs',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Spring Boot makes REST APIs dead simple. @RestController handles HTTP requests and automatically converts Java objects to JSON. This is bread and butter for any Java developer.',
    bulletPoints: [
      '@RestController = @Controller + @ResponseBody. Return values are auto-converted to JSON (using Jackson)',
      'HTTP Methods: @GetMapping (Read), @PostMapping (Create), @PutMapping (Full Update), @PatchMapping (Partial Update), @DeleteMapping (Delete)',
      '@PathVariable: Extract from URL path (/users/{id}). @RequestParam: Extract query params (?name=Alice). @RequestBody: Deserialize JSON body to Java object',
      'ResponseEntity: Full control over response — set status code, headers, and body manually',
      'Always use proper HTTP status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 500 Server Error'
    ],
    codeExample: `@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAll() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return productService.findById(id)
            .map(ResponseEntity::ok)                          // 200 OK
            .orElse(ResponseEntity.notFound().build());       // 404 Not Found
    }

    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody ProductDTO dto) {
        Product saved = productService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved); // 201 Created
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}`
  },
  {
    id: 'spring-validation',
    name: 'Validation & Global Error Handling',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Always validate incoming data before processing. Spring Boot uses Jakarta Bean Validation annotations and @ControllerAdvice for clean, centralized error handling.',
    bulletPoints: [
      '@Valid on @RequestBody triggers validation. Add rules on DTO fields: @NotBlank, @Email, @Min, @Max, @Size, @Pattern',
      '@ControllerAdvice + @ExceptionHandler = Global Error Handler. Catches exceptions from ALL controllers in one place',
      'Always return a consistent error response format: { timestamp, status, message, path }. Clean API = professional API',
      'Custom exceptions (ResourceNotFoundException) make your code readable and your error messages meaningful',
      '@ResponseStatus on custom exceptions auto-sets the HTTP status code'
    ],
    codeExample: `// 1. DTO with validation rules
public record CreateUserDTO(
    @NotBlank(message = "Name is required") String name,
    @Email(message = "Invalid email format") String email,
    @Min(value = 18, message = "Must be 18+") int age
) {}

// 2. Global Error Handler — one place for ALL error handling
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        var error = new ErrorResponse(404, ex.getMessage(), LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(new ErrorResponse(400, message, LocalDateTime.now()));
    }
}`
  },
  // ==========================================
  // SECTION 4: Data Layer (JPA)
  // ==========================================
  {
    id: 'spring-data-jpa',
    name: 'Spring Data JPA & Repositories',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Spring Data JPA removes all boilerplate DB code. Define an interface → Spring generates the implementation with CRUD, pagination, and custom queries. Free code!',
    bulletPoints: [
      'JpaRepository<Entity, ID> gives you save(), findById(), findAll(), deleteById() for FREE. No implementation needed!',
      'Derived Queries: Spring generates SQL from method names. findByEmailAndStatus(String email, Status status) → SELECT * WHERE email=? AND status=?',
      '@Query: Custom JPQL or native SQL for complex queries that can\'t be derived from method names',
      'Pagination: Use Pageable parameter and Page<T> return type for efficient handling of large datasets',
      '@Entity maps a class to a DB table. @Id marks the primary key. @GeneratedValue auto-generates IDs'
    ],
    codeExample: `@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private Department department;
}

// Repository — Spring generates ALL the code!
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Derived query — Spring writes the SQL for you
    List<Employee> findByDepartment(Department dept);

    // Derived query with sorting
    List<Employee> findByDepartmentOrderBySalaryDesc(Department dept);

    // Custom JPQL query
    @Query("SELECT e FROM Employee e WHERE e.name LIKE %:keyword%")
    Page<Employee> searchByName(@Param("keyword") String keyword, Pageable pageable);

    // Native SQL query
    @Query(value = "SELECT * FROM employees WHERE salary > :min", nativeQuery = true)
    List<Employee> findHighEarners(@Param("min") double minSalary);
}`
  },
  {
    id: 'spring-dto-mapping',
    name: 'DTO Pattern & Entity Mapping',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Never expose your Entity directly to the API. Use DTOs (Data Transfer Objects) to control what data goes in and out. This is a must-know pattern for production apps.',
    bulletPoints: [
      'DTO = Data Transfer Object. A simple class (or Record) that carries only the data the API needs — nothing more, nothing less',
      'Why DTOs? Security (hide sensitive fields like password), flexibility (API shape ≠ DB shape), versioning (change API without changing Entity)',
      'Entity → DTO (for response): Convert before sending to client. Never expose DB fields like password, internal IDs, or audit columns',
      'DTO → Entity (for request): Convert after receiving from client. Validate DTO first, then map to Entity for saving',
      'Mapping options: Manual mapping (simple), MapStruct (generates code at compile-time, fastest), ModelMapper (runtime, slower)'
    ],
    codeExample: `// Entity — maps to DB table (has everything including sensitive data)
@Entity
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String passwordHash; // NEVER expose this!
    private LocalDateTime createdAt;
}

// Request DTO — what the client SENDS (only what's needed to create)
public record CreateUserRequest(
    @NotBlank String name,
    @Email String email,
    @Size(min = 8) String password
) {}

// Response DTO — what the client SEES (no password, no internal fields)
public record UserResponse(Long id, String name, String email) {}

// Mapping in Service layer
@Service
public class UserService {
    public UserResponse createUser(CreateUserRequest request) {
        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPasswordHash(encoder.encode(request.password()));
        User saved = userRepo.save(user);
        return new UserResponse(saved.getId(), saved.getName(), saved.getEmail());
    }
}`
  },
  {
    id: 'spring-entity-relationships',
    name: 'JPA Relationships & N+1 Problem',
    category: 'Spring Boot',
    difficulty: 'hard',
    description: 'Understanding how JPA maps table relationships and avoiding the N+1 query problem is critical. The N+1 problem is the #1 performance issue in JPA applications.',
    bulletPoints: [
      '@OneToMany / @ManyToOne: Parent-Child (e.g., Department has many Employees). Most common relationship',
      '@ManyToMany: Needs a join table (e.g., Students and Courses)',
      'FetchType.LAZY (Default for collections): Data loaded ONLY when you access it. FetchType.EAGER: Loaded immediately with parent',
      'N+1 Problem: Loading 1 parent fires N extra queries for children. Fix with JOIN FETCH in @Query or @EntityGraph',
      'Rule of thumb: Always default to LAZY. Use JOIN FETCH or DTO Projections when you actually need the related data'
    ],
    codeExample: `@Entity
public class Department {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    private List<Employee> employees; // Loaded ONLY when accessed
}

@Entity
public class Employee {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
}

// ❌ N+1 Problem: This fires 1 query for departments + N queries for employees
List<Department> depts = deptRepo.findAll();
depts.forEach(d -> d.getEmployees().size()); // Each access fires a separate query!

// ✅ Fix: JOIN FETCH — loads everything in ONE query
public interface DepartmentRepo extends JpaRepository<Department, Long> {
    @Query("SELECT d FROM Department d JOIN FETCH d.employees")
    List<Department> findAllWithEmployees();
}`
  },
  {
    id: 'spring-transactions',
    name: 'Transaction Management (@Transactional)',
    category: 'Spring Boot',
    difficulty: 'hard',
    description: '@Transactional ensures a group of DB operations either ALL succeed or ALL fail (rollback). Interviewers love asking about the self-invocation trap and propagation types.',
    bulletPoints: [
      '@Transactional uses AOP Proxy: Spring wraps your class in a proxy that begins transaction → runs your method → commits or rollbacks',
      'Default rollback: Only rolls back on RuntimeException (unchecked). For checked exceptions, add rollbackFor = Exception.class',
      'REQUIRED (Default): Joins existing transaction or creates new one. REQUIRES_NEW: Always creates a fresh, independent transaction',
      'Self-invocation TRAP: Calling a @Transactional method from within the SAME class bypasses the proxy → transaction is IGNORED!',
      'readOnly = true: Tells DB to optimize for reads — no dirty checking, potential query caching. Use for all GET/read methods'
    ],
    codeExample: `@Service
public class TransferService {

    private final AccountRepository accountRepo;

    // If ANY step fails, EVERYTHING rolls back
    @Transactional(rollbackFor = Exception.class)
    public void transferMoney(Long fromId, Long toId, double amount) {
        Account from = accountRepo.findById(fromId)
            .orElseThrow(() -> new AccountNotFoundException(fromId));
        Account to = accountRepo.findById(toId)
            .orElseThrow(() -> new AccountNotFoundException(toId));

        from.debit(amount);   // Step 1
        to.credit(amount);    // Step 2

        accountRepo.save(from);
        accountRepo.save(to);
        // If Step 2 throws → Step 1 is also rolled back. Money is safe!
    }

    @Transactional(readOnly = true) // Optimized for read operations
    public Account getAccount(Long id) {
        return accountRepo.findById(id).orElseThrow();
    }

    // ⚠️ Self-invocation trap:
    // public void doSomething() {
    //     this.transferMoney(1L, 2L, 500); // BYPASSES proxy! No transaction!
    // }
}`
  },
  // ==========================================
  // SECTION 5: Security
  // ==========================================
  {
    id: 'spring-security',
    name: 'Spring Security & JWT Authentication',
    category: 'Spring Boot',
    difficulty: 'hard',
    description: 'Spring Security protects your API. Modern apps use stateless JWT authentication instead of sessions. Know the SecurityFilterChain and JWT flow.',
    bulletPoints: [
      'Authentication = WHO are you? (login credentials). Authorization = WHAT can you do? (roles/permissions)',
      'SecurityFilterChain: Intercepts every HTTP request. You configure which URLs are public and which need authentication',
      'JWT Flow: Login → Server creates signed JWT → Client sends it in every request header (Authorization: Bearer <token>)',
      '@PreAuthorize("hasRole(\'ADMIN\')"): Method-level security. Only users with ADMIN role can call this method',
      'PasswordEncoder (BCrypt): NEVER store plain-text passwords. Always hash them. BCrypt is the industry standard'
    ],
    codeExample: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Enables @PreAuthorize
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())               // Disabled for stateless APIs
            .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()        // Public
                .requestMatchers("/api/admin/**").hasRole("ADMIN")  // Admin only
                .anyRequest().authenticated())                      // Rest need login
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Industry standard for password hashing
    }
}`
  },
  // ==========================================
  // SECTION 6: AOP
  // ==========================================
  {
    id: 'spring-aop',
    name: 'AOP (Aspect-Oriented Programming)',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'AOP lets you extract cross-cutting concerns (logging, metrics, security) into reusable Aspects. Instead of copy-pasting logging code in 100 methods, write it once.',
    bulletPoints: [
      'Cross-cutting Concern: Logic that applies everywhere — logging, transaction management, security, performance monitoring',
      'Aspect: A class with the cross-cutting logic. Annotated with @Aspect + @Component',
      'Advice Types: @Before (runs before), @After (runs after), @Around (wraps entire method — most powerful and common)',
      'Pointcut: Expression that defines WHICH methods the advice applies to (e.g., all methods in service package)',
      '@Transactional itself is powered by AOP — Spring creates a proxy that wraps your method with begin/commit/rollback'
    ],
    codeExample: `@Aspect
@Component
public class PerformanceAspect {

    private static final Logger log = LoggerFactory.getLogger(PerformanceAspect.class);

    // Apply to ALL methods in any class inside the service package
    @Around("execution(* com.app.service.*.*(..))")
    public Object measureTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();

        Object result = joinPoint.proceed(); // Execute the actual method

        long duration = System.currentTimeMillis() - start;
        log.info("{}.{} took {} ms",
            joinPoint.getTarget().getClass().getSimpleName(),
            joinPoint.getSignature().getName(),
            duration);

        return result;
    }
}`
  },
  // ==========================================
  // SECTION 7: Configuration & Profiles
  // ==========================================
  {
    id: 'spring-profiles-config',
    name: 'Profiles & Configuration',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Profiles let you define different settings for dev, staging, and prod environments. Configuration is externalized — secrets stay out of your code.',
    bulletPoints: [
      'application.yml is the main config. application-dev.yml, application-prod.yml override for specific environments',
      'Activate profile: --spring.profiles.active=prod (command line) or SPRING_PROFILES_ACTIVE env variable',
      '@Profile("dev"): Bean is created ONLY when "dev" profile is active. Great for conditional beans',
      '@ConfigurationProperties: Type-safe way to bind a group of properties to a Java class. Much better than @Value for multiple related props',
      'Priority (highest wins): Command-line args > Environment vars > application-{profile}.yml > application.yml'
    ],
    codeExample: `# application.yml (common settings)
app:
  name: MyApp
  version: 1.0

# application-dev.yml (development)
spring:
  datasource:
    url: jdbc:h2:mem:devdb
logging:
  level:
    root: DEBUG

# application-prod.yml (production)
spring:
  datasource:
    url: jdbc:postgresql://prod-server:5432/mydb
logging:
  level:
    root: WARN

# Type-safe config binding
@ConfigurationProperties(prefix = "app")
public record AppConfig(String name, String version) {}`
  },
  // ==========================================
  // SECTION 8: Testing
  // ==========================================
  {
    id: 'spring-testing',
    name: 'Testing in Spring Boot',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Spring Boot gives you fast, focused testing tools. Use slice tests (@WebMvcTest, @DataJpaTest) instead of loading the entire app every time.',
    bulletPoints: [
      '@SpringBootTest: Loads the ENTIRE app context. Use for full integration tests only — slow but comprehensive',
      '@WebMvcTest(Controller.class): Loads ONLY the web layer. Fast. Perfect for testing controllers without starting a server',
      '@DataJpaTest: Loads ONLY the JPA layer with an embedded DB. Perfect for testing repositories',
      '@MockBean: Replaces a real bean with a Mockito mock inside the Spring context',
      'MockMvc: Simulates HTTP requests to your controllers without starting a real HTTP server'
    ],
    codeExample: `@WebMvcTest(ProductController.class) // Only loads web layer — fast!
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean // Mocks the service layer
    private ProductService productService;

    @Test
    void shouldReturnProduct() throws Exception {
        Product product = new Product(1L, "Laptop", 999.99);
        when(productService.findById(1L)).thenReturn(Optional.of(product));

        mockMvc.perform(get("/api/v1/products/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Laptop"))
            .andExpect(jsonPath("$.price").value(999.99));
    }

    @Test
    void shouldReturn404WhenNotFound() throws Exception {
        when(productService.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/products/99"))
            .andExpect(status().isNotFound());
    }
}`
  },
  // ==========================================
  // SECTION 9: Actuator & Monitoring
  // ==========================================
  {
    id: 'spring-actuator',
    name: 'Actuator & Health Monitoring',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Actuator exposes production-ready endpoints to monitor your running app. It\'s the foundation of observability — health checks, metrics, and app info.',
    bulletPoints: [
      '/actuator/health: Is your app UP or DOWN? Can include custom checks for DB, disk space, external services',
      '/actuator/metrics: JVM metrics (memory, threads, GC), HTTP request metrics, custom business metrics',
      '/actuator/info: App version, build time, git commit. Great for verifying deployments',
      'Integrate with Prometheus + Grafana for real-time dashboards and alerting in production',
      'Custom Health Indicator: Implement HealthIndicator interface to add your own checks (e.g., is the payment gateway reachable?)'
    ],
    codeExample: `# application.yml — Expose actuator endpoints
management:
  endpoints:
    web:
      exposure:
        include: health, metrics, info, prometheus
  endpoint:
    health:
      show-details: always

// Custom Health Indicator
@Component
public class PaymentGatewayHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        boolean isReachable = checkPaymentGateway();
        if (isReachable) {
            return Health.up().withDetail("gateway", "Reachable").build();
        }
        return Health.down().withDetail("gateway", "Unreachable").build();
    }
}`
  },
  // ==========================================
  // SECTION 10: Microservices
  // ==========================================
  {
    id: 'spring-microservices',
    name: 'Microservices Architecture',
    category: 'Spring Boot',
    difficulty: 'hard',
    description: 'Microservices split a monolith into small, independent services. Spring Cloud provides tools to manage discovery, routing, and resilience. Know the key patterns.',
    bulletPoints: [
      'Service Discovery (Eureka): Services register themselves. Service A asks Discovery Server for Service B\'s address. No hardcoded URLs',
      'API Gateway (Spring Cloud Gateway): Single entry point for ALL clients. Handles routing, auth, rate limiting, load balancing',
      'Circuit Breaker (Resilience4j): Prevents cascading failures. If Service B is down, circuit "opens" → returns fallback instead of crashing Service A',
      'Communication: Synchronous (REST via WebClient/FeignClient) or Asynchronous (Kafka/RabbitMQ — preferred for loose coupling)',
      'Config Server: Centralized config. All services pull config from one place (e.g., Git repo). Change config without redeploying'
    ],
    codeExample: `// Feign Client — clean REST calls between services
@FeignClient(name = "inventory-service") // Calls service registered in Eureka
public interface InventoryClient {
    @GetMapping("/api/inventory/{productId}")
    InventoryResponse checkStock(@PathVariable String productId);
}

// Circuit Breaker — graceful failure handling
@Service
public class OrderService {

    private final InventoryClient inventoryClient;

    @CircuitBreaker(name = "inventoryService", fallbackMethod = "fallback")
    public String placeOrder(String productId) {
        InventoryResponse response = inventoryClient.checkStock(productId);
        return response.isInStock() ? "Order Placed!" : "Out of Stock";
    }

    // Fallback when inventory-service is DOWN
    public String fallback(String productId, Throwable t) {
        return "Service temporarily unavailable. Please try again.";
    }
}`
  },
  // ==========================================
  // SECTION 11: Kafka & Messaging
  // ==========================================
  {
    id: 'spring-messaging-kafka',
    name: 'Kafka & Async Messaging',
    category: 'Spring Boot',
    difficulty: 'hard',
    description: 'Kafka is a distributed event streaming platform. It decouples services — Producer sends messages to a Topic, Consumer reads them. Essential for microservices.',
    bulletPoints: [
      'Producer: Sends messages to a Kafka Topic. Consumer: Reads messages from a Topic. Topic is like a channel/queue',
      'Consumer Group: Multiple consumers in a group share the load. Each message is processed by only ONE consumer in the group',
      'Why Kafka? Decouples services, handles traffic spikes (buffering), enables event-driven architecture, ensures no data loss',
      'Idempotency: Consumers might receive duplicate messages (at-least-once delivery). Always design consumers to handle duplicates safely',
      'Common use cases: Order processing, notification sending, audit logging, real-time analytics, event sourcing'
    ],
    codeExample: `// application.yml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: order-service-group
      auto-offset-reset: earliest

// Producer — sends events
@Service
public class OrderEventProducer {
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public void publishOrderCreated(OrderEvent event) {
        kafkaTemplate.send("order-events", event.orderId(), event);
    }
}

// Consumer — processes events
@Service
public class NotificationConsumer {
    @KafkaListener(topics = "order-events", groupId = "notification-group")
    public void handleOrderEvent(OrderEvent event) {
        // Send email, push notification, etc.
        System.out.println("Order received: " + event.orderId());
    }
}

// Event record
public record OrderEvent(String orderId, String customerEmail, double amount) {}`
  },
  // ==========================================
  // SECTION 12: Caching
  // ==========================================
  {
    id: 'spring-caching',
    name: 'Caching with Spring Boot',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Caching stores frequently accessed data in memory to avoid repeated DB hits. Spring Boot makes it as simple as adding an annotation.',
    bulletPoints: [
      '@EnableCaching activates the caching infrastructure',
      '@Cacheable("products"): First call → hits DB and caches result. Next calls with same args → returns from cache instantly',
      '@CacheEvict("products"): Removes data from cache (when data is updated or deleted)',
      '@CachePut("products"): Updates the cache without skipping the method execution',
      'Default cache is ConcurrentHashMap (in-memory). For production, use Redis (distributed) or Caffeine (high-performance local)'
    ],
    codeExample: `@Configuration
@EnableCaching
public class CacheConfig { }

@Service
public class ProductService {

    // First call: Hits DB → caches result
    // Next calls: Returns from cache instantly (skips DB)
    @Cacheable(value = "products", key = "#id")
    public Product findById(Long id) {
        return productRepo.findById(id).orElseThrow();
    }

    // Update product → also update the cache
    @CachePut(value = "products", key = "#product.id")
    public Product update(Product product) {
        return productRepo.save(product);
    }

    // Delete product → remove from cache too
    @CacheEvict(value = "products", key = "#id")
    public void delete(Long id) {
        productRepo.deleteById(id);
    }
}`
  },
  // ==========================================
  // SECTION 13: Async & Scheduling
  // ==========================================
  {
    id: 'spring-async-scheduling',
    name: 'Async Processing & Scheduling',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: '@Async runs methods in a background thread so the caller doesn\'t wait. @Scheduled runs tasks automatically at fixed intervals. Both are very common in real projects.',
    bulletPoints: [
      '@EnableAsync + @Async: Method runs in a background thread. Caller gets instant response. Return CompletableFuture for async results',
      '@EnableScheduling + @Scheduled: Runs tasks at intervals — fixedRate (every N ms), fixedDelay (N ms after last completion), or cron expression',
      '@Async has the SAME proxy trap as @Transactional: Calling it from within the same class runs synchronously!',
      'Always configure a custom ThreadPoolTaskExecutor for production — control pool size, queue capacity, and thread naming',
      'Use case: Send emails async (don\'t block the API response), clean up expired tokens every hour, generate reports nightly'
    ],
    codeExample: `@Configuration
@EnableAsync
@EnableScheduling
public class AsyncConfig {
    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-");
        executor.initialize();
        return executor;
    }
}

@Service
public class EmailService {

    @Async // Runs in background — caller does NOT wait
    public CompletableFuture<String> sendWelcomeEmail(String email) {
        // Simulate slow email sending (3 seconds)
        Thread.sleep(3000);
        return CompletableFuture.completedFuture("Sent to " + email);
    }

    @Scheduled(fixedRate = 60000) // Runs every 60 seconds
    public void cleanupExpiredTokens() {
        tokenRepo.deleteExpiredTokens();
    }

    @Scheduled(cron = "0 0 2 * * *") // Runs at 2 AM daily
    public void generateDailyReport() {
        reportService.generate();
    }
}`
  },
  // ==========================================
  // SECTION 14: Docker & Deployment
  // ==========================================
  {
    id: 'spring-docker-deployment',
    name: 'Docker & Containerization',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Docker packages your app + all dependencies into a container that runs the same everywhere. Modern Java developers are expected to know how to containerize their Spring Boot apps.',
    bulletPoints: [
      'Docker Image: A blueprint of your app with JDK, configs, and jar. Docker Container: A running instance of that image',
      'Dockerfile: Instructions to build your image. Use multi-stage builds to keep the final image small',
      'Spring Boot Maven/Gradle plugin can build Docker images directly: mvn spring-boot:build-image (no Dockerfile needed!)',
      'docker-compose: Run your app + database + Redis + Kafka together locally with one command',
      'Best practices: Use Eclipse Temurin JDK image, run as non-root user, use .dockerignore, expose only the needed port'
    ],
    codeExample: `# Multi-stage Dockerfile — keeps final image small
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre  # Only JRE needed to run
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# docker-compose.yml — run everything together
version: '3.8'
services:
  app:
    build: .
    ports: ["8080:8080"]
    depends_on: [postgres]
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/mydb

  postgres:
    image: postgres:16
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: mydb
      POSTGRES_PASSWORD: secret`
  },
  // ==========================================
  // SECTION 15: Modern Spring Boot (3.x)
  // ==========================================
  {
    id: 'spring-modern-features',
    name: 'Modern Spring Boot 3.x Features',
    category: 'Spring Boot',
    difficulty: 'hard',
    description: 'Spring Boot 3.x requires Java 17+, uses Jakarta EE, and brings Virtual Threads, GraalVM Native Images, and modern observability. This is heavily asked in 2024-2026 interviews.',
    bulletPoints: [
      'Spring Boot 3.x requires Java 17+. Package namespace changed: javax.* → jakarta.*. THE most asked migration question',
      'GraalVM Native Image: Compiles your app to a native binary. Starts in milliseconds with minimal memory. Perfect for serverless/cloud',
      'Virtual Threads (Project Loom): Lightweight JVM-managed threads. Handle millions of concurrent requests without thread pool exhaustion. Just set spring.threads.virtual.enabled=true',
      'Micrometer + OpenTelemetry: Standard for distributed tracing, metrics, and logging across microservices',
      'Records as DTOs: Java Records are now the recommended way to create immutable DTOs in Spring Boot 3.x'
    ],
    codeExample: `// 1. Enable Virtual Threads — one line in application.yml!
// spring.threads.virtual.enabled=true
// That's it! Tomcat now uses virtual threads for ALL requests.
// No thread pool tuning needed — handles thousands of concurrent requests.

// 2. Java Record as DTO (Immutable, clean, minimal code)
public record ProductDTO(
    @NotBlank String name,
    @Positive double price,
    String description
) {}

// 3. Modern Controller using Records
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody ProductDTO dto) {
        Product product = new Product(dto.name(), dto.price(), dto.description());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(productService.save(product));
    }
}

// 4. Migration checklist for Spring Boot 2.x → 3.x:
// ✅ Upgrade Java to 17+
// ✅ Change javax.* imports to jakarta.*
// ✅ Update Spring Security config to new SecurityFilterChain style
// ✅ Update any deprecated API calls`
  }
];
