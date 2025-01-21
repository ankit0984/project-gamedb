"use client";
import React, { useState, useMemo } from "react";
import { Trash2, Search, SortAsc, SortDesc, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GameDatabase = () => {
  const [games, setGames] = useState([
    {
      id: 1,
      title: "Super Mario Odyssey",
      imageUrl: "/api/placeholder/200/300",
      genre: "Platform",
      dateAdded: "2024-01-15",
      description:
        "A 3D platform game featuring Mario's adventures across various kingdoms.",
    },
    {
      id: 2,
      title: "The Legend of Zelda",
      imageUrl: "/api/placeholder/200/300",
      genre: "Action RPG",
      dateAdded: "2024-01-10",
      description:
        "An action-adventure game set in the magical kingdom of Hyrule.",
    },
    {
      id: 3,
      title: "Red Dead Redemption 2",
      imageUrl: "/api/placeholder/200/300",
      genre: "Action Adventure",
      dateAdded: "2024-01-20",
      description: "An epic tale of life in America's unforgiving heartland.",
    },
    {
      id: 4,
      title: "FIFA 24",
      imageUrl: "/api/placeholder/200/300",
      genre: "Sports",
      dateAdded: "2024-01-05",
      description:
        "The latest iteration of the popular football simulation game.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [gameToDelete, setGameToDelete] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(games.map((game) => game.genre))];
    return ["all", ...uniqueGenres];
  }, [games]);

  const handleDelete = (gameId) => {
    setGames(games.filter((game) => game.id !== gameId));
    setGameToDelete(null);
  };

  const toggleSortOrder = () => {
    setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
  };

  const filteredAndSortedGames = useMemo(() => {
    return games
      .filter(
        (game) =>
          game.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedGenre === "all" || game.genre === selectedGenre)
      )
      .sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        const modifier = sortOrder === "asc" ? 1 : -1;
        return aValue.localeCompare(bValue) * modifier;
      });
  }, [games, searchQuery, selectedGenre, sortBy, sortOrder]);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className=" rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-4xl font-bold text-gray-300">Game Library</h1>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0 min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full md:w-[200px] h-11">
                  <SelectValue placeholder="Select Genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre === "all" ? "All Genres" : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px] h-11">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="dateAdded">Date Added</SelectItem>
                  <SelectItem value="genre">Genre</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={toggleSortOrder}
                className="w-full md:w-auto h-11"
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Games List */}
        <div className="space-y-4">
          {filteredAndSortedGames.map((game) => (
            <Card
              key={game.id}
              className="hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-8">
                  <div className="w-40 h-52 flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
                    <img
                      src={game.imageUrl}
                      alt={game.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex-grow space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                          {game.title}
                        </h2>
                        <div className="flex items-center gap-6">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                            {game.genre}
                          </span>
                          <span className="text-gray-500 text-sm">
                            Added:{" "}
                            {new Date(game.dateAdded).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setGameToDelete(game)}
                              className="hover:bg-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete this game</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {game.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Click image to enlarge
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AlertDialog
          open={gameToDelete !== null}
          onOpenChange={() => setGameToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Game</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{gameToDelete?.title}"? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(gameToDelete?.id)}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default GameDatabase;
