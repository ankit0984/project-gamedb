// "use client";

// import { useState } from "react";
// import {
//   ChevronRight,
//   Upload,
//   Monitor,
//   HardDrive,
//   Image,
//   Link,
// } from "lucide-react";
// import { format } from "date-fns";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function GameUploadForm() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     publisher: "",
//     release_date: "",
//     tags: [],
//     original_size: "",
//     repack_size: "",
//     download_url: {
//       onedrive: "",
//       torrent: "",
//     },
//     system_req: {
//       minimum_req: {
//         os: [],
//         processor: "",
//         memory: "",
//         graphics: [],
//         storage: "",
//       },
//       recommended_req: {
//         os: [],
//         processor: "",
//         memory: "",
//         graphics: [],
//         storage: "",
//       },
//     },
//     screenshots: [],
//   });

//   const totalSteps = 4;

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   // Handle form submission
//   //   console.log(formData);
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3636/api/gamedb", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to upload game data");
//       }

//       alert("Game uploaded successfully!");
//       console.log(result);
//     } catch (error) {
//       console.error("Error uploading game data:", error);
//       alert(error.message);
//     }
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const fileUrls = files.map((file) => URL.createObjectURL(file));
//     setFormData((prev) => ({
//       ...prev,
//       screenshots: [...prev.screenshots, ...fileUrls],
//     }));
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <Card className="max-w-4xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-2xl">Upload New Game</CardTitle>
//           <div className="flex items-center gap-2 mt-2">
//             {Array.from({ length: totalSteps }).map((_, i) => (
//               <div
//                 key={i}
//                 className={`h-2 flex-1 rounded-full ${
//                   i + 1 <= step ? "bg-primary" : "bg-secondary"
//                 }`}
//               />
//             ))}
//           </div>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {step === 1 && (
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="title">Game Title</Label>
//                   <Input
//                     id="title"
//                     placeholder="e.g. Grand Theft Auto V"
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     placeholder="Enter game description..."
//                     className="h-32"
//                     value={formData.description}
//                     onChange={(e) =>
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="publisher">Publisher</Label>
//                     <Input
//                       id="publisher"
//                       placeholder="e.g. Rockstar Games"
//                       value={formData.publisher}
//                       onChange={(e) =>
//                         setFormData({ ...formData, publisher: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="release_date">Release Date</Label>
//                     <Input
//                       id="release_date"
//                       type="date"
//                       value={formData.release_date}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           release_date: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label htmlFor="tags">Tags</Label>
//                   <Input
//                     id="tags"
//                     placeholder="e.g. Action, Adventure, RPG (comma separated)"
//                     value={formData.tags.join(", ")}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         tags: e.target.value
//                           .split(",")
//                           .map((tag) => tag.trim()),
//                       })
//                     }
//                   />
//                 </div>
//               </div>
//             )}

//             {step === 2 && (
//               <div className="space-y-4">
//                 <Tabs defaultValue="minimum" className="w-full">
//                   <TabsList className="grid w-full grid-cols-2">
//                     <TabsTrigger value="minimum">
//                       Minimum Requirements
//                     </TabsTrigger>
//                     <TabsTrigger value="recommended">
//                       Recommended Requirements
//                     </TabsTrigger>
//                   </TabsList>
//                   <TabsContent value="minimum" className="space-y-4">
//                     <div>
//                       <Label>Operating System</Label>
//                       <Select
//                         onValueChange={(value) =>
//                           setFormData({
//                             ...formData,
//                             system_req: {
//                               ...formData.system_req,
//                               minimum_req: {
//                                 ...formData.system_req.minimum_req,
//                                 os: [value],
//                               },
//                             },
//                           })
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select OS" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="windows">Windows</SelectItem>
//                           <SelectItem value="mac">MacOS</SelectItem>
//                           <SelectItem value="linux">Linux</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label>Processor</Label>
//                         <Input
//                           placeholder="e.g. Intel Core i5"
//                           value={formData.system_req.minimum_req.processor}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               system_req: {
//                                 ...formData.system_req,
//                                 minimum_req: {
//                                   ...formData.system_req.minimum_req,
//                                   processor: e.target.value,
//                                 },
//                               },
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <Label>Memory</Label>
//                         <Input
//                           placeholder="e.g. 8 GB RAM"
//                           value={formData.system_req.minimum_req.memory}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               system_req: {
//                                 ...formData.system_req,
//                                 minimum_req: {
//                                   ...formData.system_req.minimum_req,
//                                   memory: e.target.value,
//                                 },
//                               },
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <Label>Graphics</Label>
//                         <Input
//                           placeholder="e.g. AMD Radeon RX 470 (4 GB)"
//                           value={formData.system_req.minimum_req.graphics}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               system_req: {
//                                 ...formData.system_req,
//                                 minimum_req: {
//                                   ...formData.system_req.minimum_req,
//                                   graphics: e.target.value,
//                                 },
//                               },
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <Label>Storage</Label>
//                         <Input
//                           placeholder="e.g. 128 GB (SSD recommended)"
//                           value={formData.system_req.minimum_req.storage}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               system_req: {
//                                 ...formData.system_req,
//                                 minimum_req: {
//                                   ...formData.system_req.minimum_req,
//                                   graphics: e.target.value,
//                                 },
//                               },
//                             })
//                           }
//                         />
//                       </div>
//                     </div>
//                   </TabsContent>
//                   <TabsContent value="recommended" className="space-y-4">
//                     <div>
//                       <Label>Operating System</Label>
//                       <Select
//                         onValueChange={(value) =>
//                           setFormData({
//                             ...formData,
//                             system_req: {
//                               ...formData.system_req,
//                               recommended_req: {
//                                 ...formData.system_req.recommended_req,
//                                 os: [value],
//                               },
//                             },
//                           })
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select OS" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="windows">Windows</SelectItem>
//                           <SelectItem value="mac">MacOS</SelectItem>
//                           <SelectItem value="linux">Linux</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label>Processor</Label>
//                         <Input
//                           placeholder="e.g. Intel Core i7"
//                           value={formData.system_req.recommended_req.processor}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               system_req: {
//                                 ...formData.system_req,
//                                 recommended_req: {
//                                   ...formData.system_req.recommended_req,
//                                   processor: e.target.value,
//                                 },
//                               },
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <Label>Memory</Label>
//                         <Input
//                           placeholder="e.g. 16 GB RAM"
//                           value={formData.system_req.recommended_req.memory}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               system_req: {
//                                 ...formData.system_req,
//                                 recommended_req: {
//                                   ...formData.system_req.recommended_req,
//                                   memory: e.target.value,
//                                 },
//                               },
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <Label>Graphics</Label>
//                         <Input
//                           placeholder="e.g. AMD Ryzen 5 3600"
//                           value={formData.system_req.recommended_req.graphics}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               system_req: {
//                                 ...formData.system_req,
//                                 recommended_req: {
//                                   ...formData.system_req.recommended_req,
//                                   graphics: e.target.value,
//                                 },
//                               },
//                             })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <Label>Storage</Label>
//                         <Input
//                           placeholder="e.g. AMD Ryzen 5 3600"
//                           value={formData.system_req.recommended_req.storage}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               system_req: {
//                                 ...formData.system_req,
//                                 recommended_req: {
//                                   ...formData.system_req.recommended_req,
//                                   storage: e.target.value,
//                                 },
//                               },
//                             })
//                           }
//                         />
//                       </div>
//                     </div>
//                   </TabsContent>
//                 </Tabs>
//               </div>
//             )}

//             {step === 3 && (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label>Original Size</Label>
//                     <Input
//                       placeholder="e.g. 122.2 GB"
//                       value={formData.original_size}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           original_size: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label>Repack Size</Label>
//                     <Input
//                       placeholder="e.g. 49.2 GB"
//                       value={formData.repack_size}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           repack_size: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label>Download Links</Label>
//                   <div className="space-y-2">
//                     <Input
//                       placeholder="OneDrive URL"
//                       value={formData.download_url.onedrive}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           download_url: {
//                             ...formData.download_url,
//                             onedrive: e.target.value,
//                           },
//                         })
//                       }
//                     />
//                     <Input
//                       placeholder="Torrent URL"
//                       value={formData.download_url.torrent}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           download_url: {
//                             ...formData.download_url,
//                             torrent: e.target.value,
//                           },
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {step === 4 && (
//               <div className="space-y-4">
//                 <div className="border-2 border-dashed rounded-lg p-6 text-center">
//                   <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   <div className="mt-2">
//                     <Label className="cursor-pointer">
//                       <span className="text-primary hover:text-primary/90">
//                         Upload screenshots
//                       </span>
//                       <Input
//                         type="file"
//                         multiple
//                         className="hidden"
//                         onChange={handleFileChange}
//                         accept="image/*"
//                       />
//                     </Label>
//                   </div>
//                   <p className="text-sm text-muted-foreground mt-2">
//                     PNG, JPG up to 10MB
//                   </p>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {formData.screenshots.map((url, index) => (
//                     <div key={index} className="relative aspect-video">
//                       <img
//                         src={url}
//                         alt={`Screenshot ${index + 1}`}
//                         className="rounded-lg object-cover w-full h-full"
//                       />
//                       <button
//                         className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
//                         onClick={() => {
//                           setFormData((prev) => ({
//                             ...prev,
//                             screenshots: prev.screenshots.filter(
//                               (_, i) => i !== index
//                             ),
//                           }));
//                         }}
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button
//             variant="outline"
//             onClick={() => setStep(Math.max(1, step - 1))}
//             disabled={step === 1}
//           >
//             Previous
//           </Button>
//           <Button
//             onClick={() => {
//               if (step === totalSteps) {
//                 handleSubmit();
//               } else {
//                 setStep(Math.min(totalSteps, step + 1));
//               }
//             }}
//           >
//             {step === totalSteps ? "Submit" : "Next"}
//             {step !== totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

import GameUploadForm from "./upload";

export default function Page() {
  return <GameUploadForm />;
}
