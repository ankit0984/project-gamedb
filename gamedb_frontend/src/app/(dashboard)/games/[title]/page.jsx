"use client";
import React from "react";
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
import { useParams } from "next/navigation";

const GameDetailPage = () => {
  const [currentMedia, setCurrentMedia] = React.useState({
    type: "trailer",
    index: 0,
  });
  const { title } = useParams();
  const [game, setGame] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchGame = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/gamedb/gamedata/search?query=${title}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // console.log("Fetched response:", data);

        // Access the game data from the nested response structure
        if (data?.data?.games) {
          setGame(data.data.games);
        } else {
          throw new Error("Game data not found");
        }
      } catch (err) {
        console.error("Error fetching game:", err);
        setError(err.message || "An error occurred while fetching the game");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [title]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!game) return <p>No game data available.</p>;

  const MediaViewer = () => (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
      {currentMedia.type === "trailer" ? (
        <video
          className="w-full h-full"
          controls
          key="trailer"
          src={game.trailer}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={Object.values(game.screenshots)[currentMedia.index]}
          alt={`Screenshot ${currentMedia.index + 1}`}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );

  const MediaThumbnails = () => (
    <div className="flex gap-2 overflow-x-auto p-4 pb-2">
      <button
        onClick={() => setCurrentMedia({ type: "trailer", index: 0 })}
        className={`relative flex-shrink-0 aspect-video w-32 rounded-lg overflow-hidden ${
          currentMedia.type === "trailer" ? "ring-2 ring-blue-500" : ""
        }`}
      >
        <img
          src={game.image.src}
          alt="Trailer thumbnail"
          className="w-full h-full object-cover brightness-50"
        />
        <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white" />
      </button>
      {Object.values(game.screenshots).map((screenshot, index) => (
        <button
          key={index}
          onClick={() => setCurrentMedia({ type: "image", index })}
          className={`relative flex-shrink-0 aspect-video w-32 rounded-lg overflow-hidden ${
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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
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

      <div className="space-y-4">
        <MediaViewer />
        <MediaThumbnails />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="text-gray-300 leading-relaxed text-pretty">
              {game.description?.about || "Description not available."}
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
                  <p>{game.system_req.minimum_req.os.join(", ")}</p>
                </div>
                <div>
                  <p className="font-semibold">Processor</p>
                  <p>{game.system_req.minimum_req.processor}</p>
                </div>
                <div>
                  <p className="font-semibold">Memory</p>
                  <p>{game.system_req.minimum_req.memory}</p>
                </div>
                <div>
                  <p className="font-semibold">Graphics</p>
                  <p>{game.system_req.minimum_req.graphics}</p>
                </div>
                <div>
                  <p className="font-semibold">Storage</p>
                  <p>{game.system_req.minimum_req.storage}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recommended" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">OS</p>
                  <p>{game.system_req.recommended_req.os.join(", ")}</p>
                </div>
                <div>
                  <p className="font-semibold">Processor</p>
                  <p>{game.system_req.recommended_req.processor}</p>
                </div>
                <div>
                  <p className="font-semibold">Memory</p>
                  <p>{game.system_req.recommended_req.memory}</p>
                </div>
                <div>
                  <p className="font-semibold">Graphics</p>
                  <p>{game.system_req.recommended_req.graphics}</p>
                </div>
                <div>
                  <p className="font-semibold">Storage</p>
                  <p>{game.system_req.recommended_req.storage}</p>
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
