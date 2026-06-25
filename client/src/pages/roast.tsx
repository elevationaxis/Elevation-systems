import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Flame, CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Section } from "@/components/layout";

// ── Schema ────────────────────────────────────────────────────────────────────

const formSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Valid email required"),
  websiteUrl: z.string().url("Full URL required — e.g. https://example.com"),
  biggestConcern: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Roast() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      email: "",
      websiteUrl: "",
      biggestConcern: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) =>
      apiRequest("POST", "/api/roast", data).then((r) => r.json()),
    onSuccess: () => {
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

  const onSubmit = (data: FormValues) => mutation.mutate(data);

  // ── Success state ────────────────────────────────────────────────────────────
  if (mutation.isSuccess) {
    return (
      <Section className="pt-32 pb-24 text-center">
        <div className="max-w-lg mx-auto">
          <CheckCircle2 className="w-12 h-12 mx-auto mb-6 text-[#C9A84C]" />
          <h2 className="text-3xl font-serif mb-4">Got it. I'll take a look.</h2>
          <p className="text-muted-foreground mb-2">
            You'll hear back within 24–48 hours with an honest, specific take on what's working, what isn't, and what I'd fix first.
          </p>
          <p className="text-sm text-muted-foreground">
            No pitch. No pressure. Just a straight answer.
          </p>
        </div>
      </Section>
    );
  }

  // ── Form state ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Hero */}
      <Section className="pt-32 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-6 font-medium">
            Free · No Pitch · No Pressure
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-8 leading-[1.05] tracking-tight">
            Send me your website.<br />
            <span className="italic">I'll tell you what's wrong.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Drop your URL below and I'll give you a real, specific take — what's costing you visibility, what's killing conversions, and what I'd fix first if it were mine.
          </p>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            You'll hear back within 24–48 hours. No automated report. A real person, looking at your actual site.
          </p>
        </div>
      </Section>

      {/* What you get */}
      <Section className="py-12 border-t border-b border-border/40">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { label: "First impression", desc: "What a potential customer sees — and whether it builds trust or loses it in the first 5 seconds." },
            { label: "Biggest leak", desc: "The one thing most likely costing you calls, bookings, or credibility right now." },
            { label: "What I'd fix first", desc: "A specific, prioritized recommendation — not a generic checklist." },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs tracking-[0.15em] uppercase text-[#C9A84C] mb-2 font-medium">{item.label}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Form */}
      <Section className="pt-16 pb-24">
        <div className="max-w-xl mx-auto">
          <div className="border border-border/60 bg-card p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <Flame className="w-5 h-5 text-[#C9A84C]" />
              <span className="text-sm tracking-[0.15em] uppercase font-medium">Roast My Website</span>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase">Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="One Point Heating & Cooling" {...field} className="rounded-none" />
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
                      <FormLabel className="text-xs tracking-widest uppercase">Email — I'll reply here</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@yourbusiness.com" {...field} className="rounded-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase">Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourbusiness.com" {...field} className="rounded-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="biggestConcern"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest uppercase">
                        Anything specific you want me to look at? <span className="normal-case text-muted-foreground">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Not ranking on Google, low bookings, looks outdated..." {...field} className="rounded-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-none"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Roast My Website →"
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  No pitch. No pressure. You'll get a real, honest take — nothing automated.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </Section>

      {/* Social proof / framing */}
      <Section className="py-16 border-t border-border/40 text-center">
        <div className="max-w-2xl mx-auto">
          <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-6">
            "You can keep spending money on marketing and hope it works. Or you can fix the foundation and know it does."
          </blockquote>
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            — Brittany Moulder, Elevation Axis
          </p>
        </div>
      </Section>
    </>
  );
}
