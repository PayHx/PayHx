"use client";

import React from "react";
import { format } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronsUpDown, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { addSalaryData } from "@/resources/firebaseUtil";
import { useToast } from "@/components/ui/use-toast";

export const states = [
  { label: "AL", value: "Alabama" },
  { label: "AK", value: "Alaska" },
  { label: "AZ", value: "Arizona" },
  { label: "AR", value: "Arkansas" },
  { label: "CA", value: "California" },
  { label: "CO", value: "Colorado" },
  { label: "CT", value: "Connecticut" },
  { label: "DE", value: "Delaware" },
  { label: "DC", value: "Washington DC" },
  { label: "FL", value: "Florida" },
  { label: "GA", value: "Georgia" },
  { label: "HI", value: "Hawaii" },
  { label: "ID", value: "Idaho" },
  { label: "IL", value: "Illinois" },
  { label: "IN", value: "Indiana" },
  { label: "IA", value: "Iowa" },
  { label: "KS", value: "Kansas" },
  { label: "KY", value: "Kentucky" },
  { label: "LA", value: "Louisiana" },
  { label: "ME", value: "Maine" },
  { label: "MD", value: "Maryland" },
  { label: "MA", value: "Massachusetts" },
  { label: "MI", value: "Michigan" },
  { label: "MN", value: "Minnesota" },
  { label: "MS", value: "Mississippi" },
  { label: "MO", value: "Missouri" },
  { label: "MT", value: "Montana" },
  { label: "NE", value: "Nebraska" },
  { label: "NV", value: "Nevada" },
  { label: "NH", value: "New Hampshire" },
  { label: "NJ", value: "New Jersey" },
  { label: "NM", value: "New Mexico" },
  { label: "NY", value: "New York" },
  { label: "NC", value: "North Carolina" },
  { label: "ND", value: "North Dakota" },
  { label: "OH", value: "Ohio" },
  { label: "OK", value: "Oklahoma" },
  { label: "OR", value: "Oregon" },
  { label: "PA", value: "Pennsylvania" },
  { label: "RI", value: "Rhode Island" },
  { label: "SC", value: "South Carolina" },
  { label: "SD", value: "South Dakota" },
  { label: "TN", value: "Tennessee" },
  { label: "TX", value: "Texas" },
  { label: "UT", value: "Utah" },
  { label: "VT", value: "Vermont" },
  { label: "VA", value: "Virginia" },
  { label: "WA", value: "Washington" },
  { label: "WV", value: "West Virginia" },
  { label: "WI", value: "Wisconsin" },
  { label: "WY", value: "Wyoming" },
];

// **Specialty options for the combobox**
export const specialties = [
  { label: "Ambulatory/Outpatient", value: "Ambulatory/Outpatient" },
  { label: "Acute Care", value: "Acute Care" },
  { label: "Acute Rehabilitation", value: "Acute Rehabilitation" },
  { label: "Behavioral Health", value: "Behavioral Health" },
  {
    label: "Cardiac Catheterization Lab",
    value: "Cardiac Catheterization Lab",
  },
  {
    label: "Cardiovascular Intensive Care Unit",
    value: "Cardiovascular Intensive Care Unit",
  },
  { label: "Case Management", value: "Case Management" },
  { label: "Corrections", value: "Corrections" },
  { label: "Dialysis", value: "Dialysis" },
  { label: "Emergency Department", value: "Emergency Department" },
  { label: "Endoscopy", value: "Endoscopy" },
  { label: "Float Pool", value: "Float Pool" },
  { label: "Home Health", value: "Home Health" },
  { label: "Hospice", value: "Hospice" },
  { label: "Infusion", value: "Infusion" },
  { label: "Intensive Care Unit", value: "Intensive Care Unit" },
  { label: "Interventional Radiology", value: "Interventional Radiology" },
  { label: "Labor and Delivery", value: "Labor and Delivery" },
  { label: "Long Term Care", value: "Long Term Care" },
  { label: "Medical Surgical", value: "Medical Surgical" },
  { label: "Mental Health", value: "Mental Health" },
  {
    label: "Neonatal Intensive Care Unit",
    value: "Neonatal Intensive Care Unit",
  },
  { label: "Neuro Intensive Care Unit", value: "Neuro Intensive Care Unit" },
  { label: "Neuroscience/Stroke", value: "Neuroscience/Stroke" },
  { label: "Oncology", value: "Oncology" },
  {
    label: "Pediatric Intensive Care Unit",
    value: "Pediatric Intensive Care Unit",
  },
  { label: "Pediatrics", value: "Pediatrics" },
  { label: "Perioperative", value: "Perioperative" },
  { label: "Postpartum", value: "Postpartum" },
  { label: "Pre/Post-operative", value: "Pre/Post-operative" },
  { label: "Progressive Care Unit", value: "Progressive Care Unit" },
  { label: "Psychiatric", value: "Psychiatric" },
  { label: "Public Health", value: "Public Health" },
  { label: "School Nurse", value: "School Nurse" },
  { label: "Skilled Nursing Facility", value: "Skilled Nursing Facility" },
  { label: "Subacute", value: "Subacute" },
  {
    label: "Surgical Intensive Care Unit",
    value: "Surgical Intensive Care Unit",
  },
  { label: "Telemetry/Cardiac", value: "Telemetry/Cardiac" },
  { label: "Wound Care", value: "Wound Care" },
];

const unions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Unsure", value: "unsure" },
];

const shiftDiff = [
  { label: "Nights", value: "nights" },
  { label: "Day", value: "day" },
  { label: "Weekend", value: "weekend" },
  { label: "NA", value: "" },
];

// **Form schema with specialty as a string**
const formSchema = z.object({
  emailAddress: z.string().email(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  date: z.date(),
  specialty: z.string().nonempty("Please select a specialty"),
  hospital: z.string(),
  union: z.string(),
  yearsExperience: z.number(),
  pay: z.number(),
  shiftDiffPay: z.number(),
  shiftDiffType: z.string(),
});

export default function SubmitSalaryPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      city: "",
      state: "",
      zipcode: "",
      date: new Date(),
      specialty: "",
      hospital: "",
      union: "",
      yearsExperience: 0,
      pay: 0,
      shiftDiffPay: 0,
      shiftDiffType: "",
    },
  });

  const { toast } = useToast();

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const formattedData = {
      ...data,
      date: data.date.toISOString(),
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <article className="w-2/4 mb-2 mx-auto bg-outline">
        <h1 className="header-title mb-5 font-american-typewriter">
          Real salaries from real nurses.
        </h1>
        <div className="header-content mb-5 font-american-typewriter">
          <p>Your submission may lead to better wages across the board!</p>
          <p>ALL INFORMATION WILL REMAIN ANONYMOUS!</p>
          <p>Thank you for your help and support as we continue to grow.</p>
          <p>
            Please submit your current offer or upcoming offers that you have.
          </p>
          <p>Contact us at payhx.live@gmail.com</p>
        </div>
        <h1 className="header-title font-american-typewriter">
          Real Salaries, Real People
        </h1>
      </article>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full mt-8"
        >
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="w-[20%] text-left">Email</FormLabel>
                <FormControl className="w-[80%]">
                  <Input
                    placeholder="i.e Payhx.live@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="flex items-baseline">
            <FormLabel className="w-[20%] text-left">Location</FormLabel>
            <div className="flex w-[80%] gap-4">
              {/* First FormField for city */}
              <FormField
                control={form.control}
                name="city" // This links to the city variable in the form state
                render={({ field }) => (
                  <FormControl className="w-3/4">
                    <Input placeholder="City (i.e Los Angeles)" {...field} />
                  </FormControl>
                )}
              />

              {/* Second FormField for state */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex items-baseline">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="w-1/4">
                          <Button
                            variant="outline"
                            role="combobox"
                            tabIndex={0}
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? states.find((s) => s.value === field.value)
                                  ?.label
                              : "State"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="State" />
                          <CommandList>
                            <CommandEmpty>No states found.</CommandEmpty>
                            <CommandGroup>
                              {states.map((state) => (
                                <CommandItem
                                  key={state.value}
                                  value={state.label}
                                  onSelect={() => field.onChange(state.value)}
                                >
                                  {state.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      state.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="w-[20%] text-left">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="w-[80%]">
                      <Button
                        variant={"outline"}
                        tabIndex={0}
                        className={cn(
                          "w-[80%] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
            )}
          />

          {/* Specialty Combobox Field */}
          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="w-[20%] text-left">Specialty</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="w-full">
                      <Button
                        variant="outline"
                        role="combobox"
                        tabIndex={0}
                        className={cn(
                          "w-[80%] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? specialties.find((s) => s.value === field.value)
                              ?.label || field.value
                          : "Select specialty"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search or enter specialty..."
                        onInput={(e) => field.onChange(e.currentTarget.value)} // Update the field on input
                      />
                      <CommandList>
                        <CommandEmpty>
                          <Button
                            variant="link"
                            onClick={() => field.onChange(field.value)} // Allow adding the entered text
                          >
                            Add &quot;{field.value}&quot;
                          </Button>
                        </CommandEmpty>
                        <CommandGroup>
                          {specialties.map((specialty) => (
                            <CommandItem
                              key={specialty.value}
                              value={specialty.label}
                              onSelect={() => field.onChange(specialty.value)}
                            >
                              {specialty.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  specialty.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hospital"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="w-[20%] text-left">Hospital</FormLabel>
                <FormControl className="w-[80%]">
                  <Input
                    placeholder="This one ANONYMOUS! (i.e Kaiser Permanente)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="w-[20%] text-left">Zipcode</FormLabel>
                <FormControl className="w-[80%]">
                  <Input
                    placeholder="Hospital Zip code (i.e 90027)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="union"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="w-[20%] text-left">Union</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="w-full">
                      <Button
                        variant="outline"
                        role="combobox"
                        tabIndex={0}
                        className={cn(
                          "w-[80%] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? unions.find((u) => u.value === field.value)?.label
                          : "Yes or No or No but I wish it was"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search union status..." />
                      <CommandList>
                        <CommandEmpty>No union status found.</CommandEmpty>
                        <CommandGroup>
                          {unions.map((union) => (
                            <CommandItem
                              key={union.value}
                              value={union.label}
                              onSelect={() => field.onChange(union.value)}
                            >
                              {union.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  union.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearsExperience"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="w-[25%] text-left">Experience</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Years of Experience (i.e 5)"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pay"
            render={({ field }) => (
              <FormItem className="flex items-baseline">
                <FormLabel className="w-1/4">Pay (hourly)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="i.e 50"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="flex items-baseline">
            <FormLabel className="w-[20%] text-left">Shift Diff</FormLabel>
            <div className="flex w-[80%] gap-4">
              {/* First FormControl for shiftDiffPay */}
              <FormField
                control={form.control}
                name="shiftDiffPay"
                render={({ field }) => (
                  <FormControl className="w-1/2">
                    <Input
                      placeholder="$ More"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                )}
              />

              {/* Second FormControl for shiftDiffType */}
              <FormField
                control={form.control}
                name="shiftDiffType"
                render={({ field }) => (
                  <FormControl className="w-1/2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          tabIndex={0}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? shiftDiff.find((s) => s.value === field.value)
                                ?.label || field.value
                            : "Shift Type (i.e Nights)"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search or enter shift type..."
                            onInput={(e) =>
                              field.onChange(e.currentTarget.value)
                            }
                          />
                          <CommandList>
                            <CommandEmpty>
                              <Button
                                variant="link"
                                onClick={() => {
                                  if (field.value) {
                                    field.onChange(field.value); // Allow manually entered text
                                  }
                                }}
                              >
                                Add &quot;{field.value}&quot;
                              </Button>
                            </CommandEmpty>
                            <CommandGroup>
                              {shiftDiff.map((shift) => (
                                <CommandItem
                                  key={shift.value}
                                  value={shift.label}
                                  onSelect={() => field.onChange(shift.value)}
                                >
                                  {shift.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      shift.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                )}
              />
            </div>
            <FormMessage />
          </FormItem>

          <Button type="submit" className="w-full mt-4" tabIndex={0}>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
