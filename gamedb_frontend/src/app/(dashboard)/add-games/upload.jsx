"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function GameUploadForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    image: {
      src: "",
      alt: "",
    },
    description: {
      about: "",
    },
    publisher: "",
    release_date: "",
    tags: [],
    original_size: "",
    repack_size: "",
    download_url: { onedrive: "", torrent: "", fast_url: "" },
    trailer: "",
    screenshots: {
      snap1: "",
      snap2: "",
      snap3: "",
      snap4: "",
    },
    system_req: {
      minimum_req: {
        os: [],
        processor: "",
        memory: "",
        graphics: "",
        storage: "",
        audio: "",
      },
      recommended_req: {
        os: [],
        processor: "",
        memory: "",
        graphics: "",
        storage: "",
        audio: "",
      },
    },
  });

  const totalSteps = 4;

  const validateForm = () => {
    if (step === 1) {
      if (!formData.title.trim()) return "Game title is required";
      if (!formData.url.trim()) return "Origin URL is required";
      if (!formData.image.src.trim()) return "Image source URL is required";
      if (!formData.image.alt.trim()) return "Image alt text is required";
      if (!formData.description.about.trim())
        return "Game description is required";
      if (!formData.publisher.trim()) return "Publisher is required";
      if (!formData.release_date) return "Release date is required";
      if (!formData.tags.length) return "At least one tag is required";
    }
    if (step === 2) {
      const { minimum_req, recommended_req } = formData.system_req;
      if (!minimum_req.os.length) return "Minimum OS requirement is required";
      if (!minimum_req.processor.trim())
        return "Minimum processor requirement is required";
      if (!minimum_req.memory.trim())
        return "Minimum memory requirement is required";
      if (!minimum_req.graphics.trim())
        return "Minimum graphics requirement is required";
      if (!minimum_req.storage.trim())
        return "Minimum storage requirement is required";
      if (!minimum_req.audio.trim())
        return "Minimum audio requirement is required";

      // Validate recommended requirements
      if (!recommended_req.os.length)
        return "Recommended OS requirement is required";
      if (!recommended_req.processor.trim())
        return "Recommended processor requirement is required";
      if (!recommended_req.memory.trim())
        return "Recommended memory requirement is required";
      if (!recommended_req.graphics.trim())
        return "Recommended graphics requirement is required";
      if (!recommended_req.storage.trim())
        return "Recommended storage requirement is required";
      if (!recommended_req.audio.trim())
        return "Recommended audio requirement is required";
    }
    if (step === 3) {
      if (!formData.original_size.trim()) return "Original size is required";
      if (!formData.repack_size.trim()) return "Repack size is required";
      if (
        !formData.download_url.onedrive.trim() &&
        !formData.download_url.torrent.trim() &&
        !formData.download_url.fast_url.trim()
      ) {
        return "At least one download URL is required";
      }
    }
    if (step === 4) {
      if (!formData.trailer.trim()) return "Trailer URL is required";
      if (!formData.screenshots.snap1.trim()) return "Screenshot 1 is required";
      if (!formData.screenshots.snap2.trim()) return "Screenshot 2 is required";
      if (!formData.screenshots.snap3.trim()) return "Screenshot 3 is required";
      if (!formData.screenshots.snap4.trim()) return "Screenshot 4 is required";
    }
    return null;
  };

  const handleNext = () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }
    setStep(Math.min(totalSteps, step + 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form submitted, current step:", step);

    if (step !== totalSteps) {
      // console.log("Not final step, moving to next step");
      toast.error("Not final step, moving to next step");
      handleNext();
      return;
    }

    const error = validateForm();
    if (error) {
      // console.log("Validation error:", error);
      toast.error(error);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/gamedb`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            release_date: new Date(formData.release_date).toISOString(),
          }),
        }
      );

      let result;
      // const responseText = await response.text();
      // console.log("Raw response:", responseText);

      // try {
      //   result = JSON.parse(responseText);
      //   console.log("Parsed response data:", result);
      // } catch (parseError) {
      //   console.error("Failed to parse response as JSON:", parseError);
      //   throw new Error("Invalid response format from server");
      // }

      if (!response.ok) {
        console.error("Request failed:", result);
        throw new Error(
          result.message || `Request failed with status ${response.status}`
        );
      }

      console.log("Upload successful:", result);
      toast.success(result.message || "Game uploaded successfully!");

      // Reset form after successful submission
      setFormData({
        title: "",
        url: "",
        image: { src: "", alt: "" },
        description: { about: "" },
        publisher: "",
        release_date: "",
        tags: [],
        original_size: "",
        repack_size: "",
        download_url: { onedrive: "", torrent: "", fast_url: "" },
        trailer: "",
        screenshots: {
          snap1: "",
          snap2: "",
          snap3: "",
          snap4: "",
        },
        system_req: {
          minimum_req: {
            os: [],
            processor: "",
            memory: "",
            graphics: "",
            storage: "",
            audio: "",
          },
          recommended_req: {
            os: [],
            processor: "",
            memory: "",
            graphics: "",
            storage: "",
            audio: "",
          },
        },
      });
      setStep(1);
    } catch (error) {
      // console.error("Submission error:", error);
      toast.error(error.message || "Failed to upload game data");
    } finally {
      console.log("Submission completed");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-[1400px]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Upload New Game</CardTitle>
          <div className="flex items-center gap-2 mt-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i + 1 <= step ? "bg-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Game Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Grand Theft Auto V"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter game description..."
                    className="h-40 min-h-[160px]"
                    value={formData.description.about}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: { about: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="url">Origin URL</Label>
                  <Input
                    id="url"
                    placeholder="e.g. url like fitgirl, epic games etc"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Game Image:</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      placeholder="Image URL"
                      value={formData.image.src}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          image: {
                            ...formData.image,
                            src: e.target.value,
                          },
                        })
                      }
                    />
                    <Input
                      placeholder="Image alt text"
                      value={formData.image.alt}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          image: {
                            ...formData.image,
                            alt: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                      id="publisher"
                      placeholder="e.g. Rockstar Games"
                      value={formData.publisher}
                      onChange={(e) =>
                        setFormData({ ...formData, publisher: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="release_date">Release Date</Label>
                    <Input
                      id="release_date"
                      type="date"
                      value={formData.release_date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          release_date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="e.g. Action, Adventure, RPG (comma separated)"
                    value={formData.tags.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags: e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Tabs defaultValue="minimum" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="minimum">
                      Minimum Requirements
                    </TabsTrigger>
                    <TabsTrigger value="recommended">
                      Recommended Requirements
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="minimum" className="space-y-4">
                    <div>
                      <Label>Operating System</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            system_req: {
                              ...formData.system_req,
                              minimum_req: {
                                ...formData.system_req.minimum_req,
                                os: [value],
                              },
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select OS" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="windows">Windows</SelectItem>
                          <SelectItem value="mac">MacOS</SelectItem>
                          <SelectItem value="linux">Linux</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Processor</Label>
                        <Input
                          placeholder="e.g. Intel Core i5"
                          value={formData.system_req.minimum_req.processor}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              system_req: {
                                ...formData.system_req,
                                minimum_req: {
                                  ...formData.system_req.minimum_req,
                                  processor: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Memory</Label>
                        <Input
                          placeholder="e.g. 8 GB RAM"
                          value={formData.system_req.minimum_req.memory}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              system_req: {
                                ...formData.system_req,
                                minimum_req: {
                                  ...formData.system_req.minimum_req,
                                  memory: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Graphics</Label>
                        <Input
                          placeholder="e.g. AMD Radeon RX 470 (4 GB)"
                          value={formData.system_req.minimum_req.graphics}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              system_req: {
                                ...formData.system_req,
                                minimum_req: {
                                  ...formData.system_req.minimum_req,
                                  graphics: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Storage</Label>
                        <Input
                          placeholder="e.g. 128 GB (SSD recommended)"
                          value={formData.system_req.minimum_req.storage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              system_req: {
                                ...formData.system_req,
                                minimum_req: {
                                  ...formData.system_req.minimum_req,
                                  storage: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Audio</Label>
                        <Input
                          placeholder="e.g. DirectX Compatible"
                          value={formData.system_req.minimum_req.audio}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              system_req: {
                                ...formData.system_req,
                                minimum_req: {
                                  ...formData.system_req.minimum_req,
                                  audio: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="recommended" className="space-y-4">
                    <div>
                      <Label>Operating System</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            system_req: {
                              ...formData.system_req,
                              recommended_req: {
                                ...formData.system_req.recommended_req,
                                os: [value],
                              },
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select OS" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="windows">Windows</SelectItem>
                          <SelectItem value="mac">MacOS</SelectItem>
                          <SelectItem value="linux">Linux</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Processor</Label>
                        <Input
                          placeholder="e.g. Intel Core i7"
                          value={formData.system_req.recommended_req.processor}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              system_req: {
                                ...formData.system_req,
                                recommended_req: {
                                  ...formData.system_req.recommended_req,
                                  processor: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Memory</Label>
                        <Input
                          placeholder="e.g. 16 GB RAM"
                          value={formData.system_req.recommended_req.memory}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              system_req: {
                                ...formData.system_req,
                                recommended_req: {
                                  ...formData.system_req.recommended_req,
                                  memory: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Graphics</Label>
                        <Input
                          placeholder="e.g. AMD Ryzen 5 3600"
                          value={formData.system_req.recommended_req.graphics}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              system_req: {
                                ...formData.system_req,
                                recommended_req: {
                                  ...formData.system_req.recommended_req,
                                  graphics: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Storage</Label>
                        <Input
                          placeholder="e.g. 256 GB SSD recommended"
                          value={formData.system_req.recommended_req.storage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              system_req: {
                                ...formData.system_req,
                                recommended_req: {
                                  ...formData.system_req.recommended_req,
                                  storage: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Audio</Label>
                        <Input
                          placeholder="e.g. DirectX Compatible with surround sound"
                          value={formData.system_req.recommended_req.audio}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              system_req: {
                                ...formData.system_req,
                                recommended_req: {
                                  ...formData.system_req.recommended_req,
                                  audio: e.target.value,
                                },
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label>Original Size</Label>
                    <Input
                      placeholder="e.g. 122.2 GB"
                      value={formData.original_size}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          original_size: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Repack Size</Label>
                    <Input
                      placeholder="e.g. 49.2 GB"
                      value={formData.repack_size}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          repack_size: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Download Links</Label>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Input
                        placeholder="OneDrive URL"
                        value={formData.download_url.onedrive}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            download_url: {
                              ...formData.download_url,
                              onedrive: e.target.value,
                            },
                          })
                        }
                      />
                      <Input
                        placeholder="Torrent URL"
                        value={formData.download_url.torrent}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            download_url: {
                              ...formData.download_url,
                              torrent: e.target.value,
                            },
                          })
                        }
                      />
                      <Input
                        placeholder="Fast download URL"
                        value={formData.download_url.fast_url}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            download_url: {
                              ...formData.download_url,
                              fast_url: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <div className="space-y-4 mb-4">
                  <Label>Trailer: </Label>
                  <div className="space-y-2 mt-2">
                    <Input
                      placeholder="trailer"
                      value={formData.trailer}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          trailer: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <Label>Screenshots: </Label>
                  <div className="space-y-2 mt-2">
                    <Input
                      placeholder="screenshot1"
                      value={formData.screenshots.snap1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          screenshots: {
                            ...formData.screenshots,
                            snap1: e.target.value,
                          },
                        })
                      }
                    />
                    <Input
                      placeholder="Screenshot2"
                      value={formData.screenshots.snap2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          screenshots: {
                            ...formData.screenshots,
                            snap2: e.target.value,
                          },
                        })
                      }
                    />
                    <Input
                      placeholder="Screenshot3"
                      value={formData.screenshots.snap3}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          screenshots: {
                            ...formData.screenshots,
                            snap3: e.target.value,
                          },
                        })
                      }
                    />
                    <Input
                      placeholder="Screenshot4"
                      value={formData.screenshots.snap4}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          screenshots: {
                            ...formData.screenshots,
                            snap4: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={isLoading}
            >
              Previous
            </Button>
          )}
          <Button
            type="submit"
            className="ml-auto"
            disabled={isLoading}
            onClick={(e) => {
              console.log("Submit button clicked");
              handleSubmit(e);
            }}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⌛</span>
                Uploading...
              </>
            ) : step === totalSteps ? (
              "Upload Game"
            ) : (
              <>
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
