import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback
} from '@r-cz/shadcn-ui';

interface ProfileDialogProps {
  children: React.ReactNode;
}

const ProfileDialog = ({ children }: ProfileDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ryan Cruz</DialogTitle>
          <DialogDescription>
            Software Engineer & Developer
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/profile.png" alt="Ryan Cruz" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>
          <div className="text-center space-y-2">
            <p>Full-stack developer with experience in React, Node.js, and cloud technologies.</p>
            <p>Currently building tools and web applications to solve real-world problems.</p>
          </div>
          <div className="flex space-x-4 mt-4">
            <Button asChild variant="outline" size="sm">
              <a href="mailto:mail@ryancruz.com">Email</a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;