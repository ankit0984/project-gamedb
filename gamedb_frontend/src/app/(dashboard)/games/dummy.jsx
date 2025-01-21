// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Download,
//   Calendar,
//   Building2,
//   HardDrive,
//   ExternalLink,
//   Play,
//   Image,
// } from "lucide-react";

// const GameDetailPage = () => {
//   const [currentMedia, setCurrentMedia] = useState({
//     type: "trailer",
//     index: 0,
//   });
//   const game = {
//     title: "Cyberpunk 2077",
//     image: {
//       src: "https://i0.wp.com/i1.imageban.ru/out/2023/12/07/4045364e148cf4383f193e18b5bf405c.jpg",
//       alt: "Cyberpunk 2077",
//     },
//     description: {
//       about:
//         "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Improved and featuring all-new free additional content, customize your character and playstyle as you take on jobs, build a reputation, and unlock upgrades. The relationships you forge and the choices you make will shape the story and the world around you. Legends are made here. What will yours be?",
//     },
//     screenshots: [
//       "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.600x338.jpg?t=1734434803",
//       "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/ss_0e64170751e1ae20ff8fdb7001a8892fd48260e7.600x338.jpg?t=1734434803",
//       "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/ss_4eb068b1cf52c91b57157b84bed18a186ed7714b.600x338.jpg?t=1734434803",
//       "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/ss_4bda6f67580d94832ed2d5814e41ebe018ba1d9e.600x338.jpg?t=1734434803",
//     ],
//     trailer:
//       "https://video.cloudflare.steamstatic.com/store_trailers/257081132/movie480_vp9.webm?t=1734434783",
//     release_date: "11/10/2020",
//     publisher: "CD Projekt RED, QLOC",
//     tags: ["Action", "Adventure", "Open World", "RPG"],
//     original_size: "151.2 GB",
//     repack_size: "approx 55.4 GB",
//     download_url: {
//       torrent:
//         "https://1337x.to/torrent/5911861/Cyberpunk-2077-Ultimate-Edition-v2-1-All-DLCs-Bonus-Content-REDmod-MULTi19-FitGirl-Repack-Selective-Download-from-55-4-GB/",
//       fast_url:
//         "https://paste.fitgirl-repacks.site/?304d10e31dfe992c#EcUmqzuTF6YNrYzMskaN5tieLdg6QVEMairCJioh1T9",
//     },
//     system_req: {
//       minimum_req: {
//         os: ["Windows 10"],
//         processor: "Intel Core i7-6700 or Ryzen 5 1600",
//         memory: "12 GB RAM",
//         graphics:
//           "NVIDIA GeForce GTX 1060 6 GB or Radeon RX 580 8GB or Arc A380",
//         storage: "70GB SSD (90GB SSD with Phantom Liberty)",
//       },
//       recommended_req: {
//         os: ["Windows 10"],
//         processor: "Core i7-12700 or Ryzen 7 7800X3D",
//         memory: "16 GB RAM",
//         graphics: "GeForce RTX 2060 SUPER or Radeon RX 5700 XT or Arc A770",
//         storage: "70GB SSD (90GB SSD with Phantom Liberty)",
//       },
//     },
//   };

//   const MediaViewer = () => (
//     <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
//       {currentMedia.type === "trailer" ? (
//         <video
//           className="w-auto h-full"
//           controls
//           autoPlay={true}
//           poster={game.screenshots[0]}
//           key="trailer"
//         >
//           <source src={game.trailer} type="video/webm" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <img
//           src={game.screenshots[currentMedia.index]}
//           alt={`Screenshot ${currentMedia.index + 1}`}
//           className="w-full h-full object-cover"
//         />
//       )}
//     </div>
//   );

//   const MediaThumbnails = () => (
//     <div className="flex gap-2 overflow-x-auto  pb-2">
//       <button
//         onClick={() => setCurrentMedia({ type: "trailer", index: 0 })}
//         className={`relative flex-shrink-0 aspect-video w-32 rounded-lg overflow-hidden ${
//           currentMedia.type === "trailer" ? "ring-2 ring-blue-500" : ""
//         }`}
//       >
//         <img
//           src={game.screenshots[0]}
//           alt="Trailer thumbnail"
//           className="w-full h-full object-cover brightness-50"
//         />
//         <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white" />
//       </button>
//       {game.screenshots.map((screenshot, index) => (
//         <button
//           key={index}
//           onClick={() => setCurrentMedia({ type: "image", index })}
//           className={`relative flex-shrink-0 aspect-video w-32 rounded-lg overflow-hidden p-4 ${
//             currentMedia.type === "image" && currentMedia.index === index
//               ? "ring-2 ring-blue-500"
//               : ""
//           }`}
//         >
//           <img
//             src={screenshot}
//             alt={`Thumbnail ${index + 1}`}
//             className="w-full h-full object-cover"
//           />
//           <Image className="absolute top-2 right-2 w-4 h-4 text-white drop-shadow-lg" />
//         </button>
//       ))}
//     </div>
//   );

//   const DownloadModal = () => (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="w-full gap-2">
//           <Download className="w-4 h-4" />
//           Download Now
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Download Options</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <h3 className="font-medium">Torrent Download</h3>
//             <Button
//               variant="secondary"
//               className="w-full gap-2"
//               onClick={() => window.open(game.download_url.torrent, "_blank")}
//             >
//               <ExternalLink className="w-4 h-4" />
//               Download Torrent
//             </Button>
//           </div>
//           <div className="space-y-2">
//             <h3 className="font-medium">Direct Download</h3>
//             <Button
//               variant="secondary"
//               className="w-full gap-2"
//               onClick={() => window.open(game.download_url.fast_url, "_blank")}
//             >
//               <ExternalLink className="w-4 h-4" />
//               Fast Direct Download
//             </Button>
//           </div>
//           <p className="text-sm text-gray-500">
//             Original Size: {game.original_size} • Repack Size:{" "}
//             {game.repack_size}
//           </p>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-8">
//       {/* Header */}
//       <div className="space-y-4">
//         <h1 className="text-4xl font-bold">{game.title}</h1>
//         <div className="flex flex-wrap gap-2">
//           {game.tags.map((tag) => (
//             <Badge key={tag} variant="secondary" className="text-sm">
//               {tag}
//             </Badge>
//           ))}
//         </div>
//       </div>

//       {/* Media Section */}
//       <div className="space-y-4">
//         <MediaViewer />
//         <div className="mt-14 p-14">
//           <MediaThumbnails />
//         </div>
//       </div>

//       {/* Game Info */}
//       <div className="grid md:grid-cols-3 gap-6">
//         <Card className="md:col-span-2">
//           <CardContent className="p-6 space-y-4">
//             <h2 className="text-2xl font-semibold">About</h2>
//             <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//               {game.description.about}
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6 space-y-4">
//             <div className="flex items-center gap-2">
//               <Calendar className="w-5 h-5" />
//               <div>
//                 <p className="text-sm text-gray-500">Release Date</p>
//                 <p className="font-medium">
//                   {new Date(game.release_date).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <Building2 className="w-5 h-5" />
//               <div>
//                 <p className="text-sm text-gray-500">Publisher</p>
//                 <p className="font-medium">{game.publisher}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <HardDrive className="w-5 h-5" />
//               <div>
//                 <p className="text-sm text-gray-500">Size</p>
//                 <p className="font-medium">Original: {game.original_size}</p>
//                 <p className="font-medium">Repack: {game.repack_size}</p>
//               </div>
//             </div>
//             <DownloadModal />
//           </CardContent>
//         </Card>
//       </div>

//       {/* System Requirements */}
//       <Card>
//         <CardContent className="p-6">
//           <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
//           <Tabs defaultValue="minimum" className="w-full">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="minimum">Minimum</TabsTrigger>
//               <TabsTrigger value="recommended">Recommended</TabsTrigger>
//             </TabsList>
//             <TabsContent value="minimum" className="space-y-4 mt-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="font-semibold">OS</p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {game.system_req.minimum_req.os.join(", ")}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Processor</p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {game.system_req.minimum_req.processor}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Memory</p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {game.system_req.minimum_req.memory}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Graphics</p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {game.system_req.minimum_req.graphics}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Storage</p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {game.system_req.minimum_req.storage}
//                   </p>
//                 </div>
//               </div>
//             </TabsContent>
//             <TabsContent value="recommended" className="space-y-4 mt-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="font-semibold">OS</p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {game.system_req.recommended_req.os.join(", ")}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Processor</p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {game.system_req.recommended_req.processor}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Memory</p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {game.system_req.recommended_req.memory}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Graphics</p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {game.system_req.recommended_req.graphics}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Storage</p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {game.system_req.recommended_req.storage}
//                   </p>
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default GameDetailPage;

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Download,
  Calendar,
  Building2,
  HardDrive,
  ExternalLink,
  Play,
  Image,
} from "lucide-react";

const GameDetailPage = () => {
  const [currentMedia, setCurrentMedia] = useState({
    type: "trailer",
    index: 0,
  });
  const game = {
    title: "Cyberpunk 2077",
    image: {
      src: "https://i0.wp.com/i1.imageban.ru/out/2023/12/07/4045364e148cf4383f193e18b5bf405c.jpg",
      alt: "Cyberpunk 2077",
    },
    description: {
      about:
        "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Improved and featuring all-new free additional content, customize your character and playstyle as you take on jobs, build a reputation, and unlock upgrades. The relationships you forge and the choices you make will shape the story and the world around you. Legends are made here. What will yours be?",
    },
    screenshots: [
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.600x338.jpg?t=1734434803",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/ss_0e64170751e1ae20ff8fdb7001a8892fd48260e7.600x338.jpg?t=1734434803",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/ss_4eb068b1cf52c91b57157b84bed18a186ed7714b.600x338.jpg?t=1734434803",
      "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/ss_4bda6f67580d94832ed2d5814e41ebe018ba1d9e.600x338.jpg?t=1734434803",
    ],
    trailer:
      "https://video.cloudflare.steamstatic.com/store_trailers/257081132/movie480_vp9.webm?t=1734434783",
    release_date: "11/10/2020",
    publisher: "CD Projekt RED, QLOC",
    tags: ["Action", "Adventure", "Open World", "RPG"],
    original_size: "151.2 GB",
    repack_size: "approx 55.4 GB",
    download_url: {
      torrent:
        "https://1337x.to/torrent/5911861/Cyberpunk-2077-Ultimate-Edition-v2-1-All-DLCs-Bonus-Content-REDmod-MULTi19-FitGirl-Repack-Selective-Download-from-55-4-GB/",
      fast_url:
        "https://paste.fitgirl-repacks.site/?304d10e31dfe992c#EcUmqzuTF6YNrYzMskaN5tieLdg6QVEMairCJioh1T9",
    },
    system_req: {
      minimum_req: {
        os: ["Windows 10"],
        processor: "Intel Core i7-6700 or Ryzen 5 1600",
        memory: "12 GB RAM",
        graphics:
          "NVIDIA GeForce GTX 1060 6 GB or Radeon RX 580 8GB or Arc A380",
        storage: "70GB SSD (90GB SSD with Phantom Liberty)",
      },
      recommended_req: {
        os: ["Windows 10"],
        processor: "Core i7-12700 or Ryzen 7 7800X3D",
        memory: "16 GB RAM",
        graphics: "GeForce RTX 2060 SUPER or Radeon RX 5700 XT or Arc A770",
        storage: "70GB SSD (90GB SSD with Phantom Liberty)",
      },
    },
  };

  const MediaViewer = () => (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
      {currentMedia.type === "trailer" ? (
        <video
          className="w-auto h-full"
          controls
          autoPlay={true}
          poster={game.screenshots[0]}
          key="trailer"
        >
          <source src={game.trailer} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={game.screenshots[currentMedia.index]}
          alt={`Screenshot ${currentMedia.index + 1}`}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );

  // const MediaThumbnails = () => (
  //   <div className="flex gap-2 overflow-x-auto  pb-2">
  //     <button
  //       onClick={() => setCurrentMedia({ type: "trailer", index: 0 })}
  //       className={`relative flex-shrink-0 aspect-video w-32 rounded-lg overflow-hidden ${
  //         currentMedia.type === "trailer" ? "ring-2 ring-blue-500" : ""
  //       }`}
  //     >
  //       <img
  //         src={game.screenshots[0]}
  //         alt="Trailer thumbnail"
  //         className="w-full h-full object-cover brightness-50"
  //       />
  //       <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white" />
  //     </button>
  //     {game.screenshots.map((screenshot, index) => (
  //       <button
  //         key={index}
  //         onClick={() => setCurrentMedia({ type: "image", index })}
  //         className={`relative flex-shrink-0 aspect-video w-32 rounded-lg overflow-hidden p-4 ${
  //           currentMedia.type === "image" && currentMedia.index === index
  //             ? "ring-2 ring-blue-500"
  //             : ""
  //         }`}
  //       >
  //         <img
  //           src={screenshot}
  //           alt={`Thumbnail ${index + 1}`}
  //           className="w-full h-full object-cover"
  //         />
  //         <Image className="absolute top-2 right-2 w-4 h-4 text-white drop-shadow-lg" />
  //       </button>
  //     ))}
  //   </div>
  // );
  // MediaThumbnails component
  const MediaThumbnails = () => (
    <div className="flex gap-2 overflow-x-auto mt-8 p-4 px-8">
      <button
        onClick={() => setCurrentMedia({ type: "trailer", index: 0 })}
        className={`relative flex-shrink-0 aspect-video w-32 rounded-lg overflow-hidden ${
          currentMedia.type === "trailer" ? "ring-2 ring-blue-500" : ""
        }`}
      >
        <img
          src={game.screenshots[0]}
          alt="Trailer thumbnail"
          className="w-full h-full object-cover brightness-50"
        />
        <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white" />
      </button>
      {game.screenshots.map((screenshot, index) => (
        <button
          key={index}
          onClick={() => setCurrentMedia({ type: "image", index })}
          className={`relative flex-shrink-0 aspect-video w-32 rounded-lg overflow-hidden p-4 ${
            currentMedia.type === "image" && currentMedia.index === index
              ? "ring-2 ring-blue-500"
              : ""
          }`}
        >
          <img
            src={screenshot}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <Image className="absolute top-2 right-2 w-4 h-4 text-white drop-shadow-lg" />
        </button>
      ))}
    </div>
  );

  const DownloadModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          <Download className="w-4 h-4" />
          Download Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Options</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Torrent Download</h3>
            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={() => window.open(game.download_url.torrent, "_blank")}
            >
              <ExternalLink className="w-4 h-4" />
              Download Torrent
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Direct Download</h3>
            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={() => window.open(game.download_url.fast_url, "_blank")}
            >
              <ExternalLink className="w-4 h-4" />
              Fast Direct Download
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Original Size: {game.original_size} • Repack Size:{" "}
            {game.repack_size}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );

  // return (
  //   <div className="max-w-6xl mx-auto p-6 space-y-8">
  //     {/* Header */}
  //     <div className="space-y-4">
  //       <h1 className="text-4xl font-bold">{game.title}</h1>
  //       <div className="flex flex-wrap gap-2">
  //         {game.tags.map((tag) => (
  //           <Badge key={tag} variant="secondary" className="text-sm">
  //             {tag}
  //           </Badge>
  //         ))}
  //       </div>
  //     </div>

  //     {/* Media Section */}
  //     <div className="space-y-4">
  //       <MediaViewer />
  //       <div className="mt-14 p-14">
  //         <MediaThumbnails />
  //       </div>
  //     </div>

  //     {/* Game Info */}
  //     <div className="grid md:grid-cols-3 gap-6">
  //       <Card className="md:col-span-2">
  //         <CardContent className="p-6 space-y-4">
  //           <h2 className="text-2xl font-semibold">About</h2>
  //           <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
  //             {game.description.about}
  //           </p>
  //         </CardContent>
  //       </Card>

  //       <Card>
  //         <CardContent className="p-6 space-y-4">
  //           <div className="flex items-center gap-2">
  //             <Calendar className="w-5 h-5" />
  //             <div>
  //               <p className="text-sm text-gray-500">Release Date</p>
  //               <p className="font-medium">
  //                 {new Date(game.release_date).toLocaleDateString()}
  //               </p>
  //             </div>
  //           </div>
  //           <div className="flex items-center gap-2">
  //             <Building2 className="w-5 h-5" />
  //             <div>
  //               <p className="text-sm text-gray-500">Publisher</p>
  //               <p className="font-medium">{game.publisher}</p>
  //             </div>
  //           </div>
  //           <div className="flex items-center gap-2">
  //             <HardDrive className="w-5 h-5" />
  //             <div>
  //               <p className="text-sm text-gray-500">Size</p>
  //               <p className="font-medium">Original: {game.original_size}</p>
  //               <p className="font-medium">Repack: {game.repack_size}</p>
  //             </div>
  //           </div>
  //           <DownloadModal />
  //         </CardContent>
  //       </Card>
  //     </div>

  //     {/* System Requirements */}
  //     <Card>
  //       <CardContent className="p-6">
  //         <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
  //         <Tabs defaultValue="minimum" className="w-full">
  //           <TabsList className="grid w-full grid-cols-2">
  //             <TabsTrigger value="minimum">Minimum</TabsTrigger>
  //             <TabsTrigger value="recommended">Recommended</TabsTrigger>
  //           </TabsList>
  //           <TabsContent value="minimum" className="space-y-4 mt-4">
  //             <div className="grid md:grid-cols-2 gap-4">
  //               <div>
  //                 <p className="font-semibold">OS</p>
  //                 <p className="text-gray-600 dark:text-gray-300">
  //                   {game.system_req.minimum_req.os.join(", ")}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p className="font-semibold">Processor</p>
  //                 <p className="text-gray-600 dark:text-gray-300">
  //                   {game.system_req.minimum_req.processor}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p className="font-semibold">Memory</p>
  //                 <p className="text-gray-600 dark:text-gray-300">
  //                   {game.system_req.minimum_req.memory}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p className="font-semibold">Graphics</p>
  //                 <p className="text-gray-600 dark:text-gray-300">
  //                   {game.system_req.minimum_req.graphics}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p className="font-semibold">Storage</p>
  //                 <p className="text-gray-600 dark:text-gray-300">
  //                   {game.system_req.minimum_req.storage}
  //                 </p>
  //               </div>
  //             </div>
  //           </TabsContent>
  //           <TabsContent value="recommended" className="space-y-4 mt-4">
  //             <div className="grid md:grid-cols-2 gap-4">
  //               <div>
  //                 <p className="font-semibold">OS</p>
  //                 <p className="text-gray-600 dark:text-gray-300">
  //                   {game.system_req.recommended_req.os.join(", ")}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p className="font-semibold">Processor</p>
  //                 <p className="text-gray-600 dark:text-gray-300">
  //                   {game.system_req.recommended_req.processor}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p className="font-semibold">Memory</p>
  //                 <p className="text-gray-600 dark:text-gray-300">
  //                   {game.system_req.recommended_req.memory}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p className="font-semibold">Graphics</p>
  //                 <p className="text-gray-600 dark:text-gray-300">
  //                   {game.system_req.recommended_req.graphics}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p className="font-semibold">Storage</p>
  //                 <p className="text-gray-600 dark:text-gray-300">
  //                   {game.system_req.recommended_req.storage}
  //                 </p>
  //               </div>
  //             </div>
  //           </TabsContent>
  //         </Tabs>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{game.title}</h1>
        <div className="flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Media Section */}
      <div className="space-y-4">
        <MediaViewer />
      </div>

      {/* Media Thumbnails */}
      <MediaThumbnails />

      {/* Game Info */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {game.description.about}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <div>
                <p className="text-sm text-gray-500">Release Date</p>
                <p className="font-medium">
                  {new Date(game.release_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              <div>
                <p className="text-sm text-gray-500">Publisher</p>
                <p className="font-medium">{game.publisher}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5" />
              <div>
                <p className="text-sm text-gray-500">Size</p>
                <p className="font-medium">Original: {game.original_size}</p>
                <p className="font-medium">Repack: {game.repack_size}</p>
              </div>
            </div>
            <DownloadModal />
          </CardContent>
        </Card>
      </div>

      {/* System Requirements */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
          <Tabs defaultValue="minimum" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="minimum">Minimum</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
            <TabsContent value="minimum" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">OS</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {game.system_req.minimum_req.os.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Processor</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {game.system_req.minimum_req.processor}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Memory</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {game.system_req.minimum_req.memory}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Graphics</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {game.system_req.minimum_req.graphics}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Storage</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {game.system_req.minimum_req.storage}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recommended" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">OS</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {game.system_req.recommended_req.os.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Processor</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {game.system_req.recommended_req.processor}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Memory</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {game.system_req.recommended_req.memory}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Graphics</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {game.system_req.recommended_req.graphics}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Storage</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {game.system_req.recommended_req.storage}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameDetailPage;
