import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  businessName: z.string().min(2, { message: "Business name is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", values);
    toast({
      title: "Request Received",
      description: "Thank you for your inquiry. I will be in touch shortly.",
    });
    form.reset();
  }

  return (
    <>
      <Section className="pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Let's Connect</h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-md">
              Ready to bring order to the chaos? Fill out the form to inquire about a project or simply to say hello.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-xl mb-2">Contact</h3>
                <a href="mailto:hello@elevationaxis.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail size={18} />
                  hello@elevationaxis.com
                </a>
              </div>
              
              <div>
                <h3 className="font-serif text-xl mb-2">Office</h3>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={18} />
                  <span>Remote / Worldwide</span>
                </div>
              </div>

              <div className="pt-8 border-t border-border/10">
                <p className="text-sm text-muted-foreground">
                  For general inquiries, please allow 24-48 hours for a response.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/10 p-8 md:p-10 border border-border/5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" className="rounded-none bg-background border-border/20 focus:border-accent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jane@company.com" className="rounded-none bg-background border-border/20 focus:border-accent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Inc." className="rounded-none bg-background border-border/20 focus:border-accent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How can I help?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your current challenges..." 
                          className="rounded-none bg-background border-border/20 focus:border-accent min-h-[150px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full rounded-none">
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Section>
    </>
  );
}
