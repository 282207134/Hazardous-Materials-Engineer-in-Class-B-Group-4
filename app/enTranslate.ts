const EN_PHRASES: Array<[string, string]> = [
  ["危険物取扱者 乙種第４類", "Hazardous Materials Handler Class B Category 4"],
  ["日语笔记（中日对照）", "Japanese Notes (Chinese-Japanese)"],
  ["高频术语", "High-Frequency Terms"],
  ["常用笔记句型", "Common Note Patterns"],
  ["第4类分类速记（日语）", "Category 4 Quick Classification (Japanese)"],
  ["危険物とは", "What Are Hazardous Materials"],
  ["危険物を分類すると", "Hazardous Material Classification"],
  ["第4類の危険物", "Category 4 Hazardous Materials"],
  ["重点", "Key Points"],
  ["分类表", "Classification Table"],
  ["汇总表", "Summary Table"],
  ["発火点", "Autoignition Point"],
  ["引火点", "Flash Point"],
  ["指定数量とは", "What Is the Designated Quantity"],
  ["指定数量の倍数の計算", "Designated Quantity Multiplier Calculation"],
  ["危険物施設(製造所等)", "Hazardous Facilities (Manufacturing etc.)"],
  ["製造所", "Manufacturing Site"],
  ["貯蔵所", "Storage Site"],
  ["取扱所", "Handling Site"],
  ["仮貯蔵・仮取扱い", "Temporary Storage and Temporary Handling"],
  ["危険物に関する手続き", "Procedures Related to Hazardous Materials"],
  ["完成検査と仮使用", "Completion Inspection and Temporary Use"],
  ["届出が必要な事項", "Items Requiring Notification"],
  ["危険物取扱者制度", "Hazardous Materials Handler System"],
  ["危険物に関する法令①", "Laws on Hazardous Materials (1)"],
  ["危険物に関する法令②", "Laws on Hazardous Materials (2)"],
  ["基礎的な物理と化学", "Basic Physics and Chemistry"],
  ["危険物の性質と消火の方法", "Properties of Hazardous Materials and Firefighting Methods"],
  ["危険物取扱者試験", "Hazardous Materials Handler Examination"],
  ["解答", "Answer Key"],
];

const EN_REPLACEMENTS: Array<[RegExp, string]> = [
  // Chinese terms
  [/危险物品/g, "hazardous materials"],
  [/危险物/g, "hazardous materials"],
  [/危险/g, "hazardous"],
  [/法令上/g, "under the law"],
  [/第(\d+)类/g, "Category $1"],
  [/第(\d+)石油类/g, "Type $1 Petroleum"],
  [/特殊引火物/g, "Special Flammables"],
  [/酒精类/g, "Alcohols"],
  [/动植物油类/g, "Animal and Vegetable Oils"],
  [/酸化性固体/g, "oxidizing solids"],
  [/可燃性固体/g, "flammable solids"],
  [/自然发火性物质/g, "spontaneously combustible substances"],
  [/禁水性物质/g, "water-reactive substances"],
  [/引火性液体/g, "flammable liquids"],
  [/自己反应性物质/g, "self-reactive substances"],
  [/酸化性液体/g, "oxidizing liquids"],
  [/指定数量/g, "designated quantity"],
  [/倍数/g, "multiplier"],
  [/贮藏量|储藏量/g, "stored amount"],
  [/贮藏|储藏|储存/g, "storage"],
  [/取扱い|取扱/g, "handling"],
  [/制造所等/g, "manufacturing/storage/handling facilities"],
  [/制造所/g, "manufacturing site"],
  [/贮藏所|储藏所/g, "storage site"],
  [/取扱所/g, "handling site"],
  [/保安监督者/g, "safety supervisor"],
  [/保安统括管理者/g, "chief safety manager"],
  [/保安讲习/g, "safety training"],
  [/都道府县知事/g, "prefectural governor"],
  [/市町村长等/g, "municipal authority, governor, or minister"],
  [/消防署长|消防长/g, "fire chief"],
  [/许可/g, "permit"],
  [/申报|报备|届出/g, "notification"],
  [/变更/g, "change"],
  [/完成检查前检查/g, "pre-completion inspection"],
  [/完成检查/g, "completion inspection"],
  [/临时存放/g, "temporary storage"],
  [/临时处理|仮取扱い/g, "temporary handling"],
  [/火灾/g, "fire"],
  [/灭火/g, "extinguishing"],
  [/点火源/g, "ignition source"],
  [/可燃物/g, "fuel"],
  [/助燃物/g, "oxidizer"],
  [/静电/g, "static electricity"],
  [/沸点/g, "boiling point"],
  [/引火点/g, "flash point"],
  [/发火点/g, "autoignition point"],
  [/常温常压/g, "normal temperature and pressure"],
  [/大气压/g, "atmospheric pressure"],
  [/水溶性/g, "water-soluble"],
  [/非水溶性/g, "non-water-soluble"],
  [/甲种/g, "Class A"],
  [/乙种/g, "Class B"],
  [/丙种/g, "Class C"],
  [/市町村长/g, "municipal mayor"],
  [/总务大臣/g, "Minister for Internal Affairs and Communications"],
  [/二氧化碳/g, "carbon dioxide"],
  [/一氧化碳/g, "carbon monoxide"],
  [/二硫化碳/g, "carbon disulfide"],
  [/甲醇/g, "methanol"],
  [/乙醇/g, "ethanol"],
  [/丙酮/g, "acetone"],
  [/二甲苯/g, "xylene"],
  [/甘油/g, "glycerin"],
  [/汽油/g, "gasoline"],
  [/灯油/g, "kerosene"],
  [/轻油/g, "diesel oil"],
  [/重油/g, "heavy oil"],
  [/齿轮油/g, "gear oil"],
  [/汽缸油/g, "cylinder oil"],
  [/保安距离/g, "safety distance"],
  [/防爆结构/g, "explosion-proof structure"],
  [/自然发火/g, "spontaneous ignition"],
  [/燃烧范围/g, "flammability range"],
  [/燃烧点/g, "combustion point"],
  [/三重点/g, "triple point"],
  [/被氧化会成醋酸/g, "is oxidized to acetic acid"],
  [/与水任意比混合/g, "is miscible with water in any ratio"],
  // Japanese terms
  [/危険物/g, "hazardous materials"],
  [/法令/g, "law and regulations"],
  [/政令/g, "cabinet order"],
  [/規則/g, "regulations"],
  [/免状/g, "license"],
  [/所有者等/g, "owner/manager/occupier"],
  [/製造所等/g, "manufacturing/storage/handling facilities"],
  [/貯蔵/g, "storage"],
  [/取扱い/g, "handling"],
  [/給油取扱所/g, "service station"],
  [/販売取扱所/g, "sales handling site"],
  [/移送取扱所/g, "transfer handling site"],
  [/屋外タンク貯蔵所/g, "outdoor tank storage site"],
  [/屋内タンク貯蔵所/g, "indoor tank storage site"],
  [/地下タンク貯蔵所/g, "underground tank storage site"],
  [/移動タンク貯蔵所/g, "mobile tank storage site"],
  [/保安監督者/g, "safety supervisor"],
  [/保安統括管理者/g, "chief safety manager"],
  [/予防規程/g, "prevention code"],
  [/保安検査/g, "safety inspection"],
  [/完成検査済証/g, "completion inspection certificate"],
  [/完成検査/g, "completion inspection"],
  [/完成検査前検査/g, "pre-completion inspection"],
  [/仮使用/g, "temporary use"],
  [/仮貯蔵/g, "temporary storage"],
  [/仮取扱い/g, "temporary handling"],
  [/遅滞なく/g, "without delay"],
  [/火気厳禁/g, "no open flames"],
  [/火気注意/g, "caution: open flames"],
  [/衝撃注意/g, "caution: impact"],
  [/取扱注意/g, "handle with care"],
  [/燃焼/g, "combustion"],
  [/消火/g, "fire extinguishing"],
  [/自然発火/g, "spontaneous ignition"],
  [/静電気/g, "static electricity"],
  [/沸点/g, "boiling point"],
  [/引火点/g, "flash point"],
  [/発火点/g, "autoignition point"],
  [/水酸化物イオン/g, "hydroxide ion"],
  [/水素イオン/g, "hydrogen ion"],
  [/都道府県知事/g, "prefectural governor"],
  [/消防署長|消防長/g, "fire chief"],
  [/市町村長等/g, "municipal authority, governor, or minister"],
  [/総務大臣/g, "Minister for Internal Affairs and Communications"],
];

export function translateZhLineToEn(text: string): string {
  let result = text;

  for (const [from, to] of EN_PHRASES) {
    result = result.split(from).join(to);
  }

  for (const [pattern, replacement] of EN_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }

  result = result
    .replace(/^##\s*(\d+)\s*日目\b/g, "## Day $1")
    .replace(/^#####\s*第(\d+)類は【(.+)】$/g, "##### Category $1: $2")
    .replace(/^#####\s*第(\d+)类是【(.+)】$/g, "##### Category $1: $2")
    .replace(/（/g, "(")
    .replace(/）/g, ")")
    .replace(/［/g, "[")
    .replace(/］/g, "]")
    .replace(/〜|～/g, "-")
    .replace(/℃/g, " C")
    .replace(/１/g, "1")
    .replace(/２/g, "2")
    .replace(/３/g, "3")
    .replace(/４/g, "4")
    .replace(/５/g, "5")
    .replace(/６/g, "6")
    .replace(/７/g, "7")
    .replace(/８/g, "8")
    .replace(/９/g, "9")
    .replace(/０/g, "0")
    .replace(/【/g, "[")
    .replace(/】/g, "]")
    .replace(/等/g, " etc.");

  return result
    .replace(/，/g, ", ")
    .replace(/。/g, ". ")
    .replace(/：/g, ": ")
    .replace(/・/g, " / ")
    .replace(/[一-龥々〆ヵヶぁ-ゖァ-ヺ]/g, "")
    .replace(/\[\s*\]/g, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+,/g, ",")
    .replace(/\s+\./g, ".")
    .replace(/,+/g, ",")
    .replace(/\.+/g, ".")
    .replace(/\s+/g, " ")
    .trim();
}

