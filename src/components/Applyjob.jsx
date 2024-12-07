import React from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

import { Input } from "../components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import useFetch from "@/hooks/useFetch";
import { applyTojobs } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";

// This is to resolve the code details correctly by using Zod

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills is required" }),

  education: z.enum(["Intermediate", "Graduate", "Postgraduate"], {
    message: "Education is required",
  }),

  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF and MS Word are accepted" }
    ),
});

const ApplyjobDrawer = ({ user, job, applied = false, fetchJob }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyTojobs);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild className="m-8">
        <Button
          size="lg"
          variant={job?.isopen && !applied ? "blue" : "destructive"}
          disabled={!job?.isopen || applied}
        >
          {job?.isopen ? (applied ? "Applied" : "Apply👇") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Please fill the form below 👇</DrawerDescription>
        </DrawerHeader>

        {/* Form starts */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
        >
          <label htmlFor="" className="text-bold">
            Years of Experience *
          </label>
          <Input
            type="number"
            placeholder="Years of Experience"
            className="flex-1"
            {...register("experience", {
              valueAsNumber: true,
            })}
          />

          {errors.experience && (
            <p className="text-red-600">{errors.experience.message}</p>
          )}

          <label htmlFor="" className="text-bold">
            Skills *
          </label>
          <Input
            type="text"
            placeholder="Skills (Comma separated)"
            className="flex-1"
            {...register("skills")}
          />

          {errors.skills && (
            <p className="text-red-600">{errors.skills.message}</p>
          )}

          <label htmlFor="" className="bold">
            Education *
          </label>
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} {...field}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Intermediate" id="option-one" />
                  <Label htmlFor="option-one">Intermediate</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Graduate" id="option-two" />
                  <Label htmlFor="option-two">Graduate</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Postgraduate" id="option-three" />
                  <Label htmlFor="option-three">Postgraduate</Label>
                </div>
              </RadioGroup>
            )}
          />

          {errors.education && (
            <p className="text-red-600">{errors.education.message}</p>
          )}

          <label htmlFor="" className="bold">
            Attach Resume *
          </label>
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            className="flex-1 file:text-gray-500"
            {...register("resume")}
          />

          {errors.resume && (
            <p className="text-red-600">{errors.resume.message}</p>
          )}

          {/* Server error */}
          {errorApply?.message && (
            <p className="text-red-500">{errorApply?.message}</p>
          )}

          {loadingApply && <BarLoader width={"100%"} color="#36d7b7" />}

          {/* Button */}
          <Button type="submit" variant="blue" size="lg">
            Apply😊
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyjobDrawer;
