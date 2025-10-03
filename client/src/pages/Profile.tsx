import { useQuery, useMutation } from "@tanstack/react-query";
import type { User } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { User as UserIcon, Award, Coins, Calendar, Edit2 } from "lucide-react";
import { useState } from "react";

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.union([z.string().email("Invalid email address"), z.literal("")]).optional(),
  mobile: z.union([z.string().min(10, "Mobile number must be 10 digits"), z.literal("")]).optional(),
  gender: z.string().optional(),
  location: z.string().optional(),
  institution: z.string().optional(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/me"],
  });

  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      gender: user?.gender || "",
      location: user?.location || "",
      institution: user?.institution || "",
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateProfileFormData) => {
      const res = await apiRequest("PATCH", "/api/user/profile", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UpdateProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl font-bold">My Profile</h1>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            data-testid="button-edit-profile"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card data-testid="card-eco-points">
            <CardHeader className="pb-3">
              <CardDescription>Eco Points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Award className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold" data-testid="text-eco-points">{user.ecoPoints || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-coins">
            <CardHeader className="pb-3">
              <CardDescription>Coins Earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Coins className="h-8 w-8 text-chart-5" />
                <span className="text-3xl font-bold" data-testid="text-coins">{user.coins || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-active-days">
            <CardHeader className="pb-3">
              <CardDescription>Active Days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar className="h-8 w-8 text-chart-4" />
                <span className="text-3xl font-bold" data-testid="text-active-days">
                  {user.activeDays?.length || 0}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your account details and personal information</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" data-testid="input-edit-name" {...field} />
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" data-testid="input-edit-email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="10-digit number" data-testid="input-edit-mobile" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Input placeholder="Gender" data-testid="input-edit-gender" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" data-testid="input-edit-location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input placeholder="School/College" data-testid="input-edit-institution" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    data-testid="button-save-profile"
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-medium" data-testid="text-username">{user.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium" data-testid="text-name">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium" data-testid="text-email">{user.email || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile</p>
                    <p className="font-medium" data-testid="text-mobile">{user.mobile || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium" data-testid="text-gender">{user.gender || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium" data-testid="text-location">{user.location || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <Badge variant={user.role === "teacher" ? "default" : "secondary"} data-testid="badge-role">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Institution</p>
                    <p className="font-medium" data-testid="text-institution">{user.institution || "Not provided"}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {user.achievements && user.achievements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your earned badges and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user.achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center p-4 bg-primary/10 rounded-lg border border-primary/20"
                    data-testid={`achievement-${idx}`}
                  >
                    <span className="text-3xl mb-2">{achievement.icon}</span>
                    <p className="font-semibold text-sm">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
