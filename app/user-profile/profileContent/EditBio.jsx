import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createOrUpdateUserBio } from "@/service/user.service";
import { Save } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

const EditBio = ({ isOpen, onClose, initialData, id, fetchProfile }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialData,
  });

  const handleEditBio = async (data) => {
    try {
      await createOrUpdateUserBio(id, data);
      await fetchProfile();
      onClose();
    } catch (error) {
      console.log("Error updating user bio", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="text-center sr-only">
        Edit Your Profile Information
      </DialogTitle>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="bg-[rgb(240,240,240)] text-black rounded mt-2 pl-1">
          Provide your details to let the Employers know you better. (Try to
          make it like a CV)
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEditBio)}>
          <div className="grid gap-2 py-2">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="bio" className="text-right">
                About you
              </Label>
              <Textarea
                id="bioText"
                className="col-span-3 border-gray-400"
                {...register("bioText")}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="liveIn" className="text-right">
                Education
              </Label>
              <Input
                id="liveIn"
                className="col-span-3 border-gray-400"
                {...register("liveIn")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationship" className="text-right">
                Level clear
              </Label>
              <Input
                id="relationship"
                {...register("relationship")}
                className="col-span-3 border-gray-400"
                placeholder="JLPT/NAT"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workPlace" className="text-right">
                Work Place
              </Label>
              <Input
                id="workplace"
                {...register("workplace")}
                className="col-span-3 border-gray-400"
                placeholder="If working"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="education" className="text-right">
                Experience
              </Label>
              <Input
                id="education"
                {...register("education")}
                className="col-span-3 border-gray-400"
                placeholder="If any"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hometown" className="text-right">
                Certifications
              </Label>
              <Input
                id="hometown"
                {...register("hometown")}
                className="col-span-3 border-gray-400"
                placeholder="If any"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthday" className="text-right">
                Japan Exp
              </Label>
              <Input
                id="birthday"
                {...register("birthday")}
                className="col-span-3 border-gray-400"
                placeholder="If any"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone No.
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                className="col-span-3 border-gray-400"
                placeholder="Optional"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-left">
                Any other Information about you
              </Label>
              <Textarea
                id="address"
                className="col-span-3 border-gray-400"
                {...register("address")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              <Save className="w-4 h-4 mr-2" />{" "}
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBio;
