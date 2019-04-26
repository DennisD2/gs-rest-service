package hello;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class GreetingController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(counter.incrementAndGet(),
                String.format(template, name));
    }

    @RequestMapping("/greetings")
    public List<Greeting> greetings(@RequestParam(value="name", defaultValue="World") String name) {
        List<Greeting> results = new ArrayList<Greeting>();
        results.add(new Greeting(counter.incrementAndGet(), String.format(template, name + counter.get())));
        results.add(new Greeting(counter.incrementAndGet(), String.format(template, name + counter.get())));
        results.add(new Greeting(counter.incrementAndGet(), String.format(template, name + counter.get())));
        results.add(new Greeting(counter.incrementAndGet(), String.format(template, name + counter.get())));
        results.add(new Greeting(counter.incrementAndGet(), String.format(template, name + counter.get())));
        results.add(new Greeting(counter.incrementAndGet(), String.format(template, name + counter.get())));
        return results;
    }
}