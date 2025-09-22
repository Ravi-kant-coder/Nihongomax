"use client";
import { useState } from "react";
import { X, CircleCheckBig } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { useVideoStore } from "@/store/useAdminData";

const VideoUploadForm = () => {
  const { createQuery } = useVideoStore();
  const [showForm, setShowForm] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [mobile, setMobile] = useState("");
  const [queryText, setQueryText] = useState("");
  const [submit, setSubmit] = useState(true);
  const [submitted, setSubmitted] = useState("");
  const [isNameReq, setIsNameReq] = useState(false);
  const [isMobReq, setIsMobReq] = useState(false);
  const [isQueryReq, setIsQueryReq] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleContactForm = async (e) => {
    e.preventDefault();

    // Frontend code from here
    if (!studentName) {
      setIsNameReq(true);
      return;
    } else if (!mobile.trim()) {
      setIsMobReq(true);
      return;
    } else if (!queryText) {
      setIsQueryReq(true);
      return;
    } else null;

    // Backend code from here
    const formData = { studentName, mobile, queryText };
    try {
      await createQuery(formData);
      setStudentName("");
      setMobile("");
      setQueryText("");
      setSubmitted(true);
      setSubmit(false);
      setFeedback(`Uploaded`);
      setTimeout(() => {
        setSubmit(true);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error message:", error.message);
    }
  };

  const handleNameChange = (e) => {
    let val = e.target.value;
    // Remove error msg
    if (val.length >= 0) {
      setIsNameReq(false);
    }
    setStudentName(val);
  };

  return (
    <Card className=" dark:bg-[rgb(70,70,70)] bg-[rgb(170,170,170)] mx-10">
      <CardContent>
        <p className="text-sm">
          Spoken, Grammar, JLPT, Visa, Jobs, Japan, Motivation, Advanced,
          Nihongomax, Study ways
        </p>
        <form onSubmit={handleContactForm}>
          <div className="md:flex justify-around items-center">
            <div className="w-60">
              <Label className="sr-only" htmlFor="queryName">
                Username
              </Label>
              <Input
                id="queryName"
                name="queryNameKey"
                type="text"
                placeholder="Enter Video URL"
                className=" dark:border-gray-400 bg-white dark:bg-black"
                value={studentName}
                onChange={handleNameChange}
              />
              {isNameReq && (
                <p className="text-red-700 text-xs">Video URL is required.</p>
              )}
            </div>
            <div className="w-80">
              <Label className="sr-only" htmlFor="mobNumber">
                Mobile
              </Label>
              <Input
                id="mobNumber"
                name="queryNumKey"
                type="text"
                placeholder="2-3 Tags from these saprtd by commas"
                className="bg-white dark:bg-black dark:border-gray-400 "
                value={mobile}
                onChange={(e) => {
                  let val = e.target.value;
                  // Remove error msg
                  if (val.length >= 0) {
                    setIsMobReq(false);
                  }
                  setMobile(val);
                }}
              />
              {isMobReq ? (
                <p className="text-red-700 text-xs">Tags are required.</p>
              ) : null}
            </div>
            <div className="w-140 mb-2">
              <Textarea
                placeholder="Write a Description"
                className=" border-1 border-white bg-white dark:bg-black rounded-md"
                value={queryText}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val.length >= 0) {
                    setIsQueryReq(false);
                    setQueryText(val);
                  }
                }}
              />{" "}
              {isQueryReq && (
                <p className="text-red-700 text-xs">Description is required.</p>
              )}
            </div>
            {submit && (
              <Button
                className="text-[15px] hover:dark:bg-black  dark:border-white dark:bg-gray-800 dark:text-white cursor-pointer"
                type="submit"
              >
                <p>Submit</p>
              </Button>
            )}
            {submitted && (
              <p className="flex items-center text-white justify-center rounded-md p-1 bg-green-900 ">
                <span className="mr-2">{feedback}</span>{" "}
                <CircleCheckBig className="font-bold" />
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VideoUploadForm;
