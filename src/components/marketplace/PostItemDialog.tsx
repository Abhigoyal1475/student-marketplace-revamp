
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PostItemForm from "./PostItemForm";

interface PostItemDialogProps {
  buttonClassName?: string;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
}

const PostItemDialog: React.FC<PostItemDialogProps> = ({ 
  buttonClassName,
  buttonVariant = "default"
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={buttonClassName}>
          <Plus className="h-4 w-4 mr-2" />
          Post an Item
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Post an Item for Sale</DialogTitle>
        </DialogHeader>
        <PostItemForm />
      </DialogContent>
    </Dialog>
  );
};

export default PostItemDialog;
