"use client"

import React, { useState } from "react";
import { format } from "date-fns";
import { z } from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react"
import { cn } from "../../lib/utils";
import { FormDescription } from "../../components/ui/form";

const formSchema = z.object({
  emailAddress: z.string().email(),
  date: z.date(),
  specialty: z.string(),
  yearsExperience: z.number(),
  pay: z.number(),
});

export default function SubmitSalaryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      date: new Date(),
      specialty: "",
      yearsExperience: 0,
      pay: 0,  
    }
  });

  const handleSubmit = () => {}

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <article className="w-2/4 mb-2 mx-auto bg-outline">
          <h1 className="header-title mb-5 font-american-typewriter">Real salaries from real nurses. </h1>
          <div className="header-content mb-5 font-american-typewriter">
            <p>Your submission may lead to better wages across the board! Help out now!</p>
            <p>Please submit your current offer or upcoming offers that you have.</p>
            <p>Contact US! We need ideas of how to sort salaries and the most important factors that go into salaries.</p>
          </div>
          <h1 className="header-title font-american-typewriter">Real Salaries, Real People</h1>
        </article>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full mt-8">
          <FormField 
            control={form.control} 
            name="emailAddress" 
            render={({ field }) => {
              return (
                <FormItem className="flex items-baseline">
                  <FormLabel className="w-1/4">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Email address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => {
              return (
                <FormItem className="flex items-baseline">
                  <FormLabel className="w-1/4">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="date-input">
                        <Button
                          variant={"outline"}
                          className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? (format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                          </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField 
            control={form.control} 
            name="specialty" 
            render={({ field }) => {
              return (
                <FormItem className="flex items-baseline">
                  <FormLabel className="w-1/4">Specialty</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Specialty"
                      type="specialty"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField 
            control={form.control} 
            name="specialty" 
            render={({ field }) => {
              return (
                <FormItem className="flex items-baseline">
                  <FormLabel className="w-1/4">Experience</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Years of Experience"
                      type="experience"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField 
            control={form.control} 
            name="pay" 
            render={({ field }) => {
              return (
                <FormItem className="flex items-baseline">
                  <FormLabel className="w-1/4">Pay (hourly)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Pay"
                      type="pay"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
  }