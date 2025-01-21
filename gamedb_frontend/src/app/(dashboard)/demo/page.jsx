"use client";
import React, { useState, useMemo } from "react";
import { Trash2, Search, SortAsc, SortDesc } from "lucide-react";
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

const GameDatabase = () => {
  const [games, setGames] = useState([
    {
      id: 1,
      title: "Super Mario Odyssey",
      imageUrl: "/api/placeholder/200/300",
      genre: "Platform",
      dateAdded: "2024-01-15",
    },
    {
      id: 2,
      title: "The Legend of Zelda",
      imageUrl: "/api/placeholder/200/300",
      genre: "Action RPG",
      dateAdded: "2024-01-10",
    },
    {
      id: 3,
      title: "Red Dead Redemption 2",
      imageUrl: "/api/placeholder/200/300",
      genre: "Action Adventure",
      dateAdded: "2024-01-20",
    },
    {
      id: 4,
      title: "FIFA 24",
      imageUrl: "/api/placeholder/200/300",
      genre: "Sports",
      dateAdded: "2024-01-05",
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
    <div className="p-6  min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold">Game Library</h1>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full md:w-[180px]">
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
              <SelectTrigger className="w-full md:w-[180px]">
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
              className="w-full md:w-auto"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredAndSortedGames.map((game) => (
            <Card key={game.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-6">
                  <div className="w-32 h-40 flex-shrink-0">
                    <img
                      src={game.imageUrl}
                      alt={game.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-2">
                      {game.title}
                    </h2>
                    <p className="text-gray-600 mb-1">Genre: {game.genre}</p>
                    <p className="text-gray-600 mb-4">
                      Added: {new Date(game.dateAdded).toLocaleDateString()}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setGameToDelete(game)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
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
