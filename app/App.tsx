import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { translateZhLineToEn } from "./enTranslate";
import { hasJapaneseKana, translateZhLineToJa } from "./jaTranslate";
import { Language, QUIZ_ITEMS } from "./studyData";

type TabKey = "home" | "chapters" | "cards" | "quiz";

type UiText = {
  appTitle: string;
  subtitle: string;
  tabs: Record<TabKey, string>;
  home: {
    welcome: string;
    days: string;
    cards: string;
    quizzes: string;
    recent: string;
  };
  chapters: {
    title: string;
    hint: string;
  };
  cards: {
    title: string;
    prompt: string;
    empty: string;
  };
  quiz: {
    title: string;
    prompt: string;
    correct: string;
    wrong: string;
    answer: string;
    explanation: string;
  };
};

type NoteBlock = {
  id: string;
  type: "heading" | "bullet" | "paragraph";
  level: number;
  text: string;
};

type NoteDay = {
  title: string;
  blocks: NoteBlock[];
};

type FavoriteItem = {
  id: string;
  keyword: string;
  explanation: string;
};

type FavoriteCandidate = {
  id: string;
  keyword: string;
  explanation: string;
};

const UI_TEXT: Record<Language, UiText> = {
  zh: {
    appTitle: "危险物取扱者 乙种 4类",
    subtitle: "按章节分章浏览完整笔记，并配合记忆卡与测验复习",
    tabs: { home: "首页", chapters: "章节", cards: "收藏", quiz: "测验" },
    home: {
      welcome: "章节页按第1章到第4章完整展示原始笔记内容，适合先通读再复习。",
      days: "章节",
      cards: "收藏",
      quizzes: "测验题",
      recent: "建议顺序：先看章节原文，收藏重点，再做测验。",
    },
    chapters: {
      title: "按章节学习",
      hint: "点击章节标题可展开/折叠，默认全部折叠",
    },
    cards: {
      title: "收藏夹",
      prompt: "在章节里点击星标可收藏知识点；再次点击可取消",
      empty: "还没有收藏内容，先去章节页点亮星标吧。",
    },
    quiz: {
      title: "快速测验",
      prompt: "测验题来自原笔记中的高频考点",
      correct: "回答正确",
      wrong: "再想一想",
      answer: "正确答案",
      explanation: "讲解",
    },
  },
  ja: {
    appTitle: "危険物取扱者 乙種 4類",
    subtitle: "章ごとに完全なノートを確認し、カードとクイズで復習",
    tabs: { home: "ホーム", chapters: "章", cards: "收藏", quiz: "クイズ" },
    home: {
      welcome: "章ページでは第1章から第4章までの元ノートをそのまま章単位で読めます。",
      days: "章",
      cards: "收藏",
      quizzes: "問題",
      recent: "おすすめは、まず章を読み、重要点を收藏して、最後にクイズです。",
    },
    chapters: {
      title: "章ごとの学習",
      hint: "章タイトルをタップすると開閉できます（初期状態は折りたたみ）",
    },
    cards: {
      title: "收藏一覧",
      prompt: "章の各行にある星アイコンで收藏/解除できます",
      empty: "まだ收藏がありません。章ページで星を押してください。",
    },
    quiz: {
      title: "ミニクイズ",
      prompt: "クイズは元ノートの頻出ポイントから作成",
      correct: "正解です",
      wrong: "もう一度",
      answer: "正解",
      explanation: "解説",
    },
  },
  en: {
    appTitle: "Hazardous Materials Handler Class B Category 4",
    subtitle: "Read the full notes by chapter, then review with cards and quizzes",
    tabs: { home: "Home", chapters: "Chapters", cards: "Favorites", quiz: "Quiz" },
    home: {
      welcome: "The chapter screen now shows the complete source notes split into Chapter 1 through Chapter 4.",
      days: "Chapters",
      cards: "Favorites",
      quizzes: "Questions",
      recent: "Suggested flow: read chapters, favorite key points, then finish with quizzes.",
    },
    chapters: {
      title: "Study By Chapter",
      hint: "Tap a chapter title to expand/collapse (collapsed by default)",
    },
    cards: {
      title: "Favorites",
      prompt: "Tap the star beside each chapter line to add/remove favorites",
      empty: "No favorites yet. Go to Chapters and tap stars.",
    },
    quiz: {
      title: "Quick Quiz",
      prompt: "Quiz items are based on high-frequency points from the notes",
      correct: "Correct",
      wrong: "Try again",
      answer: "Answer",
      explanation: "Why",
    },
  },
};

function normalizeMarkdownLine(line: string): string {
  return line.replace(/\u2028/g, " / ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function shouldSkipLine(line: string): boolean {
  return (
    line.length === 0 ||
    line.startsWith("<!DOCTYPE") ||
    line.startsWith("<html") ||
    line.startsWith("</html") ||
    line.startsWith("<head") ||
    line.startsWith("</head") ||
    line.startsWith("<body") ||
    line.startsWith("</body") ||
    line.startsWith("<style") ||
    line.startsWith("</style") ||
    line.startsWith("p, li {") ||
    line.includes("file:///")
  );
}

function parseSections(content: string): NoteDay[] {
  const sections: NoteDay[] = [];
  let current: NoteDay | null = null;

  for (const rawLine of content.split(/\r?\n/)) {
    const line = normalizeMarkdownLine(rawLine);

    if (shouldSkipLine(line)) {
      continue;
    }

    const dayHeader = line.match(/^##\s*(\d+\s*日目.*)$/);
    if (dayHeader) {
      if (current) {
        sections.push(current);
      }
      current = { title: dayHeader[1], blocks: [] };
      continue;
    }

    if (!current) {
      continue;
    }

    const headingMatch = line.match(/^(#{3,6})\s*(.+)$/);
    if (headingMatch) {
      current.blocks.push({
        id: `${current.title}-${current.blocks.length}`,
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      continue;
    }

    const bulletMatch = rawLine.match(/^(\s*)-\s+(.+)$/);
    if (bulletMatch) {
      current.blocks.push({
        id: `${current.title}-${current.blocks.length}`,
        type: "bullet",
        level: Math.min(6, 5 + Math.floor(bulletMatch[1].length / 2)),
        text: normalizeMarkdownLine(bulletMatch[2]),
      });
      continue;
    }

    current.blocks.push({
      id: `${current.title}-${current.blocks.length}`,
      type: "paragraph",
      level: 6,
      text: line.replace(/^#+\s*/, ""),
    });
  }

  if (current) {
    sections.push(current);
  }

  return sections;
}

const DAY_TITLE_JA: Record<string, string> = {
  "1日目 危険物に関する法令①": "1日目 危険物に関する法令①",
  "2日目 危険物に関する法令②": "2日目 危険物に関する法令②",
  "3日目 基礎的な物理と化学": "3日目 基礎的な物理と化学",
  "4日目 危険物の性質と消火の方法": "4日目 危険物の性質と消火の方法",
};

const DAY_TITLE_ZH: Record<string, string> = {
  "1日目 危険物に関する法令①": "第1章 危险物相关法令①",
  "2日目 危険物に関する法令②": "第2章 危险物相关法令②",
  "3日目 基礎的な物理と化学": "第3章 基础物理与化学",
  "4日目 危険物の性質と消火の方法": "第4章 危险物性质与灭火方法",
};

const DAY_TITLE_EN: Record<string, string> = {
  "1日目 危険物に関する法令①": "Day 1 - Laws on Hazardous Materials (1)",
  "2日目 危険物に関する法令②": "Day 2 - Laws on Hazardous Materials (2)",
  "3日目 基礎的な物理と化学": "Day 3 - Basic Physics and Chemistry",
  "4日目 危険物の性質と消火の方法": "Day 4 - Properties and Firefighting Methods",
};

function localizeSections(sections: NoteDay[], language: Language): NoteDay[] {
  if (language === "zh") {
    // Keep Chinese-focused view by hiding lines that are clearly Japanese-only.
    return sections.map((section) => ({
      ...section,
      title: DAY_TITLE_ZH[section.title] ?? section.title.replace(/(\d+)\s*日目/g, "第$1章"),
      blocks: section.blocks.filter((block) => !hasJapaneseKana(block.text)),
    }));
  }

  if (language === "en") {
    return sections.map((section) => ({
      title: (DAY_TITLE_EN[section.title] ?? translateZhLineToEn(section.title)).replace(
        /^Day\s*(\d+)\b/i,
        "Chapter $1"
      ),
      blocks: section.blocks
        .map((block) => ({
          ...block,
          text: translateZhLineToEn(block.text),
        }))
        .filter((block) => /[A-Za-z0-9]/.test(block.text)),
    }));
  }

  if (language !== "ja") {
    return sections;
  }

  return sections.map((section) => ({
    title: (DAY_TITLE_JA[section.title] ?? translateZhLineToJa(section.title)).replace(
      /(\d+)\s*日目/g,
      "第$1章"
    ),
    blocks: section.blocks.map((block) => ({
      ...block,
      // 中国語のみ／日中混在のいずれも、残る簡体字を置換・言い換えして日本語表示に寄せる
      text: translateZhLineToJa(block.text),
    })),
  }));
}

function toKeyword(text: string): string {
  const cleaned = text.replace(/^•\s*/, "").trim();
  const match = cleaned.match(/^(.{1,24}?)([：:，。,.\s]|$)/);
  return (match?.[1] ?? cleaned).trim();
}

function toExplanation(text: string): string {
  return text.replace(/^•\s*/, "").trim();
}

function buildFavoriteCandidates(blocks: NoteBlock[]): Record<string, FavoriteCandidate> {
  const result: Record<string, FavoriteCandidate> = {};

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];
    const isKeywordEntry = block.type === "heading" && block.level === 5;
    if (!isKeywordEntry) continue;

    const explanationLines: string[] = [];
    for (let j = i + 1; j < blocks.length; j += 1) {
      const next = blocks[j];
      // Next level-5 heading means next knowledge entry.
      if (next.type === "heading" && next.level <= 5) break;
      explanationLines.push(next.text);
    }

    result[block.id] = {
      id: block.id,
      keyword: toKeyword(block.text),
      explanation: explanationLines.map(toExplanation).join(" "),
    };
  }

  return result;
}

async function readSourceMarkdown(): Promise<string> {
  const asset = Asset.fromModule(require("./assets/source-material.md"));
  await asset.downloadAsync();
  const uri = asset.localUri ?? asset.uri;

  if (Platform.OS === "web") {
    const response = await fetch(uri);
    return response.text();
  }

  return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.UTF8 });
}

export default function App() {
  const [language, setLanguage] = useState<Language>("zh");
  const [tab, setTab] = useState<TabKey>("home");
  const [content, setContent] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<Record<string, FavoriteItem>>({});

  useEffect(() => {
    readSourceMarkdown().then(setContent).catch(() => setContent(""));
  }, []);

  const copy = UI_TEXT[language];
  const sections = useMemo(() => parseSections(content), [content]);
  const localizedSections = useMemo(() => localizeSections(sections, language), [sections, language]);
  const favoriteList = useMemo(() => Object.values(favorites), [favorites]);

  const toggleFavorite = (dayTitle: string, candidate: FavoriteCandidate) => {
    setFavorites((prev) => {
      if (prev[candidate.id]) {
        const next = { ...prev };
        delete next[candidate.id];
        return next;
      }

      return {
        ...prev,
        [candidate.id]: {
          id: candidate.id,
          keyword: `${dayTitle} · ${candidate.keyword}`,
          explanation: candidate.explanation,
        },
      };
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <View style={styles.topSpacer} />
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{copy.appTitle}</Text>
            <Text style={styles.subtitle}>{copy.subtitle}</Text>
          </View>
          <View style={styles.languageRow}>
            {(["zh", "ja", "en"] as Language[]).map((item) => (
              <Pressable
                key={item}
                style={[styles.langButton, language === item && styles.langButtonActive]}
                onPress={() => setLanguage(item)}
              >
                <Text style={styles.langText}>
                  {item === "zh" ? "中" : item === "ja" ? "日" : "EN"}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
          {tab === "home" && (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>{copy.tabs.home}</Text>
              <Text style={styles.paragraph}>{copy.home.welcome}</Text>
              <View style={styles.metricRow}>
                <Metric label={copy.home.days} value={String(sections.length)} />
                <Metric label={copy.home.cards} value={String(favoriteList.length)} />
                <Metric label={copy.home.quizzes} value={String(QUIZ_ITEMS.length)} />
              </View>
              <Text style={styles.note}>{copy.home.recent}</Text>
            </View>
          )}

          {tab === "chapters" && (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>{copy.chapters.title}</Text>
              <Text style={styles.note}>{copy.chapters.hint}</Text>
              {localizedSections.map((section, index) => {
                const sectionKey = String(index);
                const isOpen = Boolean(expandedSections[sectionKey]);
                const favoriteCandidates = buildFavoriteCandidates(section.blocks);
                return (
                  <View key={`${section.title}-${index}`} style={styles.chapterBlock}>
                    <Pressable
                      style={styles.chapterHeader}
                      onPress={() =>
                        setExpandedSections((prev) => ({
                          ...prev,
                          [sectionKey]: !isOpen,
                        }))
                      }
                    >
                      <Text style={styles.chapterTitle}>{section.title}</Text>
                      <Text style={styles.chapterCount}>{isOpen ? "−" : "+"}</Text>
                    </Pressable>
                    {isOpen && (
                      <View style={styles.chapterBody}>
                        {section.blocks.map((block) => (
                          <NoteLine
                            key={block.id}
                            block={block}
                            showFavorite={Boolean(favoriteCandidates[block.id])}
                            isFavorite={Boolean(favorites[block.id])}
                            onToggleFavorite={() =>
                              favoriteCandidates[block.id] &&
                              toggleFavorite(section.title, favoriteCandidates[block.id])
                            }
                          />
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {tab === "cards" && (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>{copy.cards.title}</Text>
              <Text style={styles.note}>{copy.cards.prompt}</Text>
              {favoriteList.length === 0 && <Text style={styles.paragraph}>{copy.cards.empty}</Text>}
              {favoriteList.map((item) => (
                <View key={item.id} style={styles.card}>
                  <Text style={styles.cardTag}>{item.keyword}</Text>
                  <Text style={styles.cardText}>{item.explanation}</Text>
                </View>
              ))}
            </View>
          )}

          {tab === "quiz" && (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>{copy.quiz.title}</Text>
              <Text style={styles.note}>{copy.quiz.prompt}</Text>
              {QUIZ_ITEMS.map((item) => {
                const selected = answers[item.id];
                const checked = selected !== undefined;
                const correct = selected === item.answerIndex;

                return (
                  <View key={item.id} style={styles.quizBox}>
                    <Text style={styles.quizQuestion}>{item.question[language]}</Text>
                    {item.options[language].map((option, index) => (
                      <Pressable
                        key={`${item.id}-${index}`}
                        style={[
                          styles.option,
                          selected === index && styles.optionSelected,
                          checked && index === item.answerIndex && styles.optionCorrect,
                        ]}
                        onPress={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [item.id]: index,
                          }))
                        }
                      >
                        <Text style={styles.optionText}>{option}</Text>
                      </Pressable>
                    ))}
                    {checked && (
                      <View style={styles.quizResultBox}>
                        <Text style={[styles.quizResult, correct ? styles.ok : styles.ng]}>
                          {correct ? copy.quiz.correct : copy.quiz.wrong} · {copy.quiz.answer}: {" "}
                          {item.options[language][item.answerIndex]}
                        </Text>
                        <Text style={styles.quizExplanation}>
                          {copy.quiz.explanation}: {item.explanation[language]}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>

        <View style={styles.bottomTabs}>
          {(["home", "chapters", "cards", "quiz"] as TabKey[]).map((item) => (
            <Pressable
              key={item}
              style={[styles.tabButton, tab === item && styles.tabButtonActive]}
              onPress={() => setTab(item)}
            >
              <Text style={styles.tabText}>{copy.tabs[item]}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.bottomSpacer} />
      </View>
    </SafeAreaView>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function NoteLine({
  block,
  showFavorite,
  isFavorite,
  onToggleFavorite,
}: {
  block: NoteBlock;
  showFavorite: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const isHeading = block.type === "heading";
  const isBullet = block.type === "bullet";

  return (
    <View
      style={[
        styles.noteLine,
        isHeading && styles.noteHeadingLine,
        isBullet && { paddingLeft: 12 + Math.max(0, block.level - 5) * 14 },
      ]}
    >
      <View style={styles.noteRow}>
        <Text
          style={[
            styles.noteText,
            isHeading && styles[`noteHeading${block.level}` as keyof typeof styles],
            isBullet && styles.noteBulletText,
          ]}
        >
          {isBullet ? `• ${block.text}` : block.text}
        </Text>
        {showFavorite && (
          <Pressable onPress={onToggleFavorite} hitSlop={8} style={styles.starButton}>
            <Text style={[styles.starText, isFavorite && styles.starTextActive]}>
              {isFavorite ? "★" : "☆"}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingTop: Platform.OS === "android" ? (RNStatusBar.currentHeight ?? 0) + 8 : 0,
  },
  root: {
    flex: 1,
  },
  topSpacer: {
    height: 12,
    backgroundColor: "#111827",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    backgroundColor: "#111827",
    gap: 12,
  },
  title: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: 4,
    fontSize: 13,
  },
  languageRow: {
    flexDirection: "row",
    gap: 8,
  },
  langButton: {
    backgroundColor: "#1f2937",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  langButtonActive: {
    backgroundColor: "#334155",
    borderWidth: 1,
    borderColor: "#38bdf8",
  },
  langText: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "700",
  },
  main: {
    flex: 1,
  },
  mainContent: {
    padding: 14,
    paddingBottom: 96,
  },
  panel: {
    backgroundColor: "#111827",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 14,
    gap: 12,
  },
  panelTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "700",
  },
  paragraph: {
    color: "#cbd5e1",
    lineHeight: 20,
  },
  note: {
    color: "#a5b4fc",
    fontSize: 12,
    lineHeight: 18,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#172033",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  metricValue: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "700",
  },
  metricLabel: {
    color: "#94a3b8",
    marginTop: 4,
    fontSize: 12,
  },
  dayTabs: {
    gap: 8,
    paddingBottom: 4,
  },
  dayTab: {
    backgroundColor: "#172033",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dayTabActive: {
    backgroundColor: "#24324a",
    borderColor: "#38bdf8",
  },
  dayTabText: {
    color: "#e2e8f0",
    fontSize: 12,
    fontWeight: "700",
  },
  chapterBlock: {
    backgroundColor: "#0b1220",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden",
  },
  chapterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },
  chapterTitle: {
    color: "#f8fafc",
    fontWeight: "700",
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  chapterCount: {
    color: "#38bdf8",
    fontSize: 12,
    fontWeight: "700",
  },
  chapterBody: {
    paddingVertical: 6,
  },
  noteLine: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  noteHeadingLine: {
    paddingTop: 10,
  },
  noteText: {
    color: "#cbd5e1",
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  starButton: {
    paddingTop: 1,
  },
  starText: {
    color: "#64748b",
    fontSize: 16,
    lineHeight: 18,
  },
  starTextActive: {
    color: "#facc15",
  },
  noteBulletText: {
    color: "#dbeafe",
  },
  noteHeading3: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  noteHeading4: {
    color: "#c4b5fd",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
  },
  noteHeading5: {
    color: "#7dd3fc",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
  },
  noteHeading6: {
    color: "#f8fafc",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  },
  card: {
    backgroundColor: "#0b1220",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 14,
    gap: 8,
  },
  cardTag: {
    color: "#7dd3fc",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  cardText: {
    color: "#e2e8f0",
    lineHeight: 22,
    fontSize: 15,
  },
  quizBox: {
    backgroundColor: "#0b1220",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 12,
    gap: 8,
  },
  quizQuestion: {
    color: "#f8fafc",
    fontWeight: "700",
    lineHeight: 21,
  },
  option: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  optionSelected: {
    borderWidth: 1,
    borderColor: "#38bdf8",
  },
  optionCorrect: {
    borderWidth: 1,
    borderColor: "#10b981",
  },
  optionText: {
    color: "#e2e8f0",
  },
  quizResultBox: {
    gap: 4,
    paddingTop: 4,
  },
  quizResult: {
    fontSize: 12,
    fontWeight: "600",
  },
  quizExplanation: {
    color: "#cbd5e1",
    fontSize: 12,
    lineHeight: 18,
  },
  ok: {
    color: "#34d399",
  },
  ng: {
    color: "#f87171",
  },
  bottomTabs: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    backgroundColor: "#111827",
    paddingTop: 10,
    paddingBottom: Platform.OS === "android" ? 16 : 10,
    paddingHorizontal: 10,
    gap: 8,
  },
  bottomSpacer: {
    height: 14,
    backgroundColor: "#111827",
  },
  tabButton: {
    flex: 1,
    backgroundColor: "#1f2937",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabButtonActive: {
    backgroundColor: "#334155",
    borderWidth: 1,
    borderColor: "#38bdf8",
  },
  tabText: {
    color: "#f8fafc",
    fontSize: 12,
    fontWeight: "700",
  },
});
