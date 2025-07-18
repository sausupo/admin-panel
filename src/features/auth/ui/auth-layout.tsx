import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/kit/card";

interface Props {
  title: React.ReactNode;
  description: React.ReactNode;
  form: React.ReactNode;
  footerText: React.ReactNode;
}

export function AuthLayout({ title, description, form, footerText }: Props) {
  return (
    <main className="grow flex flex-col justify-center items-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
