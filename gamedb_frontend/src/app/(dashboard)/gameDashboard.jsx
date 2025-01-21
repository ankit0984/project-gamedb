// "use client";
// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   PlusCircle,
//   GamepadIcon,
//   Building2,
//   Tags,
//   Search,
//   Calendar,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import Cookies from "js-cookie";
// import Link from "next/link";

// const GamingDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [recentGames, setRecentGames] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortColumn, setSortColumn] = useState("release_date");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [selectedPublisher, setSelectedPublisher] = useState("all");
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       const userId = Cookies.get("userId");
//       if (!userId) {
//         setError("User not logged in");
//         setIsLoading(false);
//         return;
//       }
//       try {
//         const response = await fetch(
//           `http://localhost:3636/api/gamedb/${userId}/stats`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify(),
//           }
//         );
//         const result = await response.json();
//         if (response.ok) {
//           setStats(result.data);
//           setRecentGames(result.data.recentGames);
//         } else {
//           console.error("Failed to fetch stats:", result.message);
//         }
//       } catch (error) {
//         console.error("Error fetching game stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const handleSort = (column) => {
//     if (sortColumn === column) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(column);
//       setSortOrder("desc");
//     }
//   };

//   const filteredGames = recentGames
//     .filter((game) => {
//       const matchesSearch = game.title
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesPublisher =
//         selectedPublisher === "all" ||
//         game.publisher.split(", ").some((pub) => pub === selectedPublisher);
//       return matchesSearch && matchesPublisher;
//     })
//     .sort((a, b) => {
//       const order = sortOrder === "asc" ? 1 : -1;
//       if (sortColumn === "release_date") {
//         return order * (new Date(a.release_date) - new Date(b.release_date));
//       }
//       return order * (a[sortColumn] > b[sortColumn] ? 1 : -1);
//     });

//   if (loading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (!stats) {
//     return (
//       <div className="text-center py-10 text-red-500">Failed to load data.</div>
//     );
//   }

//   const allPublishers = [
//     ...new Set(recentGames.flatMap((game) => game.publisher.split(", "))),
//   ];

//   return (
//     <div className="p-4 max-w-7xl mx-auto space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Gaming Dashboard</h1>
//           <p className="text-sm text-muted-foreground">
//             Last updated: {formatDate(stats.lastUpdated)}
//           </p>
//         </div>
//         <Button className="flex items-center gap-2">
//           <PlusCircle className="w-4 h-4" />
//           <Link href="/add-games">Add New Game</Link>
//         </Button>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Games</CardTitle>
//             <GamepadIcon className="w-4 h-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalGames}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Publishers</CardTitle>
//             <Building2 className="w-4 h-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalPublishers}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
//             <Tags className="w-4 h-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalTags}</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search and Filter Controls */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search games..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-8"
//           />
//         </div>
//         <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
//           <SelectTrigger className="w-[250px]">
//             <SelectValue placeholder="Filter by Publisher" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Publishers</SelectItem>
//             {allPublishers.map((publisher) => (
//               <SelectItem key={publisher} value={publisher}>
//                 {publisher}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Recent Games Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Games</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead></TableHead>
//                 <TableHead
//                   onClick={() => handleSort("title")}
//                   className="cursor-pointer"
//                 >
//                   Game Title{" "}
//                   {sortColumn === "title" &&
//                     (sortOrder === "asc" ? (
//                       <ChevronUp className="inline w-4 h-4" />
//                     ) : (
//                       <ChevronDown className="inline w-4 h-4" />
//                     ))}
//                 </TableHead>
//                 <TableHead
//                   onClick={() => handleSort("release_date")}
//                   className="cursor-pointer"
//                 >
//                   Release Date{" "}
//                   {sortColumn === "release_date" &&
//                     (sortOrder === "asc" ? (
//                       <ChevronUp className="inline w-4 h-4" />
//                     ) : (
//                       <ChevronDown className="inline w-4 h-4" />
//                     ))}
//                 </TableHead>
//                 <TableHead>Publisher</TableHead>
//                 <TableHead>Details</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredGames.map((game) => (
//                 <React.Fragment key={game._id}>
//                   <TableRow>
//                     <TableCell>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() =>
//                           setExpandedRow(
//                             expandedRow === game._id ? null : game._id
//                           )
//                         }
//                       >
//                         {expandedRow === game._id ? (
//                           <ChevronUp className="w-4 h-4" />
//                         ) : (
//                           <ChevronDown className="w-4 h-4" />
//                         )}
//                       </Button>
//                     </TableCell>
//                     <TableCell className="font-medium">{game.title}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Calendar className="w-4 h-4 text-muted-foreground" />
//                         {formatDate(game.release_date)}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex flex-wrap gap-2">
//                         {game.publisher.split(", ").map((pub, index) => (
//                           <Badge key={index} variant="secondary">
//                             {pub}
//                           </Badge>
//                         ))}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Dialog>
//                         <DialogTrigger asChild>
//                           <Button variant="outline" size="sm">
//                             View Details
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                           <DialogHeader>
//                             <DialogTitle>{game.title}</DialogTitle>
//                           </DialogHeader>
//                           <div className="space-y-4">
//                             <div>
//                               <h3 className="font-semibold mb-2">
//                                 Release Information
//                               </h3>
//                               <p>{formatDate(game.release_date)}</p>
//                             </div>
//                             <div>
//                               <h3 className="font-semibold mb-2">Publishers</h3>
//                               <div className="flex flex-wrap gap-2">
//                                 {game.publisher
//                                   .split(", ")
//                                   .map((pub, index) => (
//                                     <Badge key={index} variant="secondary">
//                                       {pub}
//                                     </Badge>
//                                   ))}
//                               </div>
//                             </div>
//                           </div>
//                         </DialogContent>
//                       </Dialog>
//                     </TableCell>
//                   </TableRow>
//                   {expandedRow === game._id && (
//                     <TableRow>
//                       <TableCell colSpan={5} className="bg-muted/50">
//                         <div className="p-4">
//                           <h3 className="font-semibold mb-2">
//                             Additional Information
//                           </h3>
//                           <div className="grid grid-cols-2 gap-4">
//                             <div>
//                               <p className="text-sm font-medium">
//                                 Release Date
//                               </p>
//                               <p className="text-sm text-muted-foreground">
//                                 {formatDate(game.release_date)}
//                               </p>
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium">Publishers</p>
//                               <div className="flex flex-wrap gap-2 mt-1">
//                                 {game.publisher
//                                   .split(", ")
//                                   .map((pub, index) => (
//                                     <Badge key={index} variant="secondary">
//                                       {pub}
//                                     </Badge>
//                                   ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </React.Fragment>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default GamingDashboard;

"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlusCircle,
  GamepadIcon,
  Building2,
  Tags,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import Cookies from "js-cookie";
import Link from "next/link";

const GamingDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("release_date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPublisher, setSelectedPublisher] = useState("all");
  const [expandedRow, setExpandedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [userId, setUserId] = useEffect("");

  useEffect(() => {
    const fetchStats = async () => {
      // const userId = Cookies.get("userId");
      const userId = localStorage.getItem("userid");

      if (!userId) {
        console.error("User not logged in");
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3636/api/gamedb/${userId}/stats`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const result = await response.json();
        if (response.ok) {
          setStats(result.data);
          setRecentGames(result.data.recentGames);
        } else {
          console.error("Failed to fetch stats:", result.message);
        }
      } catch (error) {
        console.error("Error fetching game stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("desc");
    }
  };

  const filteredGames = recentGames
    .filter((game) => {
      const matchesSearch = game.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPublisher =
        selectedPublisher === "all" ||
        game.publisher.split(", ").some((pub) => pub === selectedPublisher);
      return matchesSearch && matchesPublisher;
    })
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      if (sortColumn === "release_date") {
        return order * (new Date(a.release_date) - new Date(b.release_date));
      }
      return order * (a[sortColumn] > b[sortColumn] ? 1 : -1);
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-10 text-red-500">Failed to load data.</div>
    );
  }

  const allPublishers = [
    ...new Set(recentGames.flatMap((game) => game.publisher.split(", "))),
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gaming Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {formatDate(stats.lastUpdated)}
          </p>
        </div>
        <Button asChild>
          <Link href="/add-games" className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Add New Game
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
            <GamepadIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGames}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Publishers</CardTitle>
            <Building2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPublishers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
            <Tags className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTags}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Filter by Publisher" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Publishers</SelectItem>
            {allPublishers.map((publisher) => (
              <SelectItem key={publisher} value={publisher}>
                {publisher}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Recent Games Table */}
      <Card className="min-h-[400px]">
        <CardHeader>
          <CardTitle>Recent Games</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredGames.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead
                    onClick={() => handleSort("title")}
                    className="cursor-pointer"
                  >
                    Game Title{" "}
                    {sortColumn === "title" &&
                      (sortOrder === "asc" ? (
                        <ChevronUp className="inline w-4 h-4" />
                      ) : (
                        <ChevronDown className="inline w-4 h-4" />
                      ))}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("release_date")}
                    className="cursor-pointer"
                  >
                    Release Date{" "}
                    {sortColumn === "release_date" &&
                      (sortOrder === "asc" ? (
                        <ChevronUp className="inline w-4 h-4" />
                      ) : (
                        <ChevronDown className="inline w-4 h-4" />
                      ))}
                  </TableHead>
                  <TableHead>Publisher</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((game) => (
                  <React.Fragment key={game._id}>
                    <TableRow>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setExpandedRow(
                              expandedRow === game._id ? null : game._id
                            )
                          }
                        >
                          {expandedRow === game._id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium">
                        {game.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {formatDate(game.release_date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {game.publisher.split(", ").map((pub, index) => (
                            <Badge key={index} variant="secondary">
                              {pub}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{game.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-semibold mb-2">
                                  Release Information
                                </h3>
                                <p>{formatDate(game.release_date)}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">
                                  Publishers
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {game.publisher
                                    .split(", ")
                                    .map((pub, index) => (
                                      <Badge key={index} variant="secondary">
                                        {pub}
                                      </Badge>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                    {expandedRow === game._id && (
                      <TableRow>
                        <TableCell colSpan={5} className="bg-muted/50">
                          <div className="p-4">
                            <h3 className="font-semibold mb-2">
                              Additional Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">
                                  Release Date
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(game.release_date)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  Publishers
                                </p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {game.publisher
                                    .split(", ")
                                    .map((pub, index) => (
                                      <Badge key={index} variant="secondary">
                                        {pub}
                                      </Badge>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground">No games found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GamingDashboard;
