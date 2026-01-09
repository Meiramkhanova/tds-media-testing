import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUsers } from "@/hooks/useUsers";
import Container from "@/shared/ui/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import z from "zod";
import { useNavigate } from "react-router-dom";
import { updateUser } from "@/api/users";
import { toast } from "sonner";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  skills: z.array(
    z.object({ value: z.string().min(1, "Skill cannot be empty") })
  ),
});

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  skills: { value: string }[];
};

function EditUserPage() {
  const { id } = useParams();
  const { users, loading } = useUsers();
  const [skillInput, setSkillInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, control, reset } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      skills: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const user = users.find((u) => String(u.id) === id);

  async function onSubmit(data: FormData) {
    if (!id) return;

    try {
      setIsSubmitting(true);

      await updateUser(Number(id), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        skills: data.skills.map((s) => s.value),
      });

      toast("User updated", {
        description: "The user data has been successfully saved.",
      });

      navigate("/", { replace: true });
    } catch (err) {
      toast("Failed to update", {
        description: "Something went wrong while saving changes.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        skills: user.skills.map((s: string) => ({ value: s })),
      });
    }
  }, [user, reset]);

  function addSkill() {
    if (!skillInput.trim()) return;
    append({ value: skillInput.trim() });
    setSkillInput("");
  }

  function removeSkill(index: number) {
    remove(index);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 h-screen">
        <div className="text-center">
          <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!loading && !user)
    return (
      <Container>
        <main className="container mx-auto py-8 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">User not found</h1>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Button>
            </Link>
          </div>
        </main>
      </Container>
    );

  return (
    <Container>
      <main className="py-8">
        <div className="redirect-home mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Button>
          </Link>
        </div>

        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              Edit the user {user?.firstName} {user?.lastName}
            </CardTitle>
            <CardDescription>Update the information of a user</CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="first-last-name grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-destructive">*</span>
                  </Label>

                  <Input {...register("firstName")} disabled={isSubmitting} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-destructive">*</span>
                  </Label>

                  <Input {...register("lastName")} disabled={isSubmitting} />
                </div>
              </div>

              <div className="email space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>

                <Input {...register("email")} disabled={isSubmitting} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">
                  Skills <span className="text-destructive">*</span>
                </Label>

                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    disabled={isSubmitting}
                    placeholder="Add a skill (e.g., React, TypeScript)"
                  />
                  <Button
                    className="size-12"
                    type="button"
                    onClick={addSkill}
                    size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {fields.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {fields.map((field, index) => (
                      <Badge
                        key={field.id}
                        variant="secondary"
                        className="gap-1">
                        {field.value}
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="ml-1 rounded-full hover:bg-secondary-foreground/20">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {fields.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Add at least one skill by typing and pressing Enter or
                    clicking the + button
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save changes"}
                </Button>

                <Link to="/" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </Container>
  );
}

export default EditUserPage;
