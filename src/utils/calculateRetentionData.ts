import type { ViewTimestamp } from "@/types";

export function calculateRetentionData(
  analytics: { viewTimestamps: ViewTimestamp[] },
  totalDuration: number,
  interval: number = 10
) {
  // Array para armazenar a quantidade de usuários que assistiram até cada segundo
  const retentionArray = Array(totalDuration + 1).fill(0);

  // Criar um mapa para acessar as visualizações por startTimestamp rapidamente
  const viewMap = new Map<number, ViewTimestamp[]>();
  analytics.viewTimestamps.forEach((view) => {
    const start = Math.floor(view.startTimestamp);
    if (!viewMap.has(start)) {
      viewMap.set(start, []);
    }
    viewMap.get(start)?.push(view);
  });

  // Filtrar as visualizações que começaram no início do vídeo (startTimestamp == 0)
  const filteredViews = viewMap.get(0) || [];

  // Contar quantos usuários assistiram até cada segundo do vídeo
  filteredViews.forEach((view) => {
    const end = findChainedViews(view, viewMap, totalDuration);

    // Incrementar a contagem de retenção para todos os segundos até o fim da visualização encadeada
    for (let i = 0; i <= end; i++) {
      retentionArray[i]++;
    }
  });

  return {
    retentionArray,
    filteredViews,
    totalFilteredViews: filteredViews.length || 1,
  };
}

export function findChainedViews(
  startView: ViewTimestamp,
  viewMap: Map<number, ViewTimestamp[]>,
  totalDuration: number
): number {
  let endTimestamp = Math.min(
    Math.floor(startView.endTimestamp),
    totalDuration
  );
  let nextViews = viewMap.get(endTimestamp);

  while (nextViews && nextViews.length > 0) {
    const nextView = nextViews.shift();
    if (nextView) {
      endTimestamp = Math.min(Math.floor(nextView.endTimestamp), totalDuration);
      nextViews = viewMap.get(endTimestamp);
    } else {
      break;
    }
  }

  return endTimestamp;
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function calculateRetentionPercentages(
  retentionArray: number[],
  totalFilteredViews: number
) {
  return retentionArray.map((count, second) => ({
    date: formatTime(second),
    Retenção: Math.min(100, Math.max(0, (count / totalFilteredViews) * 100)),
  }));
}

export function getRetentionStatus(percentage: number): string {
  if (percentage >= 80) return "Bom";
  if (percentage >= 50) return "Mais ou Menos";
  if (percentage >= 30) return "Ruim";
  if (percentage >= 15) return "Pior";
  return "";
}
