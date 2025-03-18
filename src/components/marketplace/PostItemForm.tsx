
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles, Info, AlertTriangle, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HOUSING_SOCIETIES } from "@/data/mockData";

// Form schema with validation
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(500, "Description must be less than 500 characters"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, { message: "Price must be a valid number" }),
  isFree: z.boolean().default(false),
  condition: z.enum(["New", "Like New", "Used"]),
  category: z.string().min(1, "Please select a category"),
  society: z.string().min(1, "Please select a society"),
  customSociety: z.string().optional(),
  location: z.string().min(3, "Location must be at least 3 characters"),
  featured: z.boolean().default(false),
  images: z.any().optional(),
  contactInfo: z.string().min(5, "Contact information is required"),
});

type FormValues = z.infer<typeof formSchema>;

const CATEGORIES = [
  "Electronics",
  "Furniture",
  "Books",
  "Clothing",
  "Sports Equipment",
  "Kitchen Appliances",
  "Stationery",
  "Decor",
  "Other"
];

const PostItemForm: React.FC = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [showCustomSociety, setShowCustomSociety] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      isFree: false,
      condition: "Used",
      category: "",
      society: "",
      customSociety: "",
      location: "",
      featured: false,
      contactInfo: "",
    },
  });

  const watchIsFree = form.watch("isFree");
  const watchSociety = form.watch("society");

  React.useEffect(() => {
    if (watchSociety === "Other") {
      setShowCustomSociety(true);
    } else {
      setShowCustomSociety(false);
    }
  }, [watchSociety]);

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    
    // Simulate form submission
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Item posted successfully!",
        description: data.featured 
          ? "Your featured listing is now live and will get 10x more visibility."
          : "Your listing is now live.",
        variant: "default",
      });
      
      form.reset();
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. MacBook Pro 2021" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your item, including condition, age, and any relevant details" 
                    rows={4}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Separator />
        
        {/* Location Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Location</h3>
          
          <FormField
            control={form.control}
            name="society"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Society</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your society" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {HOUSING_SOCIETIES.map((society) => (
                      <SelectItem key={society} value={society}>
                        {society}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {showCustomSociety && (
            <FormField
              control={form.control}
              name="customSociety"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Society/Area</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your society or area name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Block C, Near Main Gate" {...field} />
                </FormControl>
                <FormDescription>
                  Provide more specific location details to help buyers find you
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Separator />
        
        {/* Pricing */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Pricing</h3>
          
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Free Item</FormLabel>
                  <FormDescription>
                    Mark this item as free (0 price)
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          {!watchIsFree && (
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        
        <Separator />
        
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Information</h3>
          
          <FormField
            control={form.control}
            name="contactInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Information</FormLabel>
                <FormControl>
                  <Input placeholder="Phone number or email" {...field} />
                </FormControl>
                <FormDescription>
                  This will be visible to interested buyers
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Separator />
        
        {/* Images Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Images</h3>
          
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-1">Drag and drop your images here</p>
            <p className="text-xs text-gray-500 mb-3">Maximum 5 images, JPG or PNG, max 5MB each</p>
            <Button type="button" variant="outline" size="sm">
              Browse Files
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Info className="h-4 w-4" />
            Clear, well-lit photos increase your chances of selling quickly
          </p>
        </div>
        
        <Separator />
        
        {/* Featured Listing Option */}
        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="rounded-lg border p-4 shadow-md bg-amber-50">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <div>
                    <FormLabel className="text-base font-medium">Featured Listing</FormLabel>
                    <FormDescription className="text-sm">
                      Featured listings sell <span className="font-semibold">10x faster</span> and get premium placement
                    </FormDescription>
                  </div>
                  
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value ? "true" : "false"}
                    className="space-y-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Yes, feature my listing (₹99)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        No, standard listing (free)
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </div>
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm flex items-center text-gray-500">
            <AlertTriangle className="h-4 w-4 mr-1" />
            All fields marked with * are required
          </p>
          <Button type="submit" size="lg" disabled={isUploading}>
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Post Item
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostItemForm;
