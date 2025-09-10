"use client";

import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { MapPin, Users, AlertTriangle, Camera, Filter } from "lucide-react";

const mockTrucks = [
	{
		id: "T001",
		driver: "John Smith",
		status: "active",
		capacity: 75,
		lastPickup: "Main St & 5th Ave",
		zone: "Zone A",
		lat: 40.7128,
		lng: -74.006,
	},
	{
		id: "T002",
		driver: "Sarah Johnson",
		status: "active",
		capacity: 45,
		lastPickup: "Park Ave & 42nd St",
		zone: "Zone B",
		lat: 40.7589,
		lng: -73.9851,
	},
	{
		id: "T003",
		driver: "Mike Wilson",
		status: "maintenance",
		capacity: 0,
		lastPickup: "Broadway & 14th St",
		zone: "Zone A",
		lat: 40.7353,
		lng: -73.991,
	},
	{
		id: "T004",
		driver: "Lisa Chen",
		status: "idle",
		capacity: 20,
		lastPickup: "Wall St & Water St",
		zone: "Zone C",
		lat: 40.7074,
		lng: -74.0113,
	},
];

function App() {
	const [viewMode, setViewMode] = useState("user");
	const [selectedZone, setSelectedZone] = useState("all");
	const [selectedStatus, setSelectedStatus] = useState("all");

	const filteredTrucks = mockTrucks.filter((truck) => {
		if (selectedZone !== "all" && truck.zone !== selectedZone) return false;
		if (selectedStatus !== "all" && truck.status !== selectedStatus)
			return false;
		return true;
	});

	const activeTrucks = mockTrucks.filter((t) => t.status === "active").length;
	const maintenanceTrucks = mockTrucks.filter(
		(t) => t.status === "maintenance"
	).length;
	const totalWasteCollected = 2847; // kg

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="border-b border-border bg-card">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2">
								<MapPin className="h-8 w-8 text-primary" />
								<h1 className="text-2xl font-bold text-foreground">
									Clean Sakti
								</h1>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<div className="flex bg-muted rounded-lg p-1">
								<Button
									variant={
										viewMode === "user"
											? "default"
											: "ghost"
									}
									size="sm"
									onClick={() => setViewMode("user")}
									className="text-sm"
								>
									<Users className="h-4 w-4 mr-2" />
									User View
								</Button>
								<Button
									variant={
										viewMode === "admin"
											? "default"
											: "ghost"
									}
									size="sm"
									onClick={() => setViewMode("admin")}
									className="text-sm"
								>
									<MapPin className="h-4 w-4 mr-2" />
									Admin View
								</Button>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className="container mx-auto px-4 py-6">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* Sidebar - Admin Dashboard or User Controls */}
					<div className="lg:col-span-1">
						{viewMode === "admin" ? (
							<div className="space-y-6">
								{/* Stats Cards */}
								<div className="grid grid-cols-1 gap-4">
									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-sm font-medium text-muted-foreground">
												Active Trucks
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold text-primary">
												{activeTrucks}
											</div>
										</CardContent>
									</Card>

									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-sm font-medium text-muted-foreground">
												In Maintenance
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold text-destructive">
												{maintenanceTrucks}
											</div>
										</CardContent>
									</Card>

									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-sm font-medium text-muted-foreground">
												Today's Collection
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold text-accent">
												{totalWasteCollected} kg
											</div>
										</CardContent>
									</Card>
								</div>

								{/* Filters */}
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Filter className="h-4 w-4" />
											Filters
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div>
											<label className="text-sm font-medium text-muted-foreground">
												Zone
											</label>
											<select
												className="w-full mt-1 p-2 border border-border rounded-md bg-background focus:ring focus:ring-primary"
												value={selectedZone}
												onChange={(e) =>
													setSelectedZone(
														e.target.value
													)
												}
											>
												<option value="all">
													All Zones
												</option>
												<option value="Zone A">
													Zone A
												</option>
												<option value="Zone B">
													Zone B
												</option>
												<option value="Zone C">
													Zone C
												</option>
											</select>
										</div>

										<div>
											<label className="text-sm font-medium text-muted-foreground">
												Status
											</label>
											<select
												className="w-full mt-1 p-2 border border-border rounded-md bg-background focus:ring focus:ring-primary"
												value={selectedStatus}
												onChange={(e) =>
													setSelectedStatus(
														e.target.value
													)
												}
											>
												<option value="all">
													All Status
												</option>
												<option value="active">
													Active
												</option>
												<option value="idle">
													Idle
												</option>
												<option value="maintenance">
													Maintenance
												</option>
											</select>
										</div>
									</CardContent>
								</Card>

								{/* Truck List */}
								<Card>
									<CardHeader>
										<CardTitle>Truck Status</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											{filteredTrucks.map((truck) => (
												<div
													key={truck.id}
													className="p-3 border border-border rounded-lg"
												>
													<div className="flex items-center justify-between mb-2">
														<span className="font-medium">
															{truck.id}
														</span>
														<Badge
															variant={
																truck.status ===
																"active"
																	? "default"
																	: truck.status ===
																	  "maintenance"
																	? "destructive"
																	: "secondary"
															}
														>
															{truck.status}
														</Badge>
													</div>
													<div className="text-sm text-muted-foreground space-y-1">
														<div>
															Driver:{" "}
															{truck.driver}
														</div>
														<div>
															Capacity:{" "}
															{truck.capacity}%
														</div>
														<div>
															Zone: {truck.zone}
														</div>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</div>
						) : (
							<div className="space-y-6">
								{/* User Location */}
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<MapPin className="h-4 w-4" />
											Your Location
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											Showing trucks within 3km radius
										</p>
										<Button
											className="w-full mt-3"
											variant="outline"
										>
											Update Location
										</Button>
									</CardContent>
								</Card>

								{/* Report Issue */}
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<AlertTriangle className="h-4 w-4" />
											Report Issue
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground mb-3">
											Report uncollected waste in your
											area
										</p>
										<Button className="w-full" variant="default">
											<Camera className="h-4 w-4 mr-2" />
											Take Photo & Report
										</Button>
									</CardContent>
								</Card>

								{/* Nearby Trucks */}
								<Card>
									<CardHeader>
										<CardTitle>Nearby Trucks</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											{mockTrucks
												.filter(
													(t) => t.status === "active"
												)
												.slice(0, 3)
												.map((truck) => (
													<div
														key={truck.id}
														className="p-3 border border-border rounded-lg"
													>
														<div className="flex items-center justify-between mb-2">
															<span className="font-medium">
																{truck.id}
															</span>
															<Badge variant="default">
																On Route
															</Badge>
														</div>
														<div className="text-sm text-muted-foreground">
															<div>
																Last pickup:{" "}
																{
																	truck.lastPickup
																}
															</div>
															<div className="text-xs mt-1">
																~0.8km away
															</div>
														</div>
													</div>
												))}
										</div>
									</CardContent>
								</Card>
							</div>
						)}
					</div>

					{/* Map Area */}
					<div className="lg:col-span-3">
						<Card className="h-[600px]">
							<CardContent className="p-0 h-full">
								<iframe
									title="Waste management map"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.949305386168!2d-74.00601568459278!3d40.71277677933173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjIuMCJX!5e0!3m2!1sen!2sus!4v1672531200000!5m2!1sen!2sus"
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								></iframe>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;