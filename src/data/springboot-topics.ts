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
    description: 'Inversion of Control (IoC) means Spring creates and manages objects for you. Dependency Injection (DI) is how Spring delivers those objects where they are needed.',
    bulletPoints: [
      'IoC: Instead of YOUR code creating objects with "new", the Spring Container creates and manages them for you',
      'DI: The container "injects" required dependencies into your class automatically (you just declare what you need)',
      'Constructor Injection is the recommended best practice: ensures immutability, makes testing easy, and prevents null fields',
      'Field Injection (@Autowired on field) works but is discouraged because it hides dependencies and makes unit testing harder',
      'ApplicationContext is the main IoC container (advanced version of BeanFactory) that manages the entire bean lifecycle'
    ],
    codeExample: `// Constructor Injection (Best Practice)
@Service
public class OrderService {

    private final PaymentGateway paymentGateway;
    private final InventoryService inventoryService;

    // Spring automatically injects both dependencies via constructor
    public OrderService(PaymentGateway paymentGateway,
                        InventoryService inventoryService) {
        this.paymentGateway = paymentGateway;
        this.inventoryService = inventoryService;
    }
}`
  },
  {
    id: 'spring-beans-scopes',
    name: 'Spring Beans & Scopes',
    category: 'Spring Boot',
    difficulty: 'easy',
    description: 'A Bean is any object that Spring creates and manages. Scopes define how many instances of a bean exist and how long they live.',
    bulletPoints: [
      'Singleton (Default): Only ONE instance per container. Shared across the entire application. Most beans are Singleton',
      'Prototype: A brand NEW instance is created every time it is requested. Use for stateful objects',
      'Request Scope: One instance per HTTP request (dies when the request completes)',
      'Session Scope: One instance per user session (lives until the session expires)',
      'Bean Lifecycle: Constructor -> @PostConstruct -> Ready to Use -> @PreDestroy -> Destroyed'
    ],
    codeExample: `// Singleton Bean (Default - one instance shared everywhere)
@Service
public class NotificationService { }

// Prototype Bean (new instance every time)
@Component
@Scope("prototype")
public class ShoppingCart { }

// Lifecycle hooks
@Component
public class CacheManager {
    @PostConstruct
    public void init() { System.out.println("Cache warming up..."); }

    @PreDestroy
    public void cleanup() { System.out.println("Cache cleared."); }
}`
  },
  {
    id: 'spring-annotations',
    name: 'Essential Spring Boot Annotations',
    category: 'Spring Boot',
    difficulty: 'easy',
    description: 'Annotations are the backbone of Spring Boot. They replace XML configuration and tell Spring how to wire your application together.',
    bulletPoints: [
      '@SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan (the entry point of every app)',
      'Stereotype Annotations: @Component (generic), @Service (business logic), @Repository (database layer), @Controller (web layer)',
      '@Autowired: Tells Spring to inject a dependency. @Qualifier: Picks a specific bean when multiple candidates exist',
      '@Value("${key}"): Injects a single property. @ConfigurationProperties: Binds an entire group of properties to a POJO class',
      '@Primary: Marks one bean as the default choice when multiple beans of the same type exist'
    ],
    codeExample: `@SpringBootApplication // Entry point
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}

// Layered architecture using stereotype annotations
@Repository  // Data Access Layer
public interface UserRepo extends JpaRepository<User, Long> {}

@Service     // Business Logic Layer
public class UserService {
    private final UserRepo repo;
    public UserService(UserRepo repo) { this.repo = repo; }
}

@RestController // Web Layer (handles HTTP)
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
    description: 'Auto-Configuration is the magic of Spring Boot. It automatically configures beans based on what libraries are on your classpath, so you write zero boilerplate XML or Java config.',
    bulletPoints: [
      'How it works: @EnableAutoConfiguration scans your classpath. If it finds a library (e.g., H2 DB jar), it auto-configures a DataSource bean for you',
      'Conditional Annotations power this: @ConditionalOnClass (library exists?), @ConditionalOnMissingBean (user has not defined their own?)',
      'You can ALWAYS override auto-config by simply defining your own @Bean. Spring Boot gracefully "backs away"',
      'Starter Dependencies (e.g., spring-boot-starter-web, spring-boot-starter-data-jpa) bundle related libraries together so you add one dependency instead of ten',
      'To debug auto-config issues, add --debug flag or check /actuator/conditions endpoint'
    ],
    codeExample: `// Auto-configuration in action:
// Just add "spring-boot-starter-data-jpa" + H2 dependency
// Spring Boot AUTOMATICALLY configures:
//   - DataSource (H2 in-memory DB)
//   - EntityManagerFactory
//   - TransactionManager

// You can override ANY auto-configured bean:
@Configuration
public class CustomDataSourceConfig {

    @Bean // This replaces the auto-configured DataSource
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
  // SECTION 2: Building REST APIs
  // ==========================================
  {
    id: 'spring-rest-api',
    name: 'Building RESTful APIs',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Spring Boot makes creating REST APIs incredibly easy. @RestController handles incoming HTTP requests and automatically converts Java objects to JSON responses.',
    bulletPoints: [
      '@RestController = @Controller + @ResponseBody. Every method return value is automatically serialized to JSON',
      'HTTP Method Mappings: @GetMapping (Read), @PostMapping (Create), @PutMapping (Full Update), @PatchMapping (Partial Update), @DeleteMapping (Delete)',
      '@PathVariable extracts values from the URL path. @RequestParam extracts query parameters. @RequestBody deserializes the JSON request body into a Java object',
      'ResponseEntity gives you full control: set HTTP status code, headers, and body manually',
      'Always use proper HTTP status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 500 Internal Server Error'
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
            .orElse(ResponseEntity.notFound().build());       // 404
    }

    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody ProductDTO dto) {
        Product saved = productService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved); // 201
    }
}`
  },
  {
    id: 'spring-validation',
    name: 'Request Validation & Error Handling',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Validation ensures incoming data is correct before processing. Spring Boot integrates with Jakarta Bean Validation and provides a global exception handling mechanism.',
    bulletPoints: [
      '@Valid on @RequestBody triggers validation. Use annotations like @NotBlank, @Email, @Min, @Max, @Size on DTO fields',
      '@ControllerAdvice + @ExceptionHandler = Global Exception Handler. Catches exceptions across ALL controllers in one place',
      'Always return a consistent error response (e.g., { timestamp, status, message, path }) for clean API design',
      'Custom exceptions (e.g., ResourceNotFoundException) make your code readable and your API responses meaningful',
      'Use @ResponseStatus on custom exceptions to automatically set the HTTP status code'
    ],
    codeExample: `// 1. DTO with validation rules
public record CreateUserDTO(
    @NotBlank(message = "Name is required") String name,
    @Email(message = "Invalid email") String email,
    @Min(18) int age
) {}

// 2. Global Exception Handler (catches errors from ALL controllers)
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(404, ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(new ErrorResponse(400, message));
    }
}`
  },
  // ==========================================
  // SECTION 3: Data Layer
  // ==========================================
  {
    id: 'spring-data-jpa',
    name: 'Spring Data JPA & Repositories',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Spring Data JPA eliminates boilerplate database code. You define an interface, and Spring auto-generates the implementation with full CRUD, pagination, and custom query support.',
    bulletPoints: [
      'JpaRepository<Entity, ID> gives you save(), findById(), findAll(), deleteById() for FREE. No implementation needed',
      'Derived Query Methods: Spring generates SQL from method names (e.g., findByEmailAndStatus(String email, Status status))',
      '@Query: Write custom JPQL or native SQL when derived queries are not enough',
      'Pagination: Use Pageable parameter and Page<T> return type for efficient large-dataset handling',
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

// Repository - Spring generates ALL implementation code!
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Derived query (Spring writes the SQL for you)
    List<Employee> findByDepartment(Department dept);

    // Custom JPQL query
    @Query("SELECT e FROM Employee e WHERE e.name LIKE %:keyword%")
    Page<Employee> searchByName(@Param("keyword") String keyword, Pageable pageable);
}`
  },
  {
    id: 'spring-entity-relationships',
    name: 'JPA Entity Relationships & N+1 Problem',
    category: 'Spring Boot',
    difficulty: 'hard',
    description: 'Understanding how JPA maps table relationships and avoiding the N+1 query problem is critical for building performant applications.',
    bulletPoints: [
      '@OneToMany / @ManyToOne: Parent-Child relationship (e.g., One Department has Many Employees). Most common relationship',
      '@ManyToMany: Requires a join table (e.g., Students and Courses)',
      'FetchType.LAZY (Default for collections): Data is loaded only when accessed. FetchType.EAGER: Data is loaded immediately with the parent',
      'N+1 Problem: Loading 1 parent fires N extra queries for children. Fix with JOIN FETCH in @Query or @EntityGraph',
      'Always use LAZY loading by default and switch to JOIN FETCH or DTO Projections for specific queries that need related data'
    ],
    codeExample: `@Entity
public class Department {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    private List<Employee> employees;  // Loaded ONLY when accessed
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

// Fixing N+1 Problem with JOIN FETCH
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
    description: '@Transactional ensures that a group of database operations either ALL succeed together or ALL fail together (rollback). Understanding its internals is a top interview question.',
    bulletPoints: [
      '@Transactional works via AOP Proxy: Spring wraps your class in a proxy that begins a transaction before your method and commits/rollbacks after',
      'Default Rollback: Rolls back ONLY on unchecked exceptions (RuntimeException). For checked exceptions, add rollbackFor = Exception.class',
      'Propagation.REQUIRED (Default): Joins an existing transaction or creates a new one. REQUIRES_NEW: Always creates a new, independent transaction',
      'Self-invocation trap: Calling a @Transactional method from WITHIN the same class bypasses the proxy and the transaction is IGNORED',
      'readOnly = true: Hints to the DB driver to optimize for read-only queries (no dirty checking, potential query caching)'
    ],
    codeExample: `@Service
public class TransferService {

    private final AccountRepository accountRepo;

    // If ANY step fails, the ENTIRE operation rolls back
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
        // If Step 2 throws, Step 1 is also rolled back. Data stays consistent.
    }

    @Transactional(readOnly = true) // Optimized for reads
    public Account getAccount(Long id) {
        return accountRepo.findById(id).orElseThrow();
    }
}`
  },
  // ==========================================
  // SECTION 4: Security
  // ==========================================
  {
    id: 'spring-security',
    name: 'Spring Security & JWT Authentication',
    category: 'Spring Boot',
    difficulty: 'hard',
    description: 'Spring Security is a powerful framework for securing your application. Modern APIs use stateless JWT (JSON Web Token) authentication instead of session-based login.',
    bulletPoints: [
      'Authentication = WHO are you? (Verify identity via credentials). Authorization = WHAT can you do? (Check roles/permissions)',
      'SecurityFilterChain: A chain of filters that intercepts every HTTP request. You configure which URLs are public and which need authentication',
      'JWT Flow: User logs in -> Server generates a signed JWT token -> Client sends token in every request header (Authorization: Bearer <token>)',
      '@PreAuthorize("hasRole(ADMIN)"): Method-level security. Only users with the ADMIN role can call this method',
      'PasswordEncoder (BCrypt): NEVER store plain-text passwords. Always hash them before saving to the database'
    ],
    codeExample: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Enables @PreAuthorize
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())          // Disabled for stateless APIs
            .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()       // Public
                .requestMatchers("/api/admin/**").hasRole("ADMIN") // Admin only
                .anyRequest().authenticated())                     // Rest need login
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`
  },
  // ==========================================
  // SECTION 5: AOP & Cross-Cutting Concerns
  // ==========================================
  {
    id: 'spring-aop',
    name: 'AOP (Aspect-Oriented Programming)',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'AOP lets you extract cross-cutting concerns (logging, security, metrics) into reusable Aspects instead of scattering them across every class.',
    bulletPoints: [
      'Cross-cutting Concern: Logic that applies everywhere (e.g., logging, transaction management, security checks)',
      'Aspect: A class containing the cross-cutting logic. Annotated with @Aspect and @Component',
      'Advice Types: @Before (runs before method), @After (runs after), @Around (wraps the entire method - most powerful)',
      'Pointcut: An expression that defines WHICH methods the advice applies to (e.g., all methods in a Service package)',
      '@Transactional itself is implemented using AOP - Spring creates a proxy that wraps your method with transaction begin/commit/rollback logic'
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
  // SECTION 6: Configuration & Profiles
  // ==========================================
  {
    id: 'spring-profiles-config',
    name: 'Profiles & Externalized Configuration',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Profiles let you define environment-specific configurations (dev, staging, prod). Externalized configuration keeps secrets out of your code.',
    bulletPoints: [
      'application.yml is the main config file. application-dev.yml, application-prod.yml are profile-specific overrides',
      'Activate a profile via: --spring.profiles.active=prod (command line) or SPRING_PROFILES_ACTIVE env variable',
      '@Profile("dev"): A bean annotated with this will ONLY be created when the "dev" profile is active',
      '@ConfigurationProperties: Type-safe way to bind a group of related properties to a Java class (much better than individual @Value)',
      'Configuration priority (highest wins): Command-line args > Environment variables > application-{profile}.yml > application.yml'
    ],
    codeExample: `# application.yml (common settings)
app:
  name: MyApp
  version: 1.0

# application-dev.yml (development overrides)
spring:
  datasource:
    url: jdbc:h2:mem:devdb
logging:
  level:
    root: DEBUG

# application-prod.yml (production overrides)
spring:
  datasource:
    url: jdbc:postgresql://prod-server:5432/mydb
logging:
  level:
    root: WARN`
  },
  // ==========================================
  // SECTION 7: Testing
  // ==========================================
  {
    id: 'spring-testing',
    name: 'Testing in Spring Boot',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Spring Boot provides a rich testing ecosystem. Use sliced tests (@WebMvcTest, @DataJpaTest) for fast, focused testing instead of always loading the full application.',
    bulletPoints: [
      '@SpringBootTest: Loads the ENTIRE application context. Use for full integration tests only (slow but comprehensive)',
      '@WebMvcTest(Controller.class): Loads ONLY the web layer. Perfect for testing controllers in isolation (fast)',
      '@DataJpaTest: Loads ONLY the JPA layer with an embedded database. Perfect for testing repositories',
      '@MockBean: Replaces a real bean with a Mockito mock inside the Spring context',
      'MockMvc: Simulates HTTP requests to your controllers without starting a real HTTP server'
    ],
    codeExample: `@WebMvcTest(ProductController.class) // Only loads web layer
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
  // SECTION 8: Actuator & Monitoring
  // ==========================================
  {
    id: 'spring-actuator',
    name: 'Spring Boot Actuator & Monitoring',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Actuator exposes production-ready endpoints to monitor and manage your running application. It is the foundation of observability in Spring Boot.',
    bulletPoints: [
      '/actuator/health: Shows if your app is UP or DOWN. Can include custom health checks for database, disk space, external services',
      '/actuator/metrics: Exposes JVM metrics (memory, threads, GC), HTTP request metrics, and custom business metrics',
      '/actuator/info: Displays application info (version, build time, git commit). Great for deployment verification',
      'Integrate with Prometheus + Grafana for real-time dashboards and alerting in production',
      'Custom Health Indicator: Implement HealthIndicator interface to add checks for your own services (e.g., is the payment gateway reachable?)'
    ],
    codeExample: `# application.yml - Expose actuator endpoints
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
  // SECTION 9: Microservices Concepts
  // ==========================================
  {
    id: 'spring-microservices',
    name: 'Microservices Architecture Basics',
    category: 'Spring Boot',
    difficulty: 'hard',
    description: 'Microservices split a large application into small, independent services that communicate over HTTP/gRPC. Spring Cloud provides tools to manage the complexity.',
    bulletPoints: [
      'Service Discovery (Eureka): Services register themselves. When Service A needs Service B, it asks the Discovery Server for its address',
      'API Gateway (Spring Cloud Gateway): A single entry point for ALL client requests. Handles routing, auth, rate limiting, and load balancing',
      'Circuit Breaker (Resilience4j): Prevents cascading failures. If Service B is down, the circuit "opens" and returns a fallback response instead of crashing Service A',
      'Inter-Service Communication: Synchronous (REST via WebClient/FeignClient) or Asynchronous (Message Queues like RabbitMQ/Kafka)',
      'Config Server: Centralized configuration management. All services pull their config from one place (e.g., a Git repo)'
    ],
    codeExample: `// Feign Client - Declarative REST client for service-to-service calls
@FeignClient(name = "inventory-service") // Calls the "inventory-service" registered in Eureka
public interface InventoryClient {

    @GetMapping("/api/inventory/{productId}")
    InventoryResponse checkStock(@PathVariable String productId);
}

// Circuit Breaker with Resilience4j
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
        return "Service temporarily unavailable. Please try again later.";
    }
}`
  },
  // ==========================================
  // SECTION 10: Caching
  // ==========================================
  {
    id: 'spring-caching',
    name: 'Caching with Spring Boot',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Caching stores frequently accessed data in memory to avoid repeated database hits. Spring Boot provides a simple annotation-driven caching abstraction.',
    bulletPoints: [
      '@EnableCaching on a configuration class activates the caching infrastructure',
      '@Cacheable("cacheName"): Caches the return value. Next call with the same arguments skips the method and returns the cached value',
      '@CacheEvict("cacheName"): Removes data from the cache (e.g., when data is updated or deleted)',
      '@CachePut("cacheName"): Updates the cache without skipping the method execution',
      'Default cache is ConcurrentHashMap (in-memory). For production, use Redis or Caffeine for distributed/high-performance caching'
    ],
    codeExample: `@Configuration
@EnableCaching
public class CacheConfig { }

@Service
public class ProductService {

    // First call: Hits DB and stores result in cache
    // Subsequent calls with same ID: Returns from cache instantly
    @Cacheable(value = "products", key = "#id")
    public Product findById(Long id) {
        return productRepo.findById(id).orElseThrow();
    }

    // When a product is updated, refresh the cache
    @CachePut(value = "products", key = "#product.id")
    public Product update(Product product) {
        return productRepo.save(product);
    }

    // When a product is deleted, remove it from cache
    @CacheEvict(value = "products", key = "#id")
    public void delete(Long id) {
        productRepo.deleteById(id);
    }
}`
  },
  // ==========================================
  // SECTION 11: Async & Scheduling
  // ==========================================
  {
    id: 'spring-async-scheduling',
    name: 'Async Processing & Scheduling',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: '@Async runs methods in a separate thread so the caller does not wait. @Scheduled runs tasks automatically at fixed intervals or cron expressions.',
    bulletPoints: [
      '@EnableAsync activates async support. @Async on a method makes it execute in a background thread',
      '@Async methods should return void or CompletableFuture<T> so the caller can optionally get the result later',
      '@EnableScheduling activates the scheduler. @Scheduled runs tasks at intervals (fixedRate, fixedDelay, or cron expression)',
      'Important: @Async has the same proxy trap as @Transactional. Calling it from within the same class will NOT work asynchronously',
      'Configure a custom ThreadPoolTaskExecutor to control pool size, queue capacity, and thread naming for production use'
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

    @Async // Runs in background thread - caller does NOT wait
    public CompletableFuture<String> sendWelcomeEmail(String email) {
        // Simulate slow email sending
        Thread.sleep(3000);
        return CompletableFuture.completedFuture("Sent to " + email);
    }

    @Scheduled(fixedRate = 60000) // Runs every 60 seconds automatically
    public void cleanupExpiredTokens() {
        tokenRepo.deleteExpiredTokens();
    }
}`
  },
  // ==========================================
  // SECTION 12: Modern Spring Boot (2024-2026)
  // ==========================================
  {
    id: 'spring-modern-features',
    name: 'Modern Spring Boot (3.x & Beyond)',
    category: 'Spring Boot',
    difficulty: 'hard',
    description: 'Modern Spring Boot 3.x brings Java 17+ baseline, GraalVM Native Images for instant startup, Virtual Threads for massive concurrency, and Micrometer for observability.',
    bulletPoints: [
      'Spring Boot 3.x requires Java 17+ and uses Jakarta EE (javax.* changed to jakarta.*). This is the MOST asked migration question',
      'GraalVM Native Image: Compiles your app to a native binary. Starts in milliseconds with minimal memory (perfect for serverless/cloud)',
      'Virtual Threads (Project Loom): Lightweight threads managed by the JVM. Handle millions of concurrent requests without thread pool exhaustion',
      'Micrometer + OpenTelemetry: The standard for distributed tracing, metrics, and logging across microservices',
      'Records as DTOs: Java Records are now the recommended way to create immutable Data Transfer Objects in Spring Boot 3.x'
    ],
    codeExample: `// 1. Enable Virtual Threads (application.yml)
// spring.threads.virtual.enabled=true
// That is it! Tomcat now uses virtual threads for all requests.

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
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(product));
    }
}

// 4. GraalVM Native Build (Maven)
// mvn -Pnative spring-boot:build-image`
  }
];
