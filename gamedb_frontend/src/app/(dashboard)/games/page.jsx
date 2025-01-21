"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Gamepad2,
  Tags,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 10;

const GameList = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchGames = async () => {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        setError("User not logged in");
        setIsLoading(false);
        return;
      }

      try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/gamedb/${userId}/games`;
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        if (result.success) {
          setGames(result.data.games);
        } else {
          setError(result.message || "Failed to fetch games");
        }
      } catch (error) {
        setError("Error fetching games: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    games.forEach((game) => game.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [games]);

  const filteredAndSortedGames = useMemo(() => {
    return games
      .filter((game) => {
        const matchesSearch =
          game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (game.description?.about ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.every((tag) => game.tags.includes(tag));
        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.release_date) - new Date(a.release_date);
          case "oldest":
            return new Date(a.release_date) - new Date(b.release_date);
          case "alphabetical":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [games, searchTerm, selectedTags, sortBy]);

  const paginatedGames = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedGames.slice(startIndex, endIndex);
  }, [filteredAndSortedGames, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedGames.length / ITEMS_PER_PAGE);

  const handleTagSelect = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/placeholder.svg?height=200&width=400";
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Game Library</h1>
          {(searchTerm || selectedTags.length > 0 || sortBy !== "newest") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8"
            />
          </div>
          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Filter by Tags:</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                className="cursor-pointer transition-all hover:bg-primary/90"
                onClick={() => handleTagSelect(tag)}
              >
                <Tags className="h-3 w-3 mr-1" />
                {tag}
                {selectedTags.includes(tag) && (
                  <X
                    className="h-3 w-3 ml-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTagSelect(tag);
                    }}
                  />
                )}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedGames.map((game, index) => (
          <Card
            key={game._id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="aspect-video w-full overflow-hidden bg-muted relative">
              <img
                src={game.image?.src || "/placeholder.svg?height=200&width=400"}
                alt={game.image?.alt || game.title}
                className={`
                  w-full h-full object-cover transition-all duration-500
                  ${hovered === index ? "scale-110 brightness-90" : "scale-100"}
                `}
                style={{ objectPosition: "center" }}
                onError={handleImageError}
              />
              <div
                className={`
                absolute inset-0 bg-gradient-to-t from-background/60 to-transparent
                transition-opacity duration-300
                ${hovered === index ? "opacity-100" : "opacity-0"}
              `}
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Gamepad2 className="h-5 w-5 text-primary" />
                {game.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {game.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-2">
                {game.description?.about || "Description not available."}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Released: {new Date(game.release_date).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/games/${game.title}`}>
                <Button>open games</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAndSortedGames.length > 0 ? (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No games found matching your criteria.
          </p>
          <Button
            variant="link"
            onClick={clearFilters}
            className="mt-4 text-primary hover:underline"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameList;
