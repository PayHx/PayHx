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
// Import necessary Firebase functions
import { addSalaryData } from "@/resources/firebaseUtil";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  emailAddress: z.string().email(),
  location: z.string(),
  date: z.date(),
  specialty: z.string(),
  hospital: z.string(),
  union: z.string(),
  yearsExperience: z.number(),
  pay: z.number(),
});

export default function SubmitSalaryPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      location: "",
      date: new Date(),
      specialty: "",
      hospital: "",
      union: "",
      yearsExperience: 0,
      pay: 0,  
    }
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    // Format date if necessary
    const formattedData = {
      ...data,
      date: data.date.toISOString(), // Ensure date is in ISO format
    };

    try {
      const docId = await addSalaryData(formattedData);
      console.log("Document written with ID: ", docId);
      toast({ 
        description: "Your data has been submitted!",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      toast({
        title: "Error",
        description: "Failed to submit data.",
        variant: "destructive",
      });
    }
  };

  const { toast } = useToast();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <article className="w-2/4 mb-2 mx-auto bg-outline">
          <h1 className="header-title mb-5 font-american-typewriter">Real salaries from real nurses. </h1>
          <div className="header-content mb-5 font-american-typewriter">
            <p>Your submission may lead to better wages across the board! Help out now!</p>
            <p>Please submit your current offer or upcoming offers that you have.</p>
            <p>Contact US! We need ideas of how to sort salaries and the most important factors that go into salaries.</p>
            <p>payhx.live@gmail.com </p>
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
            name="location" 
            render={({ field }) => {
              return (
                <FormItem className="flex items-baseline">
                  <FormLabel className="w-1/4">Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="City, State"
                      type="location"
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
            name="hospital" 
            render={({ field }) => {
              return (
                <FormItem className="flex items-baseline">
                  <FormLabel className="w-1/4">Hospital</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Hospital"
                      type="hospital"
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
            name="union" 
            render={({ field }) => {
              return (
                <FormItem className="flex items-baseline">
                  <FormLabel className="w-1/4">Union</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Union"
                      type="union"
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
            name="yearsExperience" 
            render={({ field }) => {
              return (
                <FormItem className="flex items-baseline">
                  <FormLabel className="w-1/4">Experience</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Years of Experience"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))} // Ensure the value is parsed as a number
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
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))} // Ensure the value is parsed as a number
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
