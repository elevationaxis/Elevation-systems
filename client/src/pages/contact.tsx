'''
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Mail, MapPin, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

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

  const submitMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await apiRequest("POST", "/api/contact", values);
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Received",
        description: data.message || "Thank you. I'll be in touch within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or email hello@elevationaxis.com directly.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitMutation.mutate(values);
  }

  return (
    <>
      <Section className="pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Let's map your path forward.</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-md leading-relaxed">
              This isn't a sales call. It's a diagnostic session. Tell me about your business, your goals, and what's not working. I'll give you a straightforward assessment and a clear plan.
            </p>

            <div className="space-y-6 border-t border-border/10 pt-8">
              <div>
                <h3 className="font-serif text-lg mb-2">Direct Contact</h3>
                <a href="mailto:hello@elevationaxis.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail size={16} />
                  hello@elevationaxis.com
                </a>
              </div>
              
              <div>
                <h3 className="font-serif text-lg mb-2">Location</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  <span>Indianapolis, IN (Remote)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary/20 p-8 md:p-10 border border-border/10">
            <h2 className="font-serif text-2xl mb-6">Book a Discovery Call</h2>
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
                      <FormLabel>What are your current challenges?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What's going on with your website or leads right now? What are your goals for the next 6-12 months?" 
                          className="rounded-none bg-background border-border/20 focus:border-accent min-h-[150px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full rounded-none" disabled={submitMutation.isPending}>
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Request a Call"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Section>
    </>
  );
}
'''
