import type { Post, Platform } from "@/types/post";
import { PLATFORMS_CONFIG } from "@/config/platforms";

export interface Analytics {
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  averageLikesPerPost: number;
  averageCommentsPerPost: number;
  averageEngagementRatio: number;
  likesGrowth: number;
  commentsGrowth: number;
  byPlatform: Record<Platform, PlatformAnalytics>;
  engagementRatioByPlatform: Array<{ name: string; ratio: number; fill: string }>;
  likesCommentsStackedByPlatform: Array<{ name: string; likes: number; comments: number }>;
  likesByPlatformTrend: Array<{ name: string; instagram: number; facebook: number; tiktok: number; linkedin: number }>;
  engagementRatioTrend: Array<{ name: string; instagram: number; facebook: number; tiktok: number; linkedin: number }>;
}

export interface PlatformAnalytics {
  posts: number;
  likes: number;
  comments: number;
  averageLikes: number;
  averageComments: number;
  averageEngagement: number;
  label: string;
}

export function calculateAnalytics(allPosts: Post[]): Analytics {
  const platforms: Platform[] = ["instagram", "facebook", "tiktok", "linkedin"];

  const platformAnalytics = platforms.reduce(
    (acc, platform) => {
      const platformPosts = allPosts.filter((p) => p.platform === platform);
      const totalLikes = platformPosts.reduce((sum, p) => sum + (p.likes || 0), 0);
      const totalComments = platformPosts.reduce(
        (sum, p) => sum + (p.comments || 0),
        0
      );

      const postCount = platformPosts.length;
      const averageLikes = postCount > 0 ? totalLikes / postCount : 0;
      const averageComments = postCount > 0 ? totalComments / postCount : 0;
      const averageEngagement = averageLikes + averageComments;

      acc[platform] = {
        posts: postCount,
        likes: totalLikes,
        comments: totalComments,
        averageLikes,
        averageComments,
        averageEngagement,
        label: PLATFORMS_CONFIG[platform].label,
      };

      return acc;
    },
    {} as Record<Platform, PlatformAnalytics>
  );

  const totalPosts = allPosts.length;
  const totalLikes = allPosts.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalComments = allPosts.reduce((sum, p) => sum + (p.comments || 0), 0);

  const totalEngagement = totalLikes + totalComments;
  const averageEngagementRatio = totalPosts > 0 ? totalEngagement / totalPosts : 0;

  const engagementRatioByPlatformData = platforms.map((platform) => ({
    name: platformAnalytics[platform].label,
    ratio: Math.round((platformAnalytics[platform].averageEngagement * 100) / averageEngagementRatio) / 100,
    fill: getColorForPlatform(platform),
  }));

  const likesCommentsStackedData = platforms.map((platform) => ({
    name: platformAnalytics[platform].label,
    likes: platformAnalytics[platform].likes,
    comments: platformAnalytics[platform].comments,
  }));

  const likesByPlatformData = calculateLikesByPlatformTrend(allPosts);
  const engagementRatioTrendData = calculateEngagementRatioTrend(allPosts);

  const { likesGrowth, commentsGrowth } = calculateGrowth(
    allPosts
      .filter((p) => p.createdAt)
      .map((p) => ({
        month: new Date(p.createdAt).toLocaleDateString("pt-BR", { month: "short", year: "numeric" }),
        likes: p.likes || 0,
      }))
      .reduce((acc, item) => {
        const existing = acc.find((a) => a.month === item.month);
        if (existing) {
          existing.value += item.likes;
        } else {
          acc.push({ month: item.month, value: item.likes });
        }
        return acc;
      }, [] as Array<{ month: string; value: number }>)
  );

  return {
    totalPosts,
    totalLikes,
    totalComments,
    averageLikesPerPost: totalPosts > 0 ? Math.round(totalLikes / totalPosts) : 0,
    averageCommentsPerPost: totalPosts > 0 ? Math.round(totalComments / totalPosts) : 0,
    averageEngagementRatio: Math.round(averageEngagementRatio * 100) / 100,
    likesGrowth,
    commentsGrowth,
    byPlatform: platformAnalytics,
    engagementRatioByPlatform: engagementRatioByPlatformData,
    likesCommentsStackedByPlatform: likesCommentsStackedData,
    likesByPlatformTrend: likesByPlatformData,
    engagementRatioTrend: engagementRatioTrendData,
  };
}

function calculateLikesPerMonth(posts: Post[]): Array<{
  month: string;
  value: number;
}> {
  const monthlyLikes: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.createdAt) {
      const date = new Date(post.createdAt);
      const monthKey = `${date.toLocaleDateString("pt-BR", { month: "short", year: "numeric" })}`;

      monthlyLikes[monthKey] = (monthlyLikes[monthKey] || 0) + (post.likes || 0);
    }
  });

  return Object.entries(monthlyLikes)
    .map(([month, value]) => ({ month, value }))
    .slice(-12);
}

function getColorForPlatform(platform: Platform): string {
  const colors: Record<Platform, string> = {
    instagram: "hsl(328, 100%, 54%)",
    facebook: "hsl(221, 83%, 53%)",
    tiktok: "hsl(212, 100%, 50%)",
    linkedin: "hsl(0, 100%, 50%)",
  };
  return colors[platform];
}

function calculateGrowth(
  likesPerMonth: Array<{ month: string; value: number }>
): { likesGrowth: number; commentsGrowth: number } {
  if (likesPerMonth.length < 2) {
    return { likesGrowth: 0, commentsGrowth: 0 };
  }

  const lastIndex = likesPerMonth.length - 1;
  const currentMonth = likesPerMonth[lastIndex].value;
  const previousMonth = likesPerMonth[lastIndex - 1].value;

  const likesGrowth =
    previousMonth > 0
      ? Math.round(((currentMonth - previousMonth) / previousMonth) * 100)
      : 0;

  return { likesGrowth, commentsGrowth: likesGrowth };
}

function calculateLikesByPlatformTrend(
  posts: Post[]
): Array<{ name: string; instagram: number; facebook: number; tiktok: number; linkedin: number }> {
  const platforms: Platform[] = ["instagram", "facebook", "tiktok", "linkedin"];
  const trendData: { [key: string]: { instagram: number; facebook: number; tiktok: number; linkedin: number } } = {};

  posts.forEach((post) => {
    if (post.createdAt) {
      const month = new Date(post.createdAt).toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
      if (!trendData[month]) {
        trendData[month] = { instagram: 0, facebook: 0, tiktok: 0, linkedin: 0 };
      }
      const platform = post.platform as Platform;
      if (platform && trendData[month][platform] !== undefined) {
        trendData[month][platform] += post.likes || 0;
      }
    }
  });

  return Object.entries(trendData)
    .map(([month, data]) => ({ name: month, ...data }))
    .slice(-12);
}

function calculateEngagementRatioTrend(
  posts: Post[]
): Array<{ name: string; instagram: number; facebook: number; tiktok: number; linkedin: number }> {
  const platforms: Platform[] = ["instagram", "facebook", "tiktok", "linkedin"];
  const trendData: { [key: string]: { posts: Record<Platform, number>; engagement: Record<Platform, number> } } = {};

  posts.forEach((post) => {
    if (post.createdAt) {
      const month = new Date(post.createdAt).toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
      if (!trendData[month]) {
        trendData[month] = {
          posts: { instagram: 0, facebook: 0, tiktok: 0, linkedin: 0 },
          engagement: { instagram: 0, facebook: 0, tiktok: 0, linkedin: 0 },
        };
      }
      const platform = post.platform as Platform;
      if (platform) {
        trendData[month].posts[platform]++;
        trendData[month].engagement[platform] += (post.likes || 0) + (post.comments || 0);
      }
    }
  });

  return Object.entries(trendData)
    .map(([month, data]) => ({
      name: month,
      instagram: data.posts.instagram > 0 ? Math.round((data.engagement.instagram / data.posts.instagram) * 100) / 100 : 0,
      facebook: data.posts.facebook > 0 ? Math.round((data.engagement.facebook / data.posts.facebook) * 100) / 100 : 0,
      tiktok: data.posts.tiktok > 0 ? Math.round((data.engagement.tiktok / data.posts.tiktok) * 100) / 100 : 0,
      linkedin: data.posts.linkedin > 0 ? Math.round((data.engagement.linkedin / data.posts.linkedin) * 100) / 100 : 0,
    }))
    .slice(-12);
}
