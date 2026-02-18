import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, TrendingUp, MapPin } from "lucide-react";
import { Redirect } from "wouter";

export default function CallAnalytics() {
  const { user, loading } = useAuth();
  const { data: locationStats, isLoading: statsLoading } = trpc.callTracking.getLocationStats.useQuery();
  const { data: recentCalls, isLoading: callsLoading } = trpc.callTracking.getAnalytics.useQuery({});

  // Redirect if not admin
  if (!loading && (!user || user.role !== 'admin')) {
    return <Redirect to="/" />;
  }

  if (loading || statsLoading || callsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5F7F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const totalCalls = locationStats?.reduce((sum, stat) => sum + Number(stat.count), 0) || 0;
  const topLocation = locationStats?.[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Call Tracking Analytics
          </h1>
          <p className="text-gray-600">Monitor phone inquiry performance across all service areas</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
              <Phone className="h-4 w-4 text-[#2C5F7F]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCalls}</div>
              <p className="text-xs text-gray-500 mt-1">All-time tracked calls</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Location</CardTitle>
              <MapPin className="h-4 w-4 text-[#2C5F7F]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topLocation?.location || 'N/A'}</div>
              <p className="text-xs text-gray-500 mt-1">{topLocation?.count || 0} calls</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#2C5F7F]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{locationStats?.length || 0}</div>
              <p className="text-xs text-gray-500 mt-1">Locations with calls</p>
            </CardContent>
          </Card>
        </div>

        {/* Location Performance Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Performance by Location</CardTitle>
            <CardDescription>Call volume breakdown across all service areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Rank</th>
                    <th className="text-left py-3 px-4 font-medium">Location</th>
                    <th className="text-right py-3 px-4 font-medium">Calls</th>
                    <th className="text-right py-3 px-4 font-medium">% of Total</th>
                    <th className="text-left py-3 px-4 font-medium">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {locationStats?.map((stat, index) => {
                    const percentage = totalCalls > 0 ? (Number(stat.count) / totalCalls * 100).toFixed(1) : 0;
                    return (
                      <tr key={stat.location} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-600">#{index + 1}</td>
                        <td className="py-3 px-4 font-medium">{stat.location}</td>
                        <td className="py-3 px-4 text-right font-semibold">{stat.count}</td>
                        <td className="py-3 px-4 text-right text-gray-600">{percentage}%</td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#2C5F7F] h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {(!locationStats || locationStats.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  No call tracking data available yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Calls Log */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Call Activity</CardTitle>
            <CardDescription>Latest tracked phone button clicks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls?.slice(0, 10).map((call) => (
                <div key={call.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#2C5F7F]/10 p-2 rounded-full">
                      <Phone className="w-4 h-4 text-[#2C5F7F]" />
                    </div>
                    <div>
                      <p className="font-medium">{call.location}</p>
                      <p className="text-sm text-gray-500">{call.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {new Date(call.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(call.createdAt).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {(!recentCalls || recentCalls.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  No recent calls to display
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
