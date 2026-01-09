import { InterviewTopic } from './types';

export const springBootTopics: InterviewTopic[] = [
  {
    id: 'spring-intro',
    name: 'Spring Boot Basics',
    category: 'Spring Boot',
    difficulty: 'easy',
    description: 'Spring Boot is an opinionated framework that simplifies Spring application development. It provides auto-configuration, embedded servers, and production-ready features out of the box.',
    bulletPoints: [
      'Convention over configuration approach',
      'Embedded Tomcat, Jetty, or Undertow servers',
      'Starter dependencies simplify Maven/Gradle config',
      '@SpringBootApplication combines three annotations'
    ],
    codeExample: `@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}

// application.properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.jpa.hibernate.ddl-auto=update`
  },
  {
    id: 'spring-rest',
    name: 'RESTful Web Services',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Spring Boot makes it easy to create RESTful web services. Using @RestController and related annotations, you can quickly expose REST APIs.',
    bulletPoints: [
      '@RestController combines @Controller and @ResponseBody',
      '@RequestMapping, @GetMapping, @PostMapping for endpoints',
      '@PathVariable and @RequestBody for request data',
      'ResponseEntity provides full control over HTTP response'
    ],
    codeExample: `@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User saved = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}`
  },
  {
    id: 'spring-jpa',
    name: 'Spring Data JPA',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Spring Data JPA simplifies database access by providing repository abstractions. It reduces boilerplate code and supports query derivation from method names.',
    bulletPoints: [
      'JpaRepository provides CRUD operations automatically',
      'Query methods derived from method names',
      '@Query for custom JPQL or native SQL',
      'Pagination and sorting built-in'
    ],
    codeExample: `@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Email
    private String email;
}

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNameContaining(String name);
    
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);
    
    Page<User> findAll(Pageable pageable);
}`
  },
  {
    id: 'spring-security',
    name: 'Spring Security',
    category: 'Spring Boot',
    difficulty: 'hard',
    description: 'Spring Security provides comprehensive security services for Java applications. It handles authentication, authorization, and protection against common vulnerabilities.',
    bulletPoints: [
      'Authentication verifies user identity',
      'Authorization determines access permissions',
      'JWT tokens for stateless authentication',
      'Method-level security with @PreAuthorize'
    ],
    codeExample: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`
  },
  {
    id: 'spring-testing',
    name: 'Testing in Spring Boot',
    category: 'Spring Boot',
    difficulty: 'medium',
    description: 'Spring Boot provides excellent testing support with @SpringBootTest for integration tests and @WebMvcTest for controller tests. Mockito is commonly used for mocking dependencies.',
    bulletPoints: [
      '@SpringBootTest loads full application context',
      '@WebMvcTest for testing controllers in isolation',
      '@MockBean for mocking Spring beans',
      'TestRestTemplate and WebTestClient for HTTP tests'
    ],
    codeExample: `@WebMvcTest(UserController.class)
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    void shouldReturnUser() throws Exception {
        User user = new User(1L, "Divyansh", "divyansh@example.com");
        when(userService.findById(1L)).thenReturn(Optional.of(user));
        
        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Divyansh"))
            .andExpect(jsonPath("$.email").value("divyansh@example.com"));
    }
}`
  }
];
