"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "../schema/courses";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RequiredLabelIcon } from "@/components/RequiredLabelIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createCourse } from "../actions/courses";
import { actionToast } from "@/components/ui/sonner";

function CourseForm() {
    const form = useForm<z.infer<typeof courseSchema>>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    async function onsubmit(values: z.infer<typeof courseSchema>) {
        try {
            const data = await createCourse(values);

            actionToast({
                actionData: data
            });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            actionToast({
                actionData: {
                    error: true,
                    message: "An unexpected error occurred while creating the course",
                },
            });
        } finally {
            form.reset();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="flex flex-col gap-6">
                {/* Name Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <RequiredLabelIcon />
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    {...field} 
                                    disabled={form.formState.isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description Field */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <RequiredLabelIcon />
                                Description
                            </FormLabel>
                            <FormControl>
                                <Textarea 
                                    {...field} 
                                    className="min-h-20 resize-none" 
                                    disabled={form.formState.isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <div className="self-end">
                    <Button 
                        disabled={form.formState.isSubmitting} 
                        type="submit"
                    >
                        {form.formState.isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default CourseForm;