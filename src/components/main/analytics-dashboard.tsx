"use client";

import type { Post } from "@/types/post";
import { calculateAnalytics } from "@/lib/analytics";
import { AnalyticsCard } from "./analytics-card";
import { PageHeader } from "@/components/layout/page-header";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Heart, MessageCircle, FileText, Zap } from "lucide-react";

interface AnalyticsDashboardProps {
  posts: Post[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-card border border-border rounded-lg p-1.5 shadow-lg">
        <p className="text-[10px] font-semibold text-foreground">{data.payload.name}</p>
        <p className="text-[10px] font-bold text-chart-1">{data.value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const CustomStackedTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const platformColor = payload[0].payload.fill;
    return (
      <div className="bg-card border border-border rounded-lg p-2 shadow-lg space-y-0.5">
        <p className="text-xs font-semibold text-foreground">{payload[0].payload.name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[10px] font-bold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLineTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-2 shadow-lg space-y-0.5">
        <p className="text-xs font-semibold text-foreground">{payload[0].payload.name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[10px] font-bold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AnalyticsDashboard({ posts }: AnalyticsDashboardProps) {
  const analytics = calculateAnalytics(posts);

  const colors = {
    chart1: "#ec4899",
    chart2: "#3b82f6",
    chart3: "#06b6d4",
    chart4: "#ef4444",
  };

  const platformColorMap = {
    instagram: colors.chart1,
    facebook: colors.chart2,
    tiktok: colors.chart3,
    linkedin: colors.chart4,
  };

  return (
    <div className="space-y-3">
      <PageHeader
        title="Dashboard"
        description="Análise qualitativa de performance e engajamento"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <AnalyticsCard
          title="Total de Posts"
          value={analytics.totalPosts}
          icon={<FileText className="h-6 w-6" />}
        />
        <AnalyticsCard
          title="Total de Likes"
          value={analytics.totalLikes.toLocaleString()}
          icon={<Heart className="h-6 w-6" />}
          trend={{
            value: analytics.likesGrowth,
            direction: analytics.likesGrowth >= 0 ? "up" : "down",
          }}
        />
        <AnalyticsCard
          title="Total de Comentários"
          value={analytics.totalComments.toLocaleString()}
          icon={<MessageCircle className="h-6 w-6" />}
          trend={{
            value: analytics.commentsGrowth,
            direction: analytics.commentsGrowth >= 0 ? "up" : "down",
          }}
        />
        <AnalyticsCard
          title="Engajamento Médio"
          value={analytics.averageEngagementRatio}
          icon={<Zap className="h-6 w-6" />}
          subtitle="Por post"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            Taxa de Engajamento por Plataforma ao Longo do Tempo
          </h2>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.engagementRatioTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} width={30} />
                <Tooltip content={<CustomLineTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "4px", fontSize: "12px" }} height={18} />
                <Area
                  type="monotone"
                  dataKey="instagram"
                  stroke={colors.chart1}
                  fill={colors.chart1}
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name="Instagram"
                />
                <Area
                  type="monotone"
                  dataKey="facebook"
                  stroke={colors.chart2}
                  fill={colors.chart2}
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name="Facebook"
                />
                <Area
                  type="monotone"
                  dataKey="tiktok"
                  stroke={colors.chart3}
                  fill={colors.chart3}
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name="TikTok"
                />
                <Area
                  type="monotone"
                  dataKey="linkedin"
                  stroke={colors.chart4}
                  fill={colors.chart4}
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name="LinkedIn"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            Likes e Comentários por Plataforma
          </h2>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.likesCommentsStackedByPlatform}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} width={30} />
                <Tooltip content={<CustomStackedTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "4px", fontSize: "12px" }} height={18} />
                <Bar dataKey="likes" name="Likes" stackId="a" fill={colors.chart1} />
                <Bar dataKey="comments" name="Comentários" stackId="a" fill={colors.chart2} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            Comparação de Likes por Plataforma
          </h2>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.likesByPlatformTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} width={30} />
                <Tooltip content={<CustomLineTooltip />} />
                <Legend wrapperStyle={{ paddingTop: "4px", fontSize: "12px" }} height={18} />
                <Line
                  type="monotone"
                  dataKey="instagram"
                  stroke={colors.chart1}
                  strokeWidth={2}
                  name="Instagram"
                  dot={{ fill: colors.chart1, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="facebook"
                  stroke={colors.chart2}
                  strokeWidth={2}
                  name="Facebook"
                  dot={{ fill: colors.chart2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="tiktok"
                  stroke={colors.chart3}
                  strokeWidth={2}
                  name="TikTok"
                  dot={{ fill: colors.chart3, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="linkedin"
                  stroke={colors.chart4}
                  strokeWidth={2}
                  name="LinkedIn"
                  dot={{ fill: colors.chart4, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            Resumo por Plataforma
          </h2>
          <div className="space-y-2 overflow-y-auto" style={{ height: "240px" }}>
            {Object.entries(analytics.byPlatform).map(([platform, data]) => (
              <div
                key={platform}
                className="grid grid-cols-2 gap-1 p-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="text-[10px] text-muted-foreground mb-0.5">Plataforma</p>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: platformColorMap[platform as keyof typeof platformColorMap],
                      }}
                    />
                    <p className="font-semibold text-foreground text-[10px]">{data.label}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-0.5">Posts</p>
                  <p className="font-semibold text-foreground text-xs">{data.posts}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-0.5">Likes</p>
                  <p className="font-semibold text-foreground text-xs">{data.likes}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-0.5">Comentários</p>
                  <p className="font-semibold text-foreground text-xs">{data.comments}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Engajamento Médio</p>
                  <p className="font-semibold text-foreground text-xs">
                    {Math.round(data.averageEngagement * 10) / 10}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
