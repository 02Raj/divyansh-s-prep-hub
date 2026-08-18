import { SDTitle, SDHeading2, SDParagraph, SDList, RememberBlock, InterviewQuestion, CommonMistake } from '../ui/SystemDesignUI';

export default function LLD05ConcurrencyAndAsync() {
  return (
    <div className="max-w-4xl">
      <SDTitle>LLD-05: Concurrency & Async Programming</SDTitle>
      
      <SDParagraph>
        Modern web applications handle thousands of users at once. If your code is strictly synchronous, one slow API call can block the entire server. Low-Level Design requires understanding how to make things fast and concurrent without causing race conditions.
      </SDParagraph>

      <SDHeading2>1. The Problem with Synchronous Code</SDHeading2>
      <SDParagraph>
        Imagine a user registers on your site. You need to:
      </SDParagraph>
      <SDList>
        <li>Save them to the DB (takes 50ms)</li>
        <li>Call a 3rd party API to verify their address (takes 1000ms)</li>
        <li>Send a Welcome Email (takes 2000ms)</li>
      </SDList>
      <SDParagraph>
        If done synchronously, the user clicks "Register" and waits <strong>over 3 seconds</strong> staring at a loading spinner. That is bad UX, and it ties up a valuable server thread for 3 seconds.
      </SDParagraph>

      <SDHeading2>2. Asynchronous Execution (@Async)</SDHeading2>
      <SDParagraph>
        Spring Boot provides `@Async` to run methods in a background thread. The main thread returns immediately.
      </SDParagraph>
      
      <div className="bg-muted/30 p-6 rounded-lg border border-border my-4">
        <h4 className="font-semibold mb-2">How to fix the Registration problem:</h4>
        <ol className="list-decimal ml-6 space-y-1 text-sm text-muted-foreground">
          <li>Save user to DB (50ms).</li>
          <li>Call `emailService.sendWelcomeEmail()` which is annotated with `@Async`.</li>
          <li>The main thread instantly returns "Registration Successful" to the user (Total time: 55ms!).</li>
          <li>A background thread wakes up and spends 2000ms sending the email without the user waiting.</li>
        </ol>
      </div>

      <SDHeading2>3. CompletableFuture (Advanced Async)</SDHeading2>
      <SDParagraph>
        What if you need to call 3 different microservices to build a dashboard, and you need the results from ALL of them before returning data to the user? `@Async` returning `void` won't work. You need `CompletableFuture`.
      </SDParagraph>
      <SDList>
        <li>`CompletableFuture` allows you to fire off 3 network calls simultaneously in parallel.</li>
        <li>If each call takes 1 second, doing it synchronously takes 3 seconds. Doing it with `CompletableFuture.allOf()` takes <strong>1 second total</strong>.</li>
      </SDList>

      <SDHeading2>4. Thread Pools (ExecutorService)</SDHeading2>
      <SDParagraph>
        Creating a brand new Thread (`new Thread()`) for every background task is dangerous. Threads take RAM. If 10,000 users register at once, you will create 10,000 threads and crash the JVM (OutOfMemoryError).
      </SDParagraph>
      <SDList>
        <li><strong>The Solution:</strong> A Thread Pool (e.g., `ThreadPoolTaskExecutor`).</li>
        <li>You configure a pool of exactly 50 threads. If 10,000 tasks come in, 50 run immediately. The other 9,950 wait safely in a Queue. The server never crashes.</li>
        <li>Never use `@Async` without configuring a custom Thread Pool in Spring Boot!</li>
      </SDList>

      <RememberBlock>
        <strong>Race Conditions:</strong> When two threads try to update the exact same database row or Java variable at the same time. Prevent this by using stateless Singleton Services, or Database Row Locks (e.g., `SELECT ... FOR UPDATE`).
      </RememberBlock>

      <InterviewQuestion 
        question="What happens if an Exception is thrown inside a void @Async method?"
        answer={
          <div>
            <p>If an exception is thrown in a normal synchronous method, the user gets an HTTP 500 Error. But if an exception is thrown inside a <code>void @Async</code> method, the main thread has already returned HTTP 200 to the user!</p>
            <p className="mt-2">The exception is simply logged to the console in the background. The user never knows the email failed to send. To handle this properly, you must implement an <code>AsyncUncaughtExceptionHandler</code> in your Spring config to catch those silent errors and trigger alerts.</p>
          </div>
        }
      />

      <CommonMistake>
        Calling an `@Async` method from <strong>within the same class</strong>. Due to how Spring AOP Proxies work, if `methodA()` calls `methodB()` in the exact same class, the `@Async` annotation on `methodB` is completely ignored, and it runs synchronously! Always put `@Async` methods in a separate Service class.
      </CommonMistake>

    </div>
  );
}
