import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createOrUpdateUserBio } from "@/service/user.service";
import { Save, ChevronDown, PartyPopper } from "lucide-react";
import { useForm } from "react-hook-form";
import EmojiPickerButton from "@/app/components/EmojiPickerButton";
import { useEmojiInsert } from "@/app/hooks/useEmojiInsert";

const bioMessages = [
  "Tired, Sad, Excited, Sleepy, Hungry – all at the same time",
  "I want Salary without Job…",
  "Born to express, Not to impress…",
  "I'm not lazy. I'm on energy-saving mode.",
  "My dream job is getting paid to dream.",
  "Dear Monday, nobody likes you.",
  "Be the reason someone smiles… or the reason they block you.",
  "Pain of struggle is better than Joy of wasting life",
  "He- Be yourself… Me- Trust me you don’t wanna see that..",
  "Work hard… Party harder…",
  "Pain is temporary... Bills are permanent…",
  "I came… I saw... I forgot why I came...",
  "Fan of YouTube Channel Nihongomax",
  "I need six months of vacation, twice a year.",
  "The only thing I'm managing successfully is my disappointment.",
  "I'm 99% angel. The remaining 1% needs investigation.",
  "I forgive, but my screenshots don't.",
  "Every day is a second chance. Unless it's Monday.",
  "Make your passion your profession, and ruin both.",
  "Money can't buy Love. But poverty doesn't seem to attract it either.",
  "N5: I know Japanese. N1: Japanese knows how to destroy me.",
  "Watashi wa genki desu. My bank account is not.",
  "Low battery. High expectations.",
  "Need a break from my breaks…",
  "My Japanese is fluent… in my imagination.",
];

const EditBio = ({ isOpen, onClose, initialData, id, fetchProfile }) => {
  const introEmoji = useEmojiInsert();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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
      console.error("Error updating user bio", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="text-center sr-only">
        Edit Your Profile Information
      </DialogTitle>

      <DialogContent className="overflow-y-auto">
        <DialogHeader className="bg-[rgb(240,240,240)] text-xl rounded mt-4 p-2 dark:bg-[rgb(30,30,30)] font-medium">
          Put your details to let others know you better.
        </DialogHeader>

        <form onSubmit={handleSubmit(handleEditBio)}>
          <div className="grid gap-3 py-3">
            {/* About You */}
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="bioText" className="text-right">
                About you
              </Label>

              <div className="relative col-span-3">
                <Textarea
                  id="bioText"
                  className="border-gray-400 pr-10 min-h-[100px]"
                  {...register("bioText")}
                  ref={(e) => {
                    register("bioText").ref(e);
                    introEmoji.inputRef.current = e;
                  }}
                />

                <div className="absolute bottom-1 right-2">
                  <EmojiPickerButton
                    onSelect={(emoji) =>
                      introEmoji.insertEmoji({
                        emoji,
                        fieldName: "bioText",
                        getValues,
                        rhfSetValue: setValue,
                      })
                    }
                    emojiSize="h-8 w-8"
                  />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="liveIn" className="text-right">
                Education
              </Label>
              <Input
                id="liveIn"
                className="col-span-3 border-gray-400"
                {...register("liveIn")}
              />
            </div>

            {/* Level Clear */}
            <div className="grid grid-cols-4 items-center gap-2">
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

            {/* Work Place */}
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="workplace" className="text-right">
                Work Place
              </Label>
              <Input
                id="workplace"
                {...register("workplace")}
                className="col-span-3 border-gray-400"
                placeholder="If working"
              />
            </div>

            {/* Experience */}
            <div className="grid grid-cols-4 items-center gap-2">
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

            {/* Certifications */}
            <div className="grid grid-cols-4 items-center gap-2">
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

            {/* Japan Experience */}
            <div className="grid grid-cols-4 items-center gap-2">
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

            {/* Nationality */}
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="nationality" className="text-right">
                Nationality
              </Label>
              <Input
                id="nationality"
                {...register("nationality")}
                className="col-span-3 border-gray-400"
                placeholder="Optional"
              />
            </div>

            {/* Other Information */}
            <div className="space-y-2 ">
              <Label htmlFor="address" className="text-right">
                Other Info about you
              </Label>
              <Textarea
                id="address"
                className="col-span-3 border-gray-400"
                {...register("address")}
              />
            </div>
            {/* Message to all - Separate Field */}
            <div className="space-y-2">
              <Label htmlFor="messageToAll" className="text-right">
                Your Message to All
                <span className="text-xs text-muted-foreground">
                  (Choose or write your own message.)
                </span>
              </Label>
              <div className="col-span-3 grid gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between border-gray-400 font-normal"
                    >
                      <span className="flex items-center gap-2">
                        <PartyPopper className="h-5 w-5" />
                        Choose a message
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto"
                  >
                    <DropdownMenuLabel>Select your message</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {bioMessages.map((message, index) => (
                      <DropdownMenuItem
                        key={index}
                        onSelect={() =>
                          setValue("messageToAll", message, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                        className="cursor-pointer whitespace-normal py-2"
                      >
                        <span>{message}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Textarea
                  id="messageToAll"
                  {...register("messageToAll")}
                  className="border-gray-400"
                  placeholder="Your selected message will appear here..."
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBio;
